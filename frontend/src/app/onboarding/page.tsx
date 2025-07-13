import OnboardingComponent from "@/components/OnboardingComponent";
import { OnboardingProvider } from "@/contexts/onboardingContext";
import { Option, Question } from "@/types";
import React from "react";

// This function fetches data from your external API.
// Next.js automatically memoizes (caches) the result of this fetch.
async function getOnboardingData() {
  try {
    // // Replace this URL with your actual external API endpoint
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

    const data: unknown[] = await response.json();
    console.log("data: ", data);

    const questions: Question[] = data.map((question: any) => ({
      // Map API fields to your frontend schema
      questionId: question.id,
      questionTitle: question.text,
      desciption: question.desciption || "", // Provide desciption, fallback to empty string if missing
      isSkippable: question.canSkip,
      description: question.instruction,
      // Convert the array of objects to an array of strings
      options: question.options.map((option: Option) => option),
      // Determine isMultiChoice based on the 'type' field
      isMultiChoice: question.type === "multi_choice",

      // Carry over maxSelections if it exists
      maxSelections: question.maxSelections || Infinity,
    }));

    return questions;
  } catch (error) {
    console.error("Could not fetch onboarding questions:", error);
    // In case of an error, return an empty array to prevent the page from crashing.
    // You could also implement more robust error handling here.
    return [];
  }
}

const page = async () => {
  const questions = await getOnboardingData();
  return (
    <OnboardingProvider questions={questions}>
      <div className="container">
        {/* Render your full onboarding flow here */}
        <OnboardingComponent questions={questions} />
      </div>
    </OnboardingProvider>
  );
};

export default page;
