import OnboardingComponent from "@/components/OnboardingComponent";
import { OnboardingProvider } from "@/contexts/onboardingContext";
import { Option, Question } from "@/types";
import React from "react";

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

const OnboardingPage = async () => {
  // Debug: Log the current language context value
  const questions = await getOnboardingData();
  return (
    <OnboardingProvider questions={questions}>
      <OnboardingComponent questions={questions} />
    </OnboardingProvider>
  );
};

export default OnboardingPage;
