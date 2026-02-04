import Foundation
import SwiftUI

/// Represents a single tarot card
struct TarotCard: Identifiable, Equatable {
    let id: Int
    let name: String
    let arcana: Arcana
    let suit: Suit?
    let rank: String?
    let uprightKeywords: [String]
    let uprightMeaning: String
    let symbolEmoji: String
    let colorScheme: String
    let element: Element?

    enum Arcana: String {
        case major
        case minor
    }

    enum Suit: String {
        case wands
        case cups
        case swords
        case pentacles
    }

    enum Element: String {
        case fire
        case water
        case air
        case earth
    }

    /// Returns the color for this card
    var color: Color {
        Color(hex: colorScheme)
    }

    /// Returns a formatted keywords string
    var keywordsText: String {
        uprightKeywords.joined(separator: " • ")
    }

    /// Returns the arcana display text
    var arcanaText: String {
        switch arcana {
        case .major:
            return "Major Arcana"
        case .minor:
            guard let suit = suit else { return "Minor Arcana" }
            return "Suit of \(suit.rawValue.capitalized)"
        }
    }

    /// Returns the element display text
    var elementText: String? {
        guard let element = element else { return nil }
        switch element {
        case .fire: return "🔥 Fire"
        case .water: return "💧 Water"
        case .air: return "💨 Air"
        case .earth: return "🌍 Earth"
        }
    }
}
