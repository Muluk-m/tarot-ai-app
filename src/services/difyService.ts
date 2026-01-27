/**
 * Dify API Service
 * Handles AI-powered tarot card interpretations via Dify API
 * Supports both blocking and streaming responses
 */

import axios, { AxiosError } from 'axios';
import { config } from '../constants/config';
import type {
  DifyInterpretationRequest,
  DifyInterpretationResponse,
  DifyErrorResponse,
  DrawnCard,
} from '../types/api.types';

// Streaming callback type
export type StreamCallback = (chunk: string, isComplete: boolean) => void;

// Dify API base configuration
const difyClient = axios.create({
  baseURL: config.dify.apiUrl,
  timeout: config.dify.timeout,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.dify.apiKey}`,
  },
});

/**
 * Formats drawn cards into a readable prompt for the AI
 */
function formatCardsForPrompt(cards: DrawnCard[]): string {
  return cards
    .map((drawn) => {
      const { card, positionLabel } = drawn;
      return `${positionLabel}: ${card.name}\n- Keywords: ${card.uprightKeywords.join(', ')}\n- Meaning: ${card.uprightMeaning}`;
    })
    .join('\n\n');
}

/**
 * Generates tarot interpretation using Dify AI API
 * @param request - The interpretation request with cards and spread type
 * @returns AI-generated interpretation
 */
export async function generateInterpretation(
  request: DifyInterpretationRequest
): Promise<DifyInterpretationResponse> {
  try {
    const { spreadType, cards, query } = request;

    // Format the prompt
    const spreadTypeLabel = spreadType === 'single' ? 'Single Card Reading' : 'Three Card Spread (Past, Present, Future)';
    const cardsPrompt = formatCardsForPrompt(cards);

    const userMessage = query
      ? `User Question: ${query}\n\n${spreadTypeLabel}\n\n${cardsPrompt}\n\nPlease provide a mystical and insightful interpretation of this tarot reading, addressing the user's question.`
      : `${spreadTypeLabel}\n\n${cardsPrompt}\n\nPlease provide a mystical and insightful interpretation of this tarot reading.`;

    // Call Dify API (chat-messages endpoint for conversational AI)
    const response = await difyClient.post('/chat-messages', {
      inputs: {},
      query: userMessage,
      response_mode: 'blocking',
      user: 'tarot-app-user', // Anonymous user identifier
    });

    // Extract the interpretation from Dify response
    const { answer, conversation_id, message_id } = response.data;

    return {
      answer: answer || 'Unable to generate interpretation at this time.',
      conversationId: conversation_id,
      messageId: message_id,
    };
  } catch (error) {
    console.error('Dify API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<DifyErrorResponse>;

      if (axiosError.response) {
        // Server responded with error
        throw new Error(
          `API Error: ${axiosError.response.data?.message || axiosError.message}`
        );
      } else if (axiosError.request) {
        // Request made but no response
        throw new Error('Network error: Unable to reach AI service');
      }
    }

    throw new Error('Failed to generate interpretation');
  }
}

/**
 * Test API connection
 * @returns true if connection is successful
 */
export async function testConnection(): Promise<boolean> {
  try {
    // Simple test with a minimal request
    await difyClient.post('/chat-messages', {
      inputs: {},
      query: 'Hello',
      response_mode: 'blocking',
      user: 'test-user',
    });
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
}

/**
 * Get parameters info from Dify API
 * Useful for debugging and validation
 */
export async function getParameters(): Promise<any> {
  try {
    const response = await difyClient.get('/parameters');
    return response.data;
  } catch (error) {
    console.error('Failed to get parameters:', error);
    throw error;
  }
}

/**
 * Generates tarot interpretation with streaming support (SSE)
 * @param request - The interpretation request
 * @param onStream - Callback for each chunk of streaming data
 */
export async function generateInterpretationStream(
  request: DifyInterpretationRequest,
  onStream: StreamCallback
): Promise<void> {
  try {
    const { spreadType, cards, query } = request;

    // Format the prompt
    const spreadTypeLabel =
      spreadType === 'single'
        ? 'Single Card Reading'
        : 'Three Card Spread (Past, Present, Future)';
    const cardsPrompt = formatCardsForPrompt(cards);

    const userMessage = query
      ? `User Question: ${query}\n\n${spreadTypeLabel}\n\n${cardsPrompt}\n\nPlease provide a mystical and insightful interpretation of this tarot reading, addressing the user's question.`
      : `${spreadTypeLabel}\n\n${cardsPrompt}\n\nPlease provide a mystical and insightful interpretation of this tarot reading.`;

    const response = await fetch(`${config.dify.apiUrl}/chat-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.dify.apiKey}`,
      },
      body: JSON.stringify({
        inputs: {},
        query: userMessage,
        response_mode: 'streaming',
        user: 'tarot-app-user',
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // Process the streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        onStream(fullText, true);
        break;
      }

      // Decode the chunk
      buffer += decoder.decode(value, { stream: true });

      // Process SSE events (format: "data: {...}\n\n")
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith('data:')) {
          try {
            const jsonStr = line.slice(5).trim();
            if (jsonStr === '[DONE]') {
              continue;
            }

            const data = JSON.parse(jsonStr);

            // Dify streaming events
            if (data.event === 'agent_message' || data.event === 'message') {
              if (data.answer) {
                fullText = data.answer;
                onStream(fullText, false);
              }
            } else if (data.event === 'message_end') {
              // Stream complete
              onStream(fullText, true);
            } else if (data.event === 'error') {
              throw new Error(data.message || 'Streaming error');
            }
          } catch (parseError) {
            console.warn('Failed to parse SSE data:', line, parseError);
          }
        }
      }
    }
  } catch (error) {
    console.error('Dify Streaming Error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to generate streaming interpretation');
  }
}

export default {
  generateInterpretation,
  generateInterpretationStream,
  testConnection,
  getParameters,
};
