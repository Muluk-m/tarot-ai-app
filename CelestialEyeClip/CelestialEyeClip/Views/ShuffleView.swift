import SwiftUI

struct ShuffleView: View {
    let onComplete: () -> Void

    @State private var isShuffling = false
    @State private var shuffleProgress: CGFloat = 0
    @State private var cardOffsets: [CGSize] = Array(repeating: .zero, count: 20)
    @State private var cardRotations: [Double] = Array(repeating: 0, count: 20)
    @State private var showContinue = false

    private let cardCount = 20

    var body: some View {
        VStack(spacing: 32) {
            Spacer()

            Text("Shuffling the Deck")
                .font(CelestialTheme.titleFont(size: 28))
                .foregroundColor(CelestialTheme.gold)

            Text("Focus on your question...")
                .font(CelestialTheme.bodyFont(size: 16))
                .foregroundColor(CelestialTheme.textSecondary)

            // Shuffle animation area
            ZStack {
                ForEach(0..<cardCount, id: \.self) { index in
                    CardBackView()
                        .frame(width: 60, height: 90)
                        .offset(cardOffsets[index])
                        .rotationEffect(.degrees(cardRotations[index]))
                        .zIndex(Double(index))
                }
            }
            .frame(height: 200)

            Spacer()

            if showContinue {
                GlowingButton(title: "Draw Your Card") {
                    onComplete()
                }
                .padding(.horizontal, 32)
                .transition(.opacity.combined(with: .move(edge: .bottom)))
            }

            Spacer()
                .frame(height: 60)
        }
        .onAppear {
            startShuffleAnimation()
        }
    }

    private func startShuffleAnimation() {
        isShuffling = true

        // Phase 1: Scatter cards
        for i in 0..<cardCount {
            withAnimation(.spring(response: 0.6, dampingFraction: 0.5).delay(Double(i) * 0.02)) {
                let angle = Double(i) * (360.0 / Double(cardCount))
                let radius: CGFloat = 80
                cardOffsets[i] = CGSize(
                    width: cos(angle * .pi / 180) * radius,
                    height: sin(angle * .pi / 180) * radius
                )
                cardRotations[i] = Double.random(in: -30...30)
            }
        }

        // Phase 2: Shuffle motion
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
            for _ in 0..<3 {
                shuffleCards()
            }
        }

        // Phase 3: Collect cards back
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            for i in 0..<cardCount {
                withAnimation(.spring(response: 0.5, dampingFraction: 0.7).delay(Double(i) * 0.02)) {
                    cardOffsets[i] = CGSize(width: CGFloat(i - cardCount/2) * 2, height: 0)
                    cardRotations[i] = 0
                }
            }
        }

        // Show continue button
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                showContinue = true
                isShuffling = false
            }
        }
    }

    private func shuffleCards() {
        for i in 0..<cardCount {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.6).delay(Double(i) * 0.015)) {
                let randomOffset = CGSize(
                    width: CGFloat.random(in: -100...100),
                    height: CGFloat.random(in: -60...60)
                )
                cardOffsets[i] = randomOffset
                cardRotations[i] = Double.random(in: -45...45)
            }
        }
    }
}

#Preview {
    ShuffleView {}
        .preferredColorScheme(.dark)
}
