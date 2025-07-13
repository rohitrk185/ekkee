"use client";

import { useOnboarding } from "@/contexts/onboardingContext";
import { Question } from "@/types";
import React from "react";
import CurStepIndicator from "./curStepIndicator";
import QuestionCard from "./Question";
import { OptionsSelector } from "./Options";
import { Button } from "./ui/button";

type Props = {
  questions: Question[];
};

const OnboardingComponent = ({ questions }: Props) => {
  const { currentQuestion, handleAnswerChange, currentStep, handleNext } =
    useOnboarding();

  if (!currentQuestion) return null;

  const onboardingText =
    "Our mission is to better understand you so we can help connect you with resources for a more purpose driven life";

  const handleOnNext = () => {
    if (currentStep === questions.length) {
      // Call backend api to store options
      // Route to success page
      return;
    }

    handleNext();
    return;
  };

  return (
    <div className="my-10 px-4 flex flex-col gap-4">
      <CurStepIndicator curStep={currentStep} totalSteps={questions.length} />
      {currentStep === 1 ? (
        <p className="font-medium">{onboardingText}</p>
      ) : null}
      <QuestionCard
        questionTitle={currentQuestion.questionTitle}
        questionDesc={currentQuestion.desciption}
      />
      <OptionsSelector
        options={currentQuestion.options}
        isMultiChoice={currentQuestion.isMultiChoice}
        maxSelections={currentQuestion.maxSelections || Infinity}
        onSelectionChange={handleAnswerChange}
      />

      <Button
        variant="default"
        onClick={handleOnNext}
        type="button"
        className="mt-10 px-16 max-w-max mx-auto"
      >
        Next
      </Button>
    </div>
  );
};

export default OnboardingComponent;
