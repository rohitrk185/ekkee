"use client";

import { useOnboarding } from "@/contexts/onboardingContext";
import { Question } from "@/types";
import React from "react";
import OnboardingHeader from "./OnboardingHeader";

type Props = {
  questions: Question[];
};

const OnboardingComponent = ({ questions }: Props) => {
  const { currentQuestion, answers, handleAnswerChange } = useOnboarding();

  if (!currentQuestion) return null;

  const selectedOptions = answers[`q_${currentQuestion.questionId}`] || [];
  return (
    <div>
      <OnboardingHeader isSkippable={currentQuestion.isSkippable} />
      <h2>{currentQuestion.questionTitle}</h2>
      <p>{currentQuestion.desciption}</p>
      <div>
        {currentQuestion.options.map((option) => (
          <label key={option.optionText}>
            <input
              type={currentQuestion.isMultiChoice ? "checkbox" : "radio"}
              name={`question-${currentQuestion.questionId}`}
              checked={selectedOptions.includes(option.optionText)}
              onChange={() => handleAnswerChange(option.optionText)}
            />
            {option.optionText}
          </label>
        ))}
      </div>
    </div>
  );
};

export default OnboardingComponent;
