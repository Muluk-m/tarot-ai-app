/**
 * Course Curriculum Data
 * Structured learning path from beginner to master
 */

import type { Course, Lesson, Stage } from '@/types/learning.types';

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

const course3Lessons: Lesson[] = [
  {
    id: 'c3-l1',
    courseId: 'course-3',
    title: 'Introduction to Minor Arcana',
    order: 1,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# Introduction to Minor Arcana

The Minor Arcana consists of **56 cards** divided into four suits. Unlike the Major Arcana which represents major life themes, the Minor Arcana deals with day-to-day experiences.

## The Four Suits

Each suit corresponds to an **element** and area of life:

### 🔥 Wands (Fire)
- **Energy**: Passion, creativity, action
- **Life Area**: Career, ambition, inspiration
- **Season**: Spring
- **Direction**: South

### 💧 Cups (Water)
- **Energy**: Emotions, intuition, relationships
- **Life Area**: Love, feelings, dreams
- **Season**: Summer
- **Direction**: West

### ⚔️ Swords (Air)
- **Energy**: Thoughts, communication, conflict
- **Life Area**: Decisions, truth, challenges
- **Season**: Autumn
- **Direction**: East

### 🪙 Pentacles (Earth)
- **Energy**: Material, practical, stable
- **Life Area**: Money, health, work
- **Season**: Winter
- **Direction**: North

## Card Structure

Each suit contains:
- **Ace through Ten** (10 number cards)
- **Page, Knight, Queen, King** (4 court cards)

This course focuses on the number cards (Ace-10).`,
        },
      },
    ],
  },
  {
    id: 'c3-l2',
    courseId: 'course-3',
    title: 'Numerology in Tarot',
    order: 2,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# Numerology in Tarot

Each number from Ace to Ten carries specific meaning that combines with the suit's element.

## The Numbers

### Ace (1) - Beginnings
- Pure potential, new starts
- Seed of the element's energy
- Gift, opportunity, breakthrough

### Two - Balance
- Partnership, duality, choice
- Cooperation or conflict
- Balance between opposites

### Three - Growth
- Expansion, creativity, groups
- First fruits of effort
- Collaboration, expression

### Four - Stability
- Foundation, structure, rest
- Security, boundaries
- Can be stagnation if overdone

### Five - Conflict
- Challenge, change, instability
- Loss, struggle, adaptation
- Necessary disruption for growth

### Six - Harmony
- Balance restored, giving/receiving
- Communication, fairness
- Victory through cooperation

### Seven - Reflection
- Assessment, introspection
- Spiritual seeking, patience
- Waiting for the right moment

### Eight - Mastery
- Power, movement, achievement
- Rapid progress or restriction
- Taking control of situation

### Nine - Completion
- Near-end of cycle
- Fulfillment or anxiety
- Wisdom gained through experience

### Ten - Culmination
- End of cycle, maximum expression
- Can be overwhelm or success
- Transition to new beginning

## Combining Number + Suit

The magic happens when you combine:
- **Number meaning** (the "what")
- **Suit energy** (the "how")

Example: **Three of Wands**
- Three = growth, expansion
- Wands = fire, action, ambition
- Meaning = expanding horizons, planning ahead`,
        },
      },
    ],
  },
  {
    id: 'c3-l3',
    courseId: 'course-3',
    title: 'Aces - Seeds of Potential',
    order: 3,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Aces - Seeds of Potential

Aces represent **pure potential** - the gift of each element in its purest form.

## Ace of Wands 🔥
**New Inspiration**
- A spark of creativity
- New project or venture
- Burst of enthusiasm
- Sexual energy, attraction
- *Question: What ignites your passion?*

## Ace of Cups 💧
**New Love**
- Emotional new beginning
- Deep connection, compassion
- Intuitive opening
- Spiritual gift
- *Question: What does your heart want?*

## Ace of Swords ⚔️
**New Clarity**
- Mental breakthrough
- Truth revealed
- Sharp focus, decision
- Victory through intellect
- *Question: What truth needs acknowledgment?*

## Ace of Pentacles 🪙
**New Opportunity**
- Financial prospect
- Physical manifestation
- Practical gift
- Health improvement
- *Question: What opportunity is presenting itself?*

## Reading Aces

When an Ace appears:
1. **Pay attention** - Something new is emerging
2. **Accept the gift** - Don't let it pass by
3. **Plant the seed** - Take initial action
4. **Trust potential** - Growth takes time

## Aces in Combinations

- **Multiple Aces**: Major new beginnings
- **Ace + Court Card**: A person bringing opportunity
- **Ace + Major Arcana**: Significant life change starting`,
        },
      },
    ],
  },
  {
    id: 'c3-l4',
    courseId: 'course-3',
    title: 'Twos - Choices and Balance',
    order: 4,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Twos - Choices and Balance

Twos represent **duality** - the first step after the Ace where we encounter choice.

## Two of Wands 🔥
**Planning & Vision**
- Looking to the future
- Making plans, weighing options
- Holding potential in your hands
- Personal power, ambition
- *Key: Consider your next move*

## Two of Cups 💧
**Partnership**
- Mutual attraction, connection
- Balance in relationships
- Agreement, unity
- Deep emotional bond
- *Key: Heart meeting heart*

## Two of Swords ⚔️
**Indecision**
- Blocked emotions, denial
- Difficult choice to make
- Temporary peace through avoidance
- Need for balance
- *Key: Remove the blindfold*

## Two of Pentacles 🪙
**Balance & Juggling**
- Managing multiple responsibilities
- Financial decisions
- Flexibility, adaptation
- Time management
- *Key: Keep things moving*

## The Theme of Duality

All Twos deal with:
- **Choice** between options
- **Balance** between forces
- **Partnership** with others or self
- **Harmony** or its disruption

## Reading Twos

When a Two appears, ask:
- What choice am I facing?
- Where do I need balance?
- Is there a partnership to consider?
- Am I avoiding a decision?`,
        },
      },
    ],
  },
  {
    id: 'c3-l5',
    courseId: 'course-3',
    title: 'Threes - Creation and Growth',
    order: 5,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Threes - Creation and Growth

Threes represent **expansion** - when two energies combine to create something new.

## Three of Wands 🔥
**Expansion & Progress**
- Plans coming to fruition
- Looking beyond current horizons
- Waiting for ships to come in
- Leadership, enterprise
- *Key: Your vision is manifesting*

## Three of Cups 💧
**Celebration**
- Joy, friendship, community
- Emotional abundance
- Creative collaboration
- Reunion, parties
- *Key: Celebrate with others*

## Three of Swords 💔
**Heartbreak**
- Sorrow, grief, betrayal
- Painful truth revealed
- Necessary release
- Clearing through tears
- *Key: Feel it to heal it*

## Three of Pentacles 🪙
**Collaboration**
- Teamwork, skill development
- Recognition for work
- Building something lasting
- Apprenticeship, learning
- *Key: Many hands make light work*

## The Creative Power of Three

In numerology, three is:
- The first "whole" number
- Birth from the union of two
- Creative expression
- Communication and growth

## Positive vs Challenging Threes

- **Wands, Cups, Pentacles**: Generally positive growth
- **Swords**: The necessary pain of growth

The Three of Swords reminds us that some growth comes through difficulty.`,
        },
      },
    ],
  },
  {
    id: 'c3-l6',
    courseId: 'course-3',
    title: 'Fours - Stability and Structure',
    order: 6,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Fours - Stability and Structure

Fours represent **foundation** - creating stability and sometimes limitation.

## Four of Wands 🔥
**Celebration & Home**
- Joyous celebration
- Home, community
- Milestone achieved
- Stability in projects
- *Key: Celebrate your foundation*

## Four of Cups 💧
**Contemplation**
- Emotional withdrawal
- Boredom, apathy
- Missing an opportunity
- Need for reflection
- *Key: Look at what's being offered*

## Four of Swords ⚔️
**Rest & Recovery**
- Mental rest, recuperation
- Meditation, sanctuary
- Stepping back
- Necessary pause
- *Key: Rest before battle*

## Four of Pentacles 🪙
**Security & Possession**
- Material security
- Holding tight to resources
- Fear of loss
- Boundaries around wealth
- *Key: Balance security with flow*

## The Stability of Four

Four represents:
- Four elements
- Four directions
- Four seasons
- Solid foundation (like a table)

## When Stability Becomes Limitation

- **Four of Wands**: Healthy stability
- **Four of Cups**: Stuck in contemplation
- **Four of Swords**: Necessary pause
- **Four of Pentacles**: Holding too tight

Ask: Is this stability supporting me or constraining me?`,
        },
      },
    ],
  },
  {
    id: 'c3-l7',
    courseId: 'course-3',
    title: 'Fives - Challenge and Change',
    order: 7,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Fives - Challenge and Change

Fives represent **disruption** - breaking through the stability of Four.

## Five of Wands 🔥
**Competition & Conflict**
- Healthy competition
- Scattered energy
- Multiple opinions clashing
- Creative tension
- *Key: Channel the chaos*

## Five of Cups 💧
**Loss & Grief**
- Mourning what was lost
- Disappointment
- Focusing on the negative
- But hope remains
- *Key: See the cups still standing*

## Five of Swords ⚔️
**Defeat & Conflict**
- Hollow victory
- Win at any cost
- Conflict, betrayal
- Walking away
- *Key: Choose your battles*

## Five of Pentacles 🪙
**Hardship**
- Financial difficulty
- Feeling left out
- Material struggle
- Help is available
- *Key: Look for the light*

## Why Fives Are Challenging

After Four's stability, Five:
- Introduces necessary change
- Breaks old patterns
- Forces growth through difficulty
- Creates space for new

## Working With Fives

All Fives carry a hidden gift:
- **Wands**: Learn to work with others
- **Cups**: Appreciate what remains
- **Swords**: Know when to walk away
- **Pentacles**: Find community support

Fives are uncomfortable but essential for growth.`,
        },
      },
    ],
  },
  {
    id: 'c3-l8',
    courseId: 'course-3',
    title: 'Sixes - Harmony Restored',
    order: 8,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Sixes - Harmony Restored

Sixes represent **balance** - harmony after the disruption of Five.

## Six of Wands 🔥
**Victory & Recognition**
- Public recognition
- Success, achievement
- Leadership acknowledged
- Confidence, pride
- *Key: Accept the praise*

## Six of Cups 💧
**Nostalgia & Innocence**
- Happy memories
- Childhood, innocence
- Gifts given freely
- Past connections
- *Key: Honor your history*

## Six of Swords ⚔️
**Transition**
- Moving to calmer waters
- Leaving difficulty behind
- Gradual healing
- Journey to peace
- *Key: Better times ahead*

## Six of Pentacles 🪙
**Generosity**
- Giving and receiving
- Charity, balance
- Fair exchange
- Power dynamics
- *Key: Balance the scales*

## The Harmony of Six

Six brings:
- Resolution after conflict
- Balance between giving and receiving
- Recognition of efforts
- Movement toward peace

## Giving and Receiving

A key theme in all Sixes:
- **Wands**: Receiving recognition
- **Cups**: Giving innocence/receiving memories
- **Swords**: Receiving help for transition
- **Pentacles**: Balance of giving and receiving

Ask: What can I give? What am I ready to receive?`,
        },
      },
    ],
  },
  {
    id: 'c3-l9',
    courseId: 'course-3',
    title: 'Sevens - Reflection and Assessment',
    order: 9,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Sevens - Reflection and Assessment

Sevens represent **introspection** - pausing to evaluate before the final push.

## Seven of Wands 🔥
**Standing Your Ground**
- Defense, perseverance
- Maintaining position
- Challenge from others
- Holding your own
- *Key: Defend what you believe in*

## Seven of Cups 💧
**Fantasy & Choice**
- Many options, illusions
- Wishful thinking
- Imagination running wild
- Need to choose wisely
- *Key: Discern real from fantasy*

## Seven of Swords ⚔️
**Strategy & Stealth**
- Acting alone
- Cunning, strategy
- Getting away with something
- Partial victory
- *Key: Consider the consequences*

## Seven of Pentacles 🪙
**Patience & Evaluation**
- Assessing progress
- Long-term vision
- Waiting for harvest
- Investment review
- *Key: Trust the process*

## The Spiritual Number Seven

Seven is:
- Days of creation
- Chakras
- Musical notes
- A mystical number

At Seven, we reflect on our journey so far.

## Questions at Seven

- Where have I come from?
- What have I learned?
- Is this path still right?
- What needs adjustment?

Sevens invite pause before the intensity of Eight.`,
        },
      },
    ],
  },
  {
    id: 'c3-l10',
    courseId: 'course-3',
    title: 'Eights - Power and Movement',
    order: 10,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Eights - Power and Movement

Eights represent **mastery** - rapid movement and taking control.

## Eight of Wands 🔥
**Swift Action**
- Rapid movement
- Messages, travel
- Things happening fast
- Momentum, progress
- *Key: Act now, think later*

## Eight of Cups 💧
**Walking Away**
- Emotional departure
- Seeking deeper meaning
- Leaving behind what worked
- Spiritual journey
- *Key: Trust your need for more*

## Eight of Swords ⚔️
**Restriction**
- Feeling trapped
- Self-imposed limitations
- Fear blocking action
- Blindfolded to options
- *Key: The bonds are loose*

## Eight of Pentacles 🪙
**Skill & Dedication**
- Hard work, mastery
- Apprenticeship
- Attention to detail
- Craftsmanship
- *Key: Practice makes perfect*

## The Power of Eight

Eight is:
- Infinity on its side (∞)
- Balance of power
- Karmic number
- Material success

## Active vs Passive Eights

- **Wands**: Pure forward motion
- **Cups**: Choosing to move on
- **Swords**: Frozen by mental prison
- **Pentacles**: Active skill-building

The Eight of Swords reminds us that sometimes our restrictions are self-created.`,
        },
      },
    ],
  },
  {
    id: 'c3-l11',
    courseId: 'course-3',
    title: 'Nines - Near Completion',
    order: 11,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Nines - Near Completion

Nines represent **fulfillment** - the final stage before completion.

## Nine of Wands 🔥
**Resilience**
- Persistent despite wounds
- One more challenge
- Strength through adversity
- Defensive stance
- *Key: You've come too far to quit*

## Nine of Cups 💧
**Wish Fulfilled**
- Emotional satisfaction
- Contentment, joy
- Dreams coming true
- Gratitude
- *Key: Enjoy this moment*

## Nine of Swords ⚔️
**Anxiety & Nightmares**
- Worry, guilt, fear
- Sleepless nights
- Mental anguish
- Often worse than reality
- *Key: Face your fears*

## Nine of Pentacles 🪙
**Abundance**
- Material comfort
- Self-sufficiency
- Enjoying fruits of labor
- Independence
- *Key: Appreciate what you've built*

## The Completion Energy of Nine

Nine is:
- Three times three
- Wisdom number
- Achievement through experience
- Final integration

## The Spectrum of Nines

- **Cups & Pentacles**: Positive fulfillment
- **Wands**: Challenging but triumphant
- **Swords**: Mental culmination (often anxiety)

The Nine of Swords shows that our minds can create suffering even when things are nearly complete.`,
        },
      },
    ],
  },
  {
    id: 'c3-l12',
    courseId: 'course-3',
    title: 'Tens - Completion and Transition',
    order: 12,
    completed: false,
    content: [
      {
        type: 'text',
        data: {
          markdown: `# The Tens - Completion and Transition

Tens represent **culmination** - the end of a cycle and beginning of the next.

## Ten of Wands 🔥
**Burden**
- Heavy responsibilities
- Overcommitment
- Carrying too much
- Near the finish line
- *Key: Delegate or let go*

## Ten of Cups 💧
**Emotional Fulfillment**
- Family happiness
- Lasting joy
- Rainbow promise
- Harmonious home
- *Key: This is what it's all for*

## Ten of Swords ⚔️
**Rock Bottom**
- Complete ending
- Darkest hour
- Betrayal, defeat
- But: dawn approaches
- *Key: The only way is up*

## Ten of Pentacles 🪙
**Legacy**
- Generational wealth
- Family heritage
- Long-term security
- Tradition, roots
- *Key: Build for the future*

## Endings as Beginnings

All Tens contain seeds of new Aces:
- **Wands**: Burden releases new energy
- **Cups**: Fulfillment creates new desires
- **Swords**: Rock bottom births new clarity
- **Pentacles**: Legacy inspires new growth

## Reading Tens

When a Ten appears:
1. Acknowledge completion
2. Release what's ending
3. Look for new beginnings
4. Honor the journey

## Course Summary

You've learned all 40 number cards!

Remember:
- Numbers provide the "what"
- Suits provide the "how"
- Context provides the "why"

Practice combining these elements in your readings.`,
        },
      },
    ],
  },
];

export const COURSE_3: Course = {
  id: 'course-3',
  title: 'Minor Arcana - Number Cards',
  description:
    'Learn the 40 numbered cards (Ace through Ten) across all four suits. Understand how numerology and elements combine.',
  stage: 'beginner',
  order: 3,
  lessons: course3Lessons,
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
