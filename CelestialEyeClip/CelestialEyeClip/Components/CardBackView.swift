import SwiftUI

struct CardBackView: View {
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
                            colors: [CelestialTheme.gold, CelestialTheme.goldDark],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ),
                        lineWidth: 2
                    )

                // Inner decorative pattern
                VStack {
                    // Top border decoration
                    innerBorder(geometry: geometry)
                        .padding(.top, 8)

                    Spacer()

                    // Center design
                    ZStack {
                        // Outer circle
                        Circle()
                            .strokeBorder(
                                CelestialTheme.gold.opacity(0.5),
                                lineWidth: 1
                            )
                            .frame(
                                width: geometry.size.width * 0.6,
                                height: geometry.size.width * 0.6
                            )

                        // Inner circle
                        Circle()
                            .strokeBorder(
                                CelestialTheme.gold.opacity(0.3),
                                lineWidth: 1
                            )
                            .frame(
                                width: geometry.size.width * 0.4,
                                height: geometry.size.width * 0.4
                            )

                        // Center eye symbol
                        Text("👁")
                            .font(.system(size: geometry.size.width * 0.2))
                            .opacity(0.8)

                        // Star decorations
                        ForEach(0..<8, id: \.self) { index in
                            let angle = Double(index) * 45
                            let radius = geometry.size.width * 0.25
                            Text("✦")
                                .font(.system(size: geometry.size.width * 0.05))
                                .foregroundColor(CelestialTheme.gold.opacity(0.6))
                                .offset(
                                    x: cos(angle * .pi / 180) * radius,
                                    y: sin(angle * .pi / 180) * radius
                                )
                        }
                    }

                    Spacer()

                    // Bottom border decoration
                    innerBorder(geometry: geometry)
                        .rotationEffect(.degrees(180))
                        .padding(.bottom, 8)
                }
            }
        }
    }

    @ViewBuilder
    private func innerBorder(geometry: GeometryProxy) -> some View {
        HStack {
            // Left corner
            Text("✧")
                .font(.system(size: geometry.size.width * 0.08))
                .foregroundColor(CelestialTheme.gold.opacity(0.6))

            // Line
            Rectangle()
                .fill(CelestialTheme.gold.opacity(0.3))
                .frame(height: 1)

            // Center
            Text("☆")
                .font(.system(size: geometry.size.width * 0.1))
                .foregroundColor(CelestialTheme.gold.opacity(0.7))

            // Line
            Rectangle()
                .fill(CelestialTheme.gold.opacity(0.3))
                .frame(height: 1)

            // Right corner
            Text("✧")
                .font(.system(size: geometry.size.width * 0.08))
                .foregroundColor(CelestialTheme.gold.opacity(0.6))
        }
        .padding(.horizontal, 12)
    }
}

#Preview {
    CardBackView()
        .frame(width: 160, height: 250)
        .padding()
        .background(CelestialTheme.background)
        .preferredColorScheme(.dark)
}
