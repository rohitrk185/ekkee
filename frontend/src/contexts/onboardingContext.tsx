"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from "react";

import { Question } from "@/types";

// Defines the shape of the context's value
interface OnboardingContextType {
  currentStep: number;
  answers: Record<string, string[]>; // e.g., { "q_1": ["Developer"], "q_2": ["React", "Node.js"] }
  questions: Question[];
  currentQuestion: Question | null;
  totalSteps: number;
  isComplete: boolean;
  handleAnswerChange: (optionText: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  clearCurrentAnswer: () => void;
  storeQuestionData: (questionData: Question[]) => void;
  submissionDocId: string | undefined;
  setSubmissionDocId: React.Dispatch<React.SetStateAction<string | undefined>>;
  //   resetOnboarding: () => void;
}

// --- CONTEXT CREATION ---
const OnboardingContext = createContext<OnboardingContextType | null>(null);

// --- PROVIDER COMPONENT ---
interface OnboardingProviderProps {
  questionsList: Question[];
  children: ReactNode;
}

export const OnboardingProvider = ({
  questionsList,
  children,
}: OnboardingProviderProps) => {
  const [questions, setQuestions] = useState(questionsList);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submissionDocId, setSubmissionDocId] = useState<string>();

  const currentQuestion = useMemo<Question | null>(() => {
    return questions[currentStep - 1] || null;
  }, [currentStep, questions]);

  const handleAnswerChange = (optionText: string) => {
    if (!currentQuestion) return;

    const questionKey = `q_${currentQuestion.questionId}`;
    const currentAnswers = answers[questionKey] || [];

    const newAnswers = currentQuestion.isMultiChoice
      ? currentAnswers.includes(optionText)
        ? currentAnswers.filter((ans) => ans !== optionText)
        : [...currentAnswers, optionText]
      : [optionText];

    setAnswers((prev) => ({ ...prev, [questionKey]: newAnswers }));
  };

  const handleNext = () => {
    if (currentStep <= questions.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  //   const resetOnboarding = () => {
  //     setCurrentStep(1);
  //     setAnswers({});
  //   };

  const clearCurrentAnswer = useCallback(() => {
    const questionKey = `q_${currentQuestion?.questionId}`;
    setAnswers((prev) => ({ ...prev, [questionKey]: [] }));
  }, [currentQuestion?.questionId]);

  const storeQuestionData = (questionData: Question[]) => {
    setQuestions((prevQuestions: Question[]) => {
      const existingQuestionIds = new Set(
        prevQuestions.map((q: Question) => q.questionId)
      );
      const newQuestions = questionData.filter(
        (q) => !existingQuestionIds.has(q.questionId)
      );
      return [...prevQuestions, ...newQuestions];
    });
  };

  const value: OnboardingContextType = {
    currentStep,
    answers,
    questions,
    currentQuestion,
    totalSteps: questions.length,
    isComplete: currentStep > questions.length,
    handleAnswerChange,
    handleNext,
    handleBack,
    clearCurrentAnswer,
    storeQuestionData,
    submissionDocId,
    setSubmissionDocId,
    // resetOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === null) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
