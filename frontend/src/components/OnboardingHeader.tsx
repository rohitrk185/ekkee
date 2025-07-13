import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type Props = {
  isSkippable: boolean;
};

const handleSkipButton = () => {
  // filler fn;
};

const OnboardingHeader = ({ isSkippable }: Props) => {
  return (
    <div className="flex justify-between">
      <ArrowLeftIcon />

      <button onClick={handleSkipButton}>
        {isSkippable ? "Skip" : "Next"}
      </button>
    </div>
  );
};

export default OnboardingHeader;
