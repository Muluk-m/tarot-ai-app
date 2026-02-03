/**
 * Achievement System Data
 * Gamification to motivate learning and practice
 */

import type { Achievement } from '@/types/learning.types';

// ============================================================================
// KNOWLEDGE ACHIEVEMENTS
// ============================================================================

export const KNOWLEDGE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'tarot-apprentice',
    title: '🎓 Tarot Apprentice',
    description: 'Complete your first lesson',
    icon: '🎓',
    category: 'knowledge',
    requirement: {
      type: 'lessons-completed',
      target: 1,
    },
    hidden: false,
  },
  {
    id: 'major-arcana-master',
    title: '🌟 Major Arcana Master',
    description: 'Master all 22 Major Arcana cards',
    icon: '🌟',
    category: 'knowledge',
    requirement: {
      type: 'cards-mastered',
      target: 22,
    },
    hidden: false,
  },
  {
    id: 'wands-expert',
    title: '🔥 Wands Expert',
    description: 'Master all 14 Wands cards',
    icon: '🔥',
    category: 'knowledge',
    requirement: {
      type: 'cards-mastered',
      target: 14, // Note: Actual check would filter by suit
    },
    hidden: false,
  },
  {
    id: 'cups-expert',
    title: '💧 Cups Expert',
    description: 'Master all 14 Cups cards',
    icon: '💧',
    category: 'knowledge',
    requirement: {
      type: 'cards-mastered',
      target: 14, // Note: Actual check would filter by suit
    },
    hidden: false,
  },
  {
    id: 'swords-expert',
    title: '⚔️ Swords Expert',
    description: 'Master all 14 Swords cards',
    icon: '⚔️',
    category: 'knowledge',
    requirement: {
      type: 'cards-mastered',
      target: 14, // Note: Actual check would filter by suit
    },
    hidden: false,
  },
  {
    id: 'pentacles-expert',
    title: '💰 Pentacles Expert',
    description: 'Master all 14 Pentacles cards',
    icon: '💰',
    category: 'knowledge',
    requirement: {
      type: 'cards-mastered',
      target: 14, // Note: Actual check would filter by suit
    },
    hidden: false,
  },
  {
    id: 'court-cards-expert',
    title: '👑 Court Cards Expert',
    description: 'Master all 16 Court Cards',
    icon: '👑',
    category: 'knowledge',
    requirement: {
      type: 'cards-mastered',
      target: 16, // Note: Actual check would filter by court cards
    },
    hidden: false,
  },
  {
    id: 'tarot-master',
    title: '🏆 Tarot Master',
    description: 'Master all 78 tarot cards',
    icon: '🏆',
    category: 'knowledge',
    requirement: {
      type: 'cards-mastered',
      target: 78,
    },
    hidden: false,
  },
  {
    id: 'beginner-graduate',
    title: '📚 Beginner Graduate',
    description: 'Complete all Beginner stage courses',
    icon: '📚',
    category: 'knowledge',
    requirement: {
      type: 'courses-completed',
      target: 4, // Courses 1-4
    },
    hidden: false,
  },
  {
    id: 'intermediate-graduate',
    title: '🎯 Intermediate Graduate',
    description: 'Complete all Intermediate stage courses',
    icon: '🎯',
    category: 'knowledge',
    requirement: {
      type: 'courses-completed',
      target: 7, // Courses 1-7
    },
    hidden: false,
  },
  {
    id: 'advanced-graduate',
    title: '💫 Advanced Graduate',
    description: 'Complete all Advanced stage courses',
    icon: '💫',
    category: 'knowledge',
    requirement: {
      type: 'courses-completed',
      target: 11, // Courses 1-11
    },
    hidden: false,
  },
  {
    id: 'master-graduate',
    title: '🎓 Master Graduate',
    description: 'Complete ALL courses and achieve mastery',
    icon: '🎓',
    category: 'knowledge',
    requirement: {
      type: 'courses-completed',
      target: 13, // All courses
    },
    hidden: false,
  },
  {
    id: 'perfectionist',
    title: '🎯 Perfectionist',
    description: 'Score 100% on 10 different quizzes',
    icon: '🎯',
    category: 'knowledge',
    requirement: {
      type: 'quiz-perfect',
      target: 10,
    },
    hidden: false,
  },
];

// ============================================================================
// PRACTICE ACHIEVEMENTS
// ============================================================================

export const PRACTICE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'daily-learner',
    title: '📖 Daily Learner',
    description: 'Study for 7 consecutive days',
    icon: '📖',
    category: 'practice',
    requirement: {
      type: 'study-streak',
      target: 7,
    },
    hidden: false,
  },
  {
    id: 'learning-enthusiast',
    title: '🔥 Learning Enthusiast',
    description: 'Study for 30 consecutive days',
    icon: '🔥',
    category: 'practice',
    requirement: {
      type: 'study-streak',
      target: 30,
    },
    hidden: false,
  },
  {
    id: 'dedicated-scholar',
    title: '💎 Dedicated Scholar',
    description: 'Study for 100 consecutive days',
    icon: '💎',
    category: 'practice',
    requirement: {
      type: 'study-streak',
      target: 100,
    },
    hidden: true, // Hidden achievement until unlocked
  },
  {
    id: 'meditator',
    title: '🧘 Meditator',
    description: 'Complete 30 daily card meditations',
    icon: '🧘',
    category: 'practice',
    requirement: {
      type: 'journal-entries',
      target: 30, // Daily card journals
    },
    hidden: false,
  },
  {
    id: 'journal-writer',
    title: '📝 Journal Writer',
    description: 'Write 30 learning journal entries',
    icon: '📝',
    category: 'practice',
    requirement: {
      type: 'journal-entries',
      target: 30,
    },
    hidden: false,
  },
  {
    id: 'prolific-writer',
    title: '✍️ Prolific Writer',
    description: 'Write 100 journal entries',
    icon: '✍️',
    category: 'practice',
    requirement: {
      type: 'journal-entries',
      target: 100,
    },
    hidden: true,
  },
  {
    id: 'practice-makes-perfect',
    title: '🎴 Practice Makes Perfect',
    description: 'Complete 50 practice readings',
    icon: '🎴',
    category: 'practice',
    requirement: {
      type: 'readings-completed',
      target: 50,
    },
    hidden: false,
  },
  {
    id: 'reading-master',
    title: '🔮 Reading Master',
    description: 'Complete 200 practice readings',
    icon: '🔮',
    category: 'practice',
    requirement: {
      type: 'readings-completed',
      target: 200,
    },
    hidden: true,
  },
];

// ============================================================================
// SPECIAL ACHIEVEMENTS
// ============================================================================

export const SPECIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'early-adopter',
    title: '🚀 Early Adopter',
    description: 'One of the first users of Celestial Eye learning platform',
    icon: '🚀',
    category: 'special',
    requirement: {
      type: 'lessons-completed',
      target: 1, // Granted automatically to early users
    },
    hidden: false,
  },
  {
    id: 'knowledge-vault',
    title: '🏛️ Knowledge Vault',
    description: 'Unlock all card encyclopedia entries',
    icon: '🏛️',
    category: 'special',
    requirement: {
      type: 'cards-mastered',
      target: 78,
    },
    hidden: false,
  },
  {
    id: 'course-completer',
    title: '🎉 Course Completer',
    description: 'Finish your first course',
    icon: '🎉',
    category: 'special',
    requirement: {
      type: 'courses-completed',
      target: 1,
    },
    hidden: false,
  },
  {
    id: 'lesson-master',
    title: '📚 Lesson Master',
    description: 'Complete 50 lessons',
    icon: '📚',
    category: 'special',
    requirement: {
      type: 'lessons-completed',
      target: 50,
    },
    hidden: false,
  },
  {
    id: 'quiz-champion',
    title: '🏅 Quiz Champion',
    description: 'Pass 20 quizzes',
    icon: '🏅',
    category: 'special',
    requirement: {
      type: 'quiz-perfect',
      target: 20, // Using quiz-perfect but checking for passes
    },
    hidden: false,
  },
];

// ============================================================================
// LEVEL THRESHOLDS
// ============================================================================

export interface LevelInfo {
  level: number;
  title: string;
  minCards: number; // Minimum cards mastered
  icon: string;
  description: string;
}

export const LEVEL_THRESHOLDS: LevelInfo[] = [
  {
    level: 1,
    title: 'Beginner',
    minCards: 0,
    icon: '🌱',
    description: 'Just starting your tarot journey',
  },
  {
    level: 2,
    title: 'Learner',
    minCards: 11,
    icon: '📖',
    description: 'Building foundational knowledge',
  },
  {
    level: 3,
    title: 'Practitioner',
    minCards: 31,
    icon: '🎴',
    description: 'Actively practicing and applying skills',
  },
  {
    level: 4,
    title: 'Expert',
    minCards: 51,
    icon: '⭐',
    description: 'Deep understanding of tarot',
  },
  {
    level: 5,
    title: 'Master',
    minCards: 71,
    icon: '🏆',
    description: 'Mastery of all tarot cards',
  },
];

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_ACHIEVEMENTS: Achievement[] = [
  ...KNOWLEDGE_ACHIEVEMENTS,
  ...PRACTICE_ACHIEVEMENTS,
  ...SPECIAL_ACHIEVEMENTS,
];

export const getAchievementById = (id: string): Achievement | undefined => {
  return ALL_ACHIEVEMENTS.find((achievement) => achievement.id === id);
};

export const getAchievementsByCategory = (
  category: 'knowledge' | 'practice' | 'special'
): Achievement[] => {
  return ALL_ACHIEVEMENTS.filter((achievement) => achievement.category === category);
};

export const getVisibleAchievements = (): Achievement[] => {
  return ALL_ACHIEVEMENTS.filter((achievement) => !achievement.hidden);
};

export const getLevelInfo = (masteredCards: number): LevelInfo => {
  // Find the highest level the user qualifies for
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (masteredCards >= LEVEL_THRESHOLDS[i].minCards) {
      return LEVEL_THRESHOLDS[i];
    }
  }
  return LEVEL_THRESHOLDS[0]; // Default to level 1
};

export const getNextLevelInfo = (currentLevel: number): LevelInfo | null => {
  if (currentLevel >= 5) return null; // Max level reached
  return LEVEL_THRESHOLDS[currentLevel]; // Next level (0-indexed array)
};
