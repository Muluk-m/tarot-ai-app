import Foundation

/// Suit of Pentacles - 14 Cards (64-77)
/// Element: Earth | Themes: Material, Security, Work, Abundance, Practical Matters
enum Pentacles {
    static let cards: [TarotCard] = [
        TarotCard(
            id: 64,
            name: "Ace of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "ace",
            uprightKeywords: ["opportunity", "prosperity", "new venture", "manifestation", "abundance", "potential"],
            uprightMeaning: "The Ace of Pentacles represents new financial opportunities and material manifestation. A seed of prosperity is planted. Ground your dreams in practical reality.",
            symbolEmoji: "🪙",
            colorScheme: "#10B981",
            element: .earth
        ),
        TarotCard(
            id: 65,
            name: "Two of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "2",
            uprightKeywords: ["balance", "adaptability", "priorities", "juggling", "flexibility", "multitasking"],
            uprightMeaning: "The Two of Pentacles represents balance and adaptability. Juggling multiple responsibilities requires flexibility. Stay grounded while managing life's demands.",
            symbolEmoji: "🪙",
            colorScheme: "#059669",
            element: .earth
        ),
        TarotCard(
            id: 66,
            name: "Three of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "3",
            uprightKeywords: ["teamwork", "collaboration", "mastery", "quality", "learning", "implementation"],
            uprightMeaning: "The Three of Pentacles represents teamwork and skilled collaboration. Working together creates quality results. Your expertise and dedication are recognized.",
            symbolEmoji: "🪙",
            colorScheme: "#047857",
            element: .earth
        ),
        TarotCard(
            id: 67,
            name: "Four of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "4",
            uprightKeywords: ["saving", "security", "control", "possession", "scarcity mindset", "holding on"],
            uprightMeaning: "The Four of Pentacles represents security and control over resources. While stability is important, beware of hoarding. Balance saving with generosity.",
            symbolEmoji: "🪙",
            colorScheme: "#065F46",
            element: .earth
        ),
        TarotCard(
            id: 68,
            name: "Five of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "5",
            uprightKeywords: ["hardship", "loss", "isolation", "worry", "poverty", "seeking help", "insecurity"],
            uprightMeaning: "The Five of Pentacles represents hardship and financial worry. Though times are difficult, help is available. Look for the light in the window and ask for support.",
            symbolEmoji: "🪙",
            colorScheme: "#064E3B",
            element: .earth
        ),
        TarotCard(
            id: 69,
            name: "Six of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "6",
            uprightKeywords: ["generosity", "charity", "giving", "receiving", "sharing", "balance", "fairness"],
            uprightMeaning: "The Six of Pentacles represents generosity and balanced giving. Share your abundance with others. Resources flow when we give and receive with grace.",
            symbolEmoji: "🪙",
            colorScheme: "#10B981",
            element: .earth
        ),
        TarotCard(
            id: 70,
            name: "Seven of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "7",
            uprightKeywords: ["patience", "perseverance", "investment", "long-term view", "harvest", "reward"],
            uprightMeaning: "The Seven of Pentacles represents patience and long-term investment. Your efforts are growing, but harvest time hasn't arrived yet. Keep tending your garden.",
            symbolEmoji: "🪙",
            colorScheme: "#059669",
            element: .earth
        ),
        TarotCard(
            id: 71,
            name: "Eight of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "8",
            uprightKeywords: ["craftsmanship", "skill development", "dedication", "quality", "mastery", "diligence"],
            uprightMeaning: "The Eight of Pentacles represents dedication to craft and skill development. Through focused practice, you achieve mastery. Quality work brings satisfaction.",
            symbolEmoji: "🪙",
            colorScheme: "#047857",
            element: .earth
        ),
        TarotCard(
            id: 72,
            name: "Nine of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "9",
            uprightKeywords: ["abundance", "luxury", "self-sufficiency", "independence", "success", "refinement"],
            uprightMeaning: "The Nine of Pentacles represents abundance and self-sufficiency. Your hard work has created prosperity. Enjoy the fruits of your labor and savor success.",
            symbolEmoji: "🪙",
            colorScheme: "#10B981",
            element: .earth
        ),
        TarotCard(
            id: 73,
            name: "Ten of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "10",
            uprightKeywords: ["wealth", "legacy", "family", "long-term success", "contribution", "inheritance"],
            uprightMeaning: "The Ten of Pentacles represents lasting wealth and family legacy. True prosperity includes loved ones. Build something enduring for future generations.",
            symbolEmoji: "🪙",
            colorScheme: "#059669",
            element: .earth
        ),
        TarotCard(
            id: 74,
            name: "Page of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "page",
            uprightKeywords: ["opportunity", "new venture", "manifestation", "study", "ambition", "grounding"],
            uprightMeaning: "The Page of Pentacles represents new opportunities and ambitious plans. A practical venture begins. Study diligently and build solid foundations for success.",
            symbolEmoji: "🪙",
            colorScheme: "#059669",
            element: .earth
        ),
        TarotCard(
            id: 75,
            name: "Knight of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "knight",
            uprightKeywords: ["efficiency", "routine", "reliability", "hard work", "responsibility", "methodical"],
            uprightMeaning: "The Knight of Pentacles represents dedication, reliability, and methodical progress. Slow and steady wins the race. Honor commitments with practical action.",
            symbolEmoji: "🪙",
            colorScheme: "#047857",
            element: .earth
        ),
        TarotCard(
            id: 76,
            name: "Queen of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "queen",
            uprightKeywords: ["practicality", "nurturing", "abundance", "comfort", "security", "down-to-earth"],
            uprightMeaning: "The Queen of Pentacles represents practical nurturing and material abundance. She creates comfort and security for all. Provide for others while caring for yourself.",
            symbolEmoji: "🪙",
            colorScheme: "#065F46",
            element: .earth
        ),
        TarotCard(
            id: 77,
            name: "King of Pentacles",
            arcana: .minor,
            suit: .pentacles,
            rank: "king",
            uprightKeywords: ["abundance", "prosperity", "security", "leadership", "generosity", "success"],
            uprightMeaning: "The King of Pentacles represents mastery of the material world. Through wisdom and hard work, he achieves lasting prosperity. Lead with generosity and practical wisdom.",
            symbolEmoji: "🪙",
            colorScheme: "#064E3B",
            element: .earth
        ),
    ]
}
