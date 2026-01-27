import React from 'react';
import { View } from 'react-native';
import type { TarotCard } from '@/types/tarot.types';
import { MajorArcanaIcon } from './MajorArcanaIcon';
import { SuitSymbol } from './SuitSymbol';

interface CardIconProps {
  card: TarotCard;
  size?: number;
  showMultiple?: boolean; // For minor arcana numbers (2-10)
}

/**
 * Universal Card Icon Renderer
 * Renders appropriate icon based on card type
 */

export const CardIcon: React.FC<CardIconProps> = ({ card, size = 48, showMultiple = false }) => {
  // Major Arcana: render symbolic icon
  if (card.arcana === 'major') {
    return <MajorArcanaIcon iconKey={card.iconKey} size={size} color={card.colorScheme} />;
  }

  // Minor Arcana: render suit symbols
  if (card.suit) {
    // For Ace and court cards, show single symbol
    if (card.rank === 'ace' || ['page', 'knight', 'queen', 'king'].includes(card.rank || '')) {
      return <SuitSymbol suit={card.suit} size={size} color={card.colorScheme} />;
    }

    // For numbered cards (2-10), optionally show multiple symbols
    if (showMultiple && card.rank) {
      const count = parseInt(card.rank);
      if (!isNaN(count) && count >= 2 && count <= 10) {
        return (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: size * 2 }}>
            {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
              <SuitSymbol
                key={i}
                suit={card.suit!}
                size={size / 2}
                color={card.colorScheme}
              />
            ))}
            {count > 5 && (
              <View style={{ width: '100%', alignItems: 'center', marginTop: 4 }}>
                {Array.from({ length: count - 5 }).map((_, i) => (
                  <SuitSymbol
                    key={`extra-${i}`}
                    suit={card.suit!}
                    size={size / 2}
                    color={card.colorScheme}
                  />
                ))}
              </View>
            )}
          </View>
        );
      }
    }

    // Default: single suit symbol
    return <SuitSymbol suit={card.suit} size={size} color={card.colorScheme} />;
  }

  // Fallback: empty view
  return <View style={{ width: size, height: size }} />;
};

export * from './MajorArcanaIcon';
export * from './SuitSymbol';
export * from './CardBack';
