"use client";

import OnboardingComponent from "@/components/OnboardingComponent";
import { OnboardingProvider } from "@/contexts/onboardingContext";
import { Option, Question } from "@/types";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionsData {
  id: string;
  text: Record<string, string>;
  instruction: Record<string, string>;
  canSkip: boolean;
  options: Option[];
  type: string;
  maxSelections: number;
}

async function getOnboardingData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/questions`,
      {
        // This `next` object is used to configure caching behavior.
        // `revalidate` tells Next.js to regenerate the page at most once
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: QuestionsData[] = await response.json();
    console.log("data: ", data);

    const questions: Question[] = data.map((question: QuestionsData) => {
      const questionData: Question = {
        // Map API fields to your frontend schema
        questionId: question.id,
        questionTitle: question.text,
        description: question.instruction || "", // Provide description, fallback to empty string if missing
        isSkippable: question.canSkip,
        // Convert the array of objects to an array of strings
        options: question.options.map((option: Option) => option),
        // Determine isMultiChoice based on the 'type' field
        isMultiChoice: question.type === "multi_choice",
        // Carry over maxSelections if it exists
        maxSelections: question.maxSelections || Infinity,
      };
      return questionData;
    });

    return questions;
  } catch (error) {
    console.error("Could not fetch onboarding questions:", error);
    return [];
  }
}

const OnboardingPage = () => {
  const { language } = useLanguage();
  // Debug: Log the current language context value
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getOnboardingData()
      .then((data: Question[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: Question[] = data.map((question: Question) => ({
            ...question,
            questionTitle:
              typeof question.questionTitle === "object" &&
              question.questionTitle !== null
                ? question.questionTitle
                : {
                    en:
                      typeof question.questionTitle === "string"
                        ? question.questionTitle
                        : "",
                  },
            description:
              typeof question.description === "object" &&
              question.description !== null
                ? question.description
                : {
                    en:
                      typeof question.description === "string"
                        ? question.description
                        : "",
                  },
            instruction:
              typeof question.instruction === "object" &&
              question.instruction !== null
                ? question.instruction
                : {
                    en:
                      typeof question.instruction === "string"
                        ? question.instruction
                        : "",
                  },
            options: question.options.map((option: Option) => ({
              label:
                typeof option.label === "object" && option.label !== null
                  ? option.label
                  : {
                      en:
                        typeof option.label === "string"
                          ? option.label
                          : "Unknown",
                    },
              icon: option.icon,
            })),
          }));
          setQuestions(mapped);
          setFetchError(null);
        } else {
          setFetchError(
            "Could not load onboarding questions. Please try again later."
          );
        }
      })
      .catch(() => {
        setFetchError(
          "Could not load onboarding questions. Please check your network or contact support."
        );
      });
  }, [language]);

  return (
    <OnboardingProvider questions={questions}>
      <div className="container">
        {fetchError && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
            {fetchError}
          </div>
        )}
        <OnboardingComponent questions={questions} />
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingPage;
