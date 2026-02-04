/**
 * Enhanced Card Data for Learning System
 * Additional educational content beyond basic card definitions
 */

import type { EnhancedCardData } from '@/types/learning.types';

/**
 * Enhanced data indexed by card ID
 * This supplements the base TarotCard data with rich learning content
 *
 * All 78 cards are included:
 * - Major Arcana (0-21): 22 cards
 * - Wands (22-35): 14 cards
 * - Cups (36-49): 14 cards
 * - Swords (50-63): 14 cards
 * - Pentacles (64-77): 14 cards
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
      love: 'New beginnings in romance. Single: Be open to unexpected connections. Relationship: Inject spontaneity and adventure. Approach with innocence and openness.',
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
      "Embrace beginner's mind in a situation",
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
      love: 'Take initiative in romance. Use your charm and communication skills. Create the relationship you desire through clear intention and authentic action.',
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

  '2': {
    // The High Priestess
    reversedKeywords: [
      'secrets',
      'disconnected from intuition',
      'repressed feelings',
      'hidden agendas',
      'surface knowledge',
    ],
    reversedMeaning:
      'Reversed, The High Priestess suggests you are ignoring your intuition or keeping secrets that burden you. Surface-level thinking prevents deeper understanding. Trust your inner voice more.',

    symbolism: {
      mainSymbols: [
        'Veil Between Pillars - Gateway to hidden knowledge',
        'B and J Pillars - Boaz and Jachin, duality and balance',
        'Crescent Moon at Feet - Intuition and subconscious',
        'Torah Scroll - Hidden sacred knowledge',
        'Pomegranates - Fertility and the underworld',
        'Blue Robe - Wisdom and spiritual depth',
      ],
      colors: [
        'Blue - Intuition and wisdom',
        'Black/White Pillars - Duality and balance',
        'Silver - Lunar feminine energy',
      ],
      patterns: [
        'Seated stillness - Receptive contemplation',
        'Partially hidden scroll - Knowledge revealed in time',
        'Equal spacing between pillars - Balance of opposites',
      ],
    },

    lifeApplications: {
      career:
        'Trust your gut feelings about workplace situations. Hidden information may come to light. Good time for research and study rather than action.',
      love: 'Look beneath the surface in relationships. Trust your intuition about partners. Mysteries may be revealed. Honor your need for emotional depth.',
      health:
        "Listen to your body's subtle signals. Consider holistic or intuitive healing approaches. Explore the emotional roots of physical symptoms.",
      finance:
        'Hidden financial information may surface. Trust instincts about investments. Not a time for impulsive spending. Research thoroughly.',
      spiritual:
        'Deep intuitive development. Meditation and dream work are powerful now. Access to hidden knowledge. Honor the mysteries.',
    },

    actionSuggestions: [
      'Meditate and listen to your inner voice',
      'Keep a dream journal',
      'Trust your first instinct',
      'Explore esoteric or spiritual studies',
      'Spend time in quiet contemplation',
      'Look beyond surface appearances',
    ],

    meditationPrompts: [
      'What is my intuition trying to tell me?',
      'What hidden knowledge am I ready to receive?',
      'How can I create more stillness in my life?',
      'What mysteries am I being called to explore?',
      'Where do I need to trust myself more?',
    ],

    commonCombinations: [
      'high-priestess-moon', // Deep intuition and subconscious
      'high-priestess-magician', // Balance of intuition and action
      'high-priestess-hermit', // Spiritual wisdom and solitude
    ],
  },

  '3': {
    // The Empress
    reversedKeywords: ['creative block', 'dependence', 'smothering', 'neglect', 'infertility'],
    reversedMeaning:
      'Reversed, The Empress indicates creative blocks or neglecting self-care. You may be smothering others or feeling smothered. Reconnect with nature and nurture yourself.',

    symbolism: {
      mainSymbols: [
        'Crown of 12 Stars - Zodiac and cosmic authority',
        'Lush Garden - Fertility and abundance',
        'Pomegranates on Dress - Fertility symbol',
        'Venus Symbol - Love and beauty',
        'Flowing Water - Emotions and life force',
        'Wheat - Abundance and harvest',
      ],
      colors: [
        'Green - Growth and nature',
        'Yellow - Warmth and life',
        'Red Cushions - Passion and comfort',
      ],
      patterns: [
        'Relaxed posture - Ease and receptivity',
        'Surrounded by nature - Connection to earth',
        'Abundance everywhere - Natural prosperity',
      ],
    },

    lifeApplications: {
      career:
        'Creative projects flourish. Nurturing leadership style succeeds. Good time for business growth. Beauty-related ventures favored.',
      love: 'Deep nurturing love. Fertility and pregnancy possible. Relationships bloom. Sensual pleasure and romance heightened.',
      health:
        "Focus on nurturing your body. Excellent time for spa treatments, good food, rest. Fertility and women's health supported.",
      finance:
        'Abundance flows naturally. Investments grow. Good time for luxury purchases if affordable. Trust in natural prosperity.',
      spiritual:
        'Connect with nature spirits and earth energy. Honor the divine feminine. Practice gratitude for abundance.',
    },

    actionSuggestions: [
      'Spend time in nature',
      'Nurture a creative project',
      'Practice self-care and pampering',
      'Cultivate beauty in your environment',
      'Express love generously',
      'Trust in natural abundance',
    ],

    meditationPrompts: [
      'How can I nurture myself better?',
      'What creative project wants to be born?',
      'Where is abundance already present in my life?',
      'How can I connect more deeply with nature?',
      'What does my feminine wisdom know?',
    ],

    commonCombinations: [
      'empress-emperor', // Balanced masculine and feminine
      'empress-star', // Natural healing and hope
      'empress-ten-pentacles', // Material and family abundance
    ],
  },

  '4': {
    // The Emperor
    reversedKeywords: ['tyranny', 'rigidity', 'domination', 'lack of discipline', 'immaturity'],
    reversedMeaning:
      'Reversed, The Emperor warns against excessive control or lack of structure. You may be too rigid or too chaotic. Find balance between authority and flexibility.',

    symbolism: {
      mainSymbols: [
        'Stone Throne - Solid foundation and permanence',
        'Ram Heads - Aries energy, leadership',
        'Armor - Protection and readiness',
        'Ankh Scepter - Life and authority',
        'Orb - Worldly power',
        'Barren Mountains - Stability over emotion',
      ],
      colors: [
        'Red - Power and action',
        'Orange/Red Sky - Passion and dominion',
        'Gray Stone - Stability and endurance',
      ],
      patterns: [
        'Forward-facing posture - Confronting challenges directly',
        'Armored but seated - Ready but not aggressive',
        'Mountain backdrop - Immovable resolve',
      ],
    },

    lifeApplications: {
      career:
        'Take charge and lead. Structure and organization bring success. Authority figures may help you. Good time for business building.',
      love: 'Provide stability in relationships. Balance protectiveness with warmth. Father figures may be significant. Commitment and structure.',
      health:
        'Disciplined approach to health works. Establish routines. Structure your fitness and diet. Take control of health decisions.',
      finance:
        'Financial discipline pays off. Build solid foundations. Long-term planning succeeds. Authority in financial matters.',
      spiritual:
        'Master your domain through discipline. Structure your spiritual practice. Balance power with wisdom.',
    },

    actionSuggestions: [
      'Create structure and systems',
      'Take a leadership role',
      'Set clear boundaries',
      'Make logical, strategic decisions',
      'Build something lasting',
      'Exercise healthy authority',
    ],

    meditationPrompts: [
      'Where do I need more structure?',
      'How can I lead with wisdom?',
      'What boundaries need to be set?',
      'Where am I avoiding responsibility?',
      'How do I balance authority with compassion?',
    ],

    commonCombinations: [
      'emperor-empress', // Balanced leadership
      'emperor-hierophant', // Traditional authority
      'emperor-justice', // Fair and structured leadership
    ],
  },

  '5': {
    // The Hierophant
    reversedKeywords: [
      'rebellion',
      'subversiveness',
      'new approaches',
      'breaking tradition',
      'personal beliefs',
    ],
    reversedMeaning:
      'Reversed, The Hierophant suggests questioning authority or traditional beliefs. You may need to find your own path rather than following established rules.',

    symbolism: {
      mainSymbols: [
        'Triple Crown - Mastery of three worlds',
        'Crossed Keys - Keys to heaven and earth',
        'Two Pillars - Duality within tradition',
        'Two Acolytes - Teaching and tradition',
        'Papal Blessing Hand - Benediction and teaching',
        'Red and White Robes - Passion and purity',
      ],
      colors: ['Red - Spiritual passion', 'White - Purity of teaching', 'Gold - Divine authority'],
      patterns: [
        'Formal seated position - Traditional authority',
        'Students at feet - Teacher-student relationship',
        'Religious symbols - Connection to established tradition',
      ],
    },

    lifeApplications: {
      career:
        'Follow established procedures. Seek mentorship. Traditional paths lead to success. Education and credentials valued.',
      love: 'Traditional relationships or marriage. Commitment ceremonies. Seek relationship counseling if needed. Honor traditions.',
      health:
        'Follow conventional medical advice. Established treatments work. Seek expert guidance. Traditional approaches effective.',
      finance:
        'Conservative financial strategies. Seek professional advice. Traditional investments. Follow established financial wisdom.',
      spiritual:
        'Explore established spiritual traditions. Find a teacher or guide. Study sacred texts. Honor religious or spiritual heritage.',
    },

    actionSuggestions: [
      'Seek a mentor or teacher',
      'Study traditional wisdom',
      'Follow established procedures',
      'Consider counseling or guidance',
      'Honor meaningful traditions',
      'Share your knowledge with others',
    ],

    meditationPrompts: [
      'What traditions serve me well?',
      'Who could mentor me on this path?',
      'What wisdom am I called to share?',
      'Where do I need expert guidance?',
      'How do I balance tradition with personal truth?',
    ],

    commonCombinations: [
      'hierophant-lovers', // Traditional marriage or commitment
      'hierophant-emperor', // Established authority
      'hierophant-hermit', // Spiritual teaching and seeking
    ],
  },

  '6': {
    // The Lovers
    reversedKeywords: ['disharmony', 'imbalance', 'misalignment', 'bad choices', 'indecision'],
    reversedMeaning:
      'Reversed, The Lovers indicates relationship disharmony or poor choices. You may be out of alignment with your values. Examine whether your decisions reflect your true self.',

    symbolism: {
      mainSymbols: [
        'Angel Raphael - Divine blessing and healing',
        'Adam and Eve - Archetypal masculine and feminine',
        'Tree of Knowledge - Choice and consequences',
        'Tree of Life - Spiritual connection',
        'Serpent - Temptation and wisdom',
        'Mountain - Phallic symbol, aspirations',
      ],
      colors: [
        'Blue Sky - Clarity and truth',
        'Green - Growth and harmony',
        'Yellow - Consciousness and joy',
      ],
      patterns: [
        'Triangle composition - Divine presence above',
        'Nakedness - Vulnerability and authenticity',
        'Sun above - Divine blessing on union',
      ],
    },

    lifeApplications: {
      career:
        'Choose work aligned with your values. Partnerships succeed when based on shared vision. Important career decisions ahead.',
      love: 'Deep romantic connection. Soulmate energy. Important relationship decisions. Choose from the heart. Harmony in partnerships.',
      health:
        'Mind-body harmony essential. Choices about lifestyle have lasting impact. Partner support in health matters.',
      finance:
        'Financial decisions should align with values. Joint finances require harmony. Ethical investing.',
      spiritual:
        'Union of opposites within self. Sacred partnership. Aligning actions with higher values. Divine love.',
    },

    actionSuggestions: [
      'Make a choice from the heart',
      'Align your actions with your values',
      'Deepen your intimate connections',
      'Integrate opposing aspects of yourself',
      'Commit to what you love',
      'Honor both head and heart',
    ],

    meditationPrompts: [
      'What choice am I facing right now?',
      'Are my actions aligned with my values?',
      'What does true partnership mean to me?',
      'How can I integrate my opposing sides?',
      'What am I ready to commit to?',
    ],

    commonCombinations: [
      'lovers-two-cups', // Deep romantic partnership
      'lovers-hierophant', // Marriage or commitment
      'lovers-devil', // Choice between love and temptation
    ],
  },

  '7': {
    // The Chariot
    reversedKeywords: ['lack of control', 'aggression', 'obstacles', 'scattered energy', 'defeat'],
    reversedMeaning:
      'Reversed, The Chariot suggests lack of direction or loss of control. Your willpower may be scattered. Opposing forces within you need integration before you can move forward.',

    symbolism: {
      mainSymbols: [
        'Two Sphinxes - Opposing forces controlled',
        'Armor and Stars - Protected and guided',
        'Canopy of Stars - Celestial guidance',
        'Chariot - Vehicle of will',
        'Wings on Shield - Spiritual aspiration',
        'City Behind - Triumph over civilization',
      ],
      colors: [
        'Black/White Sphinxes - Mastering duality',
        'Blue/Yellow - Emotion and intellect',
        'Starry Canopy - Cosmic alignment',
      ],
      patterns: [
        'No reins visible - Control through will alone',
        'Sphinxes facing different ways - Mastering opposing forces',
        'Moving forward - Progress through determination',
      ],
    },

    lifeApplications: {
      career:
        'Victory through determination. Overcome obstacles. Travel for work. Take control of career direction. Ambition succeeds.',
      love: 'Take charge in relationships. Overcome relationship obstacles. Travel together. Balance emotion with direction.',
      health:
        'Willpower drives health improvements. Overcome health challenges. Physical movement important. Discipline wins.',
      finance:
        'Financial goals achieved through determination. Overcome financial obstacles. Control spending through will.',
      spiritual:
        'Master your inner conflicts. Will and intention create reality. Spiritual discipline and direction.',
    },

    actionSuggestions: [
      'Set a clear direction and pursue it',
      'Overcome obstacles with determination',
      'Master your opposing impulses',
      'Take control of the situation',
      'Move forward with confidence',
      'Travel or expand your horizons',
    ],

    meditationPrompts: [
      'What obstacles am I determined to overcome?',
      'How can I better direct my energy?',
      'What opposing forces within me need mastering?',
      'Where am I being called to move forward?',
      'How can my will serve my highest good?',
    ],

    commonCombinations: [
      'chariot-strength', // Mastering inner and outer challenges
      'chariot-wheel', // Fate and determination combined
      'chariot-eight-wands', // Rapid progress and travel
    ],
  },

  '8': {
    // Strength
    reversedKeywords: ['self-doubt', 'weakness', 'insecurity', 'raw emotion', 'inner turmoil'],
    reversedMeaning:
      'Reversed, Strength indicates self-doubt or inability to manage strong emotions. You may feel weak or overwhelmed. Reconnect with your inner courage and compassionate power.',

    symbolism: {
      mainSymbols: [
        'Woman and Lion - Gentle mastery of primal nature',
        'Infinity Symbol - Infinite spiritual strength',
        'White Robe - Purity and innocence',
        'Flower Garland - Beauty taming beast',
        'Mountains - Stability and endurance',
        'Yellow Background - Optimism and vitality',
      ],
      colors: [
        'White - Purity and innocence',
        'Yellow - Joy and life force',
        'Red Lion - Primal passion',
      ],
      patterns: [
        'Gentle touch on lion - Power through gentleness',
        'Open lion mouth - Raw emotions expressed safely',
        'Infinity above head - Eternal strength',
      ],
    },

    lifeApplications: {
      career:
        'Lead with compassion. Handle difficult colleagues with grace. Persistence over force. Patient approach succeeds.',
      love: 'Gentle approach to relationship challenges. Tame your own strong emotions. Patient love endures. Compassion in conflict.',
      health:
        'Inner strength supports healing. Mind over matter. Gentle persistence in health goals. Courage in facing challenges.',
      finance:
        'Patient approach to finances. Courage in financial decisions. Inner strength over external circumstances.',
      spiritual:
        'Master your primal nature with love. Courage on spiritual path. Infinite inner strength available.',
    },

    actionSuggestions: [
      'Approach challenges with gentle strength',
      'Master strong emotions with compassion',
      'Be patient with yourself and others',
      'Find courage within',
      'Use soft power over force',
      'Persist through difficulties',
    ],

    meditationPrompts: [
      'What inner strength am I not recognizing?',
      'How can I approach this challenge with gentleness?',
      'What wild aspect of myself needs loving attention?',
      'Where can patience serve me better?',
      'How do I find courage when afraid?',
    ],

    commonCombinations: [
      'strength-chariot', // Inner and outer mastery
      'strength-hermit', // Quiet inner strength
      'strength-devil', // Overcoming temptation
    ],
  },

  '9': {
    // The Hermit
    reversedKeywords: ['isolation', 'loneliness', 'withdrawal', 'rejection of guidance', 'lost'],
    reversedMeaning:
      'Reversed, The Hermit warns against excessive isolation or refusing guidance. You may be lost or lonely. Balance solitude with connection. Seek wisdom from trusted sources.',

    symbolism: {
      mainSymbols: [
        'Lantern with Star - Light of wisdom',
        'Staff - Authority and support',
        'Gray Cloak - Invisibility and humility',
        'Mountain Peak - Spiritual achievement',
        'Snow - Purity and isolation',
        'Six-Pointed Star - Divine wisdom',
      ],
      colors: [
        'Gray - Neutrality and wisdom',
        'Yellow Light - Illumination',
        'White/Blue Background - Spiritual clarity',
      ],
      patterns: [
        'Alone on peak - Spiritual solitude',
        'Light held forward - Guiding others',
        'Looking down - Introspection and review',
      ],
    },

    lifeApplications: {
      career:
        'Time for reflection before action. Seek wise counsel. Solo work preferred. Mentorship role possible.',
      love: 'Need for space in relationship. Self-reflection about love. Solitude before partnership. Wisdom in relating.',
      health:
        'Quiet healing. Retreat and rest. Reflect on health patterns. Spiritual approaches to wellness.',
      finance:
        'Careful financial reflection. Seek expert guidance. Conservative approach. Wisdom over speed.',
      spiritual:
        'Deep spiritual seeking. Meditation and solitude. Inner teacher awakens. Wisdom gained through reflection.',
    },

    actionSuggestions: [
      'Take time for solitude and reflection',
      'Seek wisdom from within',
      'Find a mentor or become one',
      'Illuminate your path with inner light',
      'Step back from the crowd',
      'Trust your inner guidance',
    ],

    meditationPrompts: [
      'What wisdom am I seeking?',
      'How can solitude serve my growth?',
      'What truth am I illuminating?',
      'Who could guide me on this path?',
      'What have I learned from my journey?',
    ],

    commonCombinations: [
      'hermit-star', // Spiritual guidance and hope
      'hermit-high-priestess', // Deep inner wisdom
      'hermit-fool', // Wisdom guiding new beginnings
    ],
  },

  '10': {
    // Wheel of Fortune
    reversedKeywords: [
      'bad luck',
      'resistance to change',
      'breaking cycles',
      'setbacks',
      'external forces',
    ],
    reversedMeaning:
      'Reversed, the Wheel of Fortune indicates a downturn or resistance to necessary change. You may be experiencing bad luck or fighting against fate. Accept what cannot be controlled.',

    symbolism: {
      mainSymbols: [
        'Wheel - Cycles of fate',
        'Four Creatures - Fixed signs of zodiac',
        'Sphinx - Wisdom and fate',
        'Serpent - Descending fortune',
        'Anubis - Rising fortune',
        'Hebrew Letters - YHVH, divine name',
      ],
      colors: [
        'Blue - Wisdom and stability',
        'Orange/Yellow - Change and energy',
        'Gold - Divine order',
      ],
      patterns: [
        'Turning wheel - Constant change',
        'Creatures in clouds - Stability amid change',
        "Figures rising/falling - Fortune's cycle",
      ],
    },

    lifeApplications: {
      career:
        'Change coming to career. Lucky opportunities. Go with the flow. New cycles beginning. Destiny at work.',
      love: 'Relationship entering new phase. Fated meetings possible. Cycles in love. Accept relationship changes.',
      health:
        'Health changes, often positive. Cycles in wellness. Turning point in health journey. Karma and health.',
      finance:
        'Financial changes ahead. Luck in money matters. Cycles of prosperity. Accept financial flows.',
      spiritual:
        "Karmic cycles turning. Fate and destiny active. Accept life's rhythms. Trust divine timing.",
    },

    actionSuggestions: [
      'Accept what cannot be changed',
      'Ride the wave of change',
      'Trust in divine timing',
      'Take advantage of lucky breaks',
      'Understand cycles in your life',
      'Let go of resistance',
    ],

    meditationPrompts: [
      'What cycle is completing in my life?',
      'How can I flow with change?',
      'What patterns keep repeating?',
      'Where is fate guiding me?',
      'How do I relate to luck and fortune?',
    ],

    commonCombinations: [
      'wheel-justice', // Karma in action
      'wheel-tower', // Sudden destined change
      'wheel-world', // Completion of major cycle
    ],
  },

  '11': {
    // Justice
    reversedKeywords: ['unfairness', 'dishonesty', 'unaccountability', 'bias', 'legal troubles'],
    reversedMeaning:
      'Reversed, Justice warns of unfairness or avoiding accountability. Legal matters may not go well. You may be judging unfairly or being judged unfairly. Seek truth and balance.',

    symbolism: {
      mainSymbols: [
        'Scales - Balance and fairness',
        'Sword - Truth cuts through illusion',
        'Crown - Authority and wisdom',
        'Red Robe - Passion for justice',
        'Pillars - Structured judgment',
        'Purple Veil - Compassion behind justice',
      ],
      colors: [
        'Red - Passion and action',
        'Purple - Spiritual authority',
        'Yellow - Truth and clarity',
      ],
      patterns: [
        'Centered and balanced - Impartiality',
        'Sword pointing up - Truth above all',
        'Steady gaze - Unwavering justice',
      ],
    },

    lifeApplications: {
      career:
        'Fair treatment expected. Legal matters resolved. Contracts and agreements favored. Just outcomes in disputes.',
      love: 'Balance in relationships. Fair treatment of partners. Relationship decisions have consequences. Honest communication.',
      health:
        'Cause and effect in health. Lifestyle choices have consequences. Balance in health approach. Fair medical treatment.',
      finance:
        'Fair financial dealings. Legal matters resolved. Contracts honored. Karma in finances.',
      spiritual:
        'Karmic justice at work. Truth and integrity essential. Balance inner masculine and feminine. Cosmic fairness.',
    },

    actionSuggestions: [
      'Make fair and balanced decisions',
      'Seek the truth in all matters',
      'Accept consequences of your actions',
      'Stand up for what is right',
      'Balance competing needs',
      'Be honest and accountable',
    ],

    meditationPrompts: [
      'Am I being fair to all involved?',
      'What truth am I avoiding?',
      'Where do I need more balance?',
      'What consequences am I facing?',
      'How can I act with more integrity?',
    ],

    commonCombinations: [
      'justice-wheel', // Karmic balance
      'justice-hierophant', // Traditional law
      'justice-emperor', // Authority and fairness
    ],
  },

  '12': {
    // The Hanged Man
    reversedKeywords: [
      'stalling',
      'resistance',
      'indecision',
      'needless sacrifice',
      'fear of sacrifice',
    ],
    reversedMeaning:
      'Reversed, The Hanged Man suggests resistance to necessary surrender or stalling. You may be making needless sacrifices or avoiding required ones. Release resistance.',

    symbolism: {
      mainSymbols: [
        'Suspended Figure - Willing sacrifice',
        'Halo - Enlightenment through surrender',
        'Living Tree - Growth through stillness',
        'Crossed Leg - Number 4, stability',
        'Calm Expression - Peace in surrender',
        'Blue Clothing - Wisdom gained',
      ],
      colors: [
        'Blue - Wisdom and peace',
        'Red - Sacrifice and passion',
        'Yellow Halo - Enlightenment',
      ],
      patterns: [
        'Upside down - New perspective',
        'Hands behind back - Acceptance',
        'Serene face - Peace in waiting',
      ],
    },

    lifeApplications: {
      career:
        'Pause career action. Gain new perspective. Sacrifice may be needed. Wait before deciding. See from different angle.',
      love: 'Relationship pause beneficial. See partner differently. Sacrifice for love. Patience in matters of heart.',
      health:
        'Rest and healing time. See health from new angle. Surrender control. Patience with healing process.',
      finance:
        'Financial sacrifice may be needed. Wait before investing. New perspective on money. Let go of attachment.',
      spiritual:
        'Surrender to divine will. New spiritual perspective. Sacrifice ego. Patience on spiritual path.',
    },

    actionSuggestions: [
      'Pause and see things differently',
      'Make a willing sacrifice',
      'Surrender what no longer serves',
      'Practice patience and acceptance',
      'Let go of resistance',
      'Find peace in waiting',
    ],

    meditationPrompts: [
      'What new perspective is available to me?',
      'What am I willing to sacrifice?',
      'Where do I need to surrender control?',
      'How can waiting serve me?',
      'What do I see from this new angle?',
    ],

    commonCombinations: [
      'hanged-man-death', // Transformation through surrender
      'hanged-man-hermit', // Wisdom through waiting
      'hanged-man-star', // Hope after sacrifice
    ],
  },

  '13': {
    // Death
    reversedKeywords: [
      'resistance to change',
      'stagnation',
      'decay',
      'fear of change',
      'holding on',
    ],
    reversedMeaning:
      'Reversed, Death indicates resistance to necessary endings or stagnation. You may be holding onto what needs to die. Let go to allow rebirth.',

    symbolism: {
      mainSymbols: [
        'Skeleton Rider - Death as transformation',
        'White Horse - Purity of change',
        'Black Armor - Invincibility of death',
        'Fallen King - No one escapes change',
        'Rising Sun - New dawn after endings',
        'White Rose Banner - Beauty in endings',
      ],
      colors: [
        'Black - Endings and mystery',
        'White - Purity and rebirth',
        'Yellow Dawn - New beginnings',
      ],
      patterns: [
        'Moving forward - Change is inevitable',
        'Different reactions - Various responses to change',
        'Sun rising - New dawn after endings',
      ],
    },

    lifeApplications: {
      career:
        'Career transformation. End of one chapter. New beginnings require letting go. Major professional change.',
      love: 'Relationship transformation or ending. Let go of old patterns. Rebirth in love. Accept necessary endings.',
      health:
        'Old health habits die. Transformation in wellness. End unhealthy patterns. Rebirth of vitality.',
      finance:
        'Financial transformation. End of financial era. Let go of money attachments. New financial beginning.',
      spiritual:
        'Ego death and rebirth. Major spiritual transformation. Let go of old beliefs. Embrace new consciousness.',
    },

    actionSuggestions: [
      'Accept necessary endings',
      'Release what no longer serves',
      'Embrace transformation',
      'Clear out the old for new',
      'Trust the process of change',
      'Die to be reborn',
    ],

    meditationPrompts: [
      'What needs to end in my life?',
      'What am I holding onto too tightly?',
      'How can I embrace transformation?',
      'What is ready to be reborn?',
      'Where am I resisting natural change?',
    ],

    commonCombinations: [
      'death-tower', // Major sudden transformation
      'death-fool', // Ending leading to new beginning
      'death-sun', // Rebirth into joy
    ],
  },

  '14': {
    // Temperance
    reversedKeywords: ['imbalance', 'excess', 'lack of patience', 'discord', 'misalignment'],
    reversedMeaning:
      'Reversed, Temperance warns of imbalance or excess. You may lack patience or be misaligned with your purpose. Seek moderation and restore harmony.',

    symbolism: {
      mainSymbols: [
        'Angel - Divine messenger',
        'Two Cups - Balance and flow',
        'One Foot in Water - Emotions',
        'One Foot on Land - Material world',
        'Triangle on Chest - Spirit over matter',
        'Path to Mountains - Spiritual journey',
      ],
      colors: ['Blue/Red Wings - Balanced action', 'White Robe - Purity', 'Gold - Divine blessing'],
      patterns: [
        'Water flowing between cups - Continuous balance',
        'Feet in both elements - Balance of realms',
        'Sun/Crown in distance - Spiritual goal',
      ],
    },

    lifeApplications: {
      career:
        'Balance work demands. Patience in career growth. Blend skills harmoniously. Moderate approach succeeds.',
      love: 'Balance in relationship. Patience with partner. Harmonious connection. Moderate expectations.',
      health:
        'Balance all aspects of health. Moderation in diet and exercise. Integrate mind and body.',
      finance:
        'Financial balance and moderation. Patient investing. Mix of savings and spending. Harmonious money flow.',
      spiritual:
        'Balance spiritual and material. Patience on the path. Integrate opposites. Divine alignment.',
    },

    actionSuggestions: [
      'Seek balance in all things',
      'Practice patience',
      'Blend opposing forces',
      'Moderate your approach',
      'Find your middle path',
      'Harmonize competing needs',
    ],

    meditationPrompts: [
      'Where do I need more balance?',
      'How can I practice more patience?',
      'What opposing forces need integration?',
      'Where is moderation called for?',
      'How can I align with my higher purpose?',
    ],

    commonCombinations: [
      'temperance-justice', // Balance and fairness
      'temperance-star', // Harmonious healing
      'temperance-lovers', // Balanced relationships
    ],
  },

  '15': {
    // The Devil
    reversedKeywords: [
      'releasing bondage',
      'breaking free',
      'facing shadow',
      'reclaiming power',
      'detachment',
    ],
    reversedMeaning:
      'Reversed, The Devil indicates breaking free from bondage or facing your shadow. You are reclaiming power over addictions or toxic patterns. Liberation is possible.',

    symbolism: {
      mainSymbols: [
        'Baphomet Figure - Duality and earthly desires',
        'Chained Figures - Bondage by choice',
        'Loose Chains - Freedom is possible',
        'Inverted Pentagram - Spirit below matter',
        'Torch - Destructive passions',
        'Black Background - Shadow and unconscious',
      ],
      colors: [
        'Black - Shadow and hidden',
        'Brown - Earthly attachment',
        'Red - Passion and addiction',
      ],
      patterns: [
        'Loose chains - Bondage is self-imposed',
        'Torch pointing down - Misused energy',
        'Horns and tails on figures - Taking on shadow qualities',
      ],
    },

    lifeApplications: {
      career:
        'Watch for power games. Materialism may trap you. Are golden handcuffs holding you? Face career shadow.',
      love: 'Toxic relationship patterns. Codependency issues. Sexual obsession. Face relationship shadow.',
      health:
        'Addiction awareness. Unhealthy habits. Face what controls you. Shadow work for healing.',
      finance:
        'Materialism and greed. Money controls you. Face financial shadow. Release money obsession.',
      spiritual:
        'Shadow work essential. Face your demons. Release what binds you. Spiritual materialism.',
    },

    actionSuggestions: [
      'Examine what controls you',
      'Face your shadow self',
      'Break free from self-imposed limits',
      'Address addictive patterns',
      'Release toxic attachments',
      'Reclaim your power',
    ],

    meditationPrompts: [
      'What has power over me?',
      'What shadow aspect needs acknowledgment?',
      'How are my chains self-imposed?',
      'Where am I choosing bondage?',
      'What would freedom look like?',
    ],

    commonCombinations: [
      'devil-lovers', // Choice between love and bondage
      'devil-tower', // Breaking free suddenly
      'devil-strength', // Mastering temptation
    ],
  },

  '16': {
    // The Tower
    reversedKeywords: [
      'avoiding disaster',
      'delayed destruction',
      'fear of change',
      'resisting upheaval',
      'personal transformation',
    ],
    reversedMeaning:
      'Reversed, The Tower may indicate avoiding necessary destruction or delaying inevitable change. You may fear upheaval. Sometimes the collapse must happen.',

    symbolism: {
      mainSymbols: [
        'Lightning Strike - Sudden illumination',
        'Falling Figures - Forced ejection from comfort',
        'Crown Falling - Ego destruction',
        'Burning Tower - Structures crumbling',
        'Rocky Foundation - Built on unstable ground',
        'Flames from Windows - Fire of transformation',
      ],
      colors: [
        'Black - Crisis and unknown',
        'Red/Orange Flames - Destruction and passion',
        'Yellow Lightning - Sudden revelation',
      ],
      patterns: [
        'Sudden lightning - Unexpected change',
        'Falling from height - Fall from pride',
        'Crown knocked off - Ego removed',
      ],
    },

    lifeApplications: {
      career:
        'Sudden career upheaval. Job loss possible. Destruction of professional identity. Rebuild on truth.',
      love: 'Relationship shakeup. Sudden breakup possible. Truth revealed. Rebuild authentic connection.',
      health:
        'Health crisis possible. Wake-up call about health. Dramatic health changes. Crisis as catalyst.',
      finance:
        'Financial upheaval. Sudden losses possible. Rebuild from ground up. Crisis reveals truth.',
      spiritual:
        'Ego death. Spiritual crisis and breakthrough. Old beliefs destroyed. Awakening through chaos.',
    },

    actionSuggestions: [
      'Accept necessary destruction',
      'Release attachment to structures',
      'Rebuild on authentic foundation',
      'See crisis as opportunity',
      'Let false things fall away',
      'Trust the breakthrough process',
    ],

    meditationPrompts: [
      'What needs to be destroyed?',
      'What false structures am I clinging to?',
      'How can crisis serve my growth?',
      'What truth is being revealed?',
      'What can I rebuild from the rubble?',
    ],

    commonCombinations: [
      'tower-death', // Complete transformation
      'tower-star', // Hope after destruction
      'tower-devil', // Breaking free from bondage
    ],
  },

  '17': {
    // The Star
    reversedKeywords: ['lack of faith', 'despair', 'disconnection', 'discouragement', 'insecurity'],
    reversedMeaning:
      'Reversed, The Star indicates lost hope or disconnection from inspiration. You may feel discouraged or faithless. Reconnect with what gives you hope.',

    symbolism: {
      mainSymbols: [
        'Large Central Star - Hope and guidance',
        'Seven Smaller Stars - Chakras or planets',
        'Naked Figure - Vulnerable authenticity',
        'Two Jugs of Water - Conscious and subconscious',
        'One Foot in Water - Intuition',
        'One Foot on Land - Grounding',
        'Bird in Tree - Soul and inspiration',
      ],
      colors: [
        'Blue - Peace and serenity',
        'Yellow Stars - Hope and guidance',
        'Green - Healing and growth',
      ],
      patterns: [
        'Water returning to source - Giving back',
        'Open posture - Receptive to blessings',
        'Stars above - Cosmic guidance',
      ],
    },

    lifeApplications: {
      career:
        'Career hope and inspiration. Follow your star. Healing after work difficulties. Authentic self-expression.',
      love: 'Renewed hope in love. Healing after heartbreak. Authentic connection. Inspiration in relationship.',
      health:
        'Healing and recovery. Hope for health. Natural remedies. Mind-body-spirit connection.',
      finance:
        'Financial hope. Recovery after difficulty. Inspired abundance. Give and receive freely.',
      spiritual:
        'Spiritual hope and inspiration. Healing on all levels. Connect with cosmic guidance. Faith renewed.',
    },

    actionSuggestions: [
      'Reconnect with hope',
      'Follow your guiding star',
      'Allow healing to occur',
      'Express yourself authentically',
      'Trust in cosmic guidance',
      'Give and receive freely',
    ],

    meditationPrompts: [
      'What gives me hope?',
      'How can I allow deeper healing?',
      'What is my guiding star?',
      'Where can I express more authentically?',
      'How am I being cosmically guided?',
    ],

    commonCombinations: [
      'star-moon', // Intuition and hope
      'star-sun', // Complete healing and joy
      'star-tower', // Hope after destruction
    ],
  },

  '18': {
    // The Moon
    reversedKeywords: [
      'release of fear',
      'clarity emerging',
      'truth revealed',
      'overcoming anxiety',
      'working through illusion',
    ],
    reversedMeaning:
      'Reversed, The Moon indicates fears releasing or illusions clearing. Truth emerges from confusion. Anxiety decreases as clarity comes.',

    symbolism: {
      mainSymbols: [
        'Moon with Face - Subconscious and illusion',
        'Two Dogs/Wolf - Tame and wild nature',
        'Crayfish from Pool - Deep subconscious emerging',
        'Path into Distance - Journey through unknown',
        'Two Towers - Gateway to the unknown',
        'Drops Falling - Yods of divine energy',
      ],
      colors: [
        'Yellow/Gold - Light in darkness',
        'Blue - Intuition and emotion',
        'Gray - Uncertainty and shadow',
      ],
      patterns: [
        'Winding path - Non-linear journey',
        'Creatures along path - Inner animal nature',
        'Moon phases visible - Cycles of light and dark',
      ],
    },

    lifeApplications: {
      career:
        'Career confusion or deception. Trust intuition over facts. Hidden information. Navigate uncertainty.',
      love: 'Relationship illusions. Hidden feelings. Trust intuition about partner. Work through fears.',
      health:
        'Psychosomatic symptoms. Emotional roots of illness. Trust body wisdom. Work with dreams.',
      finance:
        'Financial deception possible. Hidden information. Trust instincts. Navigate uncertainty.',
      spiritual: 'Deep unconscious work. Dream wisdom. Face inner fears. Trust intuition on path.',
    },

    actionSuggestions: [
      'Trust your intuition',
      'Work with dreams',
      'Face your fears',
      'Navigate uncertainty patiently',
      'Look beneath the surface',
      'Honor your inner cycles',
    ],

    meditationPrompts: [
      'What fears need facing?',
      'What is my intuition telling me?',
      'What illusions am I holding?',
      'What messages come in dreams?',
      'How can I trust in uncertainty?',
    ],

    commonCombinations: [
      'moon-high-priestess', // Deep intuition
      'moon-star', // Intuition guiding hope
      'moon-sun', // Moving from confusion to clarity
    ],
  },

  '19': {
    // The Sun
    reversedKeywords: [
      'temporary setback',
      'inner child wounded',
      'lack of enthusiasm',
      'overly optimistic',
      'delayed success',
    ],
    reversedMeaning:
      'Reversed, The Sun indicates temporary setbacks in happiness or wounded inner child. You may be overly optimistic or struggling to find joy. The light still shines.',

    symbolism: {
      mainSymbols: [
        'Bright Sun - Consciousness and vitality',
        'Child on Horse - Innocence and joy',
        'White Horse - Purity and strength',
        'Sunflowers - Turning toward light',
        'Red Banner - Vitality and life force',
        'Wall - Boundary between known and unknown',
      ],
      colors: ['Yellow - Joy and optimism', 'Orange - Vitality and enthusiasm', 'Red - Life force'],
      patterns: [
        'Open arms - Embracing life',
        'Sun face - Conscious awareness',
        'Child naked - Innocent authenticity',
      ],
    },

    lifeApplications: {
      career:
        'Career success and recognition. Joyful work. Creative expression. Vitality in professional life.',
      love: 'Joy in relationships. Playful romance. Authentic connection. Happy partnership.',
      health:
        'Vital health and energy. Recovery and wellness. Joy supports healing. Child-like vitality.',
      finance:
        'Financial success. Abundance and prosperity. Generous sharing. Sunny financial outlook.',
      spiritual:
        'Spiritual joy and enlightenment. Inner child healed. Radiant consciousness. Light of awareness.',
    },

    actionSuggestions: [
      'Embrace joy and optimism',
      'Express yourself authentically',
      'Celebrate your successes',
      'Connect with your inner child',
      'Share your light with others',
      'Enjoy life fully',
    ],

    meditationPrompts: [
      'What brings me pure joy?',
      'How can I express more authenticity?',
      'What does my inner child need?',
      'Where can I shine more brightly?',
      'How can I spread more light?',
    ],

    commonCombinations: [
      'sun-moon', // Clarity after confusion
      'sun-world', // Complete success
      'sun-star', // Radiant healing
    ],
  },

  '20': {
    // Judgement
    reversedKeywords: [
      'self-doubt',
      'refusing the call',
      'self-criticism',
      'ignoring lessons',
      'fear of change',
    ],
    reversedMeaning:
      'Reversed, Judgement suggests ignoring your calling or harsh self-criticism. You may refuse necessary evaluation or fear transformation. Answer the call.',

    symbolism: {
      mainSymbols: [
        'Angel Gabriel - Divine calling',
        'Trumpet - Wake-up call',
        'Rising Figures - Resurrection and renewal',
        'Coffins - Death of old self',
        'Mountains - Stability behind change',
        'Flag with Cross - Redemption',
      ],
      colors: ['Blue/Gray - Transition state', 'Red - Passion reborn', 'White - Purity of renewal'],
      patterns: [
        'Arms raised - Answering the call',
        'Rising from coffins - Rebirth',
        'Trumpet sound - Universal calling',
      ],
    },

    lifeApplications: {
      career:
        'Career calling becomes clear. Time for professional rebirth. Evaluation leads to promotion. Answer your calling.',
      love: 'Relationship renewal. Past loves reviewed. Forgiveness and second chances. Love reborn.',
      health:
        'Health turning point. Wake up to wellness. Second chance at health. Healing crisis and renewal.',
      finance:
        'Financial evaluation and renewal. Past financial decisions reviewed. Second chance with money.',
      spiritual:
        'Spiritual awakening. Answer divine calling. Soul purpose revealed. Karmic review and release.',
    },

    actionSuggestions: [
      'Answer your calling',
      'Evaluate your life honestly',
      'Forgive yourself and others',
      'Embrace rebirth and renewal',
      'Release the past',
      'Rise to your higher purpose',
    ],

    meditationPrompts: [
      'What is calling me forward?',
      'What past needs releasing?',
      'Who or what needs forgiveness?',
      'What is being reborn in me?',
      'How can I answer my higher calling?',
    ],

    commonCombinations: [
      'judgement-death', // Complete transformation
      'judgement-world', // Completion and new level
      'judgement-fool', // Rebirth into new journey
    ],
  },

  '21': {
    // The World
    reversedKeywords: [
      'incompletion',
      'lack of closure',
      'stagnation',
      'shortcuts',
      'unfulfilled potential',
    ],
    reversedMeaning:
      'Reversed, The World indicates incompletion or seeking shortcuts. You may lack closure or feel stagnant. Complete what you started before moving on.',

    symbolism: {
      mainSymbols: [
        'Dancing Figure - Joy of completion',
        'Laurel Wreath - Victory and achievement',
        'Two Wands - Balanced power',
        'Four Creatures - Mastery of elements',
        'Purple Scarf - Spiritual attainment',
        'Infinity Symbol Wreath - Endless cycle',
      ],
      colors: [
        'Purple - Spiritual achievement',
        'Green - Growth and vitality',
        'Blue - Cosmic consciousness',
      ],
      patterns: [
        'Dancing within wreath - Freedom in completion',
        'Four corners occupied - Totality achieved',
        'Oval shape - Cosmic egg, wholeness',
      ],
    },

    lifeApplications: {
      career:
        'Career completion and success. Goal achieved. Ready for next level. International opportunities.',
      love: 'Relationship completion. Wholeness in partnership. Full cycle in love. Ready for next chapter.',
      health:
        'Health goals achieved. Wholeness and integration. Complete wellness. Ready for new cycle.',
      finance:
        'Financial goals reached. Completion of financial cycle. Abundance achieved. Ready for new level.',
      spiritual:
        'Spiritual completion. Enlightenment or integration. Cycle complete. Ready for new journey.',
    },

    actionSuggestions: [
      'Celebrate your achievements',
      'Complete unfinished business',
      'Integrate all you have learned',
      'Prepare for the next cycle',
      'Share your accomplishments',
      'Embrace wholeness',
    ],

    meditationPrompts: [
      'What cycle is completing?',
      'What have I achieved?',
      'How have I grown through this journey?',
      'What integration is happening?',
      'What new beginning awaits?',
    ],

    commonCombinations: [
      'world-fool', // End becomes new beginning
      'world-wheel', // Cycles completing
      'world-judgement', // Mastery and calling
    ],
  },

  // ==========================================================================
  // MINOR ARCANA - WANDS (22-35)
  // ==========================================================================

  // Note: '22' (Ace of Wands) is already defined below in the original samples

  '23': {
    // Two of Wands
    reversedKeywords: [
      'fear of unknown',
      'lack of planning',
      'playing it safe',
      'bad partnerships',
      'indecision',
    ],
    reversedMeaning:
      'Reversed, Two of Wands indicates fear of stepping into the unknown or poor planning. You may be playing it too safe or hesitating on important decisions.',

    symbolism: {
      mainSymbols: [
        'Figure Holding Globe - World in your hands',
        'Two Wands - Partnership and planning',
        'Looking Out to Sea - Future vision',
        'Castle Battlement - Secure foundation',
        'Red Robe - Passion for future',
        'Roses and Lilies - Passion and purity',
      ],
      colors: [
        'Red - Passion and action',
        'Brown - Earth and stability',
        'Blue Sea - Emotional journey ahead',
      ],
      patterns: [
        'One wand held, one mounted - Action and stability',
        'Gazing outward - Vision and planning',
        'Elevated position - Perspective and power',
      ],
    },

    lifeApplications: {
      career:
        'Planning future career moves. Partnerships forming. Expand your horizons. Vision for professional growth.',
      love: 'Planning relationship future. Potential partnership decisions. Long-distance possibilities. Vision for love.',
      health: 'Plan for long-term health. Vision for wellness journey. Consider new approaches.',
      finance:
        'Financial planning and vision. Investment decisions. Global opportunities. Partnership finances.',
      spiritual:
        'Expanding spiritual horizons. Planning spiritual journey. Global awareness. Partnership in growth.',
    },

    actionSuggestions: [
      'Plan your next big move',
      'Expand your horizons',
      'Consider partnerships carefully',
      'Step out of your comfort zone',
      'Create a vision for the future',
      'Balance planning with action',
    ],

    meditationPrompts: [
      'What does my future vision look like?',
      'Where am I ready to expand?',
      'What partnerships could help me grow?',
      'How can I step into the unknown?',
      'What world awaits me?',
    ],

    commonCombinations: ['two-wands-three-wands', 'two-wands-chariot', 'two-wands-fool'],
  },

  '24': {
    // Three of Wands
    reversedKeywords: ['delays', 'frustration', 'obstacles', 'lack of foresight', 'returning home'],
    reversedMeaning:
      'Reversed, Three of Wands suggests delays in plans or frustrated expansion. Your ships may not come in. Obstacles block progress or plans need revision.',

    symbolism: {
      mainSymbols: [
        'Figure Watching Ships - Waiting for returns',
        'Three Wands Planted - Enterprise established',
        'Ships at Sea - Ventures launched',
        'Yellow Cloak - Optimism and success',
        'Elevated Cliff - Perspective and vision',
        'Orange Sky - Energy and anticipation',
      ],
      colors: [
        'Yellow - Optimism and success',
        'Orange - Energy and passion',
        'Blue Sea - Emotional/business waters',
      ],
      patterns: [
        'Looking outward - Anticipation',
        'Wands firmly planted - Stable foundation',
        'Ships moving - Progress in motion',
      ],
    },

    lifeApplications: {
      career:
        'Career expansion succeeding. Waiting for results. International business. Leadership position.',
      love: 'Relationship expanding. Long-distance love. Waiting for love to develop. Future together.',
      health: 'Health improvements taking hold. Waiting for results. Expand wellness horizons.',
      finance:
        'Financial expansion. Investments bearing fruit. International opportunities. Waiting for returns.',
      spiritual:
        'Spiritual growth expanding. Teacher or leader role. Waiting for enlightenment. Global awareness.',
    },

    actionSuggestions: [
      'Have patience - results are coming',
      'Expand your enterprise',
      'Take a leadership role',
      'Look at the bigger picture',
      'Trust your initial vision',
      'Consider international opportunities',
    ],

    meditationPrompts: [
      'What am I waiting to see manifest?',
      'How can I expand my vision?',
      'What ventures have I launched?',
      'Where can I take more leadership?',
      'What is on the horizon?',
    ],

    commonCombinations: [
      'three-wands-eight-wands',
      'three-wands-world',
      'three-wands-ace-pentacles',
    ],
  },

  '25': {
    // Four of Wands
    reversedKeywords: [
      'instability',
      'lack of support',
      'transience',
      'home conflicts',
      'cancelled celebration',
    ],
    reversedMeaning:
      'Reversed, Four of Wands indicates home instability or lack of foundation. Celebrations may be delayed. You may feel unsupported or rootless.',

    symbolism: {
      mainSymbols: [
        'Four Wands with Garland - Celebration and stability',
        'Two Figures Celebrating - Joy and community',
        'Castle/Home Behind - Stable foundation',
        'Garland and Flowers - Beauty and celebration',
        'Yellow Sky - Joy and optimism',
        'Grapes - Abundance and harvest',
      ],
      colors: [
        'Yellow - Joy and celebration',
        'Green - Growth and vitality',
        'Red - Passion and life',
      ],
      patterns: [
        'Decorated structure - Preparation and effort rewarded',
        'Two people - Community and partnership',
        'Stable frame - Foundation achieved',
      ],
    },

    lifeApplications: {
      career: 'Work celebration. Office harmony. Team success. Stable work environment.',
      love: 'Relationship milestone. Engagement or wedding. Home together. Celebration of love.',
      health: 'Health milestone reached. Celebrate wellness wins. Stable health foundation.',
      finance: 'Financial celebration. Home purchase. Stable finances. Community support.',
      spiritual:
        'Spiritual community. Celebration of growth. Stable spiritual practice. Milestones reached.',
    },

    actionSuggestions: [
      'Celebrate your achievements',
      'Build a stable foundation',
      'Create a welcoming home',
      'Gather with community',
      'Mark important milestones',
      'Appreciate what you have built',
    ],

    meditationPrompts: [
      'What am I ready to celebrate?',
      'How can I strengthen my foundation?',
      'What milestones have I achieved?',
      'Where is my community?',
      'What makes a place feel like home?',
    ],

    commonCombinations: ['four-wands-ten-pentacles', 'four-wands-lovers', 'four-wands-three-cups'],
  },

  '26': {
    // Five of Wands
    reversedKeywords: [
      'avoiding conflict',
      'inner conflict',
      'tension releasing',
      'finding agreement',
      'competition ending',
    ],
    reversedMeaning:
      'Reversed, Five of Wands can indicate avoiding necessary conflict or inner turmoil. Alternatively, competition may be ending. Find constructive ways to handle conflict.',

    symbolism: {
      mainSymbols: [
        'Five Figures Fighting - Competition and conflict',
        'Crossed Wands - Opposing forces',
        'Different Colored Clothing - Diverse viewpoints',
        'No Visible Injuries - Mock battle or healthy competition',
        'Chaotic Scene - Confusion and struggle',
        'Blue Sky - Potential for clarity',
      ],
      colors: [
        'Multiple Colors - Diversity and difference',
        'Blue Background - Possibility of resolution',
        'Brown Earth - Grounded conflict',
      ],
      patterns: [
        'Wands crossing - Competing interests',
        'No order - Chaos and confusion',
        'All engaged - Everyone involved',
      ],
    },

    lifeApplications: {
      career: 'Workplace competition. Creative differences. Team conflicts. Healthy rivalry.',
      love: 'Relationship disagreements. Power struggles. Competition for attention. Working through conflict.',
      health:
        'Competing health advice. Internal conflict affecting health. Stress management needed.',
      finance: 'Financial competition. Bidding wars. Competing for resources. Budget conflicts.',
      spiritual: 'Spiritual debates. Competing beliefs. Inner conflict. Growth through challenge.',
    },

    actionSuggestions: [
      'Engage in healthy competition',
      'Express your viewpoint',
      'Work through disagreements',
      'Channel conflict constructively',
      'Stand your ground when needed',
      'Seek common ground',
    ],

    meditationPrompts: [
      'What conflicts am I avoiding?',
      'How can competition serve me?',
      'What inner battles need resolution?',
      'Where do I need to assert myself?',
      'How can I find harmony amid chaos?',
    ],

    commonCombinations: ['five-wands-six-wands', 'five-wands-justice', 'five-wands-strength'],
  },

  '27': {
    // Six of Wands
    reversedKeywords: [
      'private achievement',
      'fall from grace',
      'egotism',
      'lack of recognition',
      'self-doubt after success',
    ],
    reversedMeaning:
      'Reversed, Six of Wands indicates lack of recognition or private victories. You may be dealing with ego issues or fearing success. Celebrate yourself.',

    symbolism: {
      mainSymbols: [
        'Rider on Horse - Victory and leadership',
        'Laurel Wreath Crown - Success and honor',
        'Wreath on Wand - Triumph displayed',
        'Crowd Following - Public recognition',
        'Six Wands - Community celebration',
        'White Horse - Purity of victory',
      ],
      colors: [
        'Green - Growth and success',
        'Red - Passion and victory',
        'White Horse - Pure achievement',
      ],
      patterns: [
        'Elevated position - Above the crowd',
        'Forward movement - Continued progress',
        'Public display - Recognition and honor',
      ],
    },

    lifeApplications: {
      career: 'Career victory. Public recognition. Leadership acknowledged. Promotion or award.',
      love: 'Relationship triumph. Public acknowledgment of love. Pride in partnership. Success together.',
      health:
        'Health victory. Recognized for wellness achievements. Successful recovery. Triumph over illness.',
      finance: 'Financial success recognized. Investment victory. Public financial achievement.',
      spiritual:
        'Spiritual achievement. Recognition as teacher. Victory over ego. Community honor.',
    },

    actionSuggestions: [
      'Accept recognition graciously',
      'Lead with confidence',
      'Celebrate your victories',
      'Inspire others with your success',
      'Share the glory with supporters',
      'Keep moving forward after winning',
    ],

    meditationPrompts: [
      'What victories am I proud of?',
      'How do I handle success?',
      'Where do I deserve recognition?',
      'How can I lead others to victory?',
      'What does healthy pride look like?',
    ],

    commonCombinations: ['six-wands-sun', 'six-wands-world', 'six-wands-emperor'],
  },

  '28': {
    // Seven of Wands
    reversedKeywords: ['giving up', 'overwhelmed', 'exhaustion', 'yielding', 'compromising values'],
    reversedMeaning:
      'Reversed, Seven of Wands indicates feeling overwhelmed or giving up the fight. You may be exhausted from defending your position or compromising your values.',

    symbolism: {
      mainSymbols: [
        'Figure on Hill - Defensive advantage',
        'Six Wands Below - Opposition rising',
        'One Wand Held - Active defense',
        'Mismatched Shoes - Caught off guard',
        'Green Tunic - Growth under pressure',
        'Determined Expression - Will to persevere',
      ],
      colors: [
        'Green - Growth and persistence',
        'Brown - Earth and grounding',
        'Blue Sky - Clarity above conflict',
      ],
      patterns: [
        'Higher ground - Strategic advantage',
        'One against many - David vs Goliath',
        'Active stance - Ready for battle',
      ],
    },

    lifeApplications: {
      career:
        'Defending your position. Competition pressing. Standing firm. Protecting your territory.',
      love: 'Defending relationship. Outside pressures. Standing up for love. Protecting boundaries.',
      health: 'Fighting for health. Defending against illness. Persistent effort. Not giving up.',
      finance: 'Protecting assets. Financial defense. Standing firm on money matters. Competition.',
      spiritual:
        'Defending beliefs. Standing firm in faith. Spiritual challenges. Persistence on path.',
    },

    actionSuggestions: [
      'Stand your ground',
      'Defend your position',
      'Use your advantages',
      'Dont back down from challenges',
      'Know when to fight',
      'Protect what matters',
    ],

    meditationPrompts: [
      'What am I defending?',
      'Is this battle worth fighting?',
      'What is my strategic advantage?',
      'How can I persist without burnout?',
      'What do I refuse to compromise?',
    ],

    commonCombinations: ['seven-wands-strength', 'seven-wands-chariot', 'seven-wands-five-wands'],
  },

  '29': {
    // Eight of Wands
    reversedKeywords: [
      'delays',
      'frustration',
      'slow progress',
      'miscommunication',
      'cancelled plans',
    ],
    reversedMeaning:
      'Reversed, Eight of Wands indicates delays, miscommunication, or frustrated progress. Plans may be cancelled. Patience needed when things slow down.',

    symbolism: {
      mainSymbols: [
        'Eight Wands in Flight - Rapid movement',
        'Clear Sky - Unobstructed path',
        'River Below - Emotional flow',
        'Green Landscape - Growth in motion',
        'Diagonal Movement - Swift direction',
        'No Figures - Pure energy in motion',
      ],
      colors: [
        'Blue Sky - Clear communication',
        'Green - Growth and movement',
        'Brown Wands - Grounded action',
      ],
      patterns: [
        'Parallel flight - Coordinated movement',
        'Downward angle - Coming to completion',
        'Open space - No obstacles',
      ],
    },

    lifeApplications: {
      career: 'Rapid career progress. Quick developments. Travel for work. Swift communication.',
      love: 'Love moving fast. Quick connection. Travel romance. Rapid developments.',
      health: 'Quick recovery. Rapid health changes. Energy surge. Fast results.',
      finance: 'Money moving quickly. Fast transactions. Quick returns. Speedy financial progress.',
      spiritual: 'Rapid spiritual growth. Quick insights. Energy moving. Swift alignment.',
    },

    actionSuggestions: [
      'Act quickly on opportunities',
      'Communicate clearly and fast',
      'Strike while iron is hot',
      'Prepare for rapid change',
      'Travel or move forward',
      'Ride the wave of momentum',
    ],

    meditationPrompts: [
      'What is moving quickly in my life?',
      'Am I ready for rapid change?',
      'Where do I need to speed up?',
      'What message needs sending?',
      'How can I maintain direction amid speed?',
    ],

    commonCombinations: ['eight-wands-chariot', 'eight-wands-wheel', 'eight-wands-three-wands'],
  },

  '30': {
    // Nine of Wands
    reversedKeywords: ['paranoia', 'giving up', 'exhaustion', 'stubbornness', 'refusing help'],
    reversedMeaning:
      'Reversed, Nine of Wands indicates exhaustion or paranoia. You may be too stubborn to accept help or too tired to continue. Rest before the final push.',

    symbolism: {
      mainSymbols: [
        'Wounded Figure - Battle-worn but standing',
        'Eight Wands Behind - Defenses built',
        'One Wand Held - Still ready',
        'Bandaged Head - Previous wounds',
        'Watchful Stance - Vigilance',
        'Green Tunic - Life force persists',
      ],
      colors: [
        'Green - Perseverance and life',
        'Brown - Earth and endurance',
        'Yellow Background - Hope despite struggle',
      ],
      patterns: [
        'Defensive posture - Protective stance',
        'One in front of many - Final stand',
        'Looking back - Aware of past battles',
      ],
    },

    lifeApplications: {
      career: "Near the finish line. Final obstacles. Persistence required. Don't give up now.",
      love: 'Relationship endurance tested. Past hurts creating walls. Almost through difficulties.',
      health:
        "Health persistence needed. Near recovery. Final challenges. Don't give up on wellness.",
      finance: "Financial persistence. Near financial goal. Final push needed. Don't quit now.",
      spiritual: 'Spiritual endurance. Near breakthrough. Final tests. Persistence on path.',
    },

    actionSuggestions: [
      "Persist - you're almost there",
      'Guard your boundaries',
      "Rest but don't quit",
      'Learn from past challenges',
      'Prepare for one final effort',
      'Trust your resilience',
    ],

    meditationPrompts: [
      'What is my final obstacle?',
      'How can I rest without giving up?',
      'What past wounds still need healing?',
      'Where do I need to set boundaries?',
      'What gives me strength to continue?',
    ],

    commonCombinations: ['nine-wands-ten-wands', 'nine-wands-strength', 'nine-wands-four-swords'],
  },

  '31': {
    // Ten of Wands
    reversedKeywords: [
      'release',
      'delegating',
      'burnout averted',
      'lightening load',
      'refusing burdens',
    ],
    reversedMeaning:
      'Reversed, Ten of Wands indicates releasing burdens or refusing to take on too much. You may be learning to delegate or avoiding burnout. Let some things go.',

    symbolism: {
      mainSymbols: [
        'Figure Carrying Ten Wands - Overwhelming burden',
        'Bent Posture - Weight of responsibility',
        'Town Ahead - Goal in sight',
        'Cannot See Path - Blinded by burden',
        'Green Field - Life beneath struggle',
        'All Wands Carried - Taking on everything',
      ],
      colors: [
        'Brown - Heavy earth energy',
        'Green - Life struggling under burden',
        'Blue Sky - Relief possible',
      ],
      patterns: [
        'Moving toward goal - End in sight',
        "Obscured vision - Can't see clearly",
        'Hunched body - Physical and emotional weight',
      ],
    },

    lifeApplications: {
      career: 'Work overload. Too many responsibilities. Burnout risk. Delegate needed.',
      love: 'Relationship burdens heavy. Taking on too much for partner. Overwhelmed by love duties.',
      health: 'Health suffering from stress. Burden affecting wellness. Need to lighten load.',
      finance: 'Financial burdens heavy. Too many obligations. Debt weight. Need relief.',
      spiritual: "Spiritual burnout. Taking on others' karma. Overwhelmed by responsibility.",
    },

    actionSuggestions: [
      'Delegate some responsibilities',
      'Prioritize your burdens',
      'Let something go',
      'Ask for help',
      'Recognize your limits',
      'Keep the goal in sight',
    ],

    meditationPrompts: [
      'What burdens can I release?',
      'Why do I take on so much?',
      'Where can I delegate?',
      'What is truly my responsibility?',
      'How can I work smarter not harder?',
    ],

    commonCombinations: ['ten-wands-four-swords', 'ten-wands-nine-wands', 'ten-wands-strength'],
  },

  '32': {
    // Page of Wands
    reversedKeywords: [
      'lack of direction',
      'procrastination',
      'immaturity',
      'cancelled plans',
      'creative block',
    ],
    reversedMeaning:
      'Reversed, Page of Wands indicates lack of direction or creative blocks. Ideas may not develop or enthusiasm fades. Reignite your spark.',

    symbolism: {
      mainSymbols: [
        'Young Figure - Youthful energy',
        'Single Wand - New inspiration',
        'Desert Landscape - Potential yet to bloom',
        'Salamanders on Tunic - Fire energy',
        'Looking at Wand - Contemplating potential',
        'Feathered Cap - Ideas taking flight',
      ],
      colors: [
        'Yellow - Enthusiasm and optimism',
        'Red - Fire and passion',
        'Brown - Earth beneath fire',
      ],
      patterns: [
        'Stationary pose - Contemplation',
        'Wand held upright - New ideas',
        'Alert posture - Ready for adventure',
      ],
    },

    lifeApplications: {
      career:
        'New career ideas. Creative inspiration. Learning new skills. Youthful energy at work.',
      love: 'New romantic excitement. Fresh start in love. Playful connection. Adventure in romance.',
      health: 'New health interests. Enthusiasm for fitness. Fresh approaches to wellness.',
      finance: 'New financial ideas. Entrepreneurial spark. Learning about money. Fresh start.',
      spiritual:
        "New spiritual interests. Beginner's enthusiasm. Exploring paths. Creative spirituality.",
    },

    actionSuggestions: [
      'Explore a new interest',
      'Start a creative project',
      'Embrace your enthusiasm',
      'Take a risk on something new',
      'Learn something exciting',
      'Follow your curiosity',
    ],

    meditationPrompts: [
      'What new idea excites me?',
      'Where can I bring fresh energy?',
      'What adventure is calling?',
      'How can I nurture my creativity?',
      'What do I want to learn?',
    ],

    commonCombinations: ['page-wands-ace-wands', 'page-wands-fool', 'page-wands-three-wands'],
  },

  '33': {
    // Knight of Wands
    reversedKeywords: [
      'recklessness',
      'delays',
      'frustration',
      'scattered energy',
      'hasty decisions',
    ],
    reversedMeaning:
      'Reversed, Knight of Wands warns against recklessness or frustration from delays. Energy may be scattered. Channel passion more carefully.',

    symbolism: {
      mainSymbols: [
        'Knight on Rearing Horse - Action and adventure',
        'Salamanders on Armor - Fire transformed',
        'Desert Pyramids - Distant goals',
        'Yellow Plume - Confidence and optimism',
        'Raised Wand - Ready for action',
        'Red Horse - Passionate movement',
      ],
      colors: [
        'Red/Orange - Fire and passion',
        'Yellow - Confidence and optimism',
        'Brown - Grounded action',
      ],
      patterns: [
        'Rearing horse - Energy and movement',
        'Looking forward - Focus on goals',
        'Armor complete - Protected in action',
      ],
    },

    lifeApplications: {
      career:
        'Bold career moves. Action-oriented work. Travel for business. Entrepreneurial ventures.',
      love: 'Passionate romance. Adventurous love. Fast-moving relationship. Exciting partner.',
      health: 'Active fitness. Bold health changes. Adventure sports. Energetic approach.',
      finance:
        'Risk-taking with money. Fast financial moves. Bold investments. Adventurous finances.',
      spiritual: 'Bold spiritual seeking. Active spiritual practices. Adventure on path.',
    },

    actionSuggestions: [
      'Take bold action',
      'Pursue your passion',
      'Embrace adventure',
      'Channel your energy',
      'Move forward confidently',
      "Don't hold back",
    ],

    meditationPrompts: [
      'Where is my passion calling me?',
      'What adventure awaits?',
      'How can I channel my energy?',
      'What bold action am I avoiding?',
      'Where do I need more fire?',
    ],

    commonCombinations: ['knight-wands-chariot', 'knight-wands-eight-wands', 'knight-wands-fool'],
  },

  '34': {
    // Queen of Wands
    reversedKeywords: ['selfishness', 'jealousy', 'demanding', 'insecurity', 'intolerance'],
    reversedMeaning:
      'Reversed, Queen of Wands can indicate selfishness, jealousy, or demanding behavior. Confidence may have become arrogance. Find your inner warmth again.',

    symbolism: {
      mainSymbols: [
        'Queen on Throne - Confident leadership',
        'Black Cat - Intuition and independence',
        'Sunflowers - Warmth and joy',
        'Lions on Throne - Courage and passion',
        'Wand and Sunflower - Creative life force',
        'Yellow Robe - Optimism and warmth',
      ],
      colors: [
        'Yellow - Warmth and confidence',
        'Orange - Creative fire',
        'Black Cat - Mystery and intuition',
      ],
      patterns: [
        'Seated confidently - Comfortable with power',
        'Open posture - Welcoming and warm',
        'Cat at feet - Intuition grounded',
      ],
    },

    lifeApplications: {
      career:
        'Confident leadership. Creative direction. Warm management style. Passionate about work.',
      love: 'Confident in love. Warm and passionate partner. Independent yet loving. Attractive energy.',
      health:
        'Vital and energetic. Confident in health choices. Warm self-care. Independent wellness.',
      finance: 'Confident with money. Creative income. Generous yet smart. Independent finances.',
      spiritual:
        'Confident spiritual leader. Warm guidance. Independent path. Creative spirituality.',
    },

    actionSuggestions: [
      'Lead with warmth and confidence',
      'Trust your intuition',
      'Be independent yet connected',
      'Share your creative fire',
      'Inspire others with your passion',
      'Maintain your inner warmth',
    ],

    meditationPrompts: [
      'How can I lead with more warmth?',
      'Where is my confidence authentic?',
      'What does healthy independence look like?',
      'How can I share my fire?',
      'What is my intuition telling me?',
    ],

    commonCombinations: ['queen-wands-king-wands', 'queen-wands-empress', 'queen-wands-strength'],
  },

  '35': {
    // King of Wands
    reversedKeywords: [
      'tyranny',
      'ruthlessness',
      'impulsiveness',
      'overbearing',
      'unrealistic expectations',
    ],
    reversedMeaning:
      'Reversed, King of Wands warns against tyrannical or overbearing behavior. Leadership may have become ruthless. Temper fire with wisdom.',

    symbolism: {
      mainSymbols: [
        'King on Throne - Mastery of fire',
        'Salamanders and Lions - Fire transformed to wisdom',
        'Living Wand - Creative life force',
        'Red Robe - Passion and power',
        'Salamander Biting Tail - Infinite creative cycle',
        'Looking Forward - Visionary leadership',
      ],
      colors: [
        'Orange/Red - Fire and passion',
        'Yellow - Wisdom and optimism',
        'Green Salamander - Life force',
      ],
      patterns: [
        'Seated powerfully - Confident authority',
        'Wand prominent - Creative power',
        'Lions everywhere - Courage mastered',
      ],
    },

    lifeApplications: {
      career: 'Leadership mastery. Visionary business. Inspiring others. Creative direction.',
      love: 'Passionate mature love. Leadership in relationship. Inspiring partner. Protective love.',
      health: 'Mastery over vitality. Strong life force. Leadership in health community.',
      finance:
        'Financial leadership. Entrepreneurial success. Generous with wealth. Visionary investments.',
      spiritual: 'Spiritual leadership. Mastery of will. Inspiring teacher. Creative wisdom.',
    },

    actionSuggestions: [
      'Lead with vision and passion',
      'Inspire others through example',
      'Master your creative fire',
      'Be bold yet wise',
      'Take charge of the situation',
      'Share your vision',
    ],

    meditationPrompts: [
      'How can I lead more effectively?',
      'What is my vision for others?',
      'How do I balance passion and wisdom?',
      'Where am I called to inspire?',
      'What does mastery of fire mean to me?',
    ],

    commonCombinations: ['king-wands-emperor', 'king-wands-chariot', 'king-wands-sun'],
  },

  // ==========================================================================
  // MINOR ARCANA - CUPS (36-49)
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
      "Reversed, Ace of Cups indicates emotional blockages or difficulty expressing feelings. You may feel empty or disconnected from your emotions. Time to process and release what you've been holding back.",

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
      love: 'New love beginning or renewed passion in existing relationship. Open your heart. Deep emotional connection possible. Single: Stay receptive to new love.',
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
        'Caduceus of Hermes - Communication and healing',
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
      love: 'Beautiful partnership based on equality. Mutual attraction and respect. Perfect card for new relationships or renewed commitment. Both partners equally invested.',
      health:
        "Partnership in healing. Work with healthcare providers as team. Couples may support each other's health goals. Balance give-and-take in relationships.",
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

  '38': {
    // Three of Cups
    reversedKeywords: [
      'overindulgence',
      'gossip',
      'isolation',
      'third party in relationship',
      'cancelled celebration',
    ],
    reversedMeaning:
      'Reversed, Three of Cups warns of overindulgence or social problems. Watch for gossip or a third party affecting relationships. You may feel isolated or celebrations may be cancelled.',

    symbolism: {
      mainSymbols: [
        'Three Women Dancing - Celebration and friendship',
        'Raised Cups - Toast and abundance',
        'Fruits and Vegetables - Harvest and plenty',
        'Garland - Festivity and joy',
        'Circle Dance - Unity and connection',
        'Flowing Robes - Movement and joy',
      ],
      colors: [
        'Red/Orange/White - Different personalities united',
        'Green - Growth and abundance',
        'Blue Sky - Joy and clarity',
      ],
      patterns: [
        'Circle formation - Equality and unity',
        'Raised cups - Shared celebration',
        'Dance movement - Joy in motion',
      ],
    },

    lifeApplications: {
      career:
        'Team celebration. Work friendships. Collaborative success. Office party or milestone.',
      love: 'Friendship in love. Social aspects of relationship. Celebrating love with others.',
      health:
        'Social support for health. Celebration of wellness. Group fitness. Friends supporting recovery.',
      finance:
        'Shared financial success. Group investments. Celebrating financial wins with others.',
      spiritual: 'Spiritual community. Celebration of growth. Group rituals. Sacred friendship.',
    },

    actionSuggestions: [
      'Celebrate with friends',
      'Nurture your friendships',
      'Join a supportive community',
      'Share your joy with others',
      'Participate in group activities',
      'Express gratitude for your tribe',
    ],

    meditationPrompts: [
      'Who are my true friends?',
      'What am I ready to celebrate?',
      'How can I nurture my friendships?',
      'Where do I find community?',
      'What brings me collective joy?',
    ],

    commonCombinations: ['three-cups-four-wands', 'three-cups-sun', 'three-cups-two-cups'],
  },

  '39': {
    // Four of Cups
    reversedKeywords: [
      'awareness',
      'acceptance',
      'motivation renewed',
      'seizing opportunity',
      'gratitude',
    ],
    reversedMeaning:
      'Reversed, Four of Cups indicates awakening from apathy or finally seeing opportunities. You may be ready to accept what is offered or feel renewed motivation.',

    symbolism: {
      mainSymbols: [
        'Seated Figure - Contemplation and withdrawal',
        'Three Cups on Ground - What you have',
        'Fourth Cup Offered - New opportunity',
        'Cloud Hand - Divine gift',
        'Crossed Arms - Closed off attitude',
        'Tree - Growth and shade',
      ],
      colors: [
        'Green - Growth potential',
        'Blue - Emotional contemplation',
        'Brown - Earthly concerns',
      ],
      patterns: [
        'Looking down - Missing opportunities',
        'Cup extended - Help available',
        'Seated stillness - Contemplative withdrawal',
      ],
    },

    lifeApplications: {
      career:
        'Boredom or dissatisfaction at work. New opportunity presenting. Missing chances due to apathy.',
      love: 'Emotional withdrawal. Taking love for granted. New love offering but not seeing it.',
      health: 'Apathy about health. Ignoring wellness options. Need to appreciate body.',
      finance:
        'Financial dissatisfaction. Missing money opportunities. Taking abundance for granted.',
      spiritual: 'Spiritual apathy. Divine gifts unnoticed. Need for gratitude practice.',
    },

    actionSuggestions: [
      'Notice what is being offered',
      'Practice gratitude',
      'Look up from your contemplation',
      'Consider new opportunities',
      'Address emotional dissatisfaction',
      'Engage with life again',
    ],

    meditationPrompts: [
      'What am I taking for granted?',
      'What opportunity am I missing?',
      'Why have I withdrawn emotionally?',
      'What would it take to engage again?',
      'Where is apathy holding me back?',
    ],

    commonCombinations: ['four-cups-ace-cups', 'four-cups-hermit', 'four-cups-eight-cups'],
  },

  '40': {
    // Five of Cups
    reversedKeywords: ['acceptance', 'moving on', 'finding hope', 'forgiveness', 'recovery'],
    reversedMeaning:
      'Reversed, Five of Cups indicates beginning to move past grief. You are accepting losses and seeing what remains. Recovery and hope are possible.',

    symbolism: {
      mainSymbols: [
        'Cloaked Figure - Grief and mourning',
        'Three Spilled Cups - Loss and disappointment',
        'Two Standing Cups - What remains',
        'River - Emotions flowing',
        'Bridge to Castle - Path forward',
        'Black Cloak - Mourning',
      ],
      colors: ['Black - Grief and loss', 'Blue River - Emotional flow', 'Gray Sky - Sorrow'],
      patterns: [
        'Back turned - Not seeing positives',
        'Focus on spilled - Dwelling on loss',
        'Bridge available - Way forward exists',
      ],
    },

    lifeApplications: {
      career:
        'Work disappointment. Loss of job or opportunity. Focus on what remains. Path forward exists.',
      love: 'Relationship grief. Breakup or loss. Focus on remaining love. Healing from heartbreak.',
      health: 'Health setback. Processing health grief. Focus on remaining wellness.',
      finance: 'Financial loss. Mourning money mistakes. Still have resources. Recovery possible.',
      spiritual: 'Spiritual grief. Loss of faith. Finding remaining blessings. Path to healing.',
    },

    actionSuggestions: [
      'Allow yourself to grieve',
      'See what still stands',
      'Take the bridge forward',
      'Accept what cannot be changed',
      'Find the silver lining',
      'Begin to move on',
    ],

    meditationPrompts: [
      'What am I grieving?',
      'What still remains in my life?',
      'How can I move forward?',
      'What lesson is in this loss?',
      'Where is the path to healing?',
    ],

    commonCombinations: ['five-cups-star', 'five-cups-death', 'five-cups-six-cups'],
  },

  '41': {
    // Six of Cups
    reversedKeywords: ['stuck in past', 'naivety', 'unrealistic', 'moving forward', 'leaving home'],
    reversedMeaning:
      'Reversed, Six of Cups warns against being stuck in the past or unrealistic nostalgia. It may be time to move forward and leave childhood behind.',

    symbolism: {
      mainSymbols: [
        'Children - Innocence and nostalgia',
        'Six Cups with Flowers - Memories and gifts',
        'Village Setting - Homeland and past',
        'Giving Flowers - Sharing memories',
        'Guard Walking Away - Protection leaving',
        'Old House - Childhood home',
      ],
      colors: [
        'Yellow - Warmth of memories',
        'White Flowers - Pure intentions',
        'Gray Stone - Stability of past',
      ],
      patterns: [
        'Child giving to child - Innocence shared',
        'Looking back - Nostalgia',
        'Safe environment - Protected memories',
      ],
    },

    lifeApplications: {
      career: 'Past colleagues return. Childhood dreams revisited. Working with children or past.',
      love: 'Past love returns. Childhood sweetheart. Innocent love. Nostalgic romance.',
      health: 'Healing inner child. Past health patterns. Childlike wellness approaches.',
      finance: 'Inheritance or gifts. Past investments return. Simple approach to money.',
      spiritual: 'Reconnecting with innocent faith. Past life memories. Inner child healing.',
    },

    actionSuggestions: [
      'Revisit happy memories',
      'Reconnect with old friends',
      'Heal your inner child',
      'Share gifts generously',
      'Visit your hometown',
      'Embrace innocent joy',
    ],

    meditationPrompts: [
      'What happy memory brings me joy?',
      'How can I heal my inner child?',
      'What from my past serves me?',
      'Where do I need more innocence?',
      'Who from my past should I reconnect with?',
    ],

    commonCombinations: ['six-cups-sun', 'six-cups-fool', 'six-cups-ten-cups'],
  },

  '42': {
    // Seven of Cups
    reversedKeywords: ['clarity', 'making a choice', 'reality check', 'focus', 'determination'],
    reversedMeaning:
      'Reversed, Seven of Cups indicates gaining clarity and making a choice. Illusions fade and reality becomes clear. Time to focus and commit.',

    symbolism: {
      mainSymbols: [
        'Seven Cups with Visions - Choices and fantasies',
        'Silhouette Figure - Uncertain dreamer',
        'Various Symbols in Cups - Different desires',
        'Clouds - Fantasy and illusion',
        'Snake - Wisdom or deception',
        'Jewels and Castle - Material and spiritual desires',
      ],
      colors: [
        'Gray Clouds - Uncertainty',
        'Various Colors - Multiple options',
        'Blue Figure - Emotional contemplation',
      ],
      patterns: [
        'Floating cups - Unrealistic options',
        'Observer position - Not acting',
        'Multiple choices - Overwhelm',
      ],
    },

    lifeApplications: {
      career: 'Career fantasies. Too many options. Need to choose direction. Wishful thinking.',
      love: 'Romantic fantasies. Idealized partners. Too many options in love. Unrealistic expectations.',
      health: 'Health fantasies. Many options overwhelming. Need practical approach.',
      finance: 'Financial fantasies. Get-rich-quick illusions. Need realistic goals.',
      spiritual: 'Spiritual fantasies. Many paths confusing. Need grounded practice.',
    },

    actionSuggestions: [
      'Distinguish fantasy from reality',
      'Make a clear choice',
      'Focus on what is real',
      'Avoid wishful thinking',
      'Commit to one path',
      'Ground your dreams in action',
    ],

    meditationPrompts: [
      'What fantasies distract me?',
      'What is truly important to me?',
      'Which choice aligns with reality?',
      'Where do I need more focus?',
      'What illusions am I holding?',
    ],

    commonCombinations: ['seven-cups-moon', 'seven-cups-magician', 'seven-cups-ace-cups'],
  },

  '43': {
    // Eight of Cups
    reversedKeywords: [
      'fear of change',
      'staying in comfort zone',
      'aimless wandering',
      'returning',
      'avoidance',
    ],
    reversedMeaning:
      'Reversed, Eight of Cups indicates fear of leaving or returning to what was abandoned. You may be avoiding necessary change or aimlessly drifting.',

    symbolism: {
      mainSymbols: [
        'Figure Walking Away - Leaving the known',
        'Eight Stacked Cups - What is left behind',
        'Moon - Emotional journey in darkness',
        'Mountains - Challenges ahead',
        'Gap in Cups - Something missing',
        'Staff - Support for journey',
      ],
      colors: [
        'Blue Night - Emotional depth',
        'Red Cloak - Passion for new',
        'Gray Mountains - Unknown ahead',
      ],
      patterns: [
        'Walking away - Conscious departure',
        'Cups incomplete - Something missing',
        'Moon phases - Cyclical journey',
      ],
    },

    lifeApplications: {
      career: 'Leaving unfulfilling job. Walking away from success. Seeking deeper meaning.',
      love: 'Leaving relationship. Walking away from love that is not enough. Seeking deeper connection.',
      health: 'Leaving unhealthy patterns. Walking away from harmful habits. Seeking wellness.',
      finance:
        'Leaving financial security. Walking away from money for meaning. Seeking fulfillment.',
      spiritual: 'Spiritual departure. Leaving old beliefs. Seeking deeper truth.',
    },

    actionSuggestions: [
      'Have courage to leave what does not serve',
      'Seek what is missing',
      'Trust your inner guidance',
      'Accept that some things are not enough',
      'Begin a new journey',
      'Follow your deeper calling',
    ],

    meditationPrompts: [
      'What am I being called to leave?',
      'What is missing in my current situation?',
      'Do I have the courage to walk away?',
      'What deeper fulfillment am I seeking?',
      'Where is my soul journey leading?',
    ],

    commonCombinations: ['eight-cups-hermit', 'eight-cups-death', 'eight-cups-star'],
  },

  '44': {
    // Nine of Cups
    reversedKeywords: [
      'dissatisfaction',
      'greed',
      'materialism',
      'emptiness after achievement',
      'smugness',
    ],
    reversedMeaning:
      'Reversed, Nine of Cups warns of dissatisfaction despite having much. Greed or smugness may be issues. True fulfillment comes from within.',

    symbolism: {
      mainSymbols: [
        'Seated Satisfied Figure - Contentment and pride',
        'Nine Cups on Arc - Wishes fulfilled',
        'Crossed Arms - Self-satisfied pose',
        'Red Hat and Feather - Success and celebration',
        'Blue Cloth - Emotional satisfaction',
        'Curved Display - Abundance on show',
      ],
      colors: [
        'Yellow - Success and optimism',
        'Red - Passion and satisfaction',
        'Blue - Emotional fulfillment',
      ],
      patterns: [
        'Seated comfort - Achievement',
        'Cups behind - Success accumulated',
        'Proud posture - Self-satisfaction',
      ],
    },

    lifeApplications: {
      career: 'Work wishes fulfilled. Career satisfaction. Achievement and recognition.',
      love: 'Wish for love fulfilled. Relationship satisfaction. Emotional contentment.',
      health: 'Health wishes granted. Wellness achieved. Satisfaction with body.',
      finance: 'Financial wishes come true. Prosperity achieved. Material satisfaction.',
      spiritual: 'Spiritual wishes fulfilled. Inner contentment. Gratitude practice important.',
    },

    actionSuggestions: [
      'Enjoy your achievements',
      'Count your blessings',
      'Make a wish',
      'Appreciate abundance',
      'Share your good fortune',
      'Avoid becoming complacent',
    ],

    meditationPrompts: [
      'What wishes have been fulfilled?',
      'What am I most satisfied with?',
      'How can I share my abundance?',
      'What is my deepest wish?',
      'Am I truly happy or just comfortable?',
    ],

    commonCombinations: ['nine-cups-sun', 'nine-cups-ten-cups', 'nine-cups-star'],
  },

  '45': {
    // Ten of Cups
    reversedKeywords: [
      'broken family',
      'domestic issues',
      'neglected values',
      'unhappy home',
      'misaligned goals',
    ],
    reversedMeaning:
      'Reversed, Ten of Cups indicates family troubles or broken dreams of happiness. Domestic harmony is disrupted. Values may be neglected.',

    symbolism: {
      mainSymbols: [
        'Rainbow of Cups - Complete emotional fulfillment',
        'Happy Family - Love and togetherness',
        'Dancing Children - Joy and innocence',
        'Embracing Couple - Partnership and love',
        'Home in Distance - Security and stability',
        'River and Trees - Abundant nature',
      ],
      colors: [
        'Rainbow - All emotional colors',
        'Green - Growth and abundance',
        'Blue Sky - Joy and peace',
      ],
      patterns: [
        'Family unit - Togetherness',
        'Arms raised - Celebration',
        'Children playing - Innocent joy',
      ],
    },

    lifeApplications: {
      career: 'Work-life balance achieved. Family business success. Career supports family.',
      love: 'Lasting love and happiness. Family life fulfilled. Complete emotional satisfaction.',
      health: 'Family health and wellness. Emotional wellbeing. Happy healthy life.',
      finance: 'Family financial security. Abundance for all. Generational wealth.',
      spiritual: 'Spiritual family. Community of love. Divine blessing on home.',
    },

    actionSuggestions: [
      'Appreciate your family',
      'Create lasting happiness',
      'Build a loving home',
      'Celebrate emotional fulfillment',
      'Nurture family bonds',
      'Count your blessings',
    ],

    meditationPrompts: [
      'What does lasting happiness mean to me?',
      'How can I strengthen family bonds?',
      'What values create a happy home?',
      'Where do I find emotional fulfillment?',
      'How can I share more joy?',
    ],

    commonCombinations: ['ten-cups-lovers', 'ten-cups-empress', 'ten-cups-four-wands'],
  },

  '46': {
    // Page of Cups
    reversedKeywords: [
      'emotional immaturity',
      'creative blocks',
      'bad news',
      'oversensitivity',
      'escapism',
    ],
    reversedMeaning:
      'Reversed, Page of Cups indicates emotional immaturity or creative blocks. You may be too sensitive or escaping into fantasy. Ground your emotions.',

    symbolism: {
      mainSymbols: [
        'Young Page - Emotional beginner',
        'Cup with Fish - Surprise and creativity',
        'Fish Emerging - Unconscious rising',
        'Blue Tunic - Emotional nature',
        'Waves on Outfit - Emotional depth',
        'Looking at Fish - Wonder and curiosity',
      ],
      colors: ['Blue - Emotion and intuition', 'Pink/Orange - Creativity', 'Gold - Divine gift'],
      patterns: [
        'Fish appearing - Unexpected message',
        'Curious gaze - Openness to emotion',
        'Still stance - Receptive',
      ],
    },

    lifeApplications: {
      career: 'Creative opportunity. New emotional intelligence in work. Artistic beginnings.',
      love: 'New romantic feelings. Innocent love. Creative approach to romance.',
      health: 'Emotional health focus. Creative healing. Listening to body.',
      finance: 'Creative money ideas. Emotional approach to finances. Small opportunity.',
      spiritual: 'Spiritual sensitivity developing. Creative spirituality. Messages from beyond.',
    },

    actionSuggestions: [
      'Embrace your emotional nature',
      'Be open to creative inspiration',
      'Listen to intuitive messages',
      'Allow yourself to be surprised',
      'Approach life with wonder',
      'Express your feelings freely',
    ],

    meditationPrompts: [
      'What creative inspiration is emerging?',
      'What message is my intuition sending?',
      'How can I be more emotionally open?',
      'Where do I need more wonder?',
      'What surprises await me?',
    ],

    commonCombinations: ['page-cups-ace-cups', 'page-cups-star', 'page-cups-moon'],
  },

  '47': {
    // Knight of Cups
    reversedKeywords: [
      'moodiness',
      'unrealistic',
      'jealousy',
      'emotional manipulation',
      'broken promises',
    ],
    reversedMeaning:
      'Reversed, Knight of Cups warns of moodiness, unrealistic expectations, or emotional manipulation. Romance may be insincere. Check motives.',

    symbolism: {
      mainSymbols: [
        'Knight on White Horse - Romantic idealism',
        'Cup Offered - Emotional proposal',
        'Wings on Helmet - Imagination and dreams',
        'Flowing River - Emotional journey',
        'Fish on Tunic - Creativity and intuition',
        'Gentle Approach - Romantic advance',
      ],
      colors: [
        'Blue/Gray - Emotional journey',
        'White Horse - Pure intentions',
        'Silver Armor - Sensitive protection',
      ],
      patterns: [
        'Peaceful movement - Gentle approach',
        'Cup extended - Offering emotions',
        'River crossing - Emotional journey',
      ],
    },

    lifeApplications: {
      career:
        'Creative opportunity approaching. Emotional intelligence at work. Romantic work environment.',
      love: 'Romantic proposal or advance. Charming partner. Following the heart. Love arriving.',
      health: 'Emotional healing journey. Gentle approach to wellness. Following intuition.',
      finance:
        'Creative financial opportunity. Following heart in money. Romantic financial gestures.',
      spiritual: 'Spiritual quest for love. Following heart on path. Romantic spirituality.',
    },

    actionSuggestions: [
      'Follow your heart',
      'Make a romantic gesture',
      'Let creativity guide you',
      'Be the charming messenger',
      'Offer your emotional gifts',
      'Pursue your dreams',
    ],

    meditationPrompts: [
      'What is my heart pursuing?',
      'Where can I bring more romance?',
      'What emotional offer should I make?',
      'How can I follow my dreams?',
      'What does my intuition guide me toward?',
    ],

    commonCombinations: ['knight-cups-lovers', 'knight-cups-two-cups', 'knight-cups-star'],
  },

  '48': {
    // Queen of Cups
    reversedKeywords: [
      'co-dependency',
      'emotional manipulation',
      'martyr complex',
      'smothering',
      'insecurity',
    ],
    reversedMeaning:
      'Reversed, Queen of Cups warns of co-dependency, emotional manipulation, or martyrdom. Nurturing may become smothering. Balance giving with self-care.',

    symbolism: {
      mainSymbols: [
        'Queen on Throne - Emotional mastery',
        'Ornate Cup - Intuition and depth',
        'Throne by Water - Emotional realm',
        'Angels on Throne - Divine compassion',
        'Gazing at Cup - Deep contemplation',
        'Flowing Robes - Emotional fluidity',
      ],
      colors: ['Blue - Emotional depth', 'White/Silver - Intuition', 'Sea Colors - Unconscious'],
      patterns: [
        'Water setting - Emotional realm',
        'Closed cup - Private emotions',
        'Serene expression - Emotional peace',
      ],
    },

    lifeApplications: {
      career:
        'Emotionally intelligent leader. Caring professional. Creative mastery. Intuitive business.',
      love: 'Nurturing partner. Deep emotional connection. Loving and supportive. Intuitive love.',
      health: 'Emotional healing mastery. Intuitive health choices. Nurturing self-care.',
      finance: 'Intuitive finances. Caring about money impact. Generous yet wise.',
      spiritual: 'Deep intuition. Emotional spiritual mastery. Compassionate practice.',
    },

    actionSuggestions: [
      'Trust your deep intuition',
      'Nurture with wisdom',
      'Lead with compassion',
      'Honor your emotional depth',
      'Create emotional safety',
      'Balance giving with receiving',
    ],

    meditationPrompts: [
      'What does my intuition know?',
      'How can I nurture more wisely?',
      'What emotional depth wants expression?',
      'Where can I lead with compassion?',
      'How do I balance caring for others and myself?',
    ],

    commonCombinations: ['queen-cups-high-priestess', 'queen-cups-empress', 'queen-cups-star'],
  },

  '49': {
    // King of Cups
    reversedKeywords: [
      'emotional coldness',
      'manipulation',
      'moodiness',
      'volatility',
      'emotional abuse',
    ],
    reversedMeaning:
      'Reversed, King of Cups warns of emotional manipulation, coldness, or volatility. Emotions may be used as weapons. Seek emotional balance and integrity.',

    symbolism: {
      mainSymbols: [
        'King on Throne - Emotional mastery',
        'Cup Held Steady - Controlled emotions',
        'Throne on Water - Mastery of feelings',
        'Ship in Waves - Navigating emotions',
        'Fish Necklace - Creative power',
        'Dolphin and Ship - Unconscious and conscious',
      ],
      colors: [
        'Blue - Emotional depth',
        'Yellow - Conscious mastery',
        'Red Cloak - Passion controlled',
      ],
      patterns: [
        'Stable on water - Emotional stability',
        'Cup held firmly - Emotional control',
        'Looking forward - Wise perspective',
      ],
    },

    lifeApplications: {
      career:
        'Emotionally intelligent leadership. Mastery of feelings at work. Creative direction.',
      love: 'Mature emotional partner. Steady and supportive love. Wise in relationships.',
      health: 'Emotional health mastery. Calm approach to wellness. Balanced feelings.',
      finance: 'Emotionally intelligent finances. Calm money decisions. Generous leadership.',
      spiritual: 'Spiritual emotional mastery. Wise counselor. Balanced intuition.',
    },

    actionSuggestions: [
      'Lead with emotional intelligence',
      'Master your feelings without suppressing',
      'Offer wise counsel to others',
      'Stay calm in emotional storms',
      'Balance head and heart',
      'Be the steady presence others need',
    ],

    meditationPrompts: [
      'How can I master my emotions wisely?',
      'Where can I offer emotional leadership?',
      'How do I stay calm in storms?',
      'What does emotional maturity look like?',
      'How can I balance feeling and thinking?',
    ],

    commonCombinations: ['king-cups-queen-cups', 'king-cups-emperor', 'king-cups-temperance'],
  },

  // ==========================================================================
  // MINOR ARCANA - SWORDS (50-63)
  // ==========================================================================

  '50': {
    // Ace of Swords
    reversedKeywords: ['confusion', 'chaos', 'hostility', 'mental blocks', 'poor judgment'],
    reversedMeaning:
      'Reversed, Ace of Swords indicates mental confusion or misuse of intellect. You may have clouded judgment or use your words to harm. Seek clarity.',

    symbolism: {
      mainSymbols: [
        'Hand Holding Sword - Divine gift of intellect',
        'Crown and Wreath - Victory through truth',
        'Mountains - Mental clarity and challenge',
        'Clouds - Cutting through confusion',
        'Double-Edged Blade - Truth cuts both ways',
        'Yods Falling - Divine blessing',
      ],
      colors: [
        'Gray/White - Mental realm',
        'Gold Crown - Achievement',
        'Blue Sky - Mental clarity',
      ],
      patterns: [
        'Upright sword - Clear direction',
        'Crown at tip - Victory',
        'Wreath - Achievement crowned',
      ],
    },

    lifeApplications: {
      career:
        'Breakthrough ideas. Mental clarity at work. Truth revealed. New intellectual pursuits.',
      love: 'Clarity in relationships. Truth in love. Honest communication. New understanding.',
      health: 'Mental clarity about health. Decisive health action. Cutting through confusion.',
      finance: 'Clear financial thinking. Decisive money moves. Truth about finances.',
      spiritual: 'Spiritual truth. Mental breakthrough. Clarity of purpose.',
    },

    actionSuggestions: [
      'Seek the truth',
      'Use your intellect wisely',
      'Cut through confusion',
      'Communicate with clarity',
      'Make a decisive choice',
      'Embrace new understanding',
    ],

    meditationPrompts: [
      'What truth needs to be spoken?',
      'Where do I need mental clarity?',
      'How can I use my mind more wisely?',
      'What confusion needs cutting through?',
      'What new understanding is emerging?',
    ],

    commonCombinations: ['ace-swords-magician', 'ace-swords-justice', 'ace-swords-judgement'],
  },

  '51': {
    // Two of Swords
    reversedKeywords: [
      'information overload',
      'indecision',
      'confusion',
      'mental turmoil',
      'seeing the truth',
    ],
    reversedMeaning:
      'Reversed, Two of Swords indicates breaking through denial or making a delayed decision. Information may finally be revealed. End the stalemate.',

    symbolism: {
      mainSymbols: [
        'Blindfolded Figure - Refusing to see',
        'Crossed Swords - Balanced tension',
        'Moon - Intuition in darkness',
        'Water Behind - Emotions blocked',
        'Rocky Islands - Obstacles in feeling',
        'White Gown - Attempted purity',
      ],
      colors: [
        'White - Attempted purity',
        'Blue Water - Blocked emotions',
        'Yellow Moon - Intuitive light',
      ],
      patterns: [
        'Crossed arms - Protective stance',
        'Blindfold - Denial',
        'Perfect balance - Stalemate',
      ],
    },

    lifeApplications: {
      career: 'Workplace impasse. Need to make decision. Avoiding truth at work.',
      love: 'Relationship stalemate. Avoiding emotional truth. Decision needed.',
      health: 'Ignoring health signs. Need to decide on treatment. Mental stress.',
      finance: 'Financial impasse. Avoiding money truth. Decision paralysis.',
      spiritual: 'Spiritual blockage. Refusing to see truth. Need inner peace.',
    },

    actionSuggestions: [
      'Remove the blindfold',
      'Make a difficult decision',
      'Face the truth you are avoiding',
      'End the stalemate',
      'Trust your intuition',
      'Balance head and heart',
    ],

    meditationPrompts: [
      'What am I refusing to see?',
      'What decision am I avoiding?',
      'How can I find balance?',
      'What would I see without the blindfold?',
      'What truth needs acknowledging?',
    ],

    commonCombinations: [
      'two-swords-justice',
      'two-swords-hanged-man',
      'two-swords-high-priestess',
    ],
  },

  '52': {
    // Three of Swords
    reversedKeywords: [
      'recovery',
      'forgiveness',
      'releasing pain',
      'moving on',
      'optimism returning',
    ],
    reversedMeaning:
      'Reversed, Three of Swords indicates beginning to recover from heartbreak. Pain is releasing and healing begins. Forgiveness becomes possible.',

    symbolism: {
      mainSymbols: [
        'Heart Pierced by Swords - Heartbreak and sorrow',
        'Three Swords - Betrayal or painful truth',
        'Storm Clouds - Grief and tears',
        'Rain - Tears and cleansing',
        'Gray Sky - Depression and sadness',
        'Isolated Heart - Painful vulnerability',
      ],
      colors: ['Gray - Sorrow', 'Red Heart - Love wounded', 'Silver Swords - Painful truth'],
      patterns: [
        'Piercing arrangement - Multiple hurts',
        'Rain falling - Tears flowing',
        'No ground - Floating in grief',
      ],
    },

    lifeApplications: {
      career: 'Work heartbreak. Betrayal at work. Painful professional truth.',
      love: 'Heartbreak and sorrow. Betrayal in love. Painful relationship truth.',
      health: 'Heart health concerns. Emotional pain affecting body. Grief affecting wellness.',
      finance: 'Financial heartbreak. Money betrayal. Painful financial truth.',
      spiritual: 'Spiritual heartbreak. Crisis of faith. Painful awakening.',
    },

    actionSuggestions: [
      'Allow yourself to grieve',
      'Accept the painful truth',
      'Begin the healing process',
      'Seek support during sorrow',
      'Express your pain',
      'Know this will pass',
    ],

    meditationPrompts: [
      'What heartbreak needs acknowledging?',
      'How can I begin to heal?',
      'What painful truth must I accept?',
      'Where can I find support?',
      'What does my heart need?',
    ],

    commonCombinations: ['three-swords-star', 'three-swords-five-cups', 'three-swords-death'],
  },

  '53': {
    // Four of Swords
    reversedKeywords: [
      'restlessness',
      'burnout',
      'slow recovery',
      'refusing rest',
      'mental exhaustion',
    ],
    reversedMeaning:
      'Reversed, Four of Swords warns of refusing necessary rest or slow recovery. You may be too restless or burned out. Forced rest may come.',

    symbolism: {
      mainSymbols: [
        'Resting Knight - Retreat and recovery',
        'Three Swords on Wall - Past struggles',
        'One Sword Below - Protection in rest',
        'Stained Glass - Spiritual healing',
        'Praying Hands - Meditation and prayer',
        'Tomb/Bed - Deep rest needed',
      ],
      colors: [
        'Gray Stone - Stillness',
        'Gold and Blue Glass - Divine healing',
        'Yellow Light - Spiritual peace',
      ],
      patterns: [
        'Horizontal position - Complete rest',
        'Prayer pose - Spiritual recovery',
        'Weapons stored - Pause from battle',
      ],
    },

    lifeApplications: {
      career: 'Work break needed. Recovery from stress. Mental health day. Retreat.',
      love: 'Relationship pause. Emotional recovery. Time alone needed.',
      health: 'Rest and recovery essential. Mental health focus. Healing retreat.',
      finance: 'Financial pause. Recovery from stress. Not time for decisions.',
      spiritual: 'Spiritual retreat. Meditation essential. Deep inner work.',
    },

    actionSuggestions: [
      'Take time to rest',
      'Retreat from stress',
      'Allow recovery',
      'Meditate and reflect',
      'Pause before action',
      'Prioritize mental health',
    ],

    meditationPrompts: [
      'What rest do I truly need?',
      'How can I recover from exhaustion?',
      'What would deep rest look like?',
      'Where can I find sanctuary?',
      'How does stillness serve me?',
    ],

    commonCombinations: ['four-swords-hermit', 'four-swords-star', 'four-swords-nine-wands'],
  },

  '54': {
    // Five of Swords
    reversedKeywords: [
      'reconciliation',
      'making amends',
      'past resentment',
      'moving on from conflict',
      'learning from defeat',
    ],
    reversedMeaning:
      'Reversed, Five of Swords indicates moving past conflict or making amends. You may be reconciling or learning from past defeats. Let go of resentment.',

    symbolism: {
      mainSymbols: [
        'Victorious Figure - Hollow victory',
        'Defeated Figures - Humiliation and loss',
        'Five Swords - Conflict and competition',
        'Stormy Sky - Aftermath of battle',
        'Retreating Figures - Walking away',
        'Smug Expression - Unsavory victory',
      ],
      colors: [
        'Gray/Green - Uncomfortable atmosphere',
        'Yellow Sky - Conflict energy',
        'Blue Water - Emotional aftermath',
      ],
      patterns: [
        'Three collected, two dropped - Taking too much',
        'Looking at losers - Gloating',
        'Others leaving - Relationship cost',
      ],
    },

    lifeApplications: {
      career: 'Work conflict. Winning at others expense. Pyrrhic victory. Workplace betrayal.',
      love: 'Relationship conflict. One winning, one losing. Unhealthy competition.',
      health: 'Stress from conflict. Health suffering from battles. Need to step back.',
      finance: 'Financial conflict. Winning unfairly. Costly victory.',
      spiritual: 'Ego winning, spirit losing. Hollow spiritual victory. Need humility.',
    },

    actionSuggestions: [
      'Consider the cost of winning',
      'Avoid pyrrhic victories',
      'Choose battles wisely',
      "Don't burn bridges",
      'Consider reconciliation',
      'Learn from defeats gracefully',
    ],

    meditationPrompts: [
      'Is this victory worth the cost?',
      'How can I handle conflict better?',
      'What defeats have taught me?',
      'Where do I need to make amends?',
      'How can I win without others losing?',
    ],

    commonCombinations: ['five-swords-justice', 'five-swords-tower', 'five-swords-devil'],
  },

  '55': {
    // Six of Swords
    reversedKeywords: [
      'stuck',
      'resistance to change',
      'unfinished business',
      'turbulent transition',
      'returning to trouble',
    ],
    reversedMeaning:
      'Reversed, Six of Swords indicates difficulty moving on or turbulent transitions. You may be stuck in troubled waters or returning to problems.',

    symbolism: {
      mainSymbols: [
        'Boat Crossing Water - Transition and journey',
        'Cloaked Figures - Leaving troubles behind',
        'Six Swords in Boat - Carrying mental baggage',
        'Calm Water Ahead - Peace coming',
        'Rough Water Behind - Troubles left',
        'Ferryman - Guide through change',
      ],
      colors: [
        'Gray/Blue - Transition state',
        'Calm vs Choppy Water - Contrast',
        'Muted Tones - Somber journey',
      ],
      patterns: [
        'Moving forward - Progress',
        'Swords carried - Taking lessons',
        'Calm ahead - Better times coming',
      ],
    },

    lifeApplications: {
      career: 'Career transition. Moving to better job. Leaving workplace troubles.',
      love: 'Relationship transition. Moving on from difficulties. Journey together.',
      health: 'Health transition. Moving toward wellness. Leaving unhealthy behind.',
      finance: 'Financial transition. Moving toward stability. Leaving money troubles.',
      spiritual: 'Spiritual transition. Moving toward peace. Journey of healing.',
    },

    actionSuggestions: [
      'Trust the transition process',
      'Leave troubles behind',
      'Move toward calmer waters',
      'Accept guidance through change',
      'Take lessons, not baggage',
      'Have faith in better times',
    ],

    meditationPrompts: [
      'What am I ready to leave behind?',
      'What transition am I in?',
      'How can I trust this journey?',
      'What calmer waters await?',
      'What lessons should I carry forward?',
    ],

    commonCombinations: ['six-swords-death', 'six-swords-hermit', 'six-swords-star'],
  },

  '56': {
    // Seven of Swords
    reversedKeywords: [
      'coming clean',
      'confession',
      'conscience',
      'getting caught',
      'returning what was taken',
    ],
    reversedMeaning:
      'Reversed, Seven of Swords indicates confession, getting caught, or conscience awakening. Time to come clean or return what was taken.',

    symbolism: {
      mainSymbols: [
        'Figure Sneaking Away - Deception and stealth',
        'Five Swords Carried - Taking what is not yours',
        'Two Swords Left - Cannot take everything',
        'Tents/Camp - Scene of theft',
        'Looking Back - Fear of discovery',
        'Tip-Toe Walk - Secrecy',
      ],
      colors: [
        'Yellow - Mental activity',
        'Red/White Tents - Scene of deception',
        'Blue Sky - Clarity despite deceit',
      ],
      patterns: [
        'Sneaking posture - Guilt and secrecy',
        'Partial taking - Cannot succeed fully',
        'Looking back - Paranoia',
      ],
    },

    lifeApplications: {
      career: 'Workplace deception. Strategic thinking needed. Someone being sneaky.',
      love: 'Relationship deception. Secrets in love. Need for honesty.',
      health: 'Deception about health. Avoiding truth. Need honest assessment.',
      finance: 'Financial deception. Hidden money moves. Need transparency.',
      spiritual: 'Self-deception. Avoiding spiritual truth. Need honesty.',
    },

    actionSuggestions: [
      'Be strategic but ethical',
      'Watch for deception',
      'Come clean if needed',
      "Don't take shortcuts",
      'Protect your ideas',
      'Be honest with yourself',
    ],

    meditationPrompts: [
      'Where am I being deceptive?',
      'What truth am I avoiding?',
      'How can I be more honest?',
      'What needs returning?',
      'Where do I need more integrity?',
    ],

    commonCombinations: ['seven-swords-moon', 'seven-swords-devil', 'seven-swords-justice'],
  },

  '57': {
    // Eight of Swords
    reversedKeywords: [
      'self-acceptance',
      'new perspective',
      'freedom',
      'releasing limiting beliefs',
      'empowerment',
    ],
    reversedMeaning:
      'Reversed, Eight of Swords indicates breaking free from limiting beliefs. You are releasing self-imposed restrictions. Freedom and empowerment come.',

    symbolism: {
      mainSymbols: [
        'Blindfolded Bound Figure - Self-imposed limitations',
        'Eight Swords Surrounding - Mental prison',
        'Loose Bindings - Freedom possible',
        'Water at Feet - Emotions trapped',
        'Castle in Distance - Help available',
        'Muddy Ground - Stuck feeling',
      ],
      colors: [
        'Gray - Limitation',
        'Blue Sky - Freedom possible',
        'Red Dress - Life force constrained',
      ],
      patterns: [
        'Surrounded but not touching - Self-created prison',
        'Loose ties - Can escape',
        'Castle visible - Help exists',
      ],
    },

    lifeApplications: {
      career: 'Feeling trapped at work. Self-imposed limits. Can change perspective.',
      love: 'Feeling trapped in relationship. Self-limiting beliefs. Can break free.',
      health: 'Feeling trapped by health. Limiting beliefs about body. Can shift perspective.',
      finance: 'Feeling financially trapped. Self-imposed money limits. Can change thinking.',
      spiritual: 'Feeling spiritually trapped. Limiting beliefs. Can shift consciousness.',
    },

    actionSuggestions: [
      'Question your limitations',
      'Remove the blindfold',
      'Realize you can escape',
      'Change your perspective',
      'Seek help that exists',
      'Challenge negative thinking',
    ],

    meditationPrompts: [
      'What limits are self-imposed?',
      'What would I see without the blindfold?',
      'How can I free myself?',
      'What beliefs trap me?',
      'What help is available?',
    ],

    commonCombinations: ['eight-swords-devil', 'eight-swords-two-swords', 'eight-swords-star'],
  },

  '58': {
    // Nine of Swords
    reversedKeywords: [
      'hope',
      'recovery from anxiety',
      'facing fears',
      'releasing worry',
      'reaching out',
    ],
    reversedMeaning:
      'Reversed, Nine of Swords indicates recovery from anxiety or facing fears. Worry begins to release. Help and hope are available.',

    symbolism: {
      mainSymbols: [
        'Figure Sitting Up in Bed - Nightmare and anxiety',
        'Head in Hands - Despair and worry',
        'Nine Swords on Wall - Mental torment',
        'Dark Background - Night terrors',
        'Quilt with Symbols - Life story',
        'Carved Bed - Mind as prison',
      ],
      colors: [
        'Black - Despair',
        'Red/Yellow Quilt - Life amid darkness',
        'Silver Swords - Cutting thoughts',
      ],
      patterns: [
        'Upright in bed - Cannot sleep',
        'Swords above - Thoughts oppressing',
        'Alone in darkness - Isolation',
      ],
    },

    lifeApplications: {
      career: 'Work anxiety. Sleepless nights over job. Need to address fears.',
      love: 'Relationship anxiety. Worrying about love. Fear in partnership.',
      health: 'Health anxiety. Fear about wellness. Mental health support needed.',
      finance: 'Financial anxiety. Money worries. Fear about security.',
      spiritual: 'Spiritual crisis. Dark night of soul. Faith tested.',
    },

    actionSuggestions: [
      'Face your fears',
      'Seek help for anxiety',
      'Remember worst fears rarely happen',
      'Talk to someone',
      'Practice self-compassion',
      'Get professional support if needed',
    ],

    meditationPrompts: [
      'What am I most anxious about?',
      'What fears need facing?',
      'How can I find peace of mind?',
      'Who can I talk to?',
      'What would help me sleep?',
    ],

    commonCombinations: ['nine-swords-moon', 'nine-swords-devil', 'nine-swords-four-swords'],
  },

  '59': {
    // Ten of Swords
    reversedKeywords: [
      'recovery',
      'improvement',
      'lessons learned',
      'worst is over',
      'rising again',
    ],
    reversedMeaning:
      'Reversed, Ten of Swords indicates the worst is over. Recovery begins. You are rising from rock bottom with lessons learned.',

    symbolism: {
      mainSymbols: [
        'Figure with Ten Swords in Back - Complete defeat',
        'Dawn on Horizon - Hope after endings',
        'Calm Water - Peace after storm',
        'Black Sky Lightening - Darkness passing',
        'Red Cloth - Life force persists',
        'Hand Gesture - Acceptance or blessing',
      ],
      colors: ['Black - Complete ending', 'Yellow Dawn - Hope', 'Red - Life remains'],
      patterns: [
        'Complete defeat - Nowhere to go but up',
        'Dawn coming - New beginning',
        'Stillness - Acceptance',
      ],
    },

    lifeApplications: {
      career: 'Career rock bottom. Complete ending. New beginning possible.',
      love: 'Relationship ending. Complete heartbreak. Fresh start ahead.',
      health: 'Health crisis bottom. Complete recovery begins. New health chapter.',
      finance: 'Financial bottom. Complete loss. Recovery starts.',
      spiritual: 'Spiritual ending. Complete transformation. Rebirth comes.',
    },

    actionSuggestions: [
      'Accept what has ended',
      'Know the worst is over',
      'Look for the dawn',
      'Begin fresh',
      'Release victim mentality',
      'Rise from the ashes',
    ],

    meditationPrompts: [
      'What has completely ended?',
      'Where is the dawn in my situation?',
      'What lessons has this taught?',
      'How can I rise from this?',
      'What fresh start awaits?',
    ],

    commonCombinations: ['ten-swords-sun', 'ten-swords-death', 'ten-swords-fool'],
  },

  '60': {
    // Page of Swords
    reversedKeywords: [
      'haste',
      'scattered thoughts',
      'deception',
      'all talk no action',
      'cynicism',
    ],
    reversedMeaning:
      'Reversed, Page of Swords indicates scattered thinking or all talk no action. You may be hasty or cynical. Ground your mental energy.',

    symbolism: {
      mainSymbols: [
        'Young Figure with Sword - Mental curiosity',
        'Raised Sword - Ready for truth',
        'Windy Scene - Thoughts swirling',
        'Birds Flying - Ideas in motion',
        'Clouds - Mental activity',
        'Alert Stance - Vigilance',
      ],
      colors: ['Yellow - Mental energy', 'Blue Sky - Clarity possible', 'Green - Youthful growth'],
      patterns: [
        'Looking back - Watching surroundings',
        'Sword raised - Ready to fight',
        'Wind blowing - Thoughts moving',
      ],
    },

    lifeApplications: {
      career: 'New ideas at work. Curious about profession. Research and learning.',
      love: 'Curious about love. Communication focus. Mental connection.',
      health: 'Researching health. Curious about wellness. Mental approach.',
      finance: 'Learning about money. Financial curiosity. Research investments.',
      spiritual: 'Spiritual curiosity. Seeking truth. Mental spiritual approach.',
    },

    actionSuggestions: [
      'Stay curious and alert',
      'Research thoroughly',
      'Communicate your ideas',
      'Be vigilant for truth',
      'Develop your mind',
      'Ask good questions',
    ],

    meditationPrompts: [
      'What am I curious about?',
      'What truth am I seeking?',
      'How can I communicate better?',
      'What do I want to learn?',
      'Where can I be more mentally alert?',
    ],

    commonCombinations: ['page-swords-ace-swords', 'page-swords-magician', 'page-swords-fool'],
  },

  '61': {
    // Knight of Swords
    reversedKeywords: ['recklessness', 'tactless', 'bully', 'hasty decisions', 'scattered energy'],
    reversedMeaning:
      'Reversed, Knight of Swords warns of reckless action or tactless communication. You may be bullying or making hasty decisions. Slow down.',

    symbolism: {
      mainSymbols: [
        'Charging Knight - Aggressive action',
        'Raised Sword - Ready to strike',
        'Galloping Horse - Speed and momentum',
        'Storm Clouds - Conflict ahead',
        'Birds Fleeing - Disruption',
        'Determined Expression - Single-minded focus',
      ],
      colors: ['Blue/Gray - Mental storm', 'White Horse - Swift action', 'Red Plume - Aggression'],
      patterns: [
        'Charging forward - Aggressive advance',
        'Sword raised - Ready for battle',
        'Wind blowing - Fast movement',
      ],
    },

    lifeApplications: {
      career: 'Fast career action. Aggressive professional moves. Cutting through obstacles.',
      love: 'Fast-moving romance. Direct communication. Possibly too aggressive.',
      health: 'Aggressive health approach. Fast action. Possibly too hasty.',
      finance: 'Fast financial moves. Aggressive investing. Quick decisions.',
      spiritual: 'Direct spiritual seeking. Cutting through illusion. Possibly too forceful.',
    },

    actionSuggestions: [
      'Take decisive action',
      'Cut through obstacles',
      'Communicate directly',
      'Move fast when needed',
      "Don't hesitate",
      'Balance speed with wisdom',
    ],

    meditationPrompts: [
      'Where do I need to act decisively?',
      'Am I being too aggressive?',
      'What obstacles need cutting through?',
      'How can I communicate more directly?',
      'When is speed helpful vs harmful?',
    ],

    commonCombinations: [
      'knight-swords-chariot',
      'knight-swords-tower',
      'knight-swords-eight-wands',
    ],
  },

  '62': {
    // Queen of Swords
    reversedKeywords: ['cold-hearted', 'cruel', 'bitterness', 'malicious', 'overly critical'],
    reversedMeaning:
      'Reversed, Queen of Swords warns of coldness, cruelty, or bitterness. Intellect may be used to harm. Find balance between sharp mind and compassion.',

    symbolism: {
      mainSymbols: [
        'Queen on Throne - Mental mastery',
        'Upright Sword - Truth and discernment',
        'Extended Hand - Reaching out',
        'Single Bird - Clear thought',
        'Clouds and Sky - Mental realm',
        'Butterfly on Throne - Transformation',
      ],
      colors: [
        'Blue/Gray - Mental clarity',
        'White Clouds - Clear thinking',
        'Gold Crown - Wise authority',
      ],
      patterns: [
        'Sword upright - Direct truth',
        'Open hand - Fair judgment',
        'Profile view - Objective perspective',
      ],
    },

    lifeApplications: {
      career: 'Clear-thinking leader. Discerning professional. Direct communication.',
      love: 'Independent partner. Clear communication in love. Honest relationships.',
      health: 'Clear health thinking. Direct approach to wellness. Honest assessment.',
      finance: 'Clear financial thinking. Direct money approach. Honest assessment.',
      spiritual: 'Clear spiritual vision. Direct truth-seeking. Honest self-assessment.',
    },

    actionSuggestions: [
      'Think clearly and independently',
      'Communicate with honesty',
      'Use discernment wisely',
      'Balance truth with compassion',
      'Set clear boundaries',
      'Lead with clarity',
    ],

    meditationPrompts: [
      'Where do I need more clarity?',
      'How can I balance truth with kindness?',
      'What boundaries need setting?',
      'Where is my discernment needed?',
      'How can I think more independently?',
    ],

    commonCombinations: [
      'queen-swords-justice',
      'queen-swords-high-priestess',
      'queen-swords-emperor',
    ],
  },

  '63': {
    // King of Swords
    reversedKeywords: ['tyranny', 'manipulation', 'cruelty', 'abuse of power', 'cold judgment'],
    reversedMeaning:
      'Reversed, King of Swords warns of intellectual tyranny or manipulation. Power may be abused through cold judgment. Balance authority with fairness.',

    symbolism: {
      mainSymbols: [
        'King on Throne - Intellectual authority',
        'Upright Sword - Truth and justice',
        'Butterflies on Throne - Mental transformation',
        'Clouds - Mental realm',
        'Purple Cloak - Authority and wisdom',
        'Ring on Hand - Commitment to truth',
      ],
      colors: [
        'Blue/Purple - Mental authority',
        'White Clouds - Clear judgment',
        'Gold Crown - Wise rulership',
      ],
      patterns: [
        'Sword upright - Direct authority',
        'Stern expression - Serious judgment',
        'Formal posture - Official authority',
      ],
    },

    lifeApplications: {
      career: 'Intellectual leadership. Authority with wisdom. Fair professional decisions.',
      love: 'Clear communication in love. Honest partnership. Intellectual connection.',
      health: 'Clear health decisions. Medical authority consulted. Wise choices.',
      finance: 'Financial authority. Clear money decisions. Professional advice.',
      spiritual: 'Spiritual authority. Clear teaching. Wise guidance.',
    },

    actionSuggestions: [
      'Lead with wisdom and fairness',
      'Make clear decisions',
      'Communicate with authority',
      'Use power responsibly',
      'Think before acting',
      'Be just in judgment',
    ],

    meditationPrompts: [
      'How can I lead more wisely?',
      'Where is my authority needed?',
      'Am I being fair in my judgments?',
      'How can I use my mind for good?',
      'What decisions need my clarity?',
    ],

    commonCombinations: ['king-swords-justice', 'king-swords-emperor', 'king-swords-hierophant'],
  },

  // ==========================================================================
  // MINOR ARCANA - PENTACLES (64-77)
  // ==========================================================================

  '64': {
    // Ace of Pentacles
    reversedKeywords: [
      'missed opportunity',
      'lack of planning',
      'scarcity mindset',
      'bad investment',
      'financial loss',
    ],
    reversedMeaning:
      'Reversed, Ace of Pentacles warns of missed financial opportunities or poor planning. Your scarcity mindset may block abundance. Ground your material goals.',

    symbolism: {
      mainSymbols: [
        'Hand Holding Pentacle - Divine gift of abundance',
        'Garden Below - Fertile ground',
        'Archway - Gateway to prosperity',
        'Mountains - Long-term goals',
        'Lilies - Purity of abundance',
        'Path Through - Way to wealth',
      ],
      colors: [
        'Gold - Wealth and abundance',
        'Green - Growth and fertility',
        'White Flowers - Pure prosperity',
      ],
      patterns: [
        'Hand from cloud - Divine provision',
        'Garden flourishing - Abundance available',
        'Clear path - Way forward',
      ],
    },

    lifeApplications: {
      career: 'New career opportunity. Financial potential at work. Material success possible.',
      love: 'Stable love beginning. Material security in relationship. Building together.',
      health: 'Physical wellness focus. Body as temple. Grounded health approach.',
      finance: 'New financial opportunity. Investment potential. Abundance beginning.',
      spiritual: 'Grounded spirituality. Abundance consciousness. Material and spiritual balance.',
    },

    actionSuggestions: [
      'Seize financial opportunities',
      'Plant seeds for prosperity',
      'Build solid foundations',
      'Trust in abundance',
      'Make practical plans',
      'Invest in your future',
    ],

    meditationPrompts: [
      'What abundance opportunity awaits?',
      'How can I build better foundations?',
      'What seeds should I plant?',
      'Where is prosperity available?',
      'How can I trust in abundance?',
    ],

    commonCombinations: [
      'ace-pentacles-ten-pentacles',
      'ace-pentacles-empress',
      'ace-pentacles-magician',
    ],
  },

  '65': {
    // Two of Pentacles
    reversedKeywords: [
      'overwhelm',
      'poor time management',
      'financial disorganization',
      'imbalance',
      'overcommitted',
    ],
    reversedMeaning:
      'Reversed, Two of Pentacles indicates overwhelm and poor balance. You may be overcommitted or financially disorganized. Simplify and prioritize.',

    symbolism: {
      mainSymbols: [
        'Juggling Figure - Balance and adaptability',
        'Infinity Sign - Continuous flow',
        'Two Pentacles - Managing resources',
        'Ships on Waves - Navigating ups and downs',
        'Dancing Pose - Flexibility',
        'Red Hat - Passionate engagement',
      ],
      colors: [
        'Orange/Red - Active energy',
        'Blue Sea - Emotional balance',
        'Green - Balanced growth',
      ],
      patterns: [
        'Juggling motion - Continuous adjustment',
        'Infinity loop - Endless balancing',
        'Waves behind - Managing change',
      ],
    },

    lifeApplications: {
      career: 'Work-life balance needed. Managing multiple projects. Flexible approach.',
      love: 'Balancing love with other priorities. Flexible partnership. Time management.',
      health: 'Balancing health activities. Flexibility in wellness. Managing body.',
      finance: 'Financial juggling. Managing money flow. Flexibility with budget.',
      spiritual: 'Balancing spiritual and material. Flexible practice. Managing priorities.',
    },

    actionSuggestions: [
      'Stay flexible and adaptable',
      'Balance your priorities',
      'Manage your time wisely',
      'Go with the flow',
      'Juggle responsibilities carefully',
      "Don't overcommit",
    ],

    meditationPrompts: [
      'What needs better balance?',
      'How can I be more flexible?',
      'What am I juggling?',
      'Where do I need better time management?',
      'How can I simplify?',
    ],

    commonCombinations: [
      'two-pentacles-wheel',
      'two-pentacles-temperance',
      'two-pentacles-seven-pentacles',
    ],
  },

  '66': {
    // Three of Pentacles
    reversedKeywords: [
      'lack of teamwork',
      'poor quality',
      'misalignment',
      'working alone',
      'apprentice struggles',
    ],
    reversedMeaning:
      'Reversed, Three of Pentacles indicates poor teamwork or quality issues. Collaboration may be failing. Realign with team goals.',

    symbolism: {
      mainSymbols: [
        'Three Figures Working - Teamwork and collaboration',
        'Cathedral Interior - Skilled craftsmanship',
        'Architectural Plans - Blueprint for success',
        'Monk Figure - Spiritual guidance',
        'Craftsman - Skilled work',
        'Nobleman - Patron or client',
      ],
      colors: ['Gray Stone - Solid work', 'Brown Monk Robe - Dedication', 'Yellow Plan - Vision'],
      patterns: [
        'Three looking at plans - Shared vision',
        'Different roles - Team diversity',
        'Building together - Collaborative creation',
      ],
    },

    lifeApplications: {
      career: 'Teamwork and collaboration. Skilled work recognized. Building career.',
      love: 'Building relationship together. Teamwork in partnership. Shared plans.',
      health: 'Team approach to health. Working with professionals. Building wellness.',
      finance: 'Collaborative finances. Team investments. Building wealth together.',
      spiritual: 'Spiritual community building. Learning from teachers. Developing skills.',
    },

    actionSuggestions: [
      'Collaborate with others',
      'Develop your skills',
      'Work as a team',
      'Create with quality',
      'Follow the blueprint',
      'Value diverse contributions',
    ],

    meditationPrompts: [
      'How can I collaborate better?',
      'What skills am I developing?',
      'Who are my team members?',
      'What are we building together?',
      'Where is quality important?',
    ],

    commonCombinations: [
      'three-pentacles-eight-pentacles',
      'three-pentacles-hierophant',
      'three-pentacles-three-wands',
    ],
  },

  '67': {
    // Four of Pentacles
    reversedKeywords: [
      'releasing control',
      'generosity',
      'reckless spending',
      'letting go',
      'open to change',
    ],
    reversedMeaning:
      'Reversed, Four of Pentacles indicates releasing grip on possessions or reckless spending. Balance security with generosity.',

    symbolism: {
      mainSymbols: [
        'Figure Holding Pentacles - Possession and control',
        'Pentacle on Head - Thoughts of money',
        'Pentacles Under Feet - Stepping on wealth',
        'Arms Around Pentacle - Clutching possessions',
        'City Behind - Material world',
        'Throne-like Seat - Position of power',
      ],
      colors: [
        'Black Outfit - Restrictive holding',
        'Gold Pentacles - Wealth focused',
        'Gray City - Material world',
      ],
      patterns: [
        'Tight grip - Fear of loss',
        'Closed posture - Protective',
        'Separated from city - Isolation through hoarding',
      ],
    },

    lifeApplications: {
      career: 'Holding onto job security. Protecting position. Fear of change.',
      love: 'Possessive in relationship. Fear of losing partner. Controlling behavior.',
      health: 'Holding tension in body. Fear-based health approach. Need to release.',
      finance: 'Hoarding money. Fear of spending. Security focus.',
      spiritual: 'Attachment blocking growth. Holding too tight. Need to release.',
    },

    actionSuggestions: [
      'Loosen your grip',
      'Balance security with generosity',
      'Release what you fear losing',
      'Open to change',
      'Share your abundance',
      'Trust that enough will come',
    ],

    meditationPrompts: [
      'What am I holding too tightly?',
      'Where does fear drive my decisions?',
      'How can I be more generous?',
      'What can I safely release?',
      'How does control limit me?',
    ],

    commonCombinations: [
      'four-pentacles-devil',
      'four-pentacles-emperor',
      'four-pentacles-ten-pentacles',
    ],
  },

  '68': {
    // Five of Pentacles
    reversedKeywords: [
      'recovery',
      'end of hard times',
      'spiritual poverty',
      'finding help',
      'positive changes',
    ],
    reversedMeaning:
      'Reversed, Five of Pentacles indicates recovery from hardship or finding help. Hard times are ending. Look for available support.',

    symbolism: {
      mainSymbols: [
        'Two Figures in Snow - Hardship and exclusion',
        'Crutches - Physical or financial struggle',
        'Church Window - Help available but unseen',
        'Five Pentacles in Window - Abundance nearby',
        'Snow - Cold hard times',
        'Torn Clothes - Poverty and need',
      ],
      colors: [
        'White Snow - Cold hardship',
        'Gold Window - Help available',
        'Gray - Difficult times',
      ],
      patterns: [
        'Passing by church - Missing help',
        'Supporting each other - Companionship in hardship',
        'Looking down - Not seeing options',
      ],
    },

    lifeApplications: {
      career: 'Job loss or financial struggle. Feeling excluded. Help available.',
      love: 'Relationship hardship. Feeling left out. Need for support.',
      health: 'Health struggles. Feeling unwell. Help available.',
      finance: 'Financial hardship. Poverty or struggle. Support exists.',
      spiritual: 'Spiritual poverty. Feeling abandoned. Divine help available.',
    },

    actionSuggestions: [
      'Look for available help',
      "Don't isolate in hardship",
      'Know this will pass',
      'Seek support from others',
      'Find the open door',
      'Keep faith during difficulty',
    ],

    meditationPrompts: [
      'What help am I not seeing?',
      'How can I find support?',
      'What will I learn from this hardship?',
      'Who can I turn to?',
      'Where is the light in this darkness?',
    ],

    commonCombinations: [
      'five-pentacles-star',
      'five-pentacles-six-pentacles',
      'five-pentacles-ten-pentacles',
    ],
  },

  '69': {
    // Six of Pentacles
    reversedKeywords: [
      'strings attached',
      'power imbalance',
      'debt',
      'selfishness',
      'charity misused',
    ],
    reversedMeaning:
      'Reversed, Six of Pentacles warns of strings attached to giving or receiving. Power imbalance in generosity. Examine motives.',

    symbolism: {
      mainSymbols: [
        'Wealthy Figure Giving - Generosity and sharing',
        'Two Receiving Figures - Those in need',
        'Scales - Fair distribution',
        'Six Pentacles - Balanced wealth',
        'Red Cloak - Passion for giving',
        'Kneeling Posture - Receiving humbly',
      ],
      colors: ['Purple - Generosity and wealth', 'Gold - Abundance shared', 'Gray - Those in need'],
      patterns: [
        'Scales balanced - Fair giving',
        'One gives, others receive - Cycle of generosity',
        'Open hands - Willing exchange',
      ],
    },

    lifeApplications: {
      career: 'Receiving or giving help at work. Fair compensation. Mentorship.',
      love: 'Give and take in relationship. Supporting partner. Balanced exchange.',
      health: 'Receiving or giving health support. Sharing wellness knowledge.',
      finance: 'Charitable giving or receiving. Fair financial exchange. Loans.',
      spiritual: 'Spiritual generosity. Teaching or learning. Balanced exchange.',
    },

    actionSuggestions: [
      'Give generously when able',
      'Receive graciously when needed',
      'Balance giving and receiving',
      'Share your abundance',
      'Help those in need',
      'Accept help without shame',
    ],

    meditationPrompts: [
      'How can I give more generously?',
      'Can I receive help graciously?',
      'Is my giving balanced?',
      'Where can I share abundance?',
      'How do I feel about receiving?',
    ],

    commonCombinations: [
      'six-pentacles-empress',
      'six-pentacles-justice',
      'six-pentacles-ten-cups',
    ],
  },

  '70': {
    // Seven of Pentacles
    reversedKeywords: [
      'impatience',
      'poor planning',
      'lack of growth',
      'wasted effort',
      'giving up too soon',
    ],
    reversedMeaning:
      'Reversed, Seven of Pentacles warns of impatience or poor planning. You may give up too soon or see lack of growth. Reassess your approach.',

    symbolism: {
      mainSymbols: [
        'Farmer Contemplating - Patience and assessment',
        'Seven Pentacles on Vine - Growth in progress',
        'Leaning on Hoe - Pause from work',
        'One Pentacle Below - Foundation',
        'Vine Growing - Progress visible',
        'Thoughtful Expression - Evaluating efforts',
      ],
      colors: [
        'Green - Growth',
        'Gold Pentacles - Wealth developing',
        'Brown Earth - Grounded work',
      ],
      patterns: [
        'Waiting posture - Patience needed',
        'Looking at progress - Assessment',
        'Growth visible - Efforts paying off',
      ],
    },

    lifeApplications: {
      career: 'Career progress assessment. Patience with work. Evaluating efforts.',
      love: 'Relationship growth check. Patience in love. Evaluating partnership.',
      health: 'Health progress review. Patience with body. Evaluating wellness.',
      finance: 'Investment assessment. Patience with growth. Evaluating returns.',
      spiritual: 'Spiritual growth check. Patience on path. Evaluating practice.',
    },

    actionSuggestions: [
      'Be patient with progress',
      'Assess your investments',
      'Continue nurturing growth',
      'Evaluate what is working',
      'Adjust your approach if needed',
      'Trust the process',
    ],

    meditationPrompts: [
      'What growth am I seeing?',
      'Where do I need more patience?',
      'What needs reassessment?',
      'Am I nurturing my investments?',
      'What adjustments are needed?',
    ],

    commonCombinations: [
      'seven-pentacles-eight-pentacles',
      'seven-pentacles-nine-pentacles',
      'seven-pentacles-empress',
    ],
  },

  '71': {
    // Eight of Pentacles
    reversedKeywords: [
      'perfectionism',
      'lack of focus',
      'poor quality',
      'shortcuts',
      'unfulfilling work',
    ],
    reversedMeaning:
      'Reversed, Eight of Pentacles warns of perfectionism or cutting corners. Work may be unfulfilling or quality suffering. Find balance.',

    symbolism: {
      mainSymbols: [
        'Craftsman at Work - Dedication and skill',
        'Eight Pentacles - Products of labor',
        'Workbench - Place of creation',
        'Tools - Skills being used',
        'Concentrated Expression - Focus',
        'Town in Distance - Removed from distraction',
      ],
      colors: ['Blue - Dedication', 'Gold Pentacles - Quality work', 'Brown - Practical skill'],
      patterns: [
        'Repetitive work - Practice and mastery',
        'Focused attention - Dedication',
        'Isolated work - Concentration',
      ],
    },

    lifeApplications: {
      career: 'Skill development. Dedicated work. Apprenticeship. Quality focus.',
      love: 'Working on relationship. Dedicated to partner. Building skills.',
      health: 'Working on body. Dedicated practice. Skill building.',
      finance: 'Working for money. Skill-based income. Quality work pays.',
      spiritual: 'Spiritual practice dedication. Skill development. Focused effort.',
    },

    actionSuggestions: [
      'Dedicate yourself to your craft',
      'Practice to build mastery',
      'Focus on quality work',
      'Develop your skills',
      'Take pride in your work',
      'Keep learning and improving',
    ],

    meditationPrompts: [
      'What skills am I developing?',
      'Where can I focus more?',
      'What does mastery mean to me?',
      'How can I improve my craft?',
      'What work fulfills me?',
    ],

    commonCombinations: [
      'eight-pentacles-three-pentacles',
      'eight-pentacles-magician',
      'eight-pentacles-nine-pentacles',
    ],
  },

  '72': {
    // Nine of Pentacles
    reversedKeywords: [
      'financial dependence',
      'overwork',
      'superficiality',
      'hustling',
      'lack of self-worth',
    ],
    reversedMeaning:
      'Reversed, Nine of Pentacles warns of financial dependence or overwork for status. True abundance comes from self-worth, not external validation.',

    symbolism: {
      mainSymbols: [
        'Elegant Woman - Self-sufficiency and grace',
        'Abundant Garden - Prosperity achieved',
        'Falcon on Hand - Controlled power',
        'Nine Pentacles - Material abundance',
        'Snail on Ground - Slow steady progress',
        'Grape Vines - Fruits of labor',
      ],
      colors: ['Yellow/Gold - Prosperity', 'Green - Abundance', 'Red - Passion fulfilled'],
      patterns: [
        'Alone in garden - Independent success',
        'Falcon controlled - Power mastered',
        'Relaxed posture - Comfortable achievement',
      ],
    },

    lifeApplications: {
      career: 'Career success and independence. Self-made achievement. Comfortable position.',
      love: 'Independent in love. Self-sufficient. Attracting quality partner.',
      health: 'Health independence. Self-care mastery. Comfortable in body.',
      finance: 'Financial independence. Self-made wealth. Comfortable abundance.',
      spiritual: 'Spiritual independence. Self-sufficient practice. Inner abundance.',
    },

    actionSuggestions: [
      'Enjoy your achievements',
      'Celebrate independence',
      'Appreciate luxury earned',
      'Trust your self-sufficiency',
      'Take time to enjoy life',
      'Know your worth',
    ],

    meditationPrompts: [
      'What have I achieved independently?',
      'How can I enjoy my abundance?',
      'Where am I truly self-sufficient?',
      'What does independence mean to me?',
      'How can I appreciate my success?',
    ],

    commonCombinations: [
      'nine-pentacles-empress',
      'nine-pentacles-queen-pentacles',
      'nine-pentacles-sun',
    ],
  },

  '73': {
    // Ten of Pentacles
    reversedKeywords: [
      'family disputes',
      'financial loss',
      'broken legacy',
      'instability',
      'isolation from family',
    ],
    reversedMeaning:
      'Reversed, Ten of Pentacles warns of family financial disputes or broken legacy. Wealth may not bring happiness. Heal family relationships.',

    symbolism: {
      mainSymbols: [
        'Multi-generational Family - Legacy and inheritance',
        'Ten Pentacles - Complete wealth',
        'Elder with Dogs - Wisdom and loyalty',
        'Archway - Established home',
        'Family Crest - Heritage and tradition',
        'Children Playing - Future generation',
      ],
      colors: ['Gold - Wealth', 'Red/Blue - Passion and stability', 'White - Purity of family'],
      patterns: [
        'Three generations - Family continuity',
        'Dogs loyal - Faithful wealth',
        'Stable structure - Lasting legacy',
      ],
    },

    lifeApplications: {
      career: 'Established career. Family business. Legacy work.',
      love: 'Family life complete. Long-term partnership. Traditional values.',
      health: 'Generational health. Family wellness. Established patterns.',
      finance: 'Generational wealth. Financial legacy. Established abundance.',
      spiritual: 'Spiritual legacy. Family traditions. Ancestral connection.',
    },

    actionSuggestions: [
      'Build lasting legacy',
      'Value family wealth',
      'Honor traditions',
      'Create generational abundance',
      'Appreciate what family built',
      'Plan for future generations',
    ],

    meditationPrompts: [
      'What legacy am I building?',
      'How do I honor family wealth?',
      'What traditions serve me?',
      'How can I create lasting abundance?',
      'What do I want to leave behind?',
    ],

    commonCombinations: [
      'ten-pentacles-empress',
      'ten-pentacles-hierophant',
      'ten-pentacles-four-wands',
    ],
  },

  '74': {
    // Page of Pentacles
    reversedKeywords: [
      'procrastination',
      'missed opportunities',
      'poor grades',
      'lack of progress',
      'irresponsibility',
    ],
    reversedMeaning:
      'Reversed, Page of Pentacles indicates procrastination or missed opportunities for learning. Progress may be slow. Get grounded and practical.',

    symbolism: {
      mainSymbols: [
        'Young Figure with Pentacle - New material focus',
        'Studying Pentacle - Learning about wealth',
        'Fertile Land - Potential growth',
        'Trees in Background - Steady growth',
        'Mountain - Goals to achieve',
        'Green Tunic - Growth and learning',
      ],
      colors: [
        'Green - Growth and learning',
        'Gold Pentacle - Material focus',
        'Brown Earth - Grounded approach',
      ],
      patterns: [
        'Contemplating pentacle - Learning value',
        'Still stance - Patient study',
        'Fertile surroundings - Potential',
      ],
    },

    lifeApplications: {
      career: 'New job opportunity. Learning skills. Beginning career.',
      love: 'Practical approach to love. Learning about relationships. Grounded romance.',
      health: 'Learning about body. New health interest. Practical wellness.',
      finance: 'Learning about money. New financial opportunity. Beginning investor.',
      spiritual: 'Grounded spirituality. Learning practices. Practical approach.',
    },

    actionSuggestions: [
      'Study and learn',
      'Start a practical project',
      'Focus on skill building',
      'Be patient with progress',
      'Stay grounded in reality',
      'Invest in your education',
    ],

    meditationPrompts: [
      'What am I learning?',
      'Where should I focus my studies?',
      'What practical skills do I need?',
      'How can I be more grounded?',
      'What opportunities await?',
    ],

    commonCombinations: [
      'page-pentacles-ace-pentacles',
      'page-pentacles-three-pentacles',
      'page-pentacles-fool',
    ],
  },

  '75': {
    // Knight of Pentacles
    reversedKeywords: [
      'laziness',
      'stuck',
      'boredom',
      'perfectionism paralyzing',
      'lack of progress',
    ],
    reversedMeaning:
      'Reversed, Knight of Pentacles warns of being stuck or lazy. Perfectionism may paralyze progress. Find balance between patience and action.',

    symbolism: {
      mainSymbols: [
        'Knight on Dark Horse - Steady reliable progress',
        'Holding Pentacle - Protecting investment',
        'Stationary Horse - Patient approach',
        'Plowed Field - Prepared ground',
        'Looking at Pentacle - Evaluating worth',
        'Steady Gaze - Determined focus',
      ],
      colors: [
        'Brown/Green - Earthy stability',
        'Gold Pentacle - Material focus',
        'Black Horse - Reliable strength',
      ],
      patterns: [
        'Still horse - Patient waiting',
        'Pentacle held carefully - Protecting investment',
        'Grounded stance - Stability',
      ],
    },

    lifeApplications: {
      career: 'Steady career progress. Reliable work. Patient advancement.',
      love: 'Reliable partner. Steady relationship. Patient love.',
      health: 'Steady health approach. Patient progress. Reliable routine.',
      finance: 'Steady financial progress. Patient investing. Reliable growth.',
      spiritual: 'Steady spiritual practice. Patient progress. Reliable discipline.',
    },

    actionSuggestions: [
      'Stay steady and reliable',
      'Be patient with progress',
      'Work hard and consistently',
      'Protect your investments',
      "Don't rush the process",
      'Trust in gradual growth',
    ],

    meditationPrompts: [
      'Where do I need more patience?',
      'How can I be more reliable?',
      'What needs steady attention?',
      'How is patience serving me?',
      'What am I building gradually?',
    ],

    commonCombinations: [
      'knight-pentacles-eight-pentacles',
      'knight-pentacles-hermit',
      'knight-pentacles-seven-pentacles',
    ],
  },

  '76': {
    // Queen of Pentacles
    reversedKeywords: [
      'neglecting self',
      'smothering',
      'financial dependence',
      'work-home imbalance',
      'materialism',
    ],
    reversedMeaning:
      'Reversed, Queen of Pentacles warns of neglecting self-care or being too focused on others. Balance nurturing with self-nourishment.',

    symbolism: {
      mainSymbols: [
        'Queen on Throne - Material abundance',
        'Pentacle in Lap - Nurturing wealth',
        'Abundant Garden - Fertile prosperity',
        'Rabbit - Fertility and abundance',
        'Flowers and Fruit - Natural abundance',
        'Caring Expression - Nurturing presence',
      ],
      colors: ['Green - Growth and nature', 'Red - Passion for nurturing', 'Gold - Abundance'],
      patterns: [
        'Cradling pentacle - Nurturing resources',
        'Surrounded by nature - Connected to earth',
        'Throne in garden - Comfort in nature',
      ],
    },

    lifeApplications: {
      career: 'Nurturing work environment. Practical success. Business mother.',
      love: 'Nurturing partner. Practical love. Home-focused relationship.',
      health: 'Nurturing body. Practical wellness. Self-care focus.',
      finance: 'Nurturing finances. Practical money management. Abundance through care.',
      spiritual: 'Grounded spirituality. Practical magic. Earth-based practice.',
    },

    actionSuggestions: [
      'Nurture abundance',
      'Create practical comfort',
      'Care for your resources',
      'Connect with nature',
      'Build a beautiful home',
      'Balance work and home',
    ],

    meditationPrompts: [
      'How can I nurture abundance?',
      'What needs my practical care?',
      'How do I balance giving and self-care?',
      'What does comfort mean to me?',
      'How can I connect with nature?',
    ],

    commonCombinations: [
      'queen-pentacles-empress',
      'queen-pentacles-nine-pentacles',
      'queen-pentacles-ten-pentacles',
    ],
  },

  '77': {
    // King of Pentacles
    reversedKeywords: [
      'greed',
      'materialism',
      'poor financial management',
      'stubborn',
      'corruption',
    ],
    reversedMeaning:
      'Reversed, King of Pentacles warns of greed, poor management, or corruption. Material success without integrity fails. Balance wealth with ethics.',

    symbolism: {
      mainSymbols: [
        'King on Throne - Material mastery',
        'Pentacle Held - Wealth controlled',
        'Bull Decorations - Taurus stability',
        'Abundant Robe - Success displayed',
        'Castle Behind - Established wealth',
        'Grape Vines - Fruits of success',
      ],
      colors: ['Gold/Yellow - Wealth mastered', 'Green - Abundance', 'Black - Serious authority'],
      patterns: [
        'Comfortable seated - Established success',
        'Pentacle displayed - Wealth shown',
        'Surrounded by abundance - Complete prosperity',
      ],
    },

    lifeApplications: {
      career: 'Business mastery. Financial success. Established authority.',
      love: 'Provider in relationship. Stable partner. Material security.',
      health: 'Mastery over physical body. Established wellness. Strong vitality.',
      finance: 'Financial mastery. Wealth building. Investment success.',
      spiritual: 'Material-spiritual balance. Grounded wisdom. Practical enlightenment.',
    },

    actionSuggestions: [
      'Master your finances',
      'Build lasting wealth',
      'Lead with integrity',
      'Provide for others',
      'Balance material and spiritual',
      'Create stable abundance',
    ],

    meditationPrompts: [
      'What does financial mastery mean to me?',
      'How can I lead with integrity?',
      'What lasting wealth am I building?',
      'How do I balance material success and values?',
      'What does true prosperity look like?',
    ],

    commonCombinations: [
      'king-pentacles-emperor',
      'king-pentacles-ten-pentacles',
      'king-pentacles-queen-pentacles',
    ],
  },

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
      love: 'Passionate new attraction or renewed spark in relationship. Sexual chemistry. Exciting new phase of romance. Follow your enthusiasm.',
      health:
        'Burst of vital energy. Good time to start new fitness routine. Your life force is strong. Channel energy into physical activity. Passion energizes you.',
      finance:
        "New income opportunity. Your ideas have earning potential. Good time to start business or side hustle. Invest in ventures you're passionate about.",
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
