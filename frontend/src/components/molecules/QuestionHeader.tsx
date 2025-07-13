"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useOnboarding } from "@/contexts/onboardingContext";
import { useRouter } from "next/navigation";

interface QuestionHeaderProps {
  headingText: string;
  onBack?: () => void;
  onSkip?: () => void;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  headingText,
}) => {
  const router = useRouter();
  const { handleBack, currentStep, questions, handleNext, clearCurrentAnswer } =
    useOnboarding();

  const onBack = () => {
    if (currentStep === 1) {
      return;
    }
    handleBack();
  };

  const onSkip = () => {
    clearCurrentAnswer();
    if (currentStep === questions.length) {
      // Call backend api to store options
      // Route to success page
      router.push("/onboarding-success");
      return;
    }
    handleNext();
  };

  return (
    <header className="w-full flex flex-col justify-between items-center pt-3 bg-white ">
      {/* Back Button */}
      <div className="w-full flex items-center justify-between">
        {currentStep !== 1 ? (
          <Button
            onClick={onBack}
            variant="ghost"
            className="p-2 text-primary hover:opacity-80 transition"
            aria-label="Go Back"
          >
            <ArrowLeft size={24} />
          </Button>
        ) : (
          <span></span>
        )}

        {/* Skip */}
        <Button
          onClick={onSkip}
          variant="ghost"
          className="text-base text-[#5D5D5D] hover:underline"
        >
          Skip
        </Button>
      </div>
      <div className="flex-1 text-center px-4">
        <h1 className="text-3xl font-bold text-[#080808] tracking-wide">
          {headingText}
        </h1>
      </div>
    </header>
  );
};
