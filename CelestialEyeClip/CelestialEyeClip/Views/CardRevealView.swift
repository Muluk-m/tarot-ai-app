import SwiftUI

struct CardRevealView: View {
    let card: TarotCard
    let onComplete: () -> Void

    @State private var isFlipped = false
    @State private var rotationAngle: Double = 0

    var body: some View {
        VStack(spacing: 32) {
            Spacer()

            Text("Your Card")
                .font(CelestialTheme.titleFont(size: 28))
                .foregroundColor(CelestialTheme.gold)

            Spacer()
                .frame(height: 20)

            // Flipping card
            ZStack {
                // Glow effect
                RoundedRectangle(cornerRadius: CelestialTheme.cardCornerRadius)
                    .fill(card.color.opacity(0.3))
                    .frame(width: 200, height: 310)
                    .blur(radius: 30)
                    .opacity(isFlipped ? 1 : 0)

                // Card (3D flip)
                ZStack {
                    // Back of card
                    CardBackView()
                        .frame(width: 180, height: 280)
                        .opacity(rotationAngle < 90 ? 1 : 0)

                    // Front of card
                    TarotCardView(card: card)
                        .frame(width: 180, height: 280)
                        .rotation3DEffect(
                            .degrees(180),
                            axis: (x: 0, y: 1, z: 0)
                        )
                        .opacity(rotationAngle >= 90 ? 1 : 0)
                }
                .rotation3DEffect(
                    .degrees(rotationAngle),
                    axis: (x: 0, y: 1, z: 0),
                    perspective: 0.5
                )
            }

            Spacer()

            if isFlipped {
                GlowingButton(title: "View Meaning") {
                    onComplete()
                }
                .padding(.horizontal, 32)
                .transition(.opacity.combined(with: .move(edge: .bottom)))
            }

            Spacer()
                .frame(height: 60)
        }
        .onAppear {
            flipCard()
        }
    }

    private func flipCard() {
        // Haptic feedback
        let impactFeedback = UIImpactFeedbackGenerator(style: .heavy)

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            impactFeedback.impactOccurred()

            withAnimation(.spring(response: 0.6, dampingFraction: 0.7)) {
                rotationAngle = 180
            }

            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                impactFeedback.impactOccurred()
            }

            DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
                withAnimation(.easeOut(duration: 0.4)) {
                    isFlipped = true
                }
            }
        }
    }
}

#Preview {
    CardRevealView(card: MajorArcana.cards[0]) {}
        .preferredColorScheme(.dark)
}
