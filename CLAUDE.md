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

**Celestial Eye** is a cross-platform mobile application (iOS/Android/Web) that provides AI-powered tarot card readings with mystical interpretations. Built with Expo, React Native, and TypeScript, it integrates with Dify AI API for generating celestial-guided tarot spread interpretations.

**Tech Stack:**
- Expo SDK 54 + Expo Router v6 (file-based routing)
- React Native 0.81.5 with React 19
- TypeScript with strict mode enabled
- NativeWind (Tailwind CSS for React Native)
- Zustand (state management with persistence)
- React Native Reanimated (animations)
- Dify AI API (tarot interpretations)
- pnpm (package manager)

## Commands

### Development
- `pnpm install` - Install dependencies
- `pnpm start` - Start Expo development server with QR code
- `pnpm ios` - Run on iOS simulator (requires Xcode)
- `pnpm android` - Run on Android emulator (requires Android Studio)
- `pnpm web` - Run web version in browser
- `pnpm prebuild` - Generate native iOS and Android directories

### Code Quality
- `pnpm lint` - Run ESLint and Prettier checks
- `pnpm format` - Auto-fix ESLint issues and format code with Prettier
- `pnpm expo:clean` - Clean and rebuild native projects (use when native dependencies change)

### Testing & Debugging
- `npx expo start -c` - Start with cleared Metro bundler cache
- `npx expo start --tunnel` - Start with tunnel for testing on physical devices

## Architecture Overview

### Core Technology Stack

**React Native + Expo SDK 54**
- File-based routing with Expo Router v6
- TypeScript strict mode for type safety
- React 19 with modern hooks and patterns
- Native modules: Haptics, Blur, Linear Gradient, Secure Store

**State Management**
- Zustand for global state management
- AsyncStorage for persistence layer
- Zustand persist middleware for auto-saving
- No Redux or Context API complexity

**Styling System**
- NativeWind v4 for Tailwind CSS utilities
- Dark mystic theme with gold/purple accents
- Custom design tokens in tailwind.config.js
- React Native Reanimated for smooth animations

**API Integration**
- Dify AI API for tarot interpretations
- Axios for HTTP requests with 30s timeout
- Streaming support for real-time AI responses
- NetInfo for offline detection

### Directory Structure

```
app/                      # Expo Router screens (file-based routing)
  ├── (reading)/         # Reading flow group (parentheses = layout group)
  │   ├── _layout.tsx    # Reading layout wrapper with header
  │   ├── spread-selection.tsx  # Choose single/three-card spread
  │   ├── shuffle.tsx    # Shuffle animation screen
  │   ├── draw.tsx       # Card drawing interface
  │   └── result.tsx     # Show cards and AI interpretation
  ├── history/           # Reading history screens
  │   ├── index.tsx      # List all past readings
  │   └── [id].tsx       # Dynamic route for individual reading
  ├── _layout.tsx        # Root layout (fonts, providers, navigation)
  └── index.tsx          # Home screen with main actions

src/
  ├── stores/            # Zustand state management
  │   ├── userStore.ts   # User settings, daily limits, preferences
  │   ├── cardStore.ts   # Tarot deck state, card drawing logic
  │   └── readingStore.ts # Current reading session, history
  ├── theme/             # Design system tokens
  │   ├── colors.ts      # Color palette (#0A0E1A primary, #D4AF37 gold)
  │   ├── typography.ts  # Font definitions (Cinzel, Inter)
  │   ├── spacing.ts     # Spacing scale (4px base unit)
  │   ├── shadows.ts     # Shadow presets for depth
  │   └── animations.ts  # Reanimated animation configs
  ├── constants/
  │   ├── config.ts      # App config, API URLs, feature flags
  │   └── strings.ts     # User-facing text (future i18n support)
  ├── data/              # Static tarot card definitions
  │   ├── tarot-deck.ts  # Master deck (78 cards)
  │   ├── major-arcana.ts # 22 Major Arcana cards
  │   ├── wands.ts       # 14 Wands suit cards
  │   ├── cups.ts        # 14 Cups suit cards
  │   ├── swords.ts      # 14 Swords suit cards
  │   ├── pentacles.ts   # 14 Pentacles suit cards
  │   └── spreads.ts     # Spread type definitions
  ├── services/          # API and storage services
  │   ├── difyService.ts # Dify AI API integration
  │   ├── storageService.ts # AsyncStorage wrapper
  │   └── index.ts       # Service exports
  ├── components/        # Reusable UI components
  │   └── index.ts       # Component exports
  ├── hooks/             # Custom React hooks
  │   ├── useAppInitialization.ts # App startup logic
  │   ├── useCardFlip.ts # Card flip animation
  │   ├── useShuffleAnimation.ts # Shuffle animation
  │   ├── useTypewriter.ts # Typewriter text effect
  │   ├── usePersistence.ts # State persistence
  │   └── index.ts       # Hook exports
  ├── types/             # TypeScript type definitions
  │   ├── tarot.types.ts # Tarot card and reading types
  │   └── api.types.ts   # API request/response types
  └── utils/             # Helper functions
      └── uuid.ts        # UUID generation for readings

assets/                   # Static assets
  ├── logo.png          # App logo (1024x1024)
  ├── icon.png          # iOS/Android icon (1024x1024)
  ├── adaptive-icon.png # Android adaptive icon (1024x1024)
  ├── favicon.png       # Web favicon (48x48)
  └── splash.png        # Splash screen image
```

### State Management (Zustand)

The app uses Zustand for lightweight, performant state management. Three primary stores handle all application state:

#### userStore - User Profile and Limits
**Purpose**: Track user settings, reading quotas, and preferences

**State:**
- `dailyReadingsUsed`: Number of readings used today (resets at midnight)
- `maxDailyReadings`: Reading limit (3 for free, 999 for premium)
- `isPremium`: Premium subscription status
- `lastReadingDate`: Date of last reading (for daily reset logic)
- `settings`: User preferences (notifications, language, theme)
- `onboardingCompleted`: First-time user experience flag

**Actions:**
- `incrementReadingsUsed()`: Increment counter after reading
- `resetDailyReadings()`: Reset counter at midnight
- `updateSettings()`: Update user preferences
- `completeOnboarding()`: Mark onboarding as done

**Persistence**: Auto-saved to AsyncStorage via Zustand persist middleware

#### cardStore - Tarot Deck Operations
**Purpose**: Manage the 78-card tarot deck and card drawing mechanics

**State:**
- `deck`: Full 78-card tarot deck (Major + Minor Arcana)
- `shuffledDeck`: Current shuffled card order
- `drawnCards`: Cards drawn in current reading
- `spreadType`: 'single' (1 card) or 'three' (past/present/future)
- `isShuffling`: Animation state flag

**Actions:**
- `shuffleDeck()`: Fisher-Yates shuffle algorithm for random order
- `drawCard()`: Draw next card from shuffled deck
- `drawMultipleCards(count)`: Draw N cards at once
- `resetDeck()`: Clear drawn cards, reshuffle for new reading
- `setSpreadType(type)`: Set single or three-card spread

**Card Shuffle Algorithm**: Uses Fisher-Yates (Knuth) shuffle with `expo-crypto` for cryptographically secure randomness

#### readingStore - Reading Sessions and History
**Purpose**: Manage current reading and historical record persistence

**State:**
- `currentReading`: Active reading in progress
  - `id`: UUID identifier
  - `timestamp`: ISO date string
  - `spreadType`: 'single' or 'three'
  - `cards`: Array of drawn cards with positions
  - `interpretation`: AI-generated text (null until complete)
  - `isFavorite`: Bookmark flag
- `readingHistory`: Array of past readings (newest first)
- `isGenerating`: AI interpretation loading state

**Actions:**
- `startNewReading(spreadType)`: Initialize new reading session
- `addCardsToReading(cards)`: Add drawn cards to current reading
- `setInterpretation(text)`: Save AI interpretation result
- `saveReading()`: Save current reading to history
- `deleteReading(id)`: Remove reading from history
- `toggleFavorite(id)`: Bookmark/unbookmark reading
- `clearHistory()`: Delete all past readings

**Persistence**: History auto-saved to AsyncStorage, max 100 readings retained

### Routing (Expo Router v6)

File-based routing system where file structure defines navigation routes.

**Route Groups** (parentheses):
- `app/(reading)/` - Grouped routes share layout, not part of URL path
- Layout file: `app/(reading)/_layout.tsx` provides shared header/navigation

**Dynamic Routes** (square brackets):
- `app/history/[id].tsx` - Matches `/history/abc-123-def-456`
- Access param: `const { id } = useLocalSearchParams()`

**Navigation Patterns:**
```tsx
import { useRouter } from 'expo-router'

const router = useRouter()

// Push new screen
router.push('/history')
router.push({ pathname: '/(reading)/spread-selection' })

// Go back
router.back()

// Replace (no back button)
router.replace('/index')

// Navigate with params
router.push({ pathname: '/history/[id]', params: { id: 'reading-123' } })
```

**Screen Flow:**
1. `app/index.tsx` - Home (start reading / view history)
2. `app/(reading)/spread-selection.tsx` - Choose spread type
3. `app/(reading)/shuffle.tsx` - Shuffle animation
4. `app/(reading)/draw.tsx` - Draw cards
5. `app/(reading)/result.tsx` - Show interpretation

**Important Rules:**
- Use `expo-router` APIs, NOT `react-navigation` directly
- All screens automatically have header unless `headerShown: false`
- Set screen options in `_layout.tsx` when possible (avoid layout shifts)
- Use `router.push()` for forward nav, `router.back()` for backward nav

### Styling (NativeWind + Tailwind CSS)

NativeWind v4 brings Tailwind CSS utilities to React Native with full TypeScript support.

#### Color Palette (Dark Mystic Theme)

**Backgrounds:**
- `bg-bg-primary` - #0A0E1A (deep space black)
- `bg-bg-secondary` - #1A1F2E (dark navy)
- `bg-bg-tertiary` - #2A2F3E (lighter slate)

**Accents:**
- `bg-accent-gold` / `text-accent-gold` - #D4AF37 (celestial gold)
- `bg-accent-purple` / `text-accent-purple` - #8B5CF6 (mystic purple)
- `bg-accent-blue` - #60A5FA (crystal blue)

**Text:**
- `text-text-primary` - #FFFFFF (pure white)
- `text-text-secondary` - #9CA3AF (muted gray)
- `text-text-muted` - #6B7280 (faded gray)

**Borders & Dividers:**
- `border-border-primary` - #374151 (subtle divider)
- `border-border-accent` - #D4AF37 (highlighted border)

#### Typography

**Fonts:**
- **Cinzel** - Decorative serif for headings, mystical titles
- **Inter** - Clean sans-serif for body text, UI elements

**Usage:**
```tsx
<Text className="font-cinzel text-4xl text-accent-gold">
  Celestial Eye
</Text>

<Text className="font-inter text-base text-text-secondary">
  Draw your daily card
</Text>
```

**Size Scale:**
- `text-xs` - 12px (captions, labels)
- `text-sm` - 14px (secondary text)
- `text-base` - 16px (body text)
- `text-lg` - 18px (emphasized text)
- `text-xl` - 20px (section headers)
- `text-2xl` - 24px (screen titles)
- `text-3xl` - 30px (hero text)
- `text-4xl` - 36px (large headings)

#### Spacing & Layout

**Margin/Padding Scale** (4px base unit):
- `p-1` / `m-1` - 4px
- `p-2` / `m-2` - 8px
- `p-4` / `m-4` - 16px
- `p-6` / `m-6` - 24px
- `p-8` / `m-8` - 32px
- `p-12` / `m-12` - 48px

**Common Patterns:**
```tsx
// Full-screen container with safe area
<View className="flex-1 bg-bg-primary">
  <SafeAreaView className="flex-1">
    {/* Content */}
  </SafeAreaView>
</View>

// Centered content with padding
<View className="flex-1 items-center justify-center px-6">
  {/* Centered elements */}
</View>

// Card with border and shadow
<View className="rounded-2xl border border-border-accent bg-bg-secondary p-6">
  {/* Card content */}
</View>
```

#### Animations (React Native Reanimated)

Use `react-native-reanimated` for smooth 60fps animations.

**Available Hooks:**
- `useShuffleAnimation()` - Card shuffle rotation/scale
- `useCardFlip()` - Card flip reveal animation
- `useTypewriter()` - Typewriter text effect

**Example:**
```tsx
import { useCardFlip } from '@/hooks'
import Animated from 'react-native-reanimated'

const CardComponent = ({ card, isRevealed }) => {
  const { animatedStyle, flipCard } = useCardFlip()

  return (
    <Animated.View style={animatedStyle}>
      {/* Card content */}
    </Animated.View>
  )
}
```

**Animation Config** (in `src/theme/animations.ts`):
- Spring animations with `withSpring()` for natural feel
- Timing animations with `withTiming()` for precise control
- Default duration: 300ms
- Default easing: ease-in-out

### API Integration (Dify AI)

The app integrates with Dify AI API for generating mystical tarot interpretations.

#### Configuration

**Environment Variables** (`.env` file, not committed):
```bash
EXPO_PUBLIC_DIFY_API_URL=https://api.dify.ai/v1
EXPO_PUBLIC_DIFY_API_KEY=your_api_key_here
```

**Config File** (`src/constants/config.ts`):
```typescript
export const DIFY_CONFIG = {
  apiUrl: process.env.EXPO_PUBLIC_DIFY_API_URL,
  apiKey: process.env.EXPO_PUBLIC_DIFY_API_KEY,
  timeout: 30000, // 30 seconds
  conversationMode: 'blocking', // Wait for full response
}
```

#### API Service (`src/services/difyService.ts`)

**Main Function:**
```typescript
export async function generateTarotInterpretation(
  cards: TarotCard[],
  spreadType: SpreadType,
  question?: string
): Promise<string>
```

**Request Format:**
- Endpoint: `POST /chat-messages`
- Headers: `Authorization: Bearer ${apiKey}`
- Body: User query with card details and positions

**Response Handling:**
- Streaming: Listen for SSE events, concatenate text chunks
- Blocking: Wait for complete response in single API call
- Error handling: Retry logic with exponential backoff
- Timeout: 30s limit, fallback to generic interpretation if exceeded

**Offline Detection:**
- Use `@react-native-community/netinfo` to check connectivity
- Show "You're offline" message before API call
- Cache last interpretation for offline viewing

#### Data Models

**TarotCard** (78 cards total):
```typescript
interface TarotCard {
  // Core identification
  id: number                    // 0-77 unique identifier
  name: string                  // "The Fool", "Two of Cups", etc.
  arcana: 'major' | 'minor'    // Major (22) or Minor (56) Arcana

  // Minor Arcana specific
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'
  rank?: string                // 'ace', '2'-'10', 'page', 'knight', 'queen', 'king'

  // Meanings
  uprightKeywords: string[]    // ["new beginnings", "spontaneity", "innocence"]
  uprightMeaning: string       // Full upright interpretation
  reversedKeywords?: string[]  // Future feature
  reversedMeaning?: string     // Future feature

  // Visual properties
  iconKey: string              // Icon identifier for rendering
  colorScheme: string          // Hex color for card theme
  symbolEmoji: string          // Unicode emoji representation
  element?: 'fire' | 'water' | 'air' | 'earth'  // Elemental association
}
```

**Spread Types:**
```typescript
type SpreadType = 'single' | 'three'

interface SpreadConfig {
  type: SpreadType
  cardCount: number
  positions: string[]
}

// Examples:
// Single: { type: 'single', cardCount: 1, positions: ['Daily Card'] }
// Three: { type: 'three', cardCount: 3, positions: ['Past', 'Present', 'Future'] }
```

**Reading Record:**
```typescript
interface ReadingRecord {
  // Identification
  id: string                   // UUID v4
  timestamp: string            // ISO 8601 date string

  // Reading data
  spreadType: SpreadType       // 'single' or 'three'
  cards: DrawnCard[]           // Cards with positions
  interpretation: string | null // AI-generated text (null if in progress)
  question?: string            // Optional user question

  // User actions
  isFavorite: boolean          // Bookmark flag

  // Metadata
  generationTimeMs?: number    // AI response time tracking
}

interface DrawnCard {
  card: TarotCard             // Full card data
  position: string            // "Past", "Present", "Future", or "Daily Card"
  isReversed: boolean         // Orientation (future feature)
}
```

**API Request/Response Types:**
```typescript
// Request
interface DifyRequest {
  inputs: {
    cards: string              // Formatted card list
    spread: string             // Spread type description
    question?: string          // Optional user question
  }
  query: string                // Full prompt text
  response_mode: 'blocking' | 'streaming'
  user: string                 // User identifier (can be device ID)
  conversation_id?: string     // For multi-turn conversations
}

// Response
interface DifyResponse {
  answer: string               // AI-generated interpretation
  conversation_id: string      // For follow-up questions
  message_id: string           // Unique message identifier
  created_at: number           // Unix timestamp
}
```

### Important Configuration

#### Bundle Identifiers
- **iOS**: `com.qlj.CelestialEye`
- **Android**: `com.qlj.CelestialEye`
- **Scheme**: `tarot-ai://` (for deep linking)

#### Feature Flags (`src/constants/config.ts`)
```typescript
export const FEATURES = {
  enableHistory: true,           // Reading history feature (implemented)
  enableSharing: false,          // Social sharing (explicitly disabled by user)
  enableNotifications: false,    // Daily reminder notifications (future)
  enablePremium: false,          // Premium subscriptions (future)
  enableReversedCards: false,    // Reversed card interpretations (future)
  enableCustomSpreads: false,    // User-defined spreads (future)
}
```

#### App Configuration
```typescript
export const APP_CONFIG = {
  // Reading limits
  freeDailyReadings: 3,
  premiumDailyReadings: 999,
  maxHistorySize: 100,           // Keep last 100 readings

  // UI
  defaultTheme: 'dark',
  animationDuration: 300,         // ms
  shuffleAnimationDuration: 2000, // ms
  typewriterSpeed: 30,            // characters per second

  // Storage keys
  storageKeys: {
    userStore: '@CelestialEye:user',
    cardStore: '@CelestialEye:cards',
    readingStore: '@CelestialEye:readings',
  },
}
```

## Development Guidelines

### Code Style and Conventions

**Indentation**: Use 2 spaces (configured in .editorconfig and Prettier)

**Import Order**:
```typescript
// 1. React/React Native imports
import React, { useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'

// 2. Third-party libraries
import { useRouter } from 'expo-router'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

// 3. Local imports (use @ alias)
import { useCardStore, useReadingStore } from '@/stores'
import { TarotCard } from '@/types/tarot.types'
import { CardComponent } from '@/components'
```

**TypeScript**:
- Strict mode enabled - all code must be properly typed
- Avoid `any` type - use `unknown` if truly necessary
- Use type inference where possible, explicit types for public APIs
- Export types alongside implementations

**Naming Conventions**:
- Components: PascalCase (`CardDisplay.tsx`)
- Hooks: camelCase with 'use' prefix (`useCardFlip.ts`)
- Stores: camelCase with 'Store' suffix (`cardStore.ts`)
- Types: PascalCase (`TarotCard`, `ReadingRecord`)
- Constants: SCREAMING_SNAKE_CASE (`MAX_DAILY_READINGS`)

### Component Patterns

**Functional Components with TypeScript**:
```typescript
import React from 'react'
import { View, Text } from 'react-native'

interface CardProps {
  card: TarotCard
  onPress?: () => void
  isRevealed?: boolean
}

export const Card: React.FC<CardProps> = ({
  card,
  onPress,
  isRevealed = false
}) => {
  return (
    <View className="rounded-xl border border-border-accent p-4">
      <Text className="font-cinzel text-xl text-accent-gold">
        {card.name}
      </Text>
    </View>
  )
}
```

**Custom Hooks**:
```typescript
import { useState, useEffect } from 'react'

/**
 * Custom hook for managing card flip animation state.
 *
 * @param duration - Animation duration in milliseconds
 * @returns Flip state and control functions
 */
export const useCardFlip = (duration: number = 300) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const flip = () => setIsFlipped(prev => !prev)

  return { isFlipped, flip }
}
```

**Store Pattern (Zustand)**:
```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface CardState {
  deck: TarotCard[]
  shuffledDeck: TarotCard[]
  drawnCards: TarotCard[]

  shuffleDeck: () => void
  drawCard: () => TarotCard | null
  resetDeck: () => void
}

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      deck: TAROT_DECK,
      shuffledDeck: [],
      drawnCards: [],

      shuffleDeck: () => {
        const shuffled = fisherYatesShuffle([...get().deck])
        set({ shuffledDeck: shuffled })
      },

      drawCard: () => {
        const { shuffledDeck, drawnCards } = get()
        if (shuffledDeck.length === 0) return null

        const [drawn, ...remaining] = shuffledDeck
        set({
          shuffledDeck: remaining,
          drawnCards: [...drawnCards, drawn]
        })
        return drawn
      },

      resetDeck: () => {
        set({ shuffledDeck: [], drawnCards: [] })
      },
    }),
    {
      name: '@CelestialEye:cards',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
```

### Key Implementation Patterns

#### 1. Daily Reading Limits

Track and reset daily usage in userStore:

```typescript
// In userStore
incrementReadingsUsed: () => {
  const { dailyReadingsUsed, lastReadingDate } = get()
  const today = format(new Date(), 'yyyy-MM-dd')

  // Reset if new day
  if (lastReadingDate !== today) {
    set({ dailyReadingsUsed: 1, lastReadingDate: today })
  } else {
    set({ dailyReadingsUsed: dailyReadingsUsed + 1 })
  }
},

canReadToday: () => {
  const { dailyReadingsUsed, maxDailyReadings } = get()
  return dailyReadingsUsed < maxDailyReadings
},
```

#### 2. Card Shuffling (Fisher-Yates Algorithm)

Cryptographically secure shuffle using expo-crypto:

```typescript
import * as Crypto from 'expo-crypto'

export const fisherYatesShuffle = <T,>(array: T[]): T[] => {
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    // Get cryptographically random bytes
    const randomBytes = Crypto.getRandomBytes(4)
    const randomValue = new DataView(randomBytes.buffer).getUint32(0, true)
    const j = randomValue % (i + 1)

    // Swap elements
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}
```

#### 3. Persistence with AsyncStorage

Automatic state persistence via Zustand middleware:

```typescript
// Zustand persist middleware automatically saves state changes
// No manual AsyncStorage calls needed in most cases

// For manual operations:
import AsyncStorage from '@react-native-async-storage/async-storage'

// Save
await AsyncStorage.setItem('@key', JSON.stringify(data))

// Load
const json = await AsyncStorage.getItem('@key')
const data = json ? JSON.parse(json) : defaultValue

// Remove
await AsyncStorage.removeItem('@key')
```

#### 4. Animation with Reanimated

Smooth 60fps animations using worklets:

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated'

export const useCardFlip = () => {
  const rotation = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${rotation.value}deg` },
      { perspective: 1000 },
    ],
  }))

  const flipCard = () => {
    rotation.value = withSpring(rotation.value + 180, {
      damping: 15,
      stiffness: 100,
    })
  }

  return { animatedStyle, flipCard }
}
```

#### 5. Error Handling

Graceful error handling with user-friendly fallbacks:

```typescript
// In difyService.ts
export const generateTarotInterpretation = async (
  cards: TarotCard[],
  spreadType: SpreadType
): Promise<string> => {
  try {
    // Check network connectivity first
    const netInfo = await NetInfo.fetch()
    if (!netInfo.isConnected) {
      throw new Error('OFFLINE')
    }

    // API call with timeout
    const response = await axios.post(
      `${DIFY_CONFIG.apiUrl}/chat-messages`,
      buildRequest(cards, spreadType),
      {
        timeout: DIFY_CONFIG.timeout,
        headers: { 'Authorization': `Bearer ${DIFY_CONFIG.apiKey}` }
      }
    )

    return response.data.answer

  } catch (error) {
    // Network error
    if (error.message === 'OFFLINE') {
      return 'You appear to be offline. Please check your connection and try again.'
    }

    // Timeout error
    if (error.code === 'ECONNABORTED') {
      return generateFallbackInterpretation(cards, spreadType)
    }

    // Generic error
    console.error('Dify API error:', error)
    return generateFallbackInterpretation(cards, spreadType)
  }
}
```

### Adding New Features

#### New Screen
1. Create file in `app/` following route structure
2. Add TypeScript types for route params (if needed)
3. Implement screen component with proper navigation
4. Test on iOS, Android, and web

```typescript
// app/settings.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Stack } from 'expo-router'

export default function SettingsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerShown: true,
        }}
      />
      <View className="flex-1 bg-bg-primary p-6">
        <Text className="text-text-primary">Settings</Text>
      </View>
    </>
  )
}
```

#### New Component
1. Create in `src/components/`
2. Export from `src/components/index.ts`
3. Use TypeScript for props
4. Style with NativeWind

```typescript
// src/components/Button.tsx
import React from 'react'
import { Pressable, Text } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false
}) => {
  const bgColor = variant === 'primary' ? 'bg-accent-gold' : 'bg-bg-secondary'
  const textColor = variant === 'primary' ? 'text-bg-primary' : 'text-text-primary'

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`rounded-xl px-6 py-3 ${bgColor} ${disabled ? 'opacity-50' : ''}`}
    >
      <Text className={`text-center font-inter text-base font-semibold ${textColor}`}>
        {title}
      </Text>
    </Pressable>
  )
}
```

#### New State (Zustand Store)
1. Create store file in `src/stores/`
2. Define interface for state and actions
3. Export from `src/stores/index.ts`
4. Add persist middleware if needed

#### New API Endpoint
1. Add function to `src/services/difyService.ts`
2. Define request/response types in `src/types/api.types.ts`
3. Add error handling and timeout logic
4. Test with offline/slow network conditions

## Building for Production

### iOS Build

```bash
# 1. Generate native iOS project
pnpm prebuild

# 2. Install CocoaPods dependencies
cd ios && pod install && cd ..

# 3. Open in Xcode
open ios/CelestialEye.xcworkspace

# 4. In Xcode:
#    - Select target device or "Any iOS Device"
#    - Product > Archive
#    - Distribute App to App Store Connect
```

**Important iOS Settings:**
- Bundle Identifier: `com.qlj.CelestialEye`
- Version: Update in `app.json` (auto-synced to Info.plist)
- Signing: Configure in Xcode with Apple Developer account
- Privacy: Add camera/photo library usage descriptions if needed (future features)

### Android Build

```bash
# 1. Generate native Android project
pnpm prebuild

# 2. Create release APK
cd android && ./gradlew assembleRelease

# 3. Create release AAB (for Play Store)
cd android && ./gradlew bundleRelease

# 4. Output locations:
# APK: android/app/build/outputs/apk/release/app-release.apk
# AAB: android/app/build/outputs/bundle/release/app-release.aab
```

**Important Android Settings:**
- Package: `com.qlj.CelestialEye`
- Version Code: Auto-incremented in `app.json`
- Signing: Configure keystore in `android/gradle.properties`
- Permissions: Internet access (auto-added by Expo)

### EAS Build (Recommended)

Use Expo Application Services for cloud builds:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

**Benefits:**
- No local Xcode/Android Studio setup required
- Consistent build environment
- Automatic signing and provisioning
- Build distribution to testers

## Troubleshooting

### Common Issues

**Metro Bundler Cache Issues**
```bash
# Clear cache and restart
npx expo start -c
```

**Native Dependency Changes**
```bash
# Clean and rebuild native projects
pnpm expo:clean
pnpm prebuild
```

**iOS Simulator Issues**
```bash
# Reset all simulators
xcrun simctl erase all

# Or reset specific simulator
xcrun simctl erase <simulator-id>
```

**Android Emulator Issues**
```bash
# Cold boot emulator (File > Cold Boot Now in Android Studio)

# Or reset emulator data
cd ~/Library/Android/sdk/emulator
./emulator -avd <avd-name> -wipe-data
```

**TypeScript Errors Not Showing**
```bash
# Run TypeScript compiler directly
npx tsc --noEmit
```

**Port Already in Use**
```bash
# Kill process on port 8081 (Metro bundler)
lsof -ti:8081 | xargs kill -9
```

**AsyncStorage Errors**
```bash
# Clear all AsyncStorage data (development only!)
# Add this to a dev screen:
import AsyncStorage from '@react-native-async-storage/async-storage'
await AsyncStorage.clear()
```

### Platform-Specific Issues

**iOS**:
- **CocoaPods errors**: Delete `ios/Pods` and `ios/Podfile.lock`, run `pod install` again
- **Build errors**: Clean build folder in Xcode (Product > Clean Build Folder)
- **Signing issues**: Verify Apple Developer account and provisioning profiles

**Android**:
- **Gradle errors**: Delete `android/.gradle` and `android/build`, rebuild
- **ADB connection issues**: `adb kill-server && adb start-server`
- **Keystore issues**: Verify keystore path and credentials in `gradle.properties`

**Web**:
- **Tailwind styles not applying**: Verify `tailwind.config.js` includes correct paths
- **Animations not working**: Reanimated has limited web support, use alternative approach

## Project Scope and Priorities

### Platform Priorities

1. **Primary Platforms**: iOS and Android
   - Full feature support
   - Native performance optimizations
   - Platform-specific UI polish

2. **Secondary Platform**: Web
   - Basic functionality only
   - Avoid web-specific implementations unless requested
   - May have limited animation support

### Core Principles

**User Experience:**
- Never show loading errors without retry option
- Always provide fallback content when API fails
- Graceful degradation for offline use
- Smooth animations and transitions
- Haptic feedback for important actions (card draw, shuffle)

**Data Management:**
- All user data persists locally (no login required)
- Reading history auto-saves after each reading
- Daily limits reset at midnight local time
- Maximum 100 readings in history (FIFO removal)

**Performance:**
- Minimize bundle size (code splitting for large features)
- Lazy load images and heavy components
- Use React.memo() for expensive renders
- Debounce/throttle user input handlers

**Security:**
- Store API keys in environment variables, never commit to git
- Use expo-secure-store for sensitive data (future premium features)
- Validate all user input before API calls
- Rate limit API requests to prevent abuse

### Development Rules

**ALWAYS:**
- Use TypeScript with proper types (avoid `any`)
- Use NativeWind for styling (no StyleSheet.create)
- Use expo-router APIs for navigation (not react-navigation directly)
- Run `pnpm format` before committing
- Test on both iOS and Android before marking feature complete
- Add comments for complex logic or non-obvious code

**NEVER:**
- Hardcode API keys or secrets in source code
- Use deprecated Expo APIs (check Expo docs for current version)
- Implement social sharing features (explicitly disabled by user)
- Create backward-compatibility code unless explicitly requested
- Use custom fonts without proper loading checks
- Commit `.env` file or other sensitive configuration

**PREFER:**
- Functional components over class components
- Custom hooks over HOCs or render props
- Zustand stores over React Context for global state
- Async/await over Promise chains
- Early returns over nested conditionals
- Explicit error handling over silent failures

### Code Organization

**File Naming:**
- Screens: PascalCase with descriptive names (`SpreadSelection.tsx`)
- Components: PascalCase, one component per file (`Card.tsx`)
- Hooks: camelCase with 'use' prefix (`useCardFlip.ts`)
- Utils: camelCase describing purpose (`uuid.ts`, `shuffle.ts`)
- Types: PascalCase with '.types.ts' suffix (`tarot.types.ts`)

**Component Structure:**
```typescript
// 1. Imports
import React from 'react'
import { View, Text } from 'react-native'

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export const Component: React.FC<Props> = ({ ... }) => {
  // 3a. Hooks
  const router = useRouter()
  const store = useCardStore()

  // 3b. State
  const [state, setState] = useState()

  // 3c. Effects
  useEffect(() => {
    // ...
  }, [])

  // 3d. Handlers
  const handlePress = () => {
    // ...
  }

  // 3e. Render
  return (
    <View>
      {/* JSX */}
    </View>
  )
}

// 4. Styles (if not using NativeWind)
// const styles = StyleSheet.create({ ... })
```

**Store Structure:**
```typescript
interface State {
  // 1. Data
  data: Type[]

  // 2. UI State
  isLoading: boolean
  error: string | null

  // 3. Actions (grouped by purpose)
  // Data actions
  fetchData: () => Promise<void>
  addItem: (item: Type) => void
  removeItem: (id: string) => void

  // UI actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}
```

### Feature Development Checklist

When adding new features:

- [ ] Design UI mockup (sketch or Figma)
- [ ] Define TypeScript types/interfaces
- [ ] Update Zustand stores if needed
- [ ] Implement component with NativeWind styling
- [ ] Add navigation logic (if new screen)
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test offline behavior
- [ ] Test on web (basic functionality)
- [ ] Add animations if appropriate
- [ ] Update CLAUDE.md if architectural changes
- [ ] Run `pnpm format` and `pnpm lint`
- [ ] Verify no TypeScript errors

### Testing Strategy

**Manual Testing (Current Approach):**
- Test each feature on iOS, Android, and web
- Verify offline behavior (airplane mode)
- Test with slow network (Network Link Conditioner)
- Test edge cases (empty states, errors, limits)
- Verify animations and transitions
- Check accessibility (screen reader support)

**Future Automated Testing:**
- Unit tests: Vitest for utils, hooks, stores
- Integration tests: Testing Library for components
- E2E tests: Maestro or Detox for critical flows

### Performance Monitoring

**Key Metrics:**
- App startup time: < 3 seconds
- Card draw animation: 60fps
- API response time: < 2 seconds
- Memory usage: < 150MB idle
- Bundle size: < 10MB

**Tools:**
- React DevTools Profiler for render performance
- Expo performance monitor (CMD+D in dev builds)
- Flipper for network and state debugging
- Xcode Instruments for iOS memory profiling
- Android Studio Profiler for Android performance

## Important Notes

### Disabled Features

**Social Sharing**: User explicitly requested NO social sharing features. Do not implement:
- Share to social media
- Share reading results
- Invite friends functionality
- Social login

### Future Features (Not Yet Implemented)

**Reversed Cards**: Cards can appear upside-down with different meanings
- Add `isReversed` boolean to DrawnCard
- Update interpretation prompts to include reversed meanings
- Add flip gesture or toggle for reversing cards

**Premium Features**: Subscription for unlimited readings
- In-app purchases (Apple/Google)
- Subscription management
- Restore purchases functionality

**Custom Spreads**: User-defined card layouts
- Spread editor interface
- Save/load custom spreads
- Community spread sharing (optional)

**Notifications**: Daily reading reminders
- Request notification permissions
- Schedule local notifications
- Notification settings screen

**Multi-language Support**: Full internationalization
- Extract all strings to i18n system
- Support multiple languages
- Right-to-left layout support

---

**Last Updated**: 2026-01-28
**Expo SDK Version**: 54
**React Native Version**: 0.81.5
**Package Manager**: pnpm 10.24.0
