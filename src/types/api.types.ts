/**
 * API Type Definitions for Dify Integration
 */

import { TarotCard } from './tarot.types';

export interface DrawnCard {
  card: TarotCard;
  position: string; // "past", "present", "future", or "single"
  positionLabel: string; // Human-readable label
}

export interface DifyInterpretationRequest {
  spreadType: 'single' | 'three';
  cards: DrawnCard[];
  query?: string; // Optional user question
}

export interface DifyInterpretationResponse {
  answer: string; // The AI-generated interpretation
  conversationId?: string; // For follow-up questions
  messageId?: string;
}

export interface DifyErrorResponse {
  code: string;
  message: string;
  status: number;
}

export type SpreadType = 'single' | 'three';
