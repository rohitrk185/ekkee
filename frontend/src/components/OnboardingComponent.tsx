"use client";

import { useOnboarding } from "@/contexts/onboardingContext";
import { Question } from "@/types";
import React, { useEffect, useState } from "react";
import CurStepIndicator from "./curStepIndicator";
import QuestionCard from "./Question";
import { OptionsSelector } from "./Options";
import { Button } from "./ui/button";
import { QuestionHeader } from "./molecules/QuestionHeader";
import { useRouter } from "next/navigation";
import { submitCurQuestionSelection } from "@/services/onboardingApi";
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
    // handleNext,
    answers,
    storeQuestionData,
    submissionDocId,
    setSubmissionDocId,
  } = useOnboarding();

  const questionID = currentQuestion?.questionId || "";

  console.log(currentQuestion);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    answers[`q_${questionID}`] || answers[questionID] || []
  );

  useEffect(() => {
    setSelectedOptions(answers[`q_${questionID}`] || answers[questionID] || []);
  }, [currentQuestion?.questionId]);

  if (!currentQuestion) return null;

  const onboardingText = {
    en: "Our mission is to better understand you so we can help connect you with resources for a more purpose driven life",
    es: "Nuestra misión es comprenderte mejor para poder ayudarte a conectar con recursos para una vida más orientada al propósito",
  };

  const handleOnNext = async () => {
    try {
      setIsSubmitting(true);
      // if (currentStep === questions.length) {
      //   // Call backend api to store options
      //   submitAnswers(answers);
      //   // Route to success page
      //   router.push("/onboarding-success");
      //   return;
      // }
      const { next_question: nextQuestionData, submissionDocumentId } =
        await submitCurQuestionSelection(
          currentQuestion.order,
          currentQuestion.questionId,
          selectedOptions,
          submissionDocId
        );

      console.log("nextQuestionData: ", nextQuestionData);
      console.log("submissionDocumentId: ", submissionDocumentId);

      // We should now save this data in questions state of context
      // if the question already exists in questions state of context, we should skip it
      setSubmissionDocId(submissionDocumentId);

      if (currentStep === 10) {
        // Route to success page
        storeQuestionData(nextQuestionData);
        router.push("/onboarding-success");
        setSubmissionDocId(undefined);
        return;
      }

      storeQuestionData(nextQuestionData);
      // handleNext();
      return;
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Unable to complete your onboarding. Please try again", {
        toastId: "onboardingError",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />

      <Button
        variant="default"
        onClick={handleOnNext}
        type="button"
        disabled={isSubmitting}
        className="mt-10 px-16 max-w-max mx-auto bottom-0 disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
};

export default OnboardingComponent;
