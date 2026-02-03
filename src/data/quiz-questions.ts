/**
 * Quiz Question Bank
 * Comprehensive questions for testing tarot knowledge
 */

import type { Quiz, QuizQuestion, QuizOption } from '@/types/learning.types';

// ============================================================================
// COURSE 1 QUIZ: Tarot Basics
// ============================================================================

const course1Questions: QuizQuestion[] = [
  {
    id: 'c1-q1',
    type: 'multiple-choice',
    question: 'How many cards are in a traditional tarot deck?',
    options: [
      { id: 'a', text: '52 cards', isCorrect: false },
      { id: 'b', text: '78 cards', isCorrect: true },
      { id: 'c', text: '100 cards', isCorrect: false },
      { id: 'd', text: '64 cards', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'A traditional tarot deck contains 78 cards: 22 Major Arcana and 56 Minor Arcana (14 cards in 4 suits).',
    difficulty: 'easy',
  },
  {
    id: 'c1-q2',
    type: 'multiple-choice',
    question: 'What do the Major Arcana cards represent?',
    options: [
      { id: 'a', text: 'Daily activities and minor concerns', isCorrect: false },
      { id: 'b', text: 'Major life themes and spiritual lessons', isCorrect: true },
      { id: 'c', text: 'Only negative events', isCorrect: false },
      { id: 'd', text: 'Future predictions only', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Major Arcana cards represent major life themes, significant turning points, and spiritual lessons on our journey.',
    difficulty: 'easy',
  },
  {
    id: 'c1-q3',
    type: 'multiple-choice',
    question: 'Which suit corresponds to the element of Fire?',
    options: [
      { id: 'a', text: 'Cups', isCorrect: false },
      { id: 'b', text: 'Swords', isCorrect: false },
      { id: 'c', text: 'Wands', isCorrect: true },
      { id: 'd', text: 'Pentacles', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation:
      'Wands correspond to Fire, representing passion, inspiration, creativity, and action.',
    relatedCards: ['22', '23', '24'], // Some Wands cards
    difficulty: 'easy',
  },
  {
    id: 'c1-q4',
    type: 'multiple-choice',
    question: 'What element does the Suit of Cups represent?',
    options: [
      { id: 'a', text: 'Fire', isCorrect: false },
      { id: 'b', text: 'Water', isCorrect: true },
      { id: 'c', text: 'Air', isCorrect: false },
      { id: 'd', text: 'Earth', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Cups represent Water, which governs emotions, relationships, intuition, and creativity.',
    relatedCards: ['36', '37', '38'], // Some Cups cards
    difficulty: 'easy',
  },
  {
    id: 'c1-q5',
    type: 'multiple-choice',
    question: 'What themes does the Suit of Swords primarily address?',
    options: [
      { id: 'a', text: 'Material wealth and resources', isCorrect: false },
      { id: 'b', text: 'Emotions and relationships', isCorrect: false },
      { id: 'c', text: 'Thoughts, communication, and conflict', isCorrect: true },
      { id: 'd', text: 'Physical health only', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation:
      'Swords (Air element) deal with the mental realm: thoughts, communication, conflict, truth, and decisions.',
    relatedCards: ['50', '51', '52'], // Some Swords cards
    difficulty: 'easy',
  },
  {
    id: 'c1-q6',
    type: 'true-false',
    question: 'The Minor Arcana has more cards than the Major Arcana.',
    correctAnswer: 'true',
    explanation:
      'True! Minor Arcana has 56 cards (4 suits × 14 cards) while Major Arcana has 22 cards.',
    difficulty: 'easy',
  },
  {
    id: 'c1-q7',
    type: 'multiple-choice',
    question: 'What is the element associated with Pentacles?',
    options: [
      { id: 'a', text: 'Earth', isCorrect: true },
      { id: 'b', text: 'Fire', isCorrect: false },
      { id: 'c', text: 'Water', isCorrect: false },
      { id: 'd', text: 'Air', isCorrect: false },
    ],
    correctAnswer: 'a',
    explanation:
      'Pentacles represent Earth, dealing with material world, finances, health, work, and practical matters.',
    relatedCards: ['64', '65', '66'], // Some Pentacles cards
    difficulty: 'easy',
  },
  {
    id: 'c1-q8',
    type: 'multiple-choice',
    question: 'How many cards are in each suit of the Minor Arcana?',
    options: [
      { id: 'a', text: '10 cards', isCorrect: false },
      { id: 'b', text: '12 cards', isCorrect: false },
      { id: 'c', text: '14 cards', isCorrect: true },
      { id: 'd', text: '16 cards', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation:
      'Each suit contains 14 cards: Ace through Ten (10 numbered cards) plus Page, Knight, Queen, and King (4 court cards).',
    difficulty: 'medium',
  },
  {
    id: 'c1-q9',
    type: 'scenario',
    question:
      'You draw a reading with mostly Wands cards. What is the primary focus of this reading?',
    options: [
      { id: 'a', text: 'Emotional relationships and feelings', isCorrect: false },
      { id: 'b', text: 'Financial matters and resources', isCorrect: false },
      { id: 'c', text: 'Action, passion, and creative energy', isCorrect: true },
      { id: 'd', text: 'Mental conflict and decisions', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation:
      'Multiple Wands cards indicate high energy, action-oriented situations, creative projects, and passionate pursuits. The Fire element is dominant.',
    difficulty: 'medium',
  },
  {
    id: 'c1-q10',
    type: 'true-false',
    question: 'Tarot cards predict a fixed, unchangeable future.',
    correctAnswer: 'false',
    explanation:
      "False! Tarot reveals current energies and potential outcomes, but you always have free will. It's a tool for guidance and self-reflection, not fixed predictions.",
    difficulty: 'easy',
  },
];

export const COURSE_1_QUIZ: Quiz = {
  id: 'quiz-course-1',
  courseId: 'course-1',
  title: 'Tarot Basics Quiz',
  description: 'Test your understanding of tarot fundamentals, deck structure, and the four elements.',
  questions: course1Questions,
  passingScore: 80,
  category: 'course',
};

// ============================================================================
// COURSE 2 QUIZ: Major Arcana
// ============================================================================

const course2Questions: QuizQuestion[] = [
  {
    id: 'c2-q1',
    type: 'multiple-choice',
    question: 'What number is The Fool card?',
    options: [
      { id: 'a', text: '1', isCorrect: false },
      { id: 'b', text: '0', isCorrect: true },
      { id: 'c', text: '22', isCorrect: false },
      { id: 'd', text: 'It has no number', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'The Fool is numbered 0, representing unlimited potential and the beginning of the journey.',
    relatedCards: ['0'],
    difficulty: 'easy',
  },
  {
    id: 'c2-q2',
    type: 'multiple-choice',
    question: 'What is the primary meaning of The Fool card?',
    options: [
      { id: 'a', text: 'Endings and completion', isCorrect: false },
      { id: 'b', text: 'New beginnings and faith', isCorrect: true },
      { id: 'c', text: 'Conflict and struggle', isCorrect: false },
      { id: 'd', text: 'Material wealth', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'The Fool represents new beginnings, innocence, faith, and taking a leap into the unknown.',
    relatedCards: ['0'],
    difficulty: 'easy',
  },
  {
    id: 'c2-q3',
    type: 'multiple-choice',
    question: 'The Magician card represents which of the following?',
    options: [
      { id: 'a', text: 'Manifestation and personal power', isCorrect: true },
      { id: 'b', text: 'Emotional healing', isCorrect: false },
      { id: 'c', text: 'Physical strength', isCorrect: false },
      { id: 'd', text: 'Spiritual surrender', isCorrect: false },
    ],
    correctAnswer: 'a',
    explanation:
      'The Magician represents manifestation, using your personal power and resources to make things happen.',
    relatedCards: ['1'],
    difficulty: 'easy',
  },
  {
    id: 'c2-q4',
    type: 'scenario',
    question:
      'A client asks about starting a new business. You draw The Fool. What is the best interpretation?',
    options: [
      { id: 'a', text: 'The business will definitely fail', isCorrect: false },
      {
        id: 'b',
        text: 'Time for a new beginning with faith and optimism, but research is still important',
        isCorrect: true,
      },
      { id: 'c', text: 'They should not start the business', isCorrect: false },
      { id: 'd', text: 'They need more experience first', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      "The Fool encourages new beginnings and faith, perfect for starting a business. However, The Fool's energy should be balanced with practical preparation.",
    relatedCards: ['0'],
    difficulty: 'medium',
  },
  {
    id: 'c2-q5',
    type: 'multiple-choice',
    question: 'What do the four symbols on The Magician\'s table represent?',
    options: [
      { id: 'a', text: 'The four seasons', isCorrect: false },
      { id: 'b', text: 'The four suits/elements', isCorrect: true },
      { id: 'c', text: 'Four different people', isCorrect: false },
      { id: 'd', text: 'Four life stages', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'The four symbols (Wand, Cup, Sword, Pentacle) represent mastery over all four elements and suits.',
    relatedCards: ['1'],
    difficulty: 'medium',
  },
  {
    id: 'c2-q6',
    type: 'true-false',
    question: 'The Fool\'s Journey is a metaphor for human spiritual development.',
    correctAnswer: 'true',
    explanation:
      "True! The Fool's Journey through the 22 Major Arcana cards represents the soul's journey from innocence to enlightenment.",
    difficulty: 'easy',
  },
  {
    id: 'c2-q7',
    type: 'multiple-choice',
    question: 'How many Major Arcana cards are there?',
    options: [
      { id: 'a', text: '20 cards', isCorrect: false },
      { id: 'b', text: '21 cards', isCorrect: false },
      { id: 'c', text: '22 cards', isCorrect: true },
      { id: 'd', text: '24 cards', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation: 'There are 22 Major Arcana cards, numbered 0-21.',
    difficulty: 'easy',
  },
  {
    id: 'c2-q8',
    type: 'scenario',
    question:
      'Someone asks how to achieve their goal. You draw The Magician. What advice does this card offer?',
    options: [
      { id: 'a', text: 'Wait for the right time', isCorrect: false },
      { id: 'b', text: 'You have the tools and skills; take action now', isCorrect: true },
      { id: 'c', text: 'Ask others for help', isCorrect: false },
      { id: 'd', text: 'The goal is impossible', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'The Magician says you already possess what you need. Use your resources, skills, and focus to manifest your goal.',
    relatedCards: ['1'],
    difficulty: 'medium',
  },
  {
    id: 'c2-q9',
    type: 'true-false',
    question: 'The Fool card always means foolishness and bad decisions.',
    correctAnswer: 'false',
    explanation:
      "False! The Fool represents positive new beginnings, faith, and spontaneity. It's about trusting the journey, not making foolish choices.",
    relatedCards: ['0'],
    difficulty: 'easy',
  },
  {
    id: 'c2-q10',
    type: 'multiple-choice',
    question: 'What does the infinity symbol above The Magician\'s head represent?',
    options: [
      { id: 'a', text: 'Unlimited potential and eternal wisdom', isCorrect: true },
      { id: 'b', text: 'Mathematical knowledge', isCorrect: false },
      { id: 'c', text: 'Time travel', isCorrect: false },
      { id: 'd', text: 'Confusion', isCorrect: false },
    ],
    correctAnswer: 'a',
    explanation:
      'The infinity symbol (lemniscate) represents unlimited potential, eternal wisdom, and connection to the divine.',
    relatedCards: ['1'],
    difficulty: 'medium',
  },
];

export const COURSE_2_QUIZ: Quiz = {
  id: 'quiz-course-2',
  courseId: 'course-2',
  title: 'Major Arcana Quiz',
  description: "Test your knowledge of The Fool's Journey and Major Arcana meanings.",
  questions: course2Questions,
  passingScore: 80,
  category: 'course',
};

// ============================================================================
// DAILY CHALLENGE QUESTIONS (Mixed Topics)
// ============================================================================

const dailyChallengeQuestions: QuizQuestion[] = [
  {
    id: 'daily-1',
    type: 'multiple-choice',
    question: 'Which card represents new emotional beginnings and love?',
    options: [
      { id: 'a', text: 'Ace of Wands', isCorrect: false },
      { id: 'b', text: 'Ace of Cups', isCorrect: true },
      { id: 'c', text: 'Ace of Swords', isCorrect: false },
      { id: 'd', text: 'Ace of Pentacles', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation: 'Ace of Cups represents new emotional beginnings, love, compassion, and creativity.',
    relatedCards: ['36'],
    difficulty: 'easy',
  },
  {
    id: 'daily-2',
    type: 'scenario',
    question:
      'You draw Ace of Cups and Two of Cups together. What is the most likely interpretation?',
    options: [
      { id: 'a', text: 'Financial loss', isCorrect: false },
      { id: 'b', text: 'New love developing into partnership', isCorrect: true },
      { id: 'c', text: 'Career change', isCorrect: false },
      { id: 'd', text: 'Health problems', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Ace of Cups (new emotional beginning) + Two of Cups (partnership) strongly suggests new love blossoming into a meaningful connection.',
    relatedCards: ['36', '37'],
    difficulty: 'medium',
  },
  {
    id: 'daily-3',
    type: 'multiple-choice',
    question: 'What does a reading with many Major Arcana cards suggest?',
    options: [
      { id: 'a', text: 'Minor, everyday concerns', isCorrect: false },
      { id: 'b', text: 'Significant life lessons and major turning points', isCorrect: true },
      { id: 'c', text: 'Financial matters only', isCorrect: false },
      { id: 'd', text: 'Nothing important', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Multiple Major Arcana cards indicate significant life themes, spiritual lessons, and important turning points.',
    difficulty: 'medium',
  },
  {
    id: 'daily-4',
    type: 'true-false',
    question: 'The suit of Wands is associated with creative energy and action.',
    correctAnswer: 'true',
    explanation:
      'True! Wands (Fire element) represent passion, creativity, inspiration, and action-oriented energy.',
    difficulty: 'easy',
  },
  {
    id: 'daily-5',
    type: 'multiple-choice',
    question: 'In a reading about career, which suit would be most relevant?',
    options: [
      { id: 'a', text: 'Only Cups', isCorrect: false },
      { id: 'b', text: 'Wands and Pentacles', isCorrect: true },
      { id: 'c', text: 'Only Swords', isCorrect: false },
      { id: 'd', text: 'Major Arcana only', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Career readings often feature Wands (passion, creativity, action) and Pentacles (work, money, material success), though any card can appear.',
    difficulty: 'medium',
  },
];

export const DAILY_CHALLENGE_QUIZ: Quiz = {
  id: 'quiz-daily',
  title: 'Daily Challenge',
  description: 'Test your tarot knowledge with 5 random questions.',
  questions: dailyChallengeQuestions,
  passingScore: 60, // Lower threshold for daily practice
  category: 'daily',
};

// ============================================================================
// PRACTICE QUIZZES (Topic-Specific)
// ============================================================================

const elementsQuizQuestions: QuizQuestion[] = [
  {
    id: 'elem-1',
    type: 'matching',
    question: 'Match each suit with its corresponding element:',
    correctAnswer: JSON.stringify({
      Wands: 'Fire',
      Cups: 'Water',
      Swords: 'Air',
      Pentacles: 'Earth',
    }),
    explanation:
      'Wands = Fire (passion, action), Cups = Water (emotion, intuition), Swords = Air (thought, communication), Pentacles = Earth (material, practical).',
    difficulty: 'easy',
  },
  {
    id: 'elem-2',
    type: 'multiple-choice',
    question: 'Which element is associated with emotions and relationships?',
    options: [
      { id: 'a', text: 'Fire', isCorrect: false },
      { id: 'b', text: 'Water', isCorrect: true },
      { id: 'c', text: 'Air', isCorrect: false },
      { id: 'd', text: 'Earth', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation: 'Water (Cups) governs emotions, relationships, intuition, and feelings.',
    difficulty: 'easy',
  },
  {
    id: 'elem-3',
    type: 'scenario',
    question: 'A reading has mostly Pentacles cards. What is the primary focus?',
    options: [
      { id: 'a', text: 'Emotional healing', isCorrect: false },
      { id: 'b', text: 'Material concerns, finances, work, health', isCorrect: true },
      { id: 'c', text: 'Mental conflicts', isCorrect: false },
      { id: 'd', text: 'Creative projects', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Multiple Pentacles indicate focus on the material realm: money, work, health, practical matters.',
    difficulty: 'medium',
  },
  {
    id: 'elem-4',
    type: 'multiple-choice',
    question: 'Which suit would appear in a reading about communication and ideas?',
    options: [
      { id: 'a', text: 'Wands', isCorrect: false },
      { id: 'b', text: 'Cups', isCorrect: false },
      { id: 'c', text: 'Swords', isCorrect: true },
      { id: 'd', text: 'Pentacles', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation: 'Swords (Air) deal with thoughts, communication, ideas, and mental processes.',
    difficulty: 'easy',
  },
  {
    id: 'elem-5',
    type: 'true-false',
    question: 'Fire element represents practical, grounded energy.',
    correctAnswer: 'false',
    explanation:
      'False! Fire represents passionate, active, creative energy. Earth represents practical, grounded energy.',
    difficulty: 'easy',
  },
];

export const ELEMENTS_QUIZ: Quiz = {
  id: 'quiz-elements',
  title: 'Four Elements Quiz',
  description: 'Test your understanding of the four elements and their corresponding suits.',
  questions: elementsQuizQuestions,
  passingScore: 80,
  category: 'challenge',
};

// ============================================================================
// COURSE 3 QUIZ: Minor Arcana Number Cards
// ============================================================================

const course3Questions: QuizQuestion[] = [
  {
    id: 'c3-q1',
    type: 'multiple-choice',
    question: 'What do Aces represent in tarot?',
    options: [
      { id: 'a', text: 'Endings and completion', isCorrect: false },
      { id: 'b', text: 'Pure potential and new beginnings', isCorrect: true },
      { id: 'c', text: 'Conflict and challenge', isCorrect: false },
      { id: 'd', text: 'Balance and harmony', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Aces represent pure potential - the seed of each element in its purest form, signaling new beginnings and opportunities.',
    difficulty: 'easy',
  },
  {
    id: 'c3-q2',
    type: 'multiple-choice',
    question: 'Which number cards typically represent challenge and disruption?',
    options: [
      { id: 'a', text: 'Threes', isCorrect: false },
      { id: 'b', text: 'Fours', isCorrect: false },
      { id: 'c', text: 'Fives', isCorrect: true },
      { id: 'd', text: 'Sixes', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation:
      'Fives represent disruption and challenge - they break through the stability of Fours to force necessary growth.',
    difficulty: 'easy',
  },
  {
    id: 'c3-q3',
    type: 'scenario',
    question: 'You draw the Nine of Cups. What is the most likely interpretation?',
    options: [
      { id: 'a', text: 'Financial difficulty ahead', isCorrect: false },
      { id: 'b', text: 'Emotional satisfaction and wishes fulfilled', isCorrect: true },
      { id: 'c', text: 'Conflict with family members', isCorrect: false },
      { id: 'd', text: 'Need to start over from scratch', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'The Nine of Cups is known as the "wish card" - it represents emotional fulfillment, contentment, and dreams coming true.',
    relatedCards: ['44'],
    difficulty: 'medium',
  },
  {
    id: 'c3-q4',
    type: 'true-false',
    question: 'Fours represent stability and foundation in tarot.',
    correctAnswer: 'true',
    explanation:
      'True! Fours represent stability, structure, and foundation - like a table with four legs, they provide a solid base.',
    difficulty: 'easy',
  },
  {
    id: 'c3-q5',
    type: 'multiple-choice',
    question: 'What is the main theme of Tens in tarot?',
    options: [
      { id: 'a', text: 'New beginnings', isCorrect: false },
      { id: 'b', text: 'Partnership and balance', isCorrect: false },
      { id: 'c', text: 'Completion and transition to new cycle', isCorrect: true },
      { id: 'd', text: 'Reflection and assessment', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation:
      'Tens represent the culmination of a cycle - the maximum expression of the suit energy, and the transition to a new beginning.',
    difficulty: 'easy',
  },
  {
    id: 'c3-q6',
    type: 'scenario',
    question: 'The Eight of Swords appears. What does this typically indicate?',
    options: [
      { id: 'a', text: 'Rapid movement and progress', isCorrect: false },
      { id: 'b', text: 'Feeling trapped by self-imposed limitations', isCorrect: true },
      { id: 'c', text: 'Financial abundance', isCorrect: false },
      { id: 'd', text: 'Celebration and recognition', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'The Eight of Swords represents feeling restricted or trapped, but the bonds are often self-created mental limitations that can be overcome.',
    relatedCards: ['57'],
    difficulty: 'medium',
  },
  {
    id: 'c3-q7',
    type: 'multiple-choice',
    question: 'Which card represents harmony restored after the disruption of Fives?',
    options: [
      { id: 'a', text: 'The Fours', isCorrect: false },
      { id: 'b', text: 'The Sixes', isCorrect: true },
      { id: 'c', text: 'The Sevens', isCorrect: false },
      { id: 'd', text: 'The Eights', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Sixes represent balance and harmony restored after the disruption of Fives. They deal with giving/receiving and moving toward peace.',
    difficulty: 'medium',
  },
  {
    id: 'c3-q8',
    type: 'true-false',
    question: 'The Three of Swords always indicates betrayal by another person.',
    correctAnswer: 'false',
    explanation:
      "False! While Three of Swords can indicate betrayal, it more broadly represents heartbreak, grief, and painful truths - which can come from many sources including self-realization.",
    relatedCards: ['52'],
    difficulty: 'medium',
  },
  {
    id: 'c3-q9',
    type: 'multiple-choice',
    question: 'What do Sevens represent in the tarot journey?',
    options: [
      { id: 'a', text: 'Rapid action and movement', isCorrect: false },
      { id: 'b', text: 'Final completion', isCorrect: false },
      { id: 'c', text: 'Reflection and assessment', isCorrect: true },
      { id: 'd', text: 'Pure new beginnings', isCorrect: false },
    ],
    correctAnswer: 'c',
    explanation:
      'Sevens represent introspection and assessment - a pause to evaluate progress before the final push toward completion.',
    difficulty: 'easy',
  },
  {
    id: 'c3-q10',
    type: 'scenario',
    question: 'Multiple Aces appear in a reading. What does this suggest?',
    options: [
      { id: 'a', text: 'Major endings in multiple life areas', isCorrect: false },
      { id: 'b', text: 'Major new beginnings and opportunities', isCorrect: true },
      { id: 'c', text: 'A period of stagnation', isCorrect: false },
      { id: 'd', text: 'Need to release the past', isCorrect: false },
    ],
    correctAnswer: 'b',
    explanation:
      'Multiple Aces indicate powerful new beginnings and fresh opportunities in various areas of life. This is a highly auspicious combination.',
    difficulty: 'medium',
  },
];

export const COURSE_3_QUIZ: Quiz = {
  id: 'quiz-course-3',
  courseId: 'course-3',
  title: 'Minor Arcana Number Cards Quiz',
  description: 'Test your knowledge of the number cards (Ace through Ten) and numerology in tarot.',
  questions: course3Questions,
  passingScore: 80,
  category: 'course',
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_QUIZZES: Quiz[] = [
  COURSE_1_QUIZ,
  COURSE_2_QUIZ,
  COURSE_3_QUIZ,
  DAILY_CHALLENGE_QUIZ,
  ELEMENTS_QUIZ,
];

export const getQuizById = (id: string): Quiz | undefined => {
  return ALL_QUIZZES.find((quiz) => quiz.id === id);
};

export const getQuizByCourseId = (courseId: string): Quiz | undefined => {
  return ALL_QUIZZES.find((quiz) => quiz.courseId === courseId);
};

export const getDailyQuiz = (): Quiz => {
  return DAILY_CHALLENGE_QUIZ;
};

export const getChallengeQuizzes = (): Quiz[] => {
  return ALL_QUIZZES.filter((quiz) => quiz.category === 'challenge');
};
