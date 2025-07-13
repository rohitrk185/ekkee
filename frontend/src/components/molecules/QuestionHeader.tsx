"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useOnboarding } from "@/contexts/onboardingContext";

interface QuestionHeaderProps {
  headingText: string;
  onBack?: () => void;
  onSkip?: () => void;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  headingText,
}) => {
  const { handleBack, currentStep, questions, handleNext } = useOnboarding();

  const onBack = () => {
    handleBack();
  };

  const onSkip = () => {
    handleNext();
  };

  return (
    <header className="w-full flex flex-col justify-between items-center pt-3 bg-white ">
      {/* Back Button */}
      <div className="w-full flex items-center justify-between">
        {currentStep !== 1 && currentStep !== questions.length ? (
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
