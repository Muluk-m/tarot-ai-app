import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { TarotCard } from '@/types/tarot.types';
import { CardBack } from './icons';
import { TarotCardSVG } from '@/components/cards/svg';

interface TarotCardDisplayProps {
  card?: TarotCard;
  showBack?: boolean;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  showPosition?: boolean;
  position?: 'past' | 'present' | 'future';
  glowEffect?: boolean;
}

/**
 * Complete Tarot Card Display Component
 * Uses new SVG-based card rendering system
 */

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
  card,
  showBack = false,
  size = 'medium',
  showName = true,
  showPosition = false,
  position,
  glowEffect = false,
}) => {
  const dimensions = {
    small: { width: 80, height: 120, svgSize: 'small' as const },
    medium: { width: 120, height: 180, svgSize: 'medium' as const },
    large: { width: 160, height: 240, svgSize: 'large' as const },
  }[size];

  // Show card back
  if (showBack || !card) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height }]}>
        <CardBack size={dimensions.width} />
      </View>
    );
  }

  const getPositionLabel = () => {
    if (!showPosition || !position) return null;
    const labels = {
      past: 'Past',
      present: 'Present',
      future: 'Future',
    };
    return labels[position];
  };

  return (
    <View style={[styles.container, { width: dimensions.width }]}>
      {/* Position label (top) */}
      {showPosition && getPositionLabel() && (
        <View style={styles.positionContainer}>
          <Text style={styles.positionText}>{getPositionLabel()}</Text>
        </View>
      )}

      {/* SVG Card */}
      <View
        style={[
          styles.cardWrapper,
          glowEffect && {
            shadowColor: card.colorScheme,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 15,
          },
        ]}>
        <TarotCardSVG
          cardId={card.id}
          width={dimensions.width}
          height={dimensions.height}
          size={dimensions.svgSize}
          showNumber={true}
        />
      </View>

      {/* Card name */}
      {showName && (
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.cardName,
              {
                fontSize: size === 'small' ? 10 : size === 'medium' ? 12 : 14,
              },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {card.name}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  positionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  positionText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  nameContainer: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginTop: 8,
  },
  cardName: {
    color: '#F8FAFC',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
