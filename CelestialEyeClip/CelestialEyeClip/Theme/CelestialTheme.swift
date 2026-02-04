import SwiftUI

struct CelestialTheme {
    // MARK: - Colors

    /// Deep space black background
    static let background = Color(hex: "#0A0E1A")

    /// Secondary background for cards/panels
    static let backgroundSecondary = Color(hex: "#151B2E")

    /// Tertiary background for elevated elements
    static let backgroundTertiary = Color(hex: "#1E2638")

    /// Primary gold accent
    static let gold = Color(hex: "#D4AF37")

    /// Light gold for highlights
    static let goldLight = Color(hex: "#F4D03F")

    /// Dark gold for shadows/pressed states
    static let goldDark = Color(hex: "#B8962E")

    /// Mystic purple accent
    static let purple = Color(hex: "#8B5CF6")

    /// Light purple for glows
    static let purpleLight = Color(hex: "#A78BFA")

    /// Celestial cyan
    static let cyan = Color(hex: "#22D3EE")

    /// Primary text (almost white)
    static let textPrimary = Color(hex: "#F8FAFC")

    /// Secondary text (light gray)
    static let textSecondary = Color(hex: "#CBD5E1")

    /// Muted text
    static let textMuted = Color(hex: "#94A3B8")

    // MARK: - Gradients

    static let backgroundGradient = LinearGradient(
        colors: [Color(hex: "#0A0E1A"), Color(hex: "#1E2638")],
        startPoint: .top,
        endPoint: .bottom
    )

    static let goldGradient = LinearGradient(
        colors: [Color(hex: "#D4AF37"), Color(hex: "#F4D03F")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static let cosmicGradient = LinearGradient(
        colors: [Color(hex: "#0A0E1A"), Color(hex: "#1E2638"), Color(hex: "#2E1A47")],
        startPoint: .top,
        endPoint: .bottom
    )

    // MARK: - Shadows

    static let goldGlow = Color(hex: "#D4AF37").opacity(0.4)
    static let purpleGlow = Color(hex: "#8B5CF6").opacity(0.3)

    // MARK: - Typography

    /// Decorative serif font for headings (system serif as fallback for Cinzel)
    static func titleFont(size: CGFloat) -> Font {
        .system(size: size, weight: .bold, design: .serif)
    }

    /// Clean sans-serif for body text
    static func bodyFont(size: CGFloat, weight: Font.Weight = .regular) -> Font {
        .system(size: size, weight: weight, design: .default)
    }

    // MARK: - Dimensions

    static let cornerRadius: CGFloat = 16
    static let cardCornerRadius: CGFloat = 12
    static let buttonCornerRadius: CGFloat = 12
    static let spacing: CGFloat = 16
    static let smallSpacing: CGFloat = 8
}

// MARK: - Color Extension for Hex

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
