import OnboardingComponent from "@/components/OnboardingComponent";
import { OnboardingProvider } from "@/contexts/onboardingContext";
import React from "react";

// Implement SSG and pass it to the component below
type Props = {};

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
        // every 3600 seconds (1 hour) if new requests come in.
        // This is Incremental Static Regeneration (ISR).
        next: { revalidate: false },
      }
    );

    if (!response.ok) {
      // If the API call fails, we throw an error to be caught below.
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: unknown[] = await response.json();

    // const questions: Question[] = [
    //   {
    //     questionId: 1,
    //     questionTitle: "What is your primary role?",
    //     desciption: "This helps us tailor your experience.",
    //     options: [
    //       "Developer",
    //       "Designer",
    //       "Manager",
    //       "Role1",
    //       "Role2",
    //       "Role3",
    //     ],
    //     isSkippable: false,
    //     isMultiChoice: true,
    //     maxSelections: 3,
    //   },
    //   {
    //     questionId: 2,
    //     questionTitle: "Which technologies are you interested in?",
    //     desciption: "Select all that apply.",
    //     options: ["React", "Vue", "Node.js"],
    //     isSkippable: true,
    //     isMultiChoice: true,
    //     maxSelections: 3,
    //   },
    // ];

    const questions: Question[] = data.map((question: any) => ({
      // Map API fields to your frontend schema
      questionId: question.id,
      questionTitle: question.text,
      desciption: question.desciption || "", // Provide desciption, fallback to empty string if missing
      isSkippable: question.canSkip,
      desciption: question.instruction,
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
