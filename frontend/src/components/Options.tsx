import { Option } from "@/types";
import { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { useOnboarding } from "@/contexts/onboardingContext";

interface OptionsSelectorProps {
  questionId: string;
  options: Option[];
  isMultiChoice: boolean;
  maxSelections?: number;
  onSelectionChange: (selectedOptions: string) => void;
  language: string;
}

export const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  questionId,
  options,
  isMultiChoice,
  maxSelections = Infinity, // Default to no limit if not provided
  onSelectionChange,
  language,
}) => {
  const { answers } = useOnboarding();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    answers[`q_${questionId}`] || answers[questionId] || []
  );

  // Reset selected options when language or options change
  useEffect(() => {
    setSelectedOptions([]);
  }, [language]);

  // Determine if we should use a single column layout.
  // This happens if any option text is longer than a certain threshold (e.g., 15 characters).
  const useSingleColumn = useMemo(() => {
    return options.some((option) => {
      const labelObj =
        typeof option.label === "object" && option.label !== null
          ? option.label
          : { en: typeof option.label === "string" ? option.label : "Unknown" };
      return (labelObj[language] || labelObj["en"] || "").length > 20;
    });
  }, [options, language]);

  const handleOptionClick = (option: string) => {
    let newSelection: string[];

    if (isMultiChoice) {
      if (selectedOptions.includes(option)) {
        // If already selected, deselect it
        newSelection = selectedOptions.filter((item) => item !== option);
      } else {
        // If not selected, add it, respecting the maxSelections limit
        if (selectedOptions.length < maxSelections) {
          newSelection = [...selectedOptions, option];
        } else {
          console.warn(`Maximum selections (${maxSelections}) reached.`);
          toast.warning(`Maximum selections (${maxSelections}) reached.`, {
            toastId: "maxSelections",
          });
          return;
        }
      }
    } else {
      // For single choice, just set the new selection
      newSelection = [option];
    }

    setSelectedOptions(newSelection);
    onSelectionChange(option);
  };

  return (
    <div
      className={`grid gap-4 transition-all duration-300 mt-4 ${
        useSingleColumn ? "grid-cols-1" : "grid-cols-2"
      }`}
    >
      {options.map((option) => {
        const label = option.label[language] || option.label["en"];
        const isSelected = selectedOptions.includes(label);
        return (
          <Button
            type="button"
            variant="outline"
            key={label}
            onClick={() => handleOptionClick(label)}
            className={`
              w-full font-medium py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none text-black flex justify-center items-center
              ${
                isSelected
                  ? " border-black border-2"
                  : " border-[f3f3f3] hover:border-black"
              }
            `}
          >
            <p className="flex gap-x-2 items-center justify-center">
              {option.icon ? (
                <span>
                  <i className={option.icon} />
                </span>
              ) : null}
              <span>{label}</span>
            </p>
          </Button>
        );
      })}
    </div>
  );
};
