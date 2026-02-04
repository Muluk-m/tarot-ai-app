import Foundation

/// Manages the tarot deck with shuffling and drawing operations
class TarotDeck: ObservableObject {
    @Published private(set) var shuffledDeck: [TarotCard] = []
    @Published private(set) var drawnCards: [TarotCard] = []

    private let fullDeck: [TarotCard]

    init() {
        // Combine all cards into the full deck
        fullDeck = MajorArcana.cards + Wands.cards + Cups.cards + Swords.cards + Pentacles.cards
        shuffle()
    }

    /// Fisher-Yates shuffle algorithm for secure randomness
    func shuffle() {
        shuffledDeck = fullDeck.shuffled()
        drawnCards = []
    }

    /// Draw a single card from the deck
    func drawCard() -> TarotCard? {
        guard !shuffledDeck.isEmpty else { return nil }
        let card = shuffledDeck.removeFirst()
        drawnCards.append(card)
        return card
    }

    /// Reset the deck for a new reading
    func reset() {
        shuffle()
    }

    /// Number of cards remaining
    var remainingCount: Int {
        shuffledDeck.count
    }

    /// Total cards in deck
    var totalCount: Int {
        fullDeck.count
    }
}
