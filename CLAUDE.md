<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Celestial Eye** is a cross-platform mobile application (iOS/Android) that provides celestial-powered tarot card readings. Built with Expo, React Native, and TypeScript, it integrates with Dify AI API for generating mystical interpretations of tarot spreads through cosmic wisdom.

**Tech Stack:**
- Expo SDK 54 + Expo Router (file-based routing)
- React Native 0.81.5 with React 19
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- Zustand (state management)
- Dify API (AI-powered interpretations)
- pnpm (package manager)

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android

# Run web version
pnpm web

# Lint code
pnpm lint

# Format code
pnpm format

# Clean and rebuild native projects
pnpm expo:clean
pnpm prebuild
```

## Project Architecture

### Directory Structure

```
app/                      # Expo Router screens (file-based routing)
  ├── (reading)/         # Reading flow group
  │   ├── _layout.tsx    # Reading layout wrapper
  │   └── spread-selection.tsx
  ├── history/           # Reading history screens
  ├── _layout.tsx        # Root layout
  └── index.tsx          # Home screen

src/
  ├── stores/            # Zustand state management
  │   ├── userStore.ts   # User settings, daily limits, preferences
  │   ├── cardStore.ts   # Tarot deck state, card drawing logic
  │   └── readingStore.ts # Current reading session, history
  ├── theme/             # Design system
  │   ├── colors.ts      # Color palette (dark mystic theme)
  │   ├── typography.ts  # Font definitions (Cinzel, Inter)
  │   ├── spacing.ts
  │   └── animations.ts
  ├── constants/
  │   ├── config.ts      # App config, API URLs, feature flags
  │   └── strings.ts     # Localized strings
  ├── data/              # Static data (tarot card definitions)
  ├── services/          # API services (Dify integration)
  ├── components/        # Reusable UI components
  ├── hooks/             # Custom React hooks
  ├── types/             # TypeScript type definitions
  └── utils/             # Helper functions
```

### State Management (Zustand)

Three primary stores manage application state:

**userStore** - User profile and usage limits
- Daily reading limits (3 free, 999 premium)
- User settings (notifications, language, theme)
- Onboarding status

**cardStore** - Tarot deck operations
- 78-card tarot deck (Major + Minor Arcana)
- Fisher-Yates shuffle algorithm
- Card drawing mechanics
- Spread types: 'single' (1 card) or 'three' (past/present/future)

**readingStore** - Reading sessions
- Current active reading
- Reading history with persistence
- AI interpretation results
- Generation state

### Routing (Expo Router)

File-based routing with groups:
- `app/index.tsx` - Home screen with "Daily Card Draw" and "My History" buttons
- `app/(reading)/` - Card reading flow (grouped route)
- `app/history/` - Reading history view

Navigation uses `expo-router` hooks (`useRouter()`, `router.push()`).

### Styling (NativeWind + Tailwind)

Uses NativeWind for Tailwind CSS utility classes in React Native:
- Custom color palette in `tailwind.config.js` (mystic dark theme with gold/purple accents)
- Background colors: `bg-primary` (#0A0E1A), `bg-secondary`, `bg-tertiary`
- Accent colors: `accent-gold` (#D4AF37), `accent-purple` (#8B5CF6)
- Typography: Cinzel (headings), Inter (body)
- Dark mode by default (`userInterfaceStyle: "dark"` in app.json)

Apply styles with `className` prop:
```tsx
<View className="flex-1 items-center bg-bg-primary px-6">
  <Text className="text-4xl font-bold text-accent-gold">Tarot AI</Text>
</View>
```

### API Integration (Dify)

The app integrates with Dify AI API for generating tarot interpretations:
- Configuration in `src/constants/config.ts`
- API URL and key from environment variables (`EXPO_PUBLIC_DIFY_API_URL`, `EXPO_PUBLIC_DIFY_API_KEY`)
- 30-second timeout for API calls
- Implementation in `src/services/` (to be created)

### Data Models

**TarotCard** (78 cards total):
- `id` (0-77), `name`, `arcana` (major/minor)
- Minor arcana: `suit` (wands/cups/swords/pentacles), `rank`
- `uprightKeywords`, `uprightMeaning`
- Visual properties: `iconKey`, `colorScheme`, `symbolEmoji`, `element`

**ReadingRecord**:
- UUID, timestamp, spreadType
- Array of drawn cards with positions (past/present/future)
- AI-generated `interpretation` text
- Favorite flag for bookmarking

## Important Configuration

### Environment Variables
Create `.env` file (not committed to git):
```
EXPO_PUBLIC_DIFY_API_URL=your_dify_api_url
EXPO_PUBLIC_DIFY_API_KEY=your_dify_api_key
```

### Feature Flags
Controlled in `src/constants/config.ts`:
- `enableHistory: true` - Reading history feature
- `enableSharing: false` - User requested no sharing
- `enableNotifications: false` - Future feature
- `enablePremium: false` - Future feature

### Bundle Identifiers
- iOS: `com.qlj.tarotai`
- Android: `com.qlj.tarotai`

## Key Implementation Notes

1. **Daily Limits**: Free users get 3 readings/day, reset at midnight (tracked in userStore)

2. **Card Shuffling**: Uses Fisher-Yates algorithm for cryptographically random shuffles

3. **Persistence**: Use `@react-native-async-storage/async-storage` for storing user data and reading history

4. **Animations**: React Native Reanimated available for smooth animations (worklets plugin configured in babel.config.js)

5. **TypeScript Paths**: `tsconfigPaths` experiment enabled in app.json for import aliases

6. **No Sharing**: Explicitly disabled per user request - don't implement social sharing features

## Development Workflow

1. **Adding New Screens**: Create files in `app/` directory following Expo Router conventions
2. **New State**: Add to appropriate Zustand store or create new store in `src/stores/`
3. **Styling**: Use NativeWind className utilities, extend tailwind.config.js for new colors/styles
4. **API Calls**: Implement in `src/services/`, use axios with configured timeout
5. **Testing on Device**: Use `pnpm start` and scan QR code with Expo Go app

## Building for Production

```bash
# iOS
pnpm prebuild
cd ios && pod install && cd ..
# Open Xcode and build

# Android
pnpm prebuild
cd android && ./gradlew assembleRelease
```

## Troubleshooting

- If native dependencies change, run `pnpm expo:clean` to rebuild native projects
- Metro bundler cache issues: `npx expo start -c`
- iOS simulator issues: `xcrun simctl erase all` to reset simulators
