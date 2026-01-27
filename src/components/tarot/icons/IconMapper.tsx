import React from 'react';
import type { TarotCard } from '@/types/tarot.types';
import {
  FoolIcon,
  MagicianIcon,
  HighPriestessIcon,
  EmpressIcon,
  EmperorIcon,
  HierophantIcon,
  LoversIcon,
  ChariotIcon,
  StrengthIcon,
  HermitIcon,
  WheelOfFortuneIcon,
  JusticeIcon,
  HangedManIcon,
  DeathIcon,
  TemperanceIcon,
  DevilIcon,
  TowerIcon,
  StarIcon,
  MoonIcon,
  SunIcon,
  JudgementIcon,
  WorldIcon,
  type CardIconProps,
} from './MajorArcanaIcons';

import {
  WandSymbol,
  CupSymbol,
  SwordSymbol,
  PentacleSymbol,
  PageIcon,
  KnightIcon,
  QueenIcon,
  KingIcon,
} from './MinorArcanaIcons';

/**
 * Icon Mapper
 * Maps iconKey to the appropriate icon component
 */

type IconComponent = React.FC<CardIconProps | any>;

const MAJOR_ARCANA_ICONS: Record<string, IconComponent> = {
  fool: FoolIcon,
  magician: MagicianIcon,
  'high-priestess': HighPriestessIcon,
  empress: EmpressIcon,
  emperor: EmperorIcon,
  hierophant: HierophantIcon,
  lovers: LoversIcon,
  chariot: ChariotIcon,
  strength: StrengthIcon,
  hermit: HermitIcon,
  'wheel-of-fortune': WheelOfFortuneIcon,
  justice: JusticeIcon,
  'hanged-man': HangedManIcon,
  death: DeathIcon,
  temperance: TemperanceIcon,
  devil: DevilIcon,
  tower: TowerIcon,
  star: StarIcon,
  moon: MoonIcon,
  sun: SunIcon,
  judgement: JudgementIcon,
  world: WorldIcon,
};

// Get icon component for a card
export function getCardIcon(card: TarotCard): IconComponent | null {
  // Major Arcana
  if (card.arcana === 'major') {
    return MAJOR_ARCANA_ICONS[card.iconKey] || null;
  }

  // Minor Arcana
  if (card.arcana === 'minor' && card.suit && card.rank) {
    const rank = card.rank.toLowerCase();

    // Court cards
    if (rank === 'page') {
      return (props: CardIconProps) => <PageIcon {...props} suit={card.suit!} />;
    }
    if (rank === 'knight') {
      return (props: CardIconProps) => <KnightIcon {...props} suit={card.suit!} />;
    }
    if (rank === 'queen') {
      return (props: CardIconProps) => <QueenIcon {...props} suit={card.suit!} />;
    }
    if (rank === 'king') {
      return (props: CardIconProps) => <KingIcon {...props} suit={card.suit!} />;
    }

    // Number cards (Ace - 10)
    const suitSymbol = getSuitSymbol(card.suit);
    const count = getRankCount(rank);

    if (suitSymbol && count) {
      return (props: CardIconProps) => React.createElement(suitSymbol, { ...props, count });
    }
  }

  return null;
}

function getSuitSymbol(suit: string): IconComponent | null {
  switch (suit) {
    case 'wands':
      return WandSymbol;
    case 'cups':
      return CupSymbol;
    case 'swords':
      return SwordSymbol;
    case 'pentacles':
      return PentacleSymbol;
    default:
      return null;
  }
}

function getRankCount(rank: string): number | null {
  if (rank === 'ace') return 1;
  const num = parseInt(rank, 10);
  if (!isNaN(num) && num >= 2 && num <= 10) {
    return num;
  }
  return null;
}

// Get suit color
export function getSuitColor(suit?: string): string {
  switch (suit) {
    case 'wands':
      return '#EF4444'; // Fire - Red
    case 'cups':
      return '#06B6D4'; // Water - Cyan
    case 'swords':
      return '#94A3B8'; // Air - Silver
    case 'pentacles':
      return '#10B981'; // Earth - Green
    default:
      return '#D4AF37'; // Gold (default for Major Arcana)
  }
}
