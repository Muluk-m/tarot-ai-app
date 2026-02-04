import SwiftUI

struct CardDrawView: View {
    let onDraw: () -> Void

    @State private var isPulsing = false
    @State private var cardScale: CGFloat = 1.0

    var body: some View {
        VStack(spacing: 32) {
            Spacer()

            Text("Your Card Awaits")
                .font(CelestialTheme.titleFont(size: 28))
                .foregroundColor(CelestialTheme.gold)

            Text("Tap the card to reveal your guidance")
                .font(CelestialTheme.bodyFont(size: 16))
                .foregroundColor(CelestialTheme.textSecondary)

            Spacer()
                .frame(height: 20)

            // Tappable card
            ZStack {
                // Pulsing glow
                RoundedRectangle(cornerRadius: CelestialTheme.cardCornerRadius)
                    .fill(CelestialTheme.goldGlow)
                    .frame(width: 180, height: 280)
                    .blur(radius: isPulsing ? 25 : 15)
                    .scaleEffect(isPulsing ? 1.1 : 1.0)
                    .animation(
                        .easeInOut(duration: 1.5).repeatForever(autoreverses: true),
                        value: isPulsing
                    )

                CardBackView()
                    .frame(width: 160, height: 250)
                    .scaleEffect(cardScale)
            }
            .onTapGesture {
                withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                    cardScale = 0.95
                }

                // Haptic feedback
                let impactFeedback = UIImpactFeedbackGenerator(style: .medium)
                impactFeedback.impactOccurred()

                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                    onDraw()
                }
            }

            Spacer()

            Text("Tap to draw")
                .font(CelestialTheme.bodyFont(size: 14))
                .foregroundColor(CelestialTheme.textMuted)
                .padding(.bottom, 60)
        }
        .onAppear {
            isPulsing = true
        }
    }
}

#Preview {
    CardDrawView {}
        .preferredColorScheme(.dark)
}
