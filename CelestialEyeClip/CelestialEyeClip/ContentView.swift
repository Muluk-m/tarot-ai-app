import SwiftUI

enum AppScreen {
    case splash
    case shuffle
    case draw
    case reveal
    case detail
}

struct ContentView: View {
    @State private var currentScreen: AppScreen = .splash
    @State private var drawnCard: TarotCard?
    @State private var deck = TarotDeck()

    var body: some View {
        ZStack {
            CelestialTheme.background
                .ignoresSafeArea()

            switch currentScreen {
            case .splash:
                SplashView {
                    withAnimation(.easeInOut(duration: 0.5)) {
                        currentScreen = .shuffle
                    }
                }

            case .shuffle:
                ShuffleView {
                    withAnimation(.easeInOut(duration: 0.5)) {
                        currentScreen = .draw
                    }
                }

            case .draw:
                CardDrawView {
                    drawnCard = deck.drawCard()
                    withAnimation(.easeInOut(duration: 0.3)) {
                        currentScreen = .reveal
                    }
                }

            case .reveal:
                if let card = drawnCard {
                    CardRevealView(card: card) {
                        withAnimation(.easeInOut(duration: 0.5)) {
                            currentScreen = .detail
                        }
                    }
                }

            case .detail:
                if let card = drawnCard {
                    CardDetailView(card: card) {
                        deck.reset()
                        drawnCard = nil
                        withAnimation(.easeInOut(duration: 0.5)) {
                            currentScreen = .shuffle
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
