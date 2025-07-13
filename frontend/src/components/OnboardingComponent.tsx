"use client";

import { useOnboarding } from "@/contexts/onboardingContext";
import { Question } from "@/types";
import React from "react";
import CurStepIndicator from "./curStepIndicator";
import QuestionCard from "./Question";
import { OptionsSelector } from "./Options";
import { Button } from "./ui/button";
import { QuestionHeader } from "./molecules/QuestionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";


type Props = {
  questions: Question[];
};

const OnboardingComponent = ({ questions }: Props) => {
  const {
    currentQuestion,
    handleAnswerChange,
    currentStep,
    handleNext,
    answers,
  } = useOnboarding();
  const { language } = useLanguage();
  const router = useRouter();

  // Debug: Log language and questions whenever component renders
  console.log('Current language:', language);
  console.log('Questions prop:', questions);

  if (!currentQuestion) return null;

  const onboardingText = {
    en: "Our mission is to better understand you so we can help connect you with resources for a more purpose driven life",
    es: "Nuestra misión es comprenderte mejor para poder ayudarte a conectar con recursos para una vida más orientada al propósito",
  };

    const handleOnNext = () => {
    if (currentStep === questions.length) {
      // Call backend api to store options
      // Route to success page
      router.push('/onboarding-success');
      return;
    }
    handleNext();
    return;
  };

  // Get translated fields with fallback
  const t = (obj: Record<string, string> | undefined) =>
    (obj && (obj[language] || obj["en"])) || "";

  return (
    <div className="px-4 pb-16 flex flex-col gap-4 relative">
      <QuestionHeader headingText={"Eekee"} />
      <CurStepIndicator curStep={currentStep} totalSteps={questions.length} />
      {currentStep === 1 ? (
        <p className="font-medium">{t(onboardingText)}</p>
      ) : null}
      <QuestionCard
        questionTitle={t(currentQuestion.questionTitle)}
        questionDesc={t(currentQuestion.desciption)}
      />
      {currentQuestion.instruction && t(currentQuestion.instruction) && (
        <p className="font-medium text-gray-600 text-center mb-2">{t(currentQuestion.instruction)}</p>
      )}
      <OptionsSelector
        options={currentQuestion.options}
        isMultiChoice={currentQuestion.isMultiChoice}
        maxSelections={currentQuestion.maxSelections || Infinity}
        onSelectionChange={handleAnswerChange}
        language={language}
      />
      <Button
        variant="default"
        onClick={handleOnNext}
        type="button"
        className="mt-10 px-16 max-w-max mx-auto bottom-0"
      >
        Next
      </Button>
    </div>
  );
};

export default OnboardingComponent;
