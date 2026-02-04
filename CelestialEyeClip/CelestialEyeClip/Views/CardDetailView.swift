import SwiftUI

struct CardDetailView: View {
    let card: TarotCard
    let onDrawAgain: () -> Void

    @State private var contentOpacity: Double = 0
    @Environment(\.openURL) private var openURL

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Card display
                ZStack {
                    // Glow
                    RoundedRectangle(cornerRadius: CelestialTheme.cardCornerRadius)
                        .fill(card.color.opacity(0.3))
                        .frame(width: 140, height: 220)
                        .blur(radius: 25)

                    TarotCardView(card: card)
                        .frame(width: 120, height: 190)
                }
                .padding(.top, 20)

                // Card name
                Text(card.name)
                    .font(CelestialTheme.titleFont(size: 32))
                    .foregroundColor(CelestialTheme.gold)
                    .multilineTextAlignment(.center)

                // Arcana & Element
                HStack(spacing: 16) {
                    Text(card.arcanaText)
                        .font(CelestialTheme.bodyFont(size: 14))
                        .foregroundColor(CelestialTheme.textSecondary)

                    if let element = card.elementText {
                        Text("•")
                            .foregroundColor(CelestialTheme.textMuted)
                        Text(element)
                            .font(CelestialTheme.bodyFont(size: 14))
                            .foregroundColor(CelestialTheme.textSecondary)
                    }
                }

                // Keywords
                VStack(spacing: 8) {
                    Text("KEYWORDS")
                        .font(CelestialTheme.bodyFont(size: 12, weight: .semibold))
                        .foregroundColor(CelestialTheme.textMuted)

                    Text(card.keywordsText)
                        .font(CelestialTheme.bodyFont(size: 16, weight: .medium))
                        .foregroundColor(card.color)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                }
                .padding(.vertical, 8)

                // Meaning
                VStack(spacing: 12) {
                    Text("MEANING")
                        .font(CelestialTheme.bodyFont(size: 12, weight: .semibold))
                        .foregroundColor(CelestialTheme.textMuted)

                    Text(card.uprightMeaning)
                        .font(CelestialTheme.bodyFont(size: 17))
                        .foregroundColor(CelestialTheme.textPrimary)
                        .multilineTextAlignment(.center)
                        .lineSpacing(6)
                        .padding(.horizontal, 24)
                }
                .padding(.vertical, 8)

                Divider()
                    .background(CelestialTheme.gold.opacity(0.3))
                    .padding(.horizontal, 40)
                    .padding(.vertical, 16)

                // Action buttons
                VStack(spacing: 16) {
                    GlowingButton(title: "Draw Another Card") {
                        onDrawAgain()
                    }

                    Button(action: openFullApp) {
                        HStack(spacing: 8) {
                            Text("Get Full App")
                                .font(CelestialTheme.bodyFont(size: 16, weight: .semibold))
                            Image(systemName: "arrow.up.right")
                                .font(.system(size: 14, weight: .semibold))
                        }
                        .foregroundColor(CelestialTheme.purple)
                    }
                    .padding(.top, 8)
                }
                .padding(.horizontal, 32)
                .padding(.bottom, 40)
            }
            .opacity(contentOpacity)
        }
        .background(CelestialTheme.background)
        .onAppear {
            withAnimation(.easeOut(duration: 0.5)) {
                contentOpacity = 1
            }
        }
    }

    private func openFullApp() {
        // App Store link for full app
        if let url = URL(string: "https://apps.apple.com/app/celestial-eye/id6740893498") {
            openURL(url)
        }
    }
}

#Preview {
    CardDetailView(card: MajorArcana.cards[0]) {}
        .preferredColorScheme(.dark)
}
