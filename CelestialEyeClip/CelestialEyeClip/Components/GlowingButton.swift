import SwiftUI

struct GlowingButton: View {
    let title: String
    let action: () -> Void

    @State private var isPressed = false
    @State private var isPulsing = false

    var body: some View {
        Button(action: {
            // Haptic feedback
            let impactFeedback = UIImpactFeedbackGenerator(style: .light)
            impactFeedback.impactOccurred()

            withAnimation(.spring(response: 0.2, dampingFraction: 0.5)) {
                isPressed = true
            }

            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                withAnimation(.spring(response: 0.2, dampingFraction: 0.5)) {
                    isPressed = false
                }
                action()
            }
        }) {
            ZStack {
                // Glow effect
                RoundedRectangle(cornerRadius: CelestialTheme.buttonCornerRadius)
                    .fill(CelestialTheme.goldGlow)
                    .blur(radius: isPulsing ? 15 : 10)
                    .scaleEffect(isPulsing ? 1.05 : 1.0)

                // Button background
                RoundedRectangle(cornerRadius: CelestialTheme.buttonCornerRadius)
                    .fill(
                        LinearGradient(
                            colors: [CelestialTheme.gold, CelestialTheme.goldDark],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )

                // Button text
                Text(title)
                    .font(CelestialTheme.bodyFont(size: 17, weight: .semibold))
                    .foregroundColor(CelestialTheme.background)
            }
            .frame(height: 54)
            .scaleEffect(isPressed ? 0.97 : 1.0)
        }
        .buttonStyle(PlainButtonStyle())
        .onAppear {
            withAnimation(.easeInOut(duration: 2.0).repeatForever(autoreverses: true)) {
                isPulsing = true
            }
        }
    }
}

#Preview {
    VStack(spacing: 20) {
        GlowingButton(title: "Begin Your Reading") {}
        GlowingButton(title: "Draw Another Card") {}
    }
    .padding()
    .background(CelestialTheme.background)
    .preferredColorScheme(.dark)
}
