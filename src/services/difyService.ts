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
 * Generates tarot interpretation in blocking mode (returns complete response at once)
 * @param request - The interpretation request
 * @param onStream - Callback for the complete result
 */
export async function generateInterpretationStream(
  request: DifyInterpretationRequest,
  onStream: StreamCallback
): Promise<void> {
  console.log('🔮 [Dify] generateInterpretationStream called (blocking mode)');
  console.log('🔮 [Dify] Request:', JSON.stringify(request, null, 2));

  try {
    const { spreadType, cards, query } = request;

    console.log(`🔮 [Dify] Spread Type: ${spreadType}`);
    console.log(`🔮 [Dify] Cards Count: ${cards.length}`);
    console.log(`🔮 [Dify] Cards:`, cards.map(c => c.card.name));

    // Format the prompt
    const spreadTypeLabel =
      spreadType === 'single'
        ? 'Single Card Reading'
        : 'Three Card Spread (Past, Present, Future)';
    const cardsPrompt = formatCardsForPrompt(cards);

    const userMessage = query
      ? `User Question: ${query}\n\n${spreadTypeLabel}\n\n${cardsPrompt}\n\nPlease provide a mystical and insightful interpretation of this tarot reading, addressing the user's question.`
      : `${spreadTypeLabel}\n\n${cardsPrompt}\n\nPlease provide a mystical and insightful interpretation of this tarot reading.`;

    console.log('🔮 [Dify] User Message Length:', userMessage.length);
    console.log('🔮 [Dify] API URL:', config.dify.apiUrl);
    console.log('🔮 [Dify] API Key:', config.dify.apiKey ? `${config.dify.apiKey.substring(0, 10)}...` : 'MISSING');

    const requestPayload = {
      inputs: {},
      query: userMessage,
      response_mode: 'blocking',
      user: 'tarot-app-user',
    };
    console.log('🔮 [Dify] Request Payload:', JSON.stringify(requestPayload, null, 2));

    console.log('🔮 [Dify] Sending blocking request...');
    const response = await difyClient.post('/chat-messages', requestPayload);

    console.log('🔮 [Dify] Response status:', response.status);
    console.log('🔮 [Dify] Response data:', JSON.stringify(response.data, null, 2));

    // Extract the answer from blocking response
    const { answer } = response.data;

    if (!answer) {
      console.error('🔮 [Dify] ❌ No answer in response');
      throw new Error('No answer received from API');
    }

    console.log('🔮 [Dify] ✅ Got answer, length:', answer.length);
    console.log('🔮 [Dify] Answer preview:', answer.substring(0, 100));

    // Call onStream with the complete answer
    onStream(answer, true);
    console.log('🔮 [Dify] ✅ Blocking response completed successfully');

  } catch (error) {
    console.error('🔮 [Dify] ❌ API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<DifyErrorResponse>;

      if (axiosError.response) {
        console.error('🔮 [Dify] Error response data:', axiosError.response.data);
        throw new Error(
          `API Error: ${axiosError.response.data?.message || axiosError.message}`
        );
      } else if (axiosError.request) {
        console.error('🔮 [Dify] No response received');
        throw new Error('Network error: Unable to reach AI service');
      }
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to generate interpretation');
  }
}

export default {
  generateInterpretation,
  generateInterpretationStream,
  testConnection,
  getParameters,
};
