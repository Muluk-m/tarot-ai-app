/**
 * Tarot Card Type Definitions
 */

export type Arcana = 'major' | 'minor';
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';
export type Element = 'fire' | 'water' | 'air' | 'earth';
export type CardRank = 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'page' | 'knight' | 'queen' | 'king';

export interface TarotCard {
  id: number; // 0-77 unique ID
  name: string; // "The Fool", "Two of Cups"
  arcana: Arcana;
  suit?: Suit; // Only for minor arcana
  rank?: CardRank; // Only for minor arcana

  // Meanings
  uprightKeywords: string[]; // ["new beginnings", "innocence", "adventure"]
  uprightMeaning: string; // Paragraph description

  // Visuals (simplified icons)
  iconKey: string; // Maps to icon component: "fool", "cups-02"
  colorScheme: string; // Primary color for this card: "#D4AF37"
  symbolEmoji?: string; // Optional emoji representation: "🌟"

  // Metadata
  numerology?: number; // Numeric significance (Major Arcana)
  element?: Element; // Elemental association
  astrology?: string; // Zodiac/planetary association
}

export interface CardPosition {
  id: string;
  label: string;
  prompt: string;
}

export interface SpreadConfig {
  name: string;
  description: string;
  cardCount: number;
  positions: CardPosition[];
}
