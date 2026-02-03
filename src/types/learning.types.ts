/**
 * Learning System Type Definitions
 * For Celestial Eye's educational tarot learning platform
 */

// ============================================================================
// COURSE & LESSON TYPES
// ============================================================================

export type Stage = 'beginner' | 'intermediate' | 'advanced' | 'master';

export type LessonContentType = 'text' | 'image' | 'card' | 'cardList' | 'interactive' | 'video';

export interface LessonContent {
  type: LessonContentType;
  data: any; // Flexible data structure for different content types
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number; // Lesson order within course (1, 2, 3, ...)
  content: LessonContent[];
  completed: boolean;
  lastStudiedAt?: string; // ISO date string
}

export interface Course {
  id: string;
  title: string;
  description: string;
  stage: Stage;
  order: number; // Course order within stage
  lessons: Lesson[];
  requiredScore: number; // % needed to pass course quiz (default 80)
  unlockRequirement?: string; // Course ID that must be completed first
  estimatedTime: number; // Estimated study time in minutes
  icon: string; // Emoji or icon identifier
}

// ============================================================================
// LEARNING PROGRESS TYPES
// ============================================================================

export interface LearningProgress {
  userId: string; // User identifier (device ID)

  // Current progress
  currentStage: Stage;
  currentCourseId?: string;

  // Completion tracking
  completedCourses: string[]; // Course IDs
  completedLessons: string[]; // Lesson IDs

  // Card mastery
  masteredCards: string[]; // Card IDs (fully learned)
  learningCards: string[]; // Card IDs (currently studying)

  // Time tracking
  totalStudyTime: number; // Total minutes spent learning
  lastStudyDate: string; // ISO date string
  studyStreak: number; // Consecutive days of study

  // Level system
  currentLevel: number; // 1-5 (Beginner to Master)
  experiencePoints: number; // XP for level progression

  // Achievements
  achievements: string[]; // Achievement IDs unlocked
}

// ============================================================================
// QUIZ TYPES
// ============================================================================

export type QuizQuestionType = 'multiple-choice' | 'true-false' | 'matching' | 'scenario';
export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options?: QuizOption[]; // For multiple-choice
  correctAnswer: string | string[]; // Answer ID(s)
  explanation: string; // Why this is the correct answer
  relatedCards?: string[]; // Card IDs this question relates to
  difficulty: QuizDifficulty;
}

export interface Quiz {
  id: string;
  courseId?: string; // Optional: quiz tied to a course
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number; // Percentage (0-100)
  timeLimit?: number; // Time limit in seconds (optional)
  category: 'course' | 'daily' | 'challenge'; // Quiz type
}

export interface QuizResult {
  id: string;
  quizId: string;
  score: number; // Percentage (0-100)
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string; // ISO date string
  timeSpent: number; // Seconds taken
  passed: boolean;
  answers: Record<string, string | string[]>; // questionId -> answer(s)
}

// ============================================================================
// CARD COMBINATION GUIDE TYPES
// ============================================================================

export type CombinationCategory = 'positive' | 'neutral' | 'challenging';

export interface CombinationGuide {
  id: string;
  cards: string[]; // Card IDs in combination
  title: string;
  meaning: string; // Full interpretation
  keywords: string[];
  examples: string[]; // Real-world scenario examples
  category: CombinationCategory;
}

// ============================================================================
// LEARNING JOURNAL TYPES
// ============================================================================

export type JournalEntryType = 'learning' | 'practice' | 'reflection' | 'daily-card';

export interface JournalEntry {
  id: string;
  date: string; // ISO date string
  type: JournalEntryType;
  title: string;
  content: string;
  relatedCards?: string[]; // Card IDs mentioned in entry
  tags: string[];
  mood?: string; // Optional mood tracking
  readingId?: string; // Link to a reading (if practice entry)
}

// ============================================================================
// ACHIEVEMENT TYPES
// ============================================================================

export type AchievementCategory = 'knowledge' | 'practice' | 'special';

export type AchievementRequirementType =
  | 'cards-mastered'
  | 'courses-completed'
  | 'study-streak'
  | 'quiz-perfect'
  | 'journal-entries'
  | 'readings-completed'
  | 'lessons-completed';

export interface AchievementRequirement {
  type: AchievementRequirementType;
  target: number; // Target value to unlock
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or icon identifier
  category: AchievementCategory;
  requirement: AchievementRequirement;
  unlockedAt?: string; // ISO date string when unlocked
  hidden: boolean; // Hidden until unlocked
}

// ============================================================================
// FLASHCARD TYPES
// ============================================================================

export type FlashcardMode = 'recognition' | 'meaning' | 'scenario';

export interface FlashcardProgress {
  cardId: string;
  reviewCount: number; // Number of times reviewed
  lastReviewed: string; // ISO date string
  nextReviewDate: string; // ISO date string (spaced repetition)
  masteryLevel: number; // 0-5 (increasing proficiency)
  mistakes: number; // Number of times answered incorrectly
}

export interface FlashcardSession {
  id: string;
  mode: FlashcardMode;
  cardsReviewed: string[]; // Card IDs
  correctAnswers: number;
  totalCards: number;
  completedAt: string; // ISO date string
  durationSeconds: number;
}

// ============================================================================
// DAILY CARD STUDY TYPES
// ============================================================================

export interface DailyCardStudy {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  cardId: string;
  completed: boolean;
  reflection?: string; // User's end-of-day reflection
  meditation: boolean; // Whether user completed meditation
  journalEntryId?: string; // Link to journal entry
}

// ============================================================================
// ENHANCED TAROT CARD (extends base TarotCard)
// ============================================================================

export interface EnhancedCardData {
  // Additional learning content not in base TarotCard
  reversedKeywords?: string[];
  reversedMeaning?: string;

  // Symbolism details
  symbolism: {
    mainSymbols: string[]; // Key symbols on the card
    colors: string[]; // Significant colors
    patterns: string[]; // Visual patterns and their meanings
  };

  // Life applications
  lifeApplications: {
    career: string;
    love: string;
    health: string;
    finance: string;
    spiritual: string;
  };

  // Guidance
  actionSuggestions: string[]; // What to do when this card appears
  meditationPrompts: string[]; // Meditation/reflection prompts

  // Combinations
  commonCombinations?: string[]; // Common combination guide IDs
}
