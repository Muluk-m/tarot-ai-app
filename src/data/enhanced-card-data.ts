/**
 * Enhanced Card Data for Learning System
 * Additional educational content beyond basic card definitions
 */

import type { EnhancedCardData } from '@/types/learning.types';

/**
 * Enhanced data indexed by card ID
 * This supplements the base TarotCard data with rich learning content
 *
 * NOTE: This is a sample implementation for key cards.
 * Full implementation would cover all 78 cards.
 */

export const ENHANCED_CARD_DATA: Record<string, EnhancedCardData> = {
  // ==========================================================================
  // MAJOR ARCANA - Sample Cards
  // ==========================================================================

  '0': {
    // The Fool
    reversedKeywords: ['recklessness', 'carelessness', 'risk-taking', 'chaos', 'poor judgment'],
    reversedMeaning:
      'Reversed, The Fool warns against reckless behavior and poor judgment. You may be taking unnecessary risks or ignoring important details. Take time to plan before leaping.',

    symbolism: {
      mainSymbols: [
        'White Dog - Loyalty and protection',
        'White Rose - Purity and innocence',
        'Cliff Edge - Risk and the unknown',
        'Sun - Optimism and clarity',
        'Mountains - Spiritual journey ahead',
        'Small Bag - Light travels, minimal attachments',
      ],
      colors: ['White - Purity', 'Yellow/Gold - Optimism', 'Blue Sky - Unlimited potential'],
      patterns: [
        'Looking upward, not at the path - Faith over planning',
        'One foot lifted - Ready to step into the unknown',
        'Carefree posture - Trust in the universe',
      ],
    },

    lifeApplications: {
      career:
        'Time for a fresh start. Consider a new job, career change, or entrepreneurial venture. Trust your instincts and be willing to take calculated risks.',
      love:
        'New beginnings in romance. Single: Be open to unexpected connections. Relationship: Inject spontaneity and adventure. Approach with innocence and openness.',
      health:
        'Try new wellness practices. Listen to your body and be willing to experiment with different approaches to health. Trust your intuition about what feels right.',
      finance:
        'New financial opportunities may appear. Be optimistic but not reckless. Good time to learn about new investment strategies, but do your research first.',
      spiritual:
        "Beginning of a spiritual journey. Trust the universe's plan. Let go of rigid expectations and embrace faith. Practice mindfulness and present-moment awareness.",
    },

    actionSuggestions: [
      'Take a calculated risk on something new',
      'Let go of fear and trust the process',
      'Embrace beginner\'s mind in a situation',
      'Say yes to an unexpected opportunity',
      'Travel or explore new places',
      'Start a project without overthinking',
    ],

    meditationPrompts: [
      'What would I do if I had no fear?',
      'Where in my life am I ready for a fresh start?',
      'How can I embrace more spontaneity?',
      'What attachments am I ready to release?',
      'Where does my inner child want to explore?',
    ],

    commonCombinations: [
      'fool-magician', // The Fool + Magician = Manifesting new beginnings
      'fool-world', // Full cycle completion
      'fool-tower', // Sudden unexpected change
    ],
  },

  '1': {
    // The Magician
    reversedKeywords: [
      'manipulation',
      'trickery',
      'untapped potential',
      'self-doubt',
      'lack of focus',
    ],
    reversedMeaning:
      'Reversed, The Magician suggests manipulation or misuse of power. You may doubt your abilities or fail to use available resources. Beware of deception from others or self-sabotage.',

    symbolism: {
      mainSymbols: [
        'Four Elements on Table - Mastery of Wands, Cups, Swords, Pentacles',
        'Infinity Symbol Above Head - Unlimited potential',
        'Wand Raised Upward - Channeling divine energy',
        'Wand Pointing Down - Manifesting in material world',
        'White Robe - Purity of intention',
        'Red Cloak - Worldly action',
        'Roses and Lilies - Passion and pure thoughts',
      ],
      colors: [
        'White - Pure intention',
        'Red - Action and passion',
        'Yellow - Consciousness and clarity',
      ],
      patterns: [
        '"As above, so below" pose - Connection between spiritual and physical',
        'Four suits present - Master of all elements',
        'Infinity symbol - Infinite potential and power',
      ],
    },

    lifeApplications: {
      career:
        'You have all the skills needed for success. Time to act decisively. Use your talents and resources strategically. Excellent time for presentations, pitches, or launching projects.',
      love:
        'Take initiative in romance. Use your charm and communication skills. Create the relationship you desire through clear intention and authentic action.',
      health:
        'You have power over your health outcomes. Use all available tools: diet, exercise, mindfulness, medical help. Mind-body connection is especially strong now.',
      finance:
        'Manifest abundance through focused action. Use your skills to create income. Good time for financial planning and using resources wisely. Multiple income streams possible.',
      spiritual:
        'Powerful time for manifestation. Your thoughts create reality. Practice visualization, affirmations, and ritual work. Connect heaven and earth through intention.',
    },

    actionSuggestions: [
      'Take decisive action on your goals',
      'Use all available resources and tools',
      'Practice manifestation techniques',
      'Clearly communicate your intentions',
      'Develop a new skill or talent',
      'Channel your energy with focus',
    ],

    meditationPrompts: [
      'What resources do I already possess?',
      'How can I use my power more effectively?',
      'What do I want to manifest in my life?',
      'Where can I communicate more clearly?',
      'How can I align my thoughts with my actions?',
    ],

    commonCombinations: [
      'magician-fool', // Manifestation of new beginnings
      'magician-high-priestess', // Balance of conscious action and intuition
      'magician-pentacles', // Material manifestation
    ],
  },

  // ==========================================================================
  // MINOR ARCANA - Sample Cards
  // ==========================================================================

  '36': {
    // Ace of Cups
    reversedKeywords: [
      'emotional loss',
      'blocked creativity',
      'emptiness',
      'repressed emotions',
      'sadness',
    ],
    reversedMeaning:
      'Reversed, Ace of Cups indicates emotional blockages or difficulty expressing feelings. You may feel empty or disconnected from your emotions. Time to process and release what you\'ve been holding back.',

    symbolism: {
      mainSymbols: [
        'Overflowing Cup - Abundance of emotions',
        'Five Streams - Five senses filled with emotion',
        'Hand from Cloud - Divine gift',
        'Lotus Blossoms - Spiritual awakening',
        'Dove and Wafer - Holy spirit and spiritual nourishment',
        'Calm Waters - Emotional peace',
      ],
      colors: [
        'White - Purity of emotion',
        'Blue/Turquoise - Emotional depth',
        'Gold - Divine blessing',
      ],
      patterns: [
        'Overflowing abundance - More than enough love',
        'Downward-facing dove - Spiritual blessing descending',
        'Still water below - Emotional tranquility',
      ],
    },

    lifeApplications: {
      career:
        'New creative opportunities emerge. Follow your passion. Work that fulfills you emotionally is within reach. Time to pursue heart-centered career paths.',
      love:
        'New love beginning or renewed passion in existing relationship. Open your heart. Deep emotional connection possible. Single: Stay receptive to new love.',
      health:
        'Emotional healing begins. Address emotional roots of physical symptoms. Practices that nourish the soul: therapy, journaling, creative expression.',
      finance:
        'Generosity and abundance. Good time for charitable giving. Money flows when you follow your passion. Trust in universal provision.',
      spiritual:
        'Spiritual awakening or deepening. Your heart opens to divine love. Practice loving-kindness meditation. Connect with your emotional and intuitive side.',
    },

    actionSuggestions: [
      'Open your heart to new experiences',
      'Express your feelings honestly',
      'Start a creative project',
      'Practice self-love and compassion',
      'Connect deeply with someone',
      'Trust your intuition',
    ],

    meditationPrompts: [
      'What makes my heart overflow with joy?',
      'How can I express love more freely?',
      'Where am I ready to open emotionally?',
      'What creative inspiration is calling me?',
      'How can I nurture my emotional wellbeing?',
    ],

    commonCombinations: [
      'ace-cups-two-cups', // New love leading to partnership
      'ace-cups-lovers', // Deep soul connection
      'ace-cups-star', // Emotional healing and hope
    ],
  },

  '37': {
    // Two of Cups
    reversedKeywords: [
      'breakup',
      'disharmony',
      'imbalance',
      'tension',
      'lack of communication',
      'one-sided',
    ],
    reversedMeaning:
      'Reversed, Two of Cups warns of relationship imbalance or disharmony. Communication may have broken down. One person may be more invested. Time to address issues honestly or consider if the relationship serves both parties.',

    symbolism: {
      mainSymbols: [
        'Two Figures - Partnership and equality',
        'Two Cups - Emotional exchange',
        "Caduceus of Hermes - Communication and healing",
        "Lion's Head - Passion and courage",
        'Wings - Spiritual elevation through love',
        'Equal Eye Level - Mutual respect',
      ],
      colors: [
        'Red and White - Passion and purity',
        'Blue Sky - Clarity in relationship',
        'Green Wreath - Growth and vitality',
      ],
      patterns: [
        'Mirror positioning - Equality and balance',
        'Exchange of cups - Giving and receiving equally',
        'Caduceus above - Higher purpose in union',
      ],
    },

    lifeApplications: {
      career:
        'Successful partnerships and collaborations. Find the right business partner or colleague. Teamwork leads to success. Mutual respect in professional relationships.',
      love:
        'Beautiful partnership based on equality. Mutual attraction and respect. Perfect card for new relationships or renewed commitment. Both partners equally invested.',
      health:
        'Partnership in healing. Work with healthcare providers as team. Couples may support each other\'s health goals. Balance give-and-take in relationships.',
      finance:
        'Financial partnership succeeds. Joint investments or shared resources work well. Fair exchange of value. Good time for business partnerships with financial component.',
      spiritual:
        'Sacred union and spiritual partnership. Twin flame or soulmate connection possible. Balance of masculine and feminine energies. Love as spiritual practice.',
    },

    actionSuggestions: [
      'Strengthen your important relationships',
      'Communicate openly and honestly',
      'Seek balanced give-and-take',
      'Celebrate your partnerships',
      'Form a new collaboration',
      'Practice reciprocity',
    ],

    meditationPrompts: [
      'Where do I experience true partnership?',
      'How can I show up more fully in relationships?',
      'What do I value most in my connections?',
      'Am I giving and receiving equally?',
      'Who mirrors my best self back to me?',
    ],

    commonCombinations: [
      'two-cups-lovers', // Deep romantic commitment
      'two-cups-ten-cups', // Partnership leading to lasting happiness
      'two-cups-three-cups', // Friendship becoming romance or celebration of partnership
    ],
  },

  // ==========================================================================
  // WANDS - Sample Card
  // ==========================================================================

  '22': {
    // Ace of Wands
    reversedKeywords: [
      'delays',
      'lack of direction',
      'false starts',
      'missed opportunities',
      'lack of passion',
    ],
    reversedMeaning:
      'Reversed, Ace of Wands suggests delays in projects or lack of clear direction. Your spark may have dimmed. Time to rediscover your passion and clarify your intentions before moving forward.',

    symbolism: {
      mainSymbols: [
        'Living Wand with Leaves - Growth and vitality',
        'Hand from Cloud - Divine inspiration',
        'Castle in Distance - Goal or destination',
        'River - Flow of creative energy',
        'Mountains - Challenges to overcome',
        'Eight Falling Leaves - Yods of divine energy',
      ],
      colors: [
        'Green - Growth and new life',
        'Brown - Grounding and earthiness',
        'Blue - Clarity of vision',
      ],
      patterns: [
        'Sprouting leaves - Rapid growth potential',
        'Firm grasp - Taking hold of opportunity',
        'Landscape in distance - Journey ahead',
      ],
    },

    lifeApplications: {
      career:
        'Exciting new career opportunity. Time to pursue your passion project. Entrepreneurial ventures favored. Your creative ideas have real potential. Take initiative.',
      love:
        'Passionate new attraction or renewed spark in relationship. Sexual chemistry. Exciting new phase of romance. Follow your enthusiasm.',
      health:
        'Burst of vital energy. Good time to start new fitness routine. Your life force is strong. Channel energy into physical activity. Passion energizes you.',
      finance:
        'New income opportunity. Your ideas have earning potential. Good time to start business or side hustle. Invest in ventures you\'re passionate about.',
      spiritual:
        'Spiritual calling or awakening. New creative or spiritual practice. Your life purpose becomes clearer. Act on divine inspiration.',
    },

    actionSuggestions: [
      'Start that passion project now',
      'Act on your creative inspiration',
      'Take bold initiative',
      'Follow your enthusiasm',
      'Channel your energy productively',
      'Say yes to the adventure',
    ],

    meditationPrompts: [
      'What am I truly passionate about?',
      'What creative idea excites me most?',
      'Where do I feel called to take action?',
      'What gives me energy and vitality?',
      'What new beginning am I ready to initiate?',
    ],

    commonCombinations: [
      'ace-wands-three-wands', // Vision becoming reality
      'ace-wands-eight-wands', // Rapid action and movement
      'ace-wands-fool', // Passionate new beginning',
    ],
  },

  // NOTE: Complete implementation would include all 78 cards
  // This sample demonstrates the structure and depth of content needed
};

/**
 * Get enhanced data for a specific card
 */
export const getEnhancedCardData = (cardId: string): EnhancedCardData | undefined => {
  return ENHANCED_CARD_DATA[cardId];
};

/**
 * Check if enhanced data exists for a card
 */
export const hasEnhancedData = (cardId: string): boolean => {
  return cardId in ENHANCED_CARD_DATA;
};
