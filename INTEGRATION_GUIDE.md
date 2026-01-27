# Dify API + Typewriter Effect Integration Guide

## 概述

已成功集成 Dify API 流式响应和打字机效果。系统支持：
- ✅ 流式 AI 解读（Server-Sent Events）
- ✅ 打字机动画效果
- ✅ 实时文本更新
- ✅ 错误处理
- ✅ 跳过动画功能

## 核心组件

### 1. Dify API 服务 (`src/services/difyService.ts`)

支持两种模式：

#### 阻塞模式（Blocking）
```typescript
import { generateInterpretation } from '@/services/difyService';

const response = await generateInterpretation({
  spreadType: 'single',
  cards: drawnCards,
  query: 'What should I focus on?',
});

console.log(response.answer);
```

#### 流式模式（Streaming）- 推荐使用
```typescript
import { generateInterpretationStream } from '@/services/difyService';

await generateInterpretationStream(
  {
    spreadType: 'three',
    cards: drawnCards,
  },
  (chunk, isComplete) => {
    console.log('Current text:', chunk);

    if (isComplete) {
      console.log('Streaming finished!');
    }
  }
);
```

### 2. 打字机效果 Hook (`src/hooks/useTypewriter.ts`)

#### 手动控制模式
```typescript
import { useTypewriter } from '@/hooks/useTypewriter';

const typewriter = useTypewriter(fullText, {
  speed: 30, // 每个字符的延迟（毫秒）
  delay: 0, // 开始前的延迟
  onComplete: () => console.log('Done!'),
});

// 手动控制
<Button onPress={typewriter.start}>开始</Button>
<Button onPress={typewriter.skipToEnd}>跳过</Button>
<Button onPress={typewriter.reset}>重置</Button>

<Text>{typewriter.displayedText}</Text>
```

#### 自动开始模式
```typescript
import { useAutoTypewriter } from '@/hooks/useTypewriter';

const { displayedText, isTyping } = useAutoTypewriter(text, {
  speed: 30,
});

<Text>{displayedText}</Text>
```

### 3. 解读显示组件 (`src/components/InterpretationDisplay.tsx`)

开箱即用的组件，集成了打字机效果：

```typescript
import { InterpretationDisplay } from '@/components/InterpretationDisplay';

<InterpretationDisplay
  text={streamingText}
  isStreaming={isGenerating}
  error={error}
  speed={30}
  allowSkip={true}
  className="mt-6"
/>
```

### 4. Reading Store (`src/stores/readingStore.ts`)

已更新的 store，集成流式 API：

```typescript
import { useReadingStore } from '@/stores/readingStore';

const {
  streamingText,
  isGenerating,
  error,
  generateReading,
} = useReadingStore();

// 生成解读
await generateReading('three', drawnCards, 'Optional question');
```

## 完整使用示例

### 在 Reading 页面中使用

```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useReadingStore } from '@/stores/readingStore';
import { useCardStore } from '@/stores/cardStore';
import { InterpretationDisplay } from '@/components/InterpretationDisplay';

export default function ReadingResultScreen() {
  const { streamingText, isGenerating, error } = useReadingStore();
  const { drawnCards, spreadType } = useCardStore();

  return (
    <ScrollView className="flex-1 bg-bg-primary px-6">
      {/* 显示抽到的牌 */}
      <View className="mb-6">
        {drawnCards.map((card, index) => (
          <View key={card.id} className="mb-4">
            <Text className="text-lg text-accent-gold">{card.name}</Text>
            <Text className="text-sm text-text-secondary">
              {spreadType === 'three'
                ? ['Past', 'Present', 'Future'][index]
                : 'Your Card'}
            </Text>
          </View>
        ))}
      </View>

      {/* AI 解读 - 带打字机效果 */}
      <InterpretationDisplay
        text={streamingText}
        isStreaming={isGenerating}
        error={error}
        speed={30}
        allowSkip={true}
      />
    </ScrollView>
  );
}
```

### 触发解读生成

```typescript
import { useEffect } from 'react';
import { useReadingStore } from '@/stores/readingStore';
import { useCardStore } from '@/stores/cardStore';

export default function SpreadSelectionScreen() {
  const { generateReading } = useReadingStore();
  const { drawnCards, spreadType } = useCardStore();

  const handleGenerateReading = async () => {
    if (drawnCards.length === 0) return;

    try {
      await generateReading(
        spreadType,
        drawnCards,
        'What guidance do the cards have for me?' // 可选问题
      );

      // 导航到结果页面
      router.push('/reading-result');
    } catch (error) {
      console.error('Failed to generate reading:', error);
    }
  };

  return (
    <Pressable onPress={handleGenerateReading}>
      <Text>Generate Reading</Text>
    </Pressable>
  );
}
```

## 自定义配置

### 修改打字机速度

在 `InterpretationDisplay` 组件中：

```typescript
<InterpretationDisplay
  text={streamingText}
  speed={20} // 更快: 20ms/字符
  // speed={50} // 更慢: 50ms/字符
/>
```

### 修改 Dify API 超时

在 `src/constants/config.ts` 中：

```typescript
export const config = {
  dify: {
    apiUrl: process.env.EXPO_PUBLIC_DIFY_API_URL || '',
    apiKey: process.env.EXPO_PUBLIC_DIFY_API_KEY || '',
    timeout: 60000, // 改为 60 秒
  },
  // ...
};
```

### 禁用跳过功能

```typescript
<InterpretationDisplay
  text={streamingText}
  allowSkip={false} // 禁止点击跳过
/>
```

## 样式自定义

### 修改颜色和字体

组件使用 Tailwind 类名，可以在 `tailwind.config.js` 中自定义：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'accent-gold': '#D4AF37', // 修改金色
        'accent-purple': '#8B5CF6', // 修改紫色
      },
    },
  },
};
```

### 自定义组件样式

```typescript
<InterpretationDisplay
  text={streamingText}
  className="mt-8 rounded-3xl bg-gradient-to-br from-purple-900/30 to-black/50 p-8"
/>
```

## 错误处理

系统会自动处理以下错误：

1. **网络错误** - 显示 "Network error: Unable to reach AI service"
2. **API 错误** - 显示服务器返回的错误消息
3. **超时错误** - 30 秒后自动超时

错误会自动显示在 `InterpretationDisplay` 组件中。

## 测试 API 连接

```typescript
import { testConnection } from '@/services/difyService';

const isConnected = await testConnection();
console.log('API Connected:', isConnected);
```

## 数据持久化

Reading store 会自动：
- ✅ 保存完整的解读记录到 `readingHistory`
- ✅ 记录时间戳和格式化日期
- ✅ 支持收藏功能（`toggleFavorite`）
- ✅ 存储卡牌位置（过去/现在/未来）

使用 AsyncStorage 持久化历史记录（需要单独实现）：

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// 保存历史
AsyncStorage.setItem('reading_history', JSON.stringify(readingHistory));

// 加载历史
const saved = await AsyncStorage.getItem('reading_history');
if (saved) {
  setReadingHistory(JSON.parse(saved));
}
```

## 性能优化建议

1. **使用流式模式** - 用户体验更好，无需等待完整响应
2. **合理的打字机速度** - 30ms/字符是推荐值
3. **允许跳过** - 让用户可以快速浏览长文本
4. **错误重试** - 可以添加重试逻辑

## 下一步

- [ ] 在实际页面中集成 `InterpretationDisplay`
- [ ] 实现历史记录持久化（AsyncStorage）
- [ ] 添加加载动画和过渡效果
- [ ] 实现收藏功能 UI
- [ ] 添加分享功能（如果需要）

## 文件结构

```
src/
├── services/
│   ├── difyService.ts          # Dify API 集成（流式 + 阻塞）
│   └── index.ts
├── hooks/
│   ├── useTypewriter.ts         # 打字机效果 hook
│   └── index.ts
├── components/
│   ├── InterpretationDisplay.tsx # 解读显示组件
│   └── index.ts
├── stores/
│   └── readingStore.ts          # 更新的 store（支持流式）
└── types/
    └── api.types.ts             # API 类型定义
```

## 环境变量

确保 `.env` 文件包含：

```
EXPO_PUBLIC_DIFY_API_URL=https://api-ai.qiliangjia.org/v1
EXPO_PUBLIC_DIFY_API_KEY=app-M7MWDL7XmzwgQ17drZf5VpQP
```

## 问题排查

### 打字机不开始

检查是否有文本：
```typescript
console.log('Text:', streamingText);
console.log('Is generating:', isGenerating);
```

### API 不返回数据

测试连接：
```typescript
import { testConnection } from '@/services/difyService';
const result = await testConnection();
```

### 样式不生效

确保 NativeWind 正确配置在 `tailwind.config.js` 和 `babel.config.js`。

## 支持

如有问题，检查：
1. `.env` 文件是否正确
2. Dify API 是否可访问
3. 网络连接是否正常
4. Console 错误日志
