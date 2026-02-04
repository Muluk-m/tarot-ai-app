# Celestial Eye App Clip

A lightweight iOS App Clip for single card tarot readings. Users can draw a card and view its meaning without downloading the full app.

## Features

- **Single Card Draw**: Tap to draw a random card from the 78-card tarot deck
- **Offline Meanings**: All card interpretations are built-in (no network required)
- **Smooth Animations**: Card shuffle, flip reveal, and pulsing glow effects
- **Haptic Feedback**: Tactile response on card draw and flip
- **Get Full App CTA**: Links to App Store for the complete Celestial Eye experience

## Requirements

- iOS 15.1+
- Xcode 15.0+

## Project Structure

```
CelestialEyeClip/
├── CelestialEyeClip/
│   ├── CelestialEyeClipApp.swift    # App entry point
│   ├── ContentView.swift             # Navigation state machine
│   ├── Models/
│   │   ├── TarotCard.swift          # Card data model
│   │   └── TarotDeck.swift          # Deck shuffle/draw logic
│   ├── Views/
│   │   ├── SplashView.swift         # Welcome screen
│   │   ├── ShuffleView.swift        # Shuffle animation
│   │   ├── CardDrawView.swift       # Tap to draw
│   │   ├── CardRevealView.swift     # Flip reveal
│   │   └── CardDetailView.swift     # Card meaning
│   ├── Components/
│   │   ├── TarotCardView.swift      # Card front display
│   │   ├── CardBackView.swift       # Card back design
│   │   └── GlowingButton.swift      # Animated CTA button
│   ├── Theme/
│   │   └── CelestialTheme.swift     # Colors, fonts, styling
│   └── Data/
│       ├── MajorArcana.swift        # 22 Major Arcana cards
│       ├── Wands.swift              # 14 Wands cards
│       ├── Cups.swift               # 14 Cups cards
│       ├── Swords.swift             # 14 Swords cards
│       └── Pentacles.swift          # 14 Pentacles cards
└── CelestialEyeClip.xcodeproj/
```

## User Flow

```
SplashView → ShuffleView → CardDrawView → CardRevealView → CardDetailView
    │             │              │              │              │
    └─ 2s auto ───┘              │              │              │
                      ┌──────────┘              │              │
                      │      Tap card           │              │
                      └────────────────────────┘              │
                                                   ┌──────────┘
                                                   │  "Draw Again"
                                                   └── back to ShuffleView
```

## Theme

| Element | Color |
|---------|-------|
| Background | #0A0E1A (Deep space black) |
| Gold Accent | #D4AF37 (Celestial gold) |
| Purple Accent | #8B5CF6 (Mystic purple) |
| Text Primary | #F8FAFC (Almost white) |
| Text Secondary | #CBD5E1 (Light gray) |

## Building

### Debug Build

```bash
cd CelestialEyeClip
xcodebuild -scheme CelestialEyeClip -destination 'platform=iOS Simulator,name=iPhone 17 Pro' build
```

### Run in Simulator

1. Open `CelestialEyeClip.xcodeproj` in Xcode
2. Select target device (iPhone simulator)
3. Press Cmd+R to build and run

## Integration with Main App

### Add as Target to Main Workspace

1. Open `ios/CelestialEye.xcworkspace` in Xcode
2. File > Add Files to "CelestialEye"
3. Select `CelestialEyeClip.xcodeproj`
4. Ensure "Copy items if needed" is unchecked

### Configure App Clip Association

1. In the main app target, add App Clip target
2. Configure Associated Domains in both targets:
   - Main App: `applinks:celestial-eye.pages.dev`
   - App Clip: `appclips:celestial-eye.pages.dev`

### Apple App Site Association

Add to `/.well-known/apple-app-site-association` on your website:

```json
{
  "appclips": {
    "apps": ["TEAMID.com.qlj.CelestialEye.Clip"]
  },
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.qlj.CelestialEye",
        "paths": ["*"]
      }
    ]
  }
}
```

## Bundle Identifiers

- **Main App**: `com.qlj.CelestialEye`
- **App Clip**: `com.qlj.CelestialEye.Clip`

## Size

The App Clip is approximately **1.2MB** (well under the 15MB limit).

## Testing

1. Test all 78 cards display correctly
2. Verify shuffle animation is smooth (60fps)
3. Test card flip animation
4. Confirm haptic feedback works
5. Test "Get Full App" link opens App Store
6. Verify dark mode appearance

## Notes

- Uses system serif font instead of custom Cinzel to minimize size
- All card data is embedded (no network calls)
- Pure SwiftUI implementation (no UIKit)
- Supports iOS 15.1+ for wider compatibility
