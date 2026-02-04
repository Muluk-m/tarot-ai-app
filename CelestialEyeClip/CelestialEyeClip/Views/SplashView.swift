import SwiftUI

struct SplashView: View {
    let onComplete: () -> Void

    @State private var logoScale: CGFloat = 0.5
    @State private var logoOpacity: Double = 0
    @State private var titleOpacity: Double = 0
    @State private var subtitleOpacity: Double = 0
    @State private var buttonOpacity: Double = 0

    var body: some View {
        VStack(spacing: 40) {
            Spacer()

            // Logo/Icon
            ZStack {
                // Glow effect
                Circle()
                    .fill(CelestialTheme.goldGlow)
                    .frame(width: 160, height: 160)
                    .blur(radius: 30)

                // Main icon
                Text("👁")
                    .font(.system(size: 80))
            }
            .scaleEffect(logoScale)
            .opacity(logoOpacity)

            VStack(spacing: 16) {
                Text("Celestial Eye")
                    .font(CelestialTheme.titleFont(size: 36))
                    .foregroundColor(CelestialTheme.gold)
                    .opacity(titleOpacity)

                Text("Discover Your Daily Guidance")
                    .font(CelestialTheme.bodyFont(size: 18))
                    .foregroundColor(CelestialTheme.textSecondary)
                    .opacity(subtitleOpacity)
            }

            Spacer()

            GlowingButton(title: "Begin Your Reading") {
                onComplete()
            }
            .opacity(buttonOpacity)
            .padding(.horizontal, 32)
            .padding(.bottom, 60)
        }
        .onAppear {
            animateIn()
        }
    }

    private func animateIn() {
        withAnimation(.spring(response: 0.8, dampingFraction: 0.6).delay(0.2)) {
            logoScale = 1.0
            logoOpacity = 1.0
        }

        withAnimation(.easeOut(duration: 0.6).delay(0.5)) {
            titleOpacity = 1.0
        }

        withAnimation(.easeOut(duration: 0.6).delay(0.7)) {
            subtitleOpacity = 1.0
        }

        withAnimation(.easeOut(duration: 0.6).delay(1.0)) {
            buttonOpacity = 1.0
        }
    }
}

#Preview {
    SplashView {}
        .preferredColorScheme(.dark)
}
