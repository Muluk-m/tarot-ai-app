import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { TarotCard } from '@/types/tarot.types';
import { CardIcon, CardBack } from './icons';

interface TarotCardDisplayProps {
  card?: TarotCard;
  showBack?: boolean;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  showPosition?: boolean;
  position?: 'past' | 'present' | 'future';
}

/**
 * Complete Tarot Card Display Component
 * Shows card with border, icon, name, and optional position label
 */

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
  card,
  showBack = false,
  size = 'medium',
  showName = true,
  showPosition = false,
  position,
}) => {
  const dimensions = {
    small: { width: 80, height: 112, iconSize: 32 },
    medium: { width: 120, height: 168, iconSize: 48 },
    large: { width: 160, height: 224, iconSize: 64 },
  }[size];

  // Show card back
  if (showBack || !card) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height }]}>
        <CardBack size={dimensions.width} />
      </View>
    );
  }

  // Get gradient colors based on card
  const getGradient = () => {
    if (card.arcana === 'major') {
      return ['#1E2638', '#2E1A47']; // Mystical purple gradient
    }
    // Use suit-based colors for minor arcana
    const alpha = '20'; // 20% opacity
    return ['#1E2638', card.colorScheme + alpha];
  };

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
    <View style={[styles.container, { width: dimensions.width, height: dimensions.height }]}>
      {/* Card border with glow */}
      <View
        style={[
          styles.cardBorder,
          {
            shadowColor: card.colorScheme,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
        ]}
      >
        {/* Card background */}
        <LinearGradient
          colors={getGradient()}
          style={[styles.cardBackground, { borderRadius: 8 }]}
        >
          {/* Position label (top) */}
          {showPosition && getPositionLabel() && (
            <View style={styles.positionContainer}>
              <Text style={styles.positionText}>{getPositionLabel()}</Text>
            </View>
          )}

          {/* Card icon */}
          <View style={styles.iconContainer}>
            <CardIcon card={card} size={dimensions.iconSize} showMultiple={size !== 'small'} />
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
              >
                {card.name}
              </Text>
            </View>
          )}

          {/* Optional emoji symbol */}
          {card.symbolEmoji && size !== 'small' && (
            <Text style={styles.symbolEmoji}>{card.symbolEmoji}</Text>
          )}
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBorder: {
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  cardBackground: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  positionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 4,
  },
  positionText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    backgroundColor: 'rgba(10, 14, 26, 0.6)',
    borderRadius: 4,
    width: '100%',
  },
  cardName: {
    color: '#F8FAFC',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  symbolEmoji: {
    fontSize: 16,
    position: 'absolute',
    top: 8,
    right: 8,
    opacity: 0.6,
  },
});
