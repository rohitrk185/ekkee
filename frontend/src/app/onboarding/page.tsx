"use client";

import OnboardingComponent from "@/components/OnboardingComponent";
import { OnboardingProvider } from "@/contexts/onboardingContext";
import { Option, Question } from "@/types";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

async function getOnboardingData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/questions`,
      { next: { revalidate: false } }
    );
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch onboarding questions:", error);
    return [];
  }
}

const OnboardingPage = () => {
  const { language } = useLanguage();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getOnboardingData().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((question: any) => ({
          questionId: question.id,
          questionTitle:
            typeof question.text === "object" && question.text !== null
              ? question.text
              : { en: typeof question.text === "string" ? question.text : "" },
          desciption:
            typeof question.desciption === "object" && question.desciption !== null
              ? question.desciption
              : { en: typeof question.desciption === "string" ? question.desciption : "" },
          instruction:
            typeof question.instruction === "object" && question.instruction !== null
              ? question.instruction
              : { en: typeof question.instruction === "string" ? question.instruction : "" },
          isSkippable: question.canSkip,
          options: question.options.map((option: any) => ({
            label:
              typeof option.label === "object" && option.label !== null
                ? option.label
                : { en: typeof option.label === "string" ? option.label : "Unknown" },
            icon: option.icon,
          })),
          isMultiChoice: question.type === "multi_choice",
          maxSelections: question.maxSelections || Infinity,
        }));
        setQuestions(mapped);
        setFetchError(null);
      } else {
        setFetchError("Could not load onboarding questions. Please try again later.");
      }
    }).catch((error) => {
      setFetchError("Could not load onboarding questions. Please check your network or contact support.");
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
