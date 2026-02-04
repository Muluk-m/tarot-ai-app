import SwiftUI

struct TarotCardView: View {
    let card: TarotCard

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // Card background
                RoundedRectangle(cornerRadius: CelestialTheme.cardCornerRadius)
                    .fill(
                        LinearGradient(
                            colors: [
                                CelestialTheme.backgroundTertiary,
                                CelestialTheme.backgroundSecondary
                            ],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )

                // Border
                RoundedRectangle(cornerRadius: CelestialTheme.cardCornerRadius)
                    .strokeBorder(
                        LinearGradient(
                            colors: [card.color, card.color.opacity(0.5)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ),
                        lineWidth: 2
                    )

                // Card content
                VStack(spacing: 8) {
                    // Top decoration
                    HStack {
                        Text(card.symbolEmoji)
                            .font(.system(size: geometry.size.width * 0.12))
                        Spacer()
                        if card.arcana == .major {
                            Text("\(card.id)")
                                .font(CelestialTheme.titleFont(size: geometry.size.width * 0.08))
                                .foregroundColor(card.color.opacity(0.7))
                        }
                    }
                    .padding(.horizontal, 12)
                    .padding(.top, 12)

                    Spacer()

                    // Main symbol
                    Text(card.symbolEmoji)
                        .font(.system(size: geometry.size.width * 0.35))
                        .shadow(color: card.color.opacity(0.5), radius: 10)

                    Spacer()

                    // Card name
                    Text(card.name)
                        .font(CelestialTheme.titleFont(size: geometry.size.width * 0.1))
                        .foregroundColor(CelestialTheme.textPrimary)
                        .multilineTextAlignment(.center)
                        .minimumScaleFactor(0.7)
                        .lineLimit(2)
                        .padding(.horizontal, 8)

                    // Suit/Arcana indicator
                    Text(card.arcana == .major ? "Major Arcana" : card.suit?.rawValue.capitalized ?? "")
                        .font(CelestialTheme.bodyFont(size: geometry.size.width * 0.06))
                        .foregroundColor(card.color)
                        .padding(.bottom, 12)
                }
            }
        }
    }
}

#Preview {
    HStack(spacing: 20) {
        TarotCardView(card: MajorArcana.cards[0])
            .frame(width: 150, height: 230)

        TarotCardView(card: Wands.cards[0])
            .frame(width: 150, height: 230)
    }
    .padding()
    .background(CelestialTheme.background)
    .preferredColorScheme(.dark)
}
