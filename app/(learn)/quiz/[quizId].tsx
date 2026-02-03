/**
 * Quiz Screen
 * iPad and iOS adaptive layout
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/theme/colors';
import { useQuizStore } from '@/stores/quizStore';
import { useLearningStore } from '@/stores/learningStore';
import { getQuizById } from '@/data/quiz-questions';
import { v4 as uuidv4 } from '@/utils/uuid';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XIcon,
  TrophyIcon,
  ZapIcon,
  BookIcon,
} from '@/components/ui';
import { IconButton, Button } from '@/components/ui/Buttons';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!quiz) {
    return (
      <ScreenContainer>
        <SafeScrollView maxWidth="md">
          <View style={styles.errorContainer}>
            <BookIcon size={48} color={colors.text.quaternary} />
            <Text style={styles.errorText}>Quiz not found</Text>
            <Button
              title="Go Back"
              onPress={() => router.back()}
              variant="outline"
            />
          </View>
        </SafeScrollView>
      </ScreenContainer>
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
    if (showExplanation) return;
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
      <ScreenContainer>
        <SafeScrollView maxWidth="md">
          {/* Header */}
          <Row justify="flex-start" align="center" style={styles.header}>
            <IconButton
              icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
              onPress={() => router.back()}
              variant="filled"
              size="md"
            />
          </Row>

          {/* Intro Content */}
          <View style={styles.introContent}>
            <View style={styles.quizIconLarge}>
              <ZapIcon size={responsive.width(40, 52)} color={colors.accent.purple} />
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

          <Spacer size={responsive.spacing(32, 48)} />

          {/* Start Button */}
          <Pressable
            onPress={handleStartQuiz}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={[colors.accent.gold, '#E5C158']}
              style={styles.startGradient}
            >
              <Text style={styles.startButtonText}>Start Quiz</Text>
            </LinearGradient>
          </Pressable>

          <Spacer size={responsive.spacing(32, 48)} />
        </SafeScrollView>
      </ScreenContainer>
    );
  }

  // Results Screen
  if (quizState === 'result' && results) {
    return (
      <ScreenContainer>
        <SafeScrollView maxWidth="md">
          {/* Result Content */}
          <View style={styles.resultContent}>
            <View
              style={[
                styles.resultIcon,
                { backgroundColor: results.passed ? '#10B981' : colors.error },
              ]}
            >
              {results.passed ? (
                <TrophyIcon size={responsive.width(40, 52)} color={colors.text.primary} />
              ) : (
                <BookIcon size={responsive.width(40, 52)} color={colors.text.primary} />
              )}
            </View>

            <Text style={styles.resultTitle}>
              {results.passed ? 'Congratulations!' : 'Keep Trying!'}
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
              {results.correct} / {results.total} correct
            </Text>

            {results.passed ? (
              <View style={styles.passBadge}>
                <CheckIcon size={16} color="#10B981" />
                <Text style={styles.passBadgeText}>Quiz Passed</Text>
              </View>
            ) : (
              <Text style={styles.failText}>
                You need {quiz.passingScore}% to pass. Review the course and try again!
              </Text>
            )}
          </View>

          <Spacer size={responsive.spacing(32, 48)} />

          {/* Action Buttons */}
          <View style={styles.resultButtons}>
            {!results.passed && (
              <Pressable
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
              </Pressable>
            )}

            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.doneButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={
                  results.passed
                    ? ['#10B981', '#34D399']
                    : [colors.accent.gold, '#E5C158']
                }
                style={styles.doneGradient}
              >
                <Text style={styles.doneButtonText}>
                  {results.passed ? 'Continue Learning' : 'Go Back'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>

          <Spacer size={responsive.spacing(32, 48)} />
        </SafeScrollView>
      </ScreenContainer>
    );
  }

  // Question Screen
  return (
    <ScreenContainer>
      {/* Header with Progress */}
      <View style={styles.questionHeader}>
        <IconButton
          icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
          onPress={() => {
            clearCurrentQuiz();
            router.back();
          }}
          variant="filled"
          size="md"
        />

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
        contentContainerStyle={styles.questionScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionTypeTag}>
            <Text style={styles.questionTypeText}>
              {currentQuestion.type === 'true-false'
                ? 'True/False'
                : currentQuestion.type === 'scenario'
                ? 'Scenario'
                : 'Multiple Choice'}
            </Text>
          </View>

          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <Spacer size={responsive.spacing(16, 24)} />

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
                  <Pressable
                    key={option}
                    onPress={() => handleSelectAnswer(option)}
                    disabled={showExplanation}
                    style={({ pressed }) => [
                      styles.optionButton,
                      isSelected && !showExplanation && styles.optionSelected,
                      showCorrect && styles.optionCorrect,
                      showWrong && styles.optionWrong,
                      pressed && !showExplanation && styles.optionPressed,
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
                    {showCorrect && <CheckIcon size={20} color="#10B981" />}
                    {showWrong && <XIcon size={20} color={colors.error} />}
                  </Pressable>
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
                <Pressable
                  key={option.id}
                  onPress={() => handleSelectAnswer(option.id)}
                  disabled={showExplanation}
                  style={({ pressed }) => [
                    styles.optionButton,
                    isSelected && !showExplanation && styles.optionSelected,
                    showCorrect && styles.optionCorrect,
                    showWrong && styles.optionWrong,
                    pressed && !showExplanation && styles.optionPressed,
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
                  {showCorrect && <CheckIcon size={20} color="#10B981" />}
                  {showWrong && <XIcon size={20} color={colors.error} />}
                </Pressable>
              );
            })
          )}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <>
            <Spacer size={responsive.spacing(16, 24)} />
            <View style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>
                {isCorrectAnswer(selectedAnswer!) ? 'Correct!' : 'Incorrect'}
              </Text>
              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            </View>
          </>
        )}

        <Spacer size={responsive.spacing(100, 120)} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <LinearGradient
          colors={['transparent', colors.background.primary]}
          style={styles.bottomGradient}
        >
          {!showExplanation ? (
            <Pressable
              onPress={handleConfirmAnswer}
              disabled={!selectedAnswer}
              style={({ pressed }) => [
                styles.actionButton,
                !selectedAnswer && styles.actionButtonDisabled,
                pressed && selectedAnswer && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={
                  selectedAnswer
                    ? [colors.accent.gold, '#E5C158']
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
                  Confirm Answer
                </Text>
              </LinearGradient>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleNextQuestion}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={['#10B981', '#34D399']}
                style={styles.actionGradient}
              >
                <Text style={styles.actionButtonText}>
                  {currentQuestionIndex < quiz.questions.length - 1
                    ? 'Next Question'
                    : 'View Results'}
                </Text>
                <ChevronRightIcon size={18} color={colors.background.primary} />
              </LinearGradient>
            </Pressable>
          )}
        </LinearGradient>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: responsive.spacing(16, 20),
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsive.spacing(24, 32),
    gap: responsive.spacing(16, 20),
  },
  errorText: {
    fontSize: responsive.fontSize(18, 22),
    color: colors.text.secondary,
  },

  // Intro Screen
  introContent: {
    alignItems: 'center',
    paddingTop: responsive.spacing(40, 60),
  },
  quizIconLarge: {
    width: responsive.width(100, 130),
    height: responsive.width(100, 130),
    borderRadius: responsive.width(30, 40),
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(24, 32),
  },
  quizTitle: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: responsive.spacing(12, 16),
  },
  quizDescription: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: responsive.fontSize(24, 28),
    marginBottom: responsive.spacing(32, 40),
    paddingHorizontal: responsive.spacing(16, 24),
  },
  infoCards: {
    flexDirection: 'row',
    gap: responsive.spacing(20, 28),
  },
  infoCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(16, 20),
    padding: responsive.spacing(20, 28),
    alignItems: 'center',
    minWidth: responsive.width(100, 130),
  },
  infoValue: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.accent.gold,
  },
  infoLabel: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
    marginTop: responsive.spacing(4, 6),
  },
  startButton: {
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginHorizontal: responsive.spacing(16, 24),
  },
  startGradient: {
    paddingVertical: responsive.spacing(18, 22),
    alignItems: 'center',
    borderRadius: responsive.width(16, 20),
  },
  startButtonText: {
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '700',
    color: colors.background.primary,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  // Question Screen
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing(16, 24),
    paddingVertical: responsive.spacing(12, 16),
    gap: responsive.spacing(12, 16),
  },
  progressContainer: {
    flex: 1,
    gap: responsive.spacing(6, 8),
  },
  progressBar: {
    height: responsive.width(8, 10),
    backgroundColor: colors.background.tertiary,
    borderRadius: responsive.width(4, 5),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: responsive.width(4, 5),
  },
  progressText: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.tertiary,
    textAlign: 'right',
  },
  questionScrollContent: {
    paddingHorizontal: responsive.spacing(16, 24),
  },
  questionCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(18, 22),
    padding: responsive.spacing(20, 28),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  questionTypeTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: responsive.spacing(12, 16),
    paddingVertical: responsive.spacing(6, 8),
    borderRadius: responsive.width(8, 10),
    marginBottom: responsive.spacing(14, 18),
  },
  questionTypeText: {
    fontSize: responsive.fontSize(12, 14),
    fontWeight: '600',
    color: colors.accent.purple,
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: responsive.fontSize(28, 34),
  },
  optionsContainer: {
    gap: responsive.spacing(12, 16),
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    padding: responsive.spacing(16, 20),
    borderWidth: 2,
    borderColor: colors.background.tertiary,
  },
  optionSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  optionPressed: {
    opacity: 0.9,
  },
  optionText: {
    flex: 1,
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.secondary,
    lineHeight: responsive.fontSize(24, 28),
  },
  optionTextSelected: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  explanationCard: {
    backgroundColor: colors.background.tertiary,
    borderRadius: responsive.width(14, 18),
    padding: responsive.spacing(16, 20),
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.gold,
  },
  explanationTitle: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: responsive.spacing(8, 10),
  },
  explanationText: {
    fontSize: responsive.fontSize(15, 17),
    color: colors.text.secondary,
    lineHeight: responsive.fontSize(24, 28),
  },

  // Bottom Action
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomGradient: {
    paddingTop: responsive.spacing(32, 40),
    paddingHorizontal: responsive.spacing(16, 24),
    paddingBottom: responsive.spacing(32, 40),
  },
  actionButton: {
    borderRadius: responsive.width(14, 18),
    overflow: 'hidden',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive.spacing(16, 20),
    borderRadius: responsive.width(14, 18),
    gap: responsive.spacing(8, 10),
  },
  actionButtonText: {
    fontSize: responsive.fontSize(17, 20),
    fontWeight: '700',
    color: colors.background.primary,
  },
  actionButtonTextDisabled: {
    color: colors.text.tertiary,
  },

  // Results Screen
  resultContent: {
    alignItems: 'center',
    paddingTop: responsive.spacing(60, 80),
  },
  resultIcon: {
    width: responsive.width(100, 130),
    height: responsive.width(100, 130),
    borderRadius: responsive.width(50, 65),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(24, 32),
  },
  resultTitle: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: responsive.spacing(12, 16),
  },
  resultScore: {
    fontSize: responsive.fontSize(64, 80),
    fontWeight: '800',
    marginBottom: responsive.spacing(12, 16),
  },
  resultSubtitle: {
    fontSize: responsive.fontSize(18, 22),
    color: colors.text.tertiary,
    marginBottom: responsive.spacing(20, 28),
  },
  passBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: responsive.spacing(20, 28),
    paddingVertical: responsive.spacing(12, 16),
    borderRadius: responsive.width(20, 24),
    gap: responsive.spacing(8, 10),
  },
  passBadgeText: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: '#10B981',
  },
  failText: {
    fontSize: responsive.fontSize(15, 17),
    color: colors.text.tertiary,
    textAlign: 'center',
    paddingHorizontal: responsive.spacing(24, 32),
    lineHeight: responsive.fontSize(22, 26),
  },
  resultButtons: {
    gap: responsive.spacing(12, 16),
    paddingHorizontal: responsive.spacing(16, 24),
  },
  retryButton: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    paddingVertical: responsive.spacing(16, 20),
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: responsive.fontSize(17, 20),
    fontWeight: '600',
    color: colors.text.secondary,
  },
  doneButton: {
    borderRadius: responsive.width(14, 18),
    overflow: 'hidden',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  doneGradient: {
    paddingVertical: responsive.spacing(16, 20),
    alignItems: 'center',
    borderRadius: responsive.width(14, 18),
  },
  doneButtonText: {
    fontSize: responsive.fontSize(17, 20),
    fontWeight: '700',
    color: colors.background.primary,
  },
});
