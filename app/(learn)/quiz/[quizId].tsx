import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useQuizStore } from '@/stores/quizStore';
import { useLearningStore } from '@/stores/learningStore';
import { getQuizById, type QuizQuestion } from '@/data/quiz-questions';
import { v4 as uuidv4 } from '@/utils/uuid';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type QuizState = 'intro' | 'question' | 'result';

export default function QuizScreen() {
  const router = useRouter();
  const { quizId } = useLocalSearchParams<{ quizId: string }>();

  const {
    startQuiz,
    answerQuestion,
    submitQuiz,
    currentAnswers,
    clearCurrentQuiz,
  } = useQuizStore();
  const { completeCourse } = useLearningStore();

  const quiz = getQuizById(quizId);

  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [results, setResults] = useState<{
    score: number;
    correct: number;
    total: number;
    passed: boolean;
  } | null>(null);

  useEffect(() => {
    return () => {
      clearCurrentQuiz();
    };
  }, []);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Quiz not found</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
              <Text style={styles.backLinkText}>← Go Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleStartQuiz = () => {
    startQuiz(quizId);
    setStartTime(Date.now());
    setQuizState('question');
  };

  const handleSelectAnswer = (answerId: string) => {
    if (showExplanation) return; // Can't change after confirming
    setSelectedAnswer(answerId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer) return;

    answerQuestion(currentQuestion.id, selectedAnswer);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Calculate results
      const correctCount = quiz.questions.filter((q) => {
        const answer = currentAnswers[q.id];
        if (q.type === 'true-false') {
          return answer === q.correctAnswer;
        }
        return answer === q.correctAnswer;
      }).length;

      const score = Math.round((correctCount / quiz.questions.length) * 100);
      const passed = score >= quiz.passingScore;

      const resultData = {
        score,
        correct: correctCount,
        total: quiz.questions.length,
        passed,
      };

      setResults(resultData);

      // Submit to store
      submitQuiz({
        id: uuidv4() as string,
        quizId: quiz.id,
        score,
        totalQuestions: quiz.questions.length,
        correctAnswers: correctCount,
        completedAt: new Date().toISOString(),
        timeSpent: Math.round((Date.now() - startTime) / 1000),
        passed,
        answers: currentAnswers,
      });

      // If passed and it's a course quiz, mark course as complete
      if (passed && quiz.courseId) {
        completeCourse(quiz.courseId);
      }

      setQuizState('result');
    }
  };

  const isCorrectAnswer = (answerId: string) => {
    if (currentQuestion.type === 'true-false') {
      return answerId === currentQuestion.correctAnswer;
    }
    return answerId === currentQuestion.correctAnswer;
  };

  // Intro Screen
  if (quizState === 'intro') {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
          style={styles.backgroundGradient}
        />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.introContent}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.closeButton}
            >
              <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>

            <View style={styles.introCenter}>
              <View style={styles.quizIconLarge}>
                <Text style={styles.quizEmoji}>🧠</Text>
              </View>

              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.quizDescription}>{quiz.description}</Text>

              <View style={styles.infoCards}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoValue}>{quiz.questions.length}</Text>
                  <Text style={styles.infoLabel}>Questions</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.infoValue}>{quiz.passingScore}%</Text>
                  <Text style={styles.infoLabel}>To Pass</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleStartQuiz}
              style={styles.startButton}
            >
              <LinearGradient
                colors={[colors.accent.gold, colors.accent.goldLight]}
                style={styles.startGradient}
              >
                <Text style={styles.startButtonText}>Start Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Results Screen
  if (quizState === 'result' && results) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
          style={styles.backgroundGradient}
        />

        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.resultContent}>
            <View style={styles.resultCenter}>
              <View
                style={[
                  styles.resultIcon,
                  { backgroundColor: results.passed ? '#10B981' : colors.error },
                ]}
              >
                <Text style={styles.resultEmoji}>
                  {results.passed ? '🎉' : '💪'}
                </Text>
              </View>

              <Text style={styles.resultTitle}>
                {results.passed ? 'Congratulations!' : 'Keep Learning!'}
              </Text>

              <Text
                style={[
                  styles.resultScore,
                  { color: results.passed ? '#10B981' : colors.error },
                ]}
              >
                {results.score}%
              </Text>

              <Text style={styles.resultSubtitle}>
                {results.correct} of {results.total} correct
              </Text>

              {results.passed ? (
                <View style={styles.passBadge}>
                  <Text style={styles.passBadgeText}>✓ Quiz Passed</Text>
                </View>
              ) : (
                <Text style={styles.failText}>
                  You need {quiz.passingScore}% to pass. Study the lessons and try again!
                </Text>
              )}
            </View>

            <View style={styles.resultButtons}>
              {!results.passed && (
                <TouchableOpacity
                  onPress={() => {
                    clearCurrentQuiz();
                    setQuizState('intro');
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                    setResults(null);
                  }}
                  style={styles.retryButton}
                >
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.doneButton}
              >
                <LinearGradient
                  colors={
                    results.passed
                      ? ['#10B981', '#34D399']
                      : [colors.accent.gold, colors.accent.goldLight]
                  }
                  style={styles.doneGradient}
                >
                  <Text style={styles.doneButtonText}>
                    {results.passed ? 'Continue Learning' : 'Back to Quizzes'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  // Question Screen
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.questionHeader}>
          <TouchableOpacity
            onPress={() => {
              clearCurrentQuiz();
              router.back();
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.questionContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Question */}
          <View style={styles.questionCard}>
            <View style={styles.questionTypeTag}>
              <Text style={styles.questionTypeText}>
                {currentQuestion.type === 'true-false'
                  ? 'True or False'
                  : currentQuestion.type === 'scenario'
                  ? 'Scenario'
                  : 'Multiple Choice'}
              </Text>
            </View>

            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.type === 'true-false' ? (
              <>
                {['true', 'false'].map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const showCorrect = showExplanation && isCorrect;
                  const showWrong = showExplanation && isSelected && !isCorrect;

                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleSelectAnswer(option)}
                      disabled={showExplanation}
                      style={[
                        styles.optionButton,
                        isSelected && !showExplanation && styles.optionSelected,
                        showCorrect && styles.optionCorrect,
                        showWrong && styles.optionWrong,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          (isSelected || showCorrect) && styles.optionTextSelected,
                        ]}
                      >
                        {option === 'true' ? 'True' : 'False'}
                      </Text>
                      {showCorrect && <Text style={styles.checkIcon}>✓</Text>}
                      {showWrong && <Text style={styles.wrongIcon}>✕</Text>}
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              currentQuestion.options?.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const isCorrect = option.isCorrect;
                const showCorrect = showExplanation && isCorrect;
                const showWrong = showExplanation && isSelected && !isCorrect;

                return (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => handleSelectAnswer(option.id)}
                    disabled={showExplanation}
                    style={[
                      styles.optionButton,
                      isSelected && !showExplanation && styles.optionSelected,
                      showCorrect && styles.optionCorrect,
                      showWrong && styles.optionWrong,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        (isSelected || showCorrect) && styles.optionTextSelected,
                      ]}
                    >
                      {option.text}
                    </Text>
                    {showCorrect && <Text style={styles.checkIcon}>✓</Text>}
                    {showWrong && <Text style={styles.wrongIcon}>✕</Text>}
                  </TouchableOpacity>
                );
              })
            )}
          </View>

          {/* Explanation */}
          {showExplanation && (
            <View style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>
                {isCorrectAnswer(selectedAnswer!) ? '✓ Correct!' : '✕ Incorrect'}
              </Text>
              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            </View>
          )}

          {/* Bottom spacing */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <LinearGradient
            colors={['transparent', colors.background.primary]}
            style={styles.bottomGradient}
          >
            {!showExplanation ? (
              <TouchableOpacity
                onPress={handleConfirmAnswer}
                disabled={!selectedAnswer}
                style={[
                  styles.actionButton,
                  !selectedAnswer && styles.actionButtonDisabled,
                ]}
              >
                <LinearGradient
                  colors={
                    selectedAnswer
                      ? [colors.accent.gold, colors.accent.goldLight]
                      : [colors.background.tertiary, colors.background.tertiary]
                  }
                  style={styles.actionGradient}
                >
                  <Text
                    style={[
                      styles.actionButtonText,
                      !selectedAnswer && styles.actionButtonTextDisabled,
                    ]}
                  >
                    Check Answer
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleNextQuestion}
                style={styles.actionButton}
              >
                <LinearGradient
                  colors={['#10B981', '#34D399']}
                  style={styles.actionGradient}
                >
                  <Text style={styles.actionButtonText}>
                    {currentQuestionIndex < quiz.questions.length - 1
                      ? 'Next Question →'
                      : 'See Results'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  backLink: {
    padding: spacing.md,
  },
  backLinkText: {
    fontSize: 16,
    color: colors.accent.gold,
  },

  // Intro Screen
  introContent: {
    flex: 1,
    padding: spacing.lg,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: colors.text.secondary,
    marginTop: -2,
  },
  introCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizIconLarge: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: colors.accent.purple + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  quizEmoji: {
    fontSize: 48,
  },
  quizTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  quizDescription: {
    fontSize: 16,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  infoCards: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    minWidth: 100,
  },
  infoValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent.gold,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  startGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderRadius: 16,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.background.primary,
  },

  // Question Screen
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  progressContainer: {
    flex: 1,
    gap: spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'right',
  },
  questionContent: {
    padding: spacing.lg,
  },
  questionCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  questionTypeTag: {
    backgroundColor: colors.accent.purple + '30',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  questionTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent.purple,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: 30,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 14,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.background.tertiary,
  },
  optionSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: colors.accent.gold + '15',
  },
  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#10B981' + '20',
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.error + '20',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  optionTextSelected: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  checkIcon: {
    fontSize: 20,
    color: '#10B981',
    fontWeight: '700',
  },
  wrongIcon: {
    fontSize: 20,
    color: colors.error,
    fontWeight: '700',
  },
  explanationCard: {
    backgroundColor: colors.background.tertiary,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.gold,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  explanationText: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 24,
  },

  // Bottom Action
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomGradient: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  actionButton: {
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.md,
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  actionGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderRadius: 14,
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.background.primary,
  },
  actionButtonTextDisabled: {
    color: colors.text.tertiary,
  },

  // Results Screen
  resultContent: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  resultCenter: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  resultIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  resultEmoji: {
    fontSize: 48,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  resultScore: {
    fontSize: 64,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  resultSubtitle: {
    fontSize: 18,
    color: colors.text.tertiary,
    marginBottom: spacing.lg,
  },
  passBadge: {
    backgroundColor: '#10B981' + '30',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  passBadgeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  failText: {
    fontSize: 15,
    color: colors.text.tertiary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  resultButtons: {
    gap: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.background.secondary,
    borderRadius: 14,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  doneButton: {
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.md,
  },
  doneGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderRadius: 14,
  },
  doneButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.background.primary,
  },
});
