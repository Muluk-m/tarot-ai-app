# ✨ Tarot AI

<div align="center">

**AI-Powered Mystical Tarot Reading App**

A beautiful cross-platform mobile application that combines the ancient art of tarot with modern AI technology to provide personalized mystical guidance.

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Screenshots](#screenshots) • [Development](#development)

</div>

---

## 📖 Overview

Tarot AI is a React Native mobile application built with Expo that offers AI-powered tarot card readings. Users can perform single card draws or three-card spreads, with interpretations generated using the Dify AI API. The app features smooth animations, an intuitive interface, and persistent reading history.

### Key Highlights

- 🎴 **78-Card Tarot Deck** - Complete Major and Minor Arcana
- 🤖 **AI-Powered Interpretations** - Personalized readings via Dify API
- ✨ **Beautiful Animations** - Smooth card shuffle and flip effects
- 📱 **Cross-Platform** - iOS and Android support
- 🌙 **Dark Mystical Theme** - Immersive user experience
- 💾 **Reading History** - Save and revisit past readings
- 🚫 **No Limits** - Unlimited readings for all users

---

## ✨ Features

### Card Reading Experience

- **Single Card Reading** - Quick daily guidance
- **Three-Card Spread** - Past, Present, Future insights
- **Interactive Card Draw** - Tap to reveal cards with flip animations
- **Smooth Shuffle Animation** - Realistic 2.5-second card shuffling

### AI Integration

- **Dify AI API** - Advanced natural language processing
- **Contextual Interpretations** - Readings tailored to card combinations
- **Real-time Generation** - Instant AI responses

### User Features

- **Reading History** - Browse and revisit past readings
- **Persistent Storage** - All readings saved locally
- **Clean Interface** - Intuitive navigation and controls
- **Dark Mode** - Eye-friendly mystical theme

---

## 🛠 Tech Stack

### Core Framework

- **React Native** 0.81.5 - Cross-platform mobile development
- **Expo SDK** 54 - Development toolchain and native modules
- **TypeScript** 5.9 - Type-safe development
- **React** 19.1.0 - UI framework

### State Management & Data

- **Zustand** 5.0 - Lightweight state management
- **AsyncStorage** - Local data persistence
- **Expo Secure Store** - Sensitive data storage

### Styling & Animation

- **NativeWind** 4.2 - Tailwind CSS for React Native
- **React Native Reanimated** 4.1 - 60fps animations
- **React Native SVG** - Custom card icons
- **Expo Linear Gradient** - Gradient effects

### Navigation & UI

- **Expo Router** 6.0 - File-based routing
- **React Native Screens** - Native screen optimization
- **React Native Safe Area Context** - Safe area handling

### API & Networking

- **Axios** - HTTP client for Dify API
- **Expo Crypto** - UUID generation
- **React Native NetInfo** - Network status detection

### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and pnpm
- **Expo CLI** (installed automatically)
- **iOS Simulator** (macOS) or **Android Emulator**
- **Expo Go** app (for device testing)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd expo-tarot-ai-new
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_DIFY_API_URL=your_dify_api_url
EXPO_PUBLIC_DIFY_API_KEY=your_dify_api_key
```

4. **Start the development server**

```bash
pnpm start
```

### Running on Device/Simulator

**Option 1: Expo Go (Recommended for Quick Testing)**

1. Install **Expo Go** from App Store or Google Play
2. Scan the QR code from the terminal
3. App loads instantly - no build required

**Option 2: iOS Simulator**

```bash
pnpm ios
```

**Option 3: Android Emulator**

```bash
pnpm android
```

**Option 4: Physical Device (Development Build)**

```bash
# iOS
npx expo run:ios --device <device-udid>

# Android
npx expo run:android --device <device-id>
```

---

## 📱 Usage

### Performing a Reading

1. **Launch the app** - You'll see the home screen with two options
2. **Select "Daily Card Draw"** - Choose your reading type
3. **Pick a spread**:
   - **Single Card** - Quick guidance
   - **Three-Card Spread** - Detailed past/present/future reading
4. **Watch the shuffle animation** - Cards shuffle automatically (or skip)
5. **Tap to reveal cards** - Interactive card flip animations
6. **Get AI Reading** - Receive your personalized interpretation
7. **View anytime** - Access reading history from the home screen

### Reading History

- Tap **"My History"** from the home screen
- Browse all past readings with timestamps
- Tap any reading to view full interpretation
- Mark favorites (star icon)
- Delete unwanted readings

---

## 🏗 Project Structure

```
expo-tarot-ai-new/
├── app/                          # Expo Router screens
│   ├── (reading)/               # Reading flow group
│   │   ├── spread-selection.tsx # Choose spread type
│   │   ├── shuffle.tsx          # Shuffle animation
│   │   ├── draw-simple.tsx      # Interactive card drawing
│   │   └── result.tsx           # AI interpretation display
│   ├── history/                 # Reading history
│   │   ├── index.tsx           # History list
│   │   └── [id].tsx            # Reading detail
│   ├── _layout.tsx             # Root layout
│   └── index.tsx               # Home screen
├── src/
│   ├── components/             # Reusable components
│   │   ├── reading/           # Reading-specific components
│   │   └── tarot/             # Card display & icons
│   ├── data/                  # Static data
│   │   ├── tarot-deck.ts     # 78-card database
│   │   ├── major-arcana.ts   # 22 Major Arcana cards
│   │   ├── wands.ts          # 14 Wands cards
│   │   ├── cups.ts           # 14 Cups cards
│   │   ├── swords.ts         # 14 Swords cards
│   │   ├── pentacles.ts      # 14 Pentacles cards
│   │   └── spreads.ts        # Spread configurations
│   ├── hooks/                # Custom React hooks
│   │   ├── useAppInitialization.ts
│   │   ├── usePersistence.ts
│   │   ├── useShuffleAnimation.ts
│   │   └── useCardFlip.ts
│   ├── services/             # External services
│   │   ├── difyService.ts   # Dify API integration
│   │   └── storageService.ts # AsyncStorage wrapper
│   ├── stores/              # Zustand state stores
│   │   ├── cardStore.ts    # Card deck & drawing logic
│   │   ├── readingStore.ts # Reading session & history
│   │   └── userStore.ts    # User settings & preferences
│   ├── theme/              # Design system
│   │   ├── colors.ts      # Color palette
│   │   ├── typography.ts  # Font definitions
│   │   ├── spacing.ts     # Spacing constants
│   │   └── animations.ts  # Animation timings
│   ├── types/             # TypeScript definitions
│   └── utils/             # Helper functions
├── assets/                # Images, fonts, icons
├── .env                   # Environment variables (gitignored)
├── app.json              # Expo configuration
├── tailwind.config.js    # Tailwind/NativeWind config
└── package.json          # Dependencies
```

---

## 🎨 Design System

### Color Palette

**Mystical Dark Theme**

```typescript
Background:
- Primary: #0A0E1A (Deep Navy)
- Secondary: #151B2E
- Tertiary: #1E2638

Accents:
- Gold: #D4AF37 (Mystical gold)
- Purple: #8B5CF6 (Cosmic purple)
- Cyan: #22D3EE (Ethereal cyan)

Text:
- Primary: #F8FAFC (White)
- Secondary: #CBD5E1 (Light gray)
- Tertiary: #94A3B8 (Medium gray)
```

### Typography

- **Headings**: Bold, 28-36px
- **Body**: Regular, 14-18px
- **Captions**: 12-13px

### Animation Timings

- **Shuffle Animation**: 2500ms
- **Card Flip**: 600ms
- **Fade In/Out**: 300ms

---

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm start              # Start Expo dev server
pnpm ios                # Run on iOS simulator
pnpm android            # Run on Android emulator
pnpm web                # Run web version

# Code Quality
pnpm lint               # Lint code
pnpm format             # Format code with Prettier

# Building
pnpm prebuild           # Generate native code
pnpm expo:clean         # Clean and regenerate native code
```

### Key Development Practices

1. **File-Based Routing** - Use Expo Router conventions for navigation
2. **Type Safety** - All components and functions are fully typed
3. **State Management** - Use Zustand stores for global state
4. **Animations** - Use Reanimated for 60fps animations
5. **Styling** - Use NativeWind for consistent Tailwind-style classes

### Adding New Features

**Example: Adding a New Spread Type**

1. Define spread in `src/data/spreads.ts`
2. Update `SpreadType` in `src/stores/cardStore.ts`
3. Add UI option in `app/(reading)/spread-selection.tsx`
4. Update prompt formatting in `src/services/difyService.ts`

---

## 🔮 Tarot Card Database

The app includes a complete 78-card tarot deck:

### Major Arcana (22 cards)
0-21: The Fool, The Magician, The High Priestess, The Empress, The Emperor, The Hierophant, The Lovers, The Chariot, Strength, The Hermit, Wheel of Fortune, Justice, The Hanged Man, Death, Temperance, The Devil, The Tower, The Star, The Moon, The Sun, Judgement, The World

### Minor Arcana (56 cards)

Each suit contains:
- **Number Cards**: Ace through 10
- **Court Cards**: Page, Knight, Queen, King

**Suits**:
- 🔥 **Wands** (Fire) - Action, passion, creativity
- 💧 **Cups** (Water) - Emotions, relationships, intuition
- ⚔️ **Swords** (Air) - Intellect, conflict, truth
- 💰 **Pentacles** (Earth) - Material, health, finances

---

## 🤖 AI Integration

### Dify API Configuration

The app uses Dify's chat completion API in **blocking mode** for reliable responses.

**API Request Format**:
```typescript
{
  inputs: {},
  query: "<formatted tarot reading prompt>",
  response_mode: "blocking",
  user: "tarot-app-user"
}
```

**Prompt Structure**:
```
[Spread Type: Single Card Reading / Three-Card Spread]

[Position]: [Card Name]
Keywords: [card keywords]
Meaning: [card meaning]

Please provide a mystical and insightful interpretation...
```

---

## 📦 Build & Deploy

### iOS Build (via Xcode)

1. Open project in Xcode:
   ```bash
   open ios/tarotai.xcworkspace
   ```

2. Configure signing in **Signing & Capabilities**
3. Select your Team
4. Connect device and click Run (▶️)

### Android Build

```bash
cd android
./gradlew assembleRelease
```

APK located at: `android/app/build/outputs/apk/release/`

### EAS Build (Recommended for Production)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Black screen on launch**
- **Solution**: Delete any `App.tsx` in root (Expo Router uses `app/_layout.tsx`)

**Issue: Buttons not visible**
- **Solution**: Check if using colors from `@/theme/colors`, verify imports

**Issue: Animation crashes**
- **Solution**: Ensure React Native Reanimated is properly configured in `babel.config.js`

**Issue: UUID generation error**
- **Solution**: Always import from `@/utils/uuid`, not directly from `uuid` package

**Issue: Build fails with signing error**
- **Solution**: Configure Team in Xcode → Signing & Capabilities

---

## 📄 License

This project is for educational and personal use.

---

## 🙏 Acknowledgments

- **Tarot Card Meanings**: Traditional Rider-Waite interpretations
- **AI Technology**: Powered by Dify AI API
- **Design Inspiration**: Mystical and cosmic aesthetics
- **Built with**: Expo, React Native, and the amazing open-source community

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue in the repository
- Check existing documentation
- Review troubleshooting section

---

<div align="center">

**✨ For entertainment purposes only ✨**

Made with 💜 and ✨ magic

</div>
