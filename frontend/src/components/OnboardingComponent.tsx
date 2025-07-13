"use client";

import { useOnboarding } from "@/contexts/onboardingContext";
import { Question } from "@/types";
import React from "react";
import CurStepIndicator from "./curStepIndicator";
import QuestionCard from "./Question";
import { OptionsSelector } from "./Options";
import { Button } from "./ui/button";
import { QuestionHeader } from "./molecules/QuestionHeader";
import { useRouter } from "next/navigation";
import { submitAnswers } from "@/services/onboardingApi";
import { toast } from "react-toastify";

type Props = {
  questions: Question[];
};

const OnboardingComponent = ({ questions }: Props) => {
  const router = useRouter();
  const {
    currentQuestion,
    handleAnswerChange,
    currentStep,
    handleNext,
    answers,
  } = useOnboarding();

  console.log("answers: ", answers);

  if (!currentQuestion) return null;

  const onboardingText = {
    en: "Our mission is to better understand you so we can help connect you with resources for a more purpose driven life",
    es: "Nuestra misión es comprenderte mejor para poder ayudarte a conectar con recursos para una vida más orientada al propósito",
  };

  const handleOnNext = () => {
    if (currentStep === questions.length) {
      // Call backend api to store options
      try {
        submitAnswers(answers);
      } catch (error) {
        console.error("Error submitting answers:", error);
        toast.error("Unable to complete your onboarding. Please try again", {
          toastId: "onboardingError",
        });
      }
      // Route to success page
      router.push("/onboarding-success");
      return;
    }
    handleNext();
    return;
  };

  return (
    <div className="px-4 pb-16 flex flex-col gap-4 relative">
      <QuestionHeader headingText={"Eekee"} />
      <CurStepIndicator curStep={currentStep} totalSteps={questions.length} />
      {currentStep === 1 ? (
        <p className="font-medium">{onboardingText.en}</p>
      ) : null}
      <QuestionCard
        key={currentQuestion.questionTitle.en}
        questionTitle={currentQuestion.questionTitle.en}
        questionDesc={currentQuestion.description.en}
      />
      {currentQuestion.instruction && currentQuestion.instruction && (
        <p className="font-medium text-gray-600 text-center mb-2">
          {currentQuestion.instruction.en}
        </p>
      )}
      <OptionsSelector
        key={currentQuestion.questionId}
        questionId={currentQuestion.questionId}
        options={currentQuestion.options}
        isMultiChoice={currentQuestion.isMultiChoice}
        maxSelections={currentQuestion.maxSelections || Infinity}
        onSelectionChange={handleAnswerChange}
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
