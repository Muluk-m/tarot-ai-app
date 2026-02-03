/**
 * Course Curriculum Data
 * Structured learning path from beginner to master
 */

import type { Course, Lesson, LessonContent, Stage } from '@/types/learning.types';

// ============================================================================
// STAGE 1: BEGINNER
// ============================================================================

// ----------------------------------------------------------------------------
// Course 1: Tarot Basics
// ----------------------------------------------------------------------------

const course1Lessons: Lesson[] = [
  {
    id: 'c1-l1',
    courseId: 'course-1',
    title: 'What is Tarot?',
    order: 1,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# What is Tarot?

Tarot is a deck of 78 cards used for divination, self-reflection, and spiritual guidance. Each card contains symbolic imagery that represents universal human experiences, emotions, and archetypal energies.

## Origins of Tarot

Tarot cards originated in 15th century Europe as playing cards. By the 18th century, they evolved into tools for divination and spiritual exploration. Today, tarot is used worldwide for:

- **Self-reflection** - Understanding yourself better
- **Guidance** - Gaining perspective on life situations
- **Spiritual growth** - Connecting with your intuition
- **Meditation** - Contemplating symbolic meanings

## How Tarot Works

Tarot works through **symbolism** and **intuition**. When you draw cards, you're tapping into:

1. **The Collective Unconscious** - Universal symbols that resonate across cultures
2. **Your Intuition** - Your inner wisdom and subconscious knowledge
3. **Synchronicity** - Meaningful coincidences that provide guidance

Tarot doesn't predict a fixed future. Instead, it reveals:
- Current energies and patterns
- Potential outcomes based on your path
- Insights for personal growth
- Perspectives you may have overlooked`,
        },
      },
    ],
  },
  {
    id: 'c1-l2',
    courseId: 'course-1',
    title: 'Structure of the Tarot Deck',
    order: 2,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The 78-Card Structure

A traditional tarot deck contains **78 cards** divided into two main groups:

## Major Arcana (22 cards)

The "big picture" cards representing major life themes and spiritual lessons.
- Numbered 0-21
- Examples: The Fool, The Magician, The High Priestess
- Represent: Major life events, spiritual growth, significant turning points

## Minor Arcana (56 cards)

The "details" cards representing day-to-day experiences and situations.
- Divided into 4 suits of 14 cards each
- Similar to regular playing cards
- Represent: Daily life, emotions, thoughts, actions, resources

### The Four Suits

1. **Wands** (Fire) - Passion, inspiration, action, creativity
2. **Cups** (Water) - Emotions, relationships, intuition, love
3. **Swords** (Air) - Thoughts, communication, conflict, truth
4. **Pentacles** (Earth) - Material world, finances, health, practical matters

Each suit contains:
- **Ace through Ten** - Numbered cards representing different stages
- **Page, Knight, Queen, King** - Court cards representing people or personalities`,
        },
      },
    ],
  },
  {
    id: 'c1-l3',
    courseId: 'course-1',
    title: 'The Four Elements',
    order: 3,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# Understanding the Four Elements

Each suit in tarot corresponds to one of the four classical elements. Understanding these elements is key to interpreting the cards.

## 🔥 Fire (Wands)

**Energy**: Active, passionate, creative
**Themes**: Inspiration, ambition, action, energy, willpower
**Questions**: What drives me? What am I creating? Where do I feel passionate?
**Personality**: Enthusiastic, bold, creative, entrepreneurial

## 💧 Water (Cups)

**Energy**: Receptive, flowing, emotional
**Themes**: Emotions, relationships, intuition, love, creativity
**Questions**: How do I feel? What do I love? What does my heart say?
**Personality**: Empathetic, intuitive, artistic, nurturing

## 🌪️ Air (Swords)

**Energy**: Mental, analytical, communicative
**Themes**: Thoughts, communication, conflict, truth, decisions
**Questions**: What do I think? What's the truth? How do I communicate?
**Personality**: Intellectual, logical, honest, communicative

## 🌍 Earth (Pentacles)

**Energy**: Grounded, stable, practical
**Themes**: Material world, finances, health, work, security
**Questions**: What do I have? What's practical? How do I build security?
**Personality**: Reliable, patient, practical, hard-working

## Elemental Balance

A balanced reading typically includes cards from multiple elements. When one element dominates:
- **Lots of Wands**: High energy, action needed
- **Lots of Cups**: Emotional focus, relationship emphasis
- **Lots of Swords**: Mental challenges, communication important
- **Lots of Pentacles**: Material focus, practical matters`,
        },
      },
    ],
  },
  {
    id: 'c1-l4',
    courseId: 'course-1',
    title: 'How to Begin Your Tarot Journey',
    order: 4,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# Starting Your Tarot Journey

Welcome to the beginning of your tarot learning adventure! Here's how to approach your studies for maximum success.

## Learning Approach

### 1. Start Simple
- Begin with one card at a time
- Focus on major themes before details
- Use daily card draws for practice
- Don't try to memorize everything at once

### 2. Build Foundation
- Master the Major Arcana first (22 cards)
- Then learn each suit separately
- Understand elements and numerology
- Practice single-card readings

### 3. Practice Regularly
- Draw a daily card each morning
- Reflect on cards throughout your day
- Keep a tarot journal
- Review and reinforce what you learn

## Study Tips

**Visual Memory**: Study the imagery on cards - the symbols tell stories

**Keyword Method**: Start with 3-5 keywords per card, expand from there

**Storytelling**: Connect cards into narratives - what story do they tell?

**Personal Connection**: Relate cards to your own experiences

**Multiple Perspectives**: Learn both divinatory and psychological meanings

## What You'll Learn

This course will guide you through:
- ✅ All 78 tarot cards in depth
- ✅ How to interpret cards in readings
- ✅ Understanding card combinations
- ✅ Various spread layouts
- ✅ Developing your intuition
- ✅ Advanced interpretation techniques

Take your time, practice regularly, and trust your journey!`,
        },
      },
    ],
  },
];

export const COURSE_1: Course = {
  id: 'course-1',
  title: 'Tarot Basics',
  description:
    'Foundational knowledge about tarot: what it is, how it works, and the structure of the 78-card deck.',
  stage: 'beginner',
  order: 1,
  lessons: course1Lessons,
  requiredScore: 80,
  estimatedTime: 30,
  icon: '📚',
};

// ----------------------------------------------------------------------------
// Course 2: Major Arcana Deep Dive
// ----------------------------------------------------------------------------

const course2Lessons: Lesson[] = [
  {
    id: 'c2-l1',
    courseId: 'course-2',
    title: "The Fool's Journey",
    order: 1,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Fool's Journey

The 22 Major Arcana cards tell a story called **The Fool's Journey** - a metaphor for the human experience from innocence to enlightenment.

## The Journey Structure

The journey is divided into three acts:

### Act I: Birth and Awakening (0-7)
- **The Fool** - Innocent beginning
- **The Magician** - Discovering your power
- **The High Priestess** - Developing intuition
- **The Empress** - Nurturing and abundance
- **The Emperor** - Structure and authority
- **The Hierophant** - Learning tradition
- **The Lovers** - Making choices
- **The Chariot** - Taking control

### Act II: Challenges and Growth (8-14)
- **Strength** - Inner courage
- **The Hermit** - Introspection
- **Wheel of Fortune** - Life's cycles
- **Justice** - Balance and truth
- **The Hanged Man** - Surrender
- **Death** - Transformation
- **Temperance** - Moderation

### Act III: Mastery and Completion (15-21)
- **The Devil** - Facing shadow
- **The Tower** - Breaking down
- **The Star** - Hope renewed
- **The Moon** - Navigating illusion
- **The Sun** - Joy and clarity
- **Judgement** - Awakening
- **The World** - Completion

## Why This Matters

Understanding the Fool's Journey helps you:
- See the progression of spiritual growth
- Understand how cards relate to each other
- Recognize where you are in your own journey
- Interpret Major Arcana in context`,
        },
      },
    ],
  },
  {
    id: 'c2-l2',
    courseId: 'course-2',
    title: 'The Fool (0) - New Beginnings',
    order: 2,
    completed: false,
    content: [
      {
        type: 'card',
        data: {
          cardId: '0', // The Fool
        },
      },
      {
        type: 'text',
        data: {
          markdown: `# The Fool - Card 0

**Element**: Air
**Astrology**: Uranus
**Keywords**: New beginnings, innocence, spontaneity, free spirit

## Core Meaning

The Fool represents the pure potential of a new beginning. Standing at the edge of a cliff, The Fool is ready to step into the unknown with faith and optimism. This card invites you to embrace uncertainty and trust in life's journey.

## Symbolism

- **Cliff Edge**: The leap of faith, stepping into the unknown
- **White Dog**: Loyalty, protection, instinct guiding you
- **White Rose**: Purity and innocence
- **Sun**: Optimism, clarity, divine blessing
- **Mountains**: The journey and challenges ahead
- **Small Pack**: Traveling light, minimal attachments

## When The Fool Appears

**In Readings**:
- Time for a fresh start
- Take a leap of faith
- Embrace beginner's mind
- Trust the journey
- Be spontaneous

**Life Areas**:
- **Career**: New job, career change, entrepreneurship
- **Love**: New relationship or renewed innocence
- **Health**: Try new wellness approaches
- **Spirituality**: Beginning of spiritual journey

## Questions to Ask

- Where am I ready for a new beginning?
- What would I do if I had no fear?
- How can I embrace more spontaneity?
- What attachments can I release?

## Practice

Today, try doing something with beginner's mind - approach a familiar situation as if experiencing it for the first time.`,
        },
      },
    ],
  },
  {
    id: 'c2-l3',
    courseId: 'course-2',
    title: 'The Magician (I) - Manifestation',
    order: 3,
    completed: false,
    content: [
      {
        type: 'card',
        data: {
          cardId: '1', // The Magician
        },
      },
      {
        type: 'text',
        data: {
          markdown: `# The Magician - Card I

**Element**: Air
**Astrology**: Mercury
**Keywords**: Manifestation, power, resourcefulness, willpower

## Core Meaning

The Magician shows you that you have all the tools you need to manifest your desires. With focus, skill, and intention, you can transform thoughts into reality. This is a card of personal power and taking action.

## Symbolism

- **Infinity Symbol**: Unlimited potential
- **Wand Raised/Pointing**: "As above, so below" - connecting spiritual and material
- **Four Symbols on Table**: Mastery of all four elements (Wands, Cups, Swords, Pentacles)
- **White Robe**: Pure intention
- **Red Cloak**: Action and passion
- **Roses and Lilies**: Passion and purity in balance

## When The Magician Appears

**In Readings**:
- Time to take action
- You have the necessary skills
- Channel your power with focus
- Manifest your vision
- Use available resources

**Life Areas**:
- **Career**: Use your talents strategically
- **Love**: Take initiative, communicate clearly
- **Health**: Mind-body connection strong
- **Spirituality**: Manifestation work, ritual

## Questions to Ask

- What resources do I already have?
- How can I use my power more effectively?
- What am I ready to manifest?
- Where can I take decisive action?

## Practice

Choose one goal and identify all the resources (skills, tools, people) you already have to achieve it. Take one concrete action today.`,
        },
      },
    ],
  },
  // NOTE: Full course would include all 22 Major Arcana cards
  // Each card gets its own dedicated lesson
];

export const COURSE_2: Course = {
  id: 'course-2',
  title: 'Major Arcana Deep Dive',
  description: "The Fool's Journey through all 22 Major Arcana cards, learning their meanings, symbolism, and spiritual lessons.",
  stage: 'beginner',
  order: 2,
  lessons: course2Lessons,
  requiredScore: 80,
  unlockRequirement: 'course-1',
  estimatedTime: 180, // ~8 minutes per card × 22 cards
  icon: '🌟',
};

// ----------------------------------------------------------------------------
// Course 3: Minor Arcana - Number Cards
// ----------------------------------------------------------------------------

export const COURSE_3: Course = {
  id: 'course-3',
  title: 'Minor Arcana - Number Cards',
  description:
    'Learn the 40 numbered cards (Ace through Ten) across all four suits. Understand how numerology and elements combine.',
  stage: 'beginner',
  order: 3,
  lessons: [], // To be populated
  requiredScore: 80,
  unlockRequirement: 'course-2',
  estimatedTime: 120,
  icon: '🔢',
};

// ----------------------------------------------------------------------------
// Course 4: Minor Arcana - Court Cards
// ----------------------------------------------------------------------------

export const COURSE_4: Course = {
  id: 'course-4',
  title: 'Minor Arcana - Court Cards',
  description:
    'Master the 16 court cards (Page, Knight, Queen, King). Learn to interpret them as people, personalities, and energies.',
  stage: 'beginner',
  order: 4,
  lessons: [], // To be populated
  requiredScore: 80,
  unlockRequirement: 'course-3',
  estimatedTime: 90,
  icon: '👑',
};

// ============================================================================
// STAGE 2: INTERMEDIATE
// ============================================================================

export const COURSE_5: Course = {
  id: 'course-5',
  title: 'Single Card Reading',
  description:
    'Learn to interpret single cards in depth. Master upright and reversed meanings, context, and intuitive interpretation.',
  stage: 'intermediate',
  order: 5,
  lessons: [], // To be populated
  requiredScore: 80,
  unlockRequirement: 'course-4',
  estimatedTime: 60,
  icon: '🎴',
};

export const COURSE_6: Course = {
  id: 'course-6',
  title: 'Spread Basics',
  description:
    'Introduction to tarot spreads. Learn classic layouts: single card, three-card, and Celtic Cross.',
  stage: 'intermediate',
  order: 6,
  lessons: [], // To be populated
  requiredScore: 80,
  unlockRequirement: 'course-5',
  estimatedTime: 75,
  icon: '🎯',
};

export const COURSE_7: Course = {
  id: 'course-7',
  title: 'Combination Reading Intro',
  description:
    'Begin reading multiple cards together. Learn how cards interact, tell stories, and modify each other.',
  stage: 'intermediate',
  order: 7,
  lessons: [], // To be populated
  requiredScore: 80,
  unlockRequirement: 'course-6',
  estimatedTime: 90,
  icon: '🔗',
};

// ============================================================================
// STAGE 3: ADVANCED
// ============================================================================

export const COURSE_8: Course = {
  id: 'course-8',
  title: 'Deep Combination Reading',
  description:
    'Advanced combinations. Major + Minor, elemental patterns, numerology in spreads, complex interactions.',
  stage: 'advanced',
  order: 8,
  lessons: [], // To be populated
  requiredScore: 85,
  unlockRequirement: 'course-7',
  estimatedTime: 120,
  icon: '🧩',
};

export const COURSE_9: Course = {
  id: 'course-9',
  title: 'Special Combination Patterns',
  description:
    'Recognize and interpret special patterns: multiple same numbers, multiple same suits, reversed clusters.',
  stage: 'advanced',
  order: 9,
  lessons: [], // To be populated
  requiredScore: 85,
  unlockRequirement: 'course-8',
  estimatedTime: 90,
  icon: '🔮',
};

export const COURSE_10: Course = {
  id: 'course-10',
  title: 'Advanced Reading Techniques',
  description:
    'Professional-level skills: asking questions, timing, multi-layered interpretation, integrating intuition.',
  stage: 'advanced',
  order: 10,
  lessons: [], // To be populated
  requiredScore: 85,
  unlockRequirement: 'course-9',
  estimatedTime: 100,
  icon: '💫',
};

export const COURSE_11: Course = {
  id: 'course-11',
  title: 'Practice & Application',
  description:
    'Apply skills to real scenarios: love, career, health, finance. Year readings, decision-making, ongoing situations.',
  stage: 'advanced',
  order: 11,
  lessons: [], // To be populated
  requiredScore: 85,
  unlockRequirement: 'course-10',
  estimatedTime: 120,
  icon: '🌱',
};

// ============================================================================
// STAGE 4: MASTER
// ============================================================================

export const COURSE_12: Course = {
  id: 'course-12',
  title: 'Master Case Studies',
  description:
    'Analyze 20+ complex real readings. Learn from challenging combinations and develop professional-level interpretation.',
  stage: 'master',
  order: 12,
  lessons: [], // To be populated
  requiredScore: 90,
  unlockRequirement: 'course-11',
  estimatedTime: 180,
  icon: '📖',
};

export const COURSE_13: Course = {
  id: 'course-13',
  title: 'Advanced Esoteric Knowledge',
  description:
    'Deeper study: Tarot and astrology, numerology, Kabbalah, different tarot systems, creating your own meanings.',
  stage: 'master',
  order: 13,
  lessons: [], // To be populated
  requiredScore: 90,
  unlockRequirement: 'course-12',
  estimatedTime: 150,
  icon: '🎓',
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_COURSES: Course[] = [
  COURSE_1,
  COURSE_2,
  COURSE_3,
  COURSE_4,
  COURSE_5,
  COURSE_6,
  COURSE_7,
  COURSE_8,
  COURSE_9,
  COURSE_10,
  COURSE_11,
  COURSE_12,
  COURSE_13,
];

export const getCourseById = (id: string): Course | undefined => {
  return ALL_COURSES.find((course) => course.id === id);
};

export const getCoursesByStage = (stage: Stage): Course[] => {
  return ALL_COURSES.filter((course) => course.stage === stage);
};

export const getNextCourse = (currentCourseId: string): Course | undefined => {
  const currentCourse = getCourseById(currentCourseId);
  if (!currentCourse) return undefined;

  return ALL_COURSES.find((course) => course.order === currentCourse.order + 1);
};
