"use client";

import { Button } from "../ui/button";

interface SubmitButtonProps {
  onClick: () => void;
  btnText: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ btnText }) => {
  return (
    <Button
      onClick={() => {}}
      className="w-[150px] h-[40px] rounded-lg flex items-center justify-center text-sm font-medium"
    >
      {btnText}
    </Button>
  );
};
