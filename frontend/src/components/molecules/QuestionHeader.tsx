"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface QuestionHeaderProps {
  headingText: string;
  onBack?: () => void;
  onSkip?: () => void;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  headingText,
}) => {
  return (
    <header className="w-full flex flex-col justify-between items-center px-4 py-3 bg-white ">
      {/* Back Button */}
      <div className="w-full flex items-center justify-between">
        <Button
          onClick={() => {}}
          variant="ghost"
          className="p-2 text-primary hover:opacity-80 transition"
          aria-label="Go Back"
        >
          <ArrowLeft size={24} />
        </Button>

        {/* Skip */}
        <Button
          onClick={() => {}}
          variant="ghost"
          className="text-base text-[#5D5D5D] hover:underline"
        >
          Skip
        </Button>
      </div>
      <div className="flex-1 text-center px-4 py-5">
        <h1 className="text-3xl font-semibold text-primary">{headingText}</h1>
      </div>
    </header>
  );
};
