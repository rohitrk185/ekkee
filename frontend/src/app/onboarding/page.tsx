import OnboardingComponent from "@/components/OnboardingComponent";
import { OnboardingProvider } from "@/contexts/onboardingContext";
import { Question } from "@/types";
import React from "react";

// Implement SSG and pass it to the component below
type Props = {};

// This function fetches data from your external API.
// Next.js automatically memoizes (caches) the result of this fetch.
async function getOnboardingData() {
  try {
    // // Replace this URL with your actual external API endpoint
    // const response = await fetch(
    //   "https://api.example.com/onboarding-questions",
    //   {
    //     // This `next` object is used to configure caching behavior.
    //     // `revalidate` tells Next.js to regenerate the page at most once
    //     // every 3600 seconds (1 hour) if new requests come in.
    //     // This is Incremental Static Regeneration (ISR).
    //     next: { revalidate: 3600 },
    //   }
    // );

    // if (!response.ok) {
    //   // If the API call fails, we throw an error to be caught below.
    //   throw new Error(`Failed to fetch data: ${response.statusText}`);
    // }

    // const questions = await response.json();

    const questions: Question[] = [
      {
        questionId: 1,
        questionTitle: "What is your primary role?",
        desciption: "This helps us tailor your experience.",
        options: [
          { optionText: "Developer" },
          { optionText: "Designer" },
          { optionText: "Manager" },
        ],
        isSkippable: false,
        isMultiChoice: false,
      },
      {
        questionId: 2,
        questionTitle: "Which technologies are you interested in?",
        desciption: "Select all that apply.",
        options: [
          { optionText: "React" },
          { optionText: "Vue" },
          { optionText: "Node.js" },
        ],
        isSkippable: true,
        isMultiChoice: true,
      },
    ];
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
  console.log("questions: ", questions);
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
