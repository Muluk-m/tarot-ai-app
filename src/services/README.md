# Dify API Service

This service integrates with Dify AI API to generate tarot card interpretations.

## Configuration

API credentials are configured in `.env`:
```
EXPO_PUBLIC_DIFY_API_URL=https://api-ai.qiliangjia.org/v1
EXPO_PUBLIC_DIFY_API_KEY=app-M7MWDL7XmzwgQ17drZf5VpQP
```

## Usage Example

```typescript
import { generateInterpretation } from './services/difyService';
import type { DrawnCard, DifyInterpretationRequest } from './types/api.types';

// Example: Single card reading
const singleCardReading = async () => {
  const drawnCards: DrawnCard[] = [
    {
      card: {
        id: 0,
        name: 'The Fool',
        arcana: 'major',
        uprightKeywords: ['new beginnings', 'innocence', 'adventure'],
        uprightMeaning: 'The Fool represents new beginnings and endless possibilities...',
        // ... other card properties
      },
      position: 'single',
      positionLabel: 'Your Card',
    },
  ];

  try {
    const result = await generateInterpretation({
      spreadType: 'single',
      cards: drawnCards,
      query: 'What should I focus on today?', // Optional
    });

    console.log('Interpretation:', result.answer);
  } catch (error) {
    console.error('Failed to get interpretation:', error);
  }
};

// Example: Three card spread (Past, Present, Future)
const threeCardReading = async () => {
  const drawnCards: DrawnCard[] = [
    {
      card: pastCard,
      position: 'past',
      positionLabel: 'Past',
    },
    {
      card: presentCard,
      position: 'present',
      positionLabel: 'Present',
    },
    {
      card: futureCard,
      position: 'future',
      positionLabel: 'Future',
    },
  ];

  try {
    const result = await generateInterpretation({
      spreadType: 'three',
      cards: drawnCards,
    });

    console.log('Interpretation:', result.answer);
  } catch (error) {
    console.error('Failed to get interpretation:', error);
  }
};
```

## Integration with Zustand Store

The service should be called from the `readingStore` after cards are drawn:

```typescript
// In readingStore.ts
import { generateInterpretation } from '../services/difyService';

const useReadingStore = create<ReadingStore>((set, get) => ({
  // ... other state

  generateReading: async (spreadType, cards, query?) => {
    set({ isGenerating: true, error: null });

    try {
      const drawnCards = cards.map((card, index) => ({
        card,
        position: spreadType === 'single' ? 'single' : ['past', 'present', 'future'][index],
        positionLabel: spreadType === 'single' ? 'Your Card' : ['Past', 'Present', 'Future'][index],
      }));

      const result = await generateInterpretation({
        spreadType,
        cards: drawnCards,
        query,
      });

      set({
        currentReading: {
          id: uuid(),
          timestamp: Date.now(),
          spreadType,
          cards: drawnCards,
          interpretation: result.answer,
          isFavorite: false,
        },
        isGenerating: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate reading',
        isGenerating: false,
      });
    }
  },
}));
```

## API Methods

### `generateInterpretation(request)`
Generates AI-powered tarot interpretation.

**Parameters:**
- `request.spreadType`: `'single'` or `'three'`
- `request.cards`: Array of drawn cards with positions
- `request.query`: Optional user question

**Returns:** `Promise<DifyInterpretationResponse>`

### `testConnection()`
Tests the API connection.

**Returns:** `Promise<boolean>`

### `getParameters()`
Gets API parameters for debugging.

**Returns:** `Promise<any>`

## Error Handling

The service throws descriptive errors:
- Network errors: "Network error: Unable to reach AI service"
- API errors: "API Error: [error message]"
- Generic errors: "Failed to generate interpretation"

Handle these in your UI with try-catch blocks and user-friendly messages.
