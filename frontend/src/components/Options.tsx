import { useMemo, useState } from "react";
import { toast } from "react-toastify";

interface OptionsSelectorProps {
  options: string[];
  isMultiChoice: boolean;
  maxSelections?: number;
  onSelectionChange: (selectedOptions: string) => void;
}

export const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  options,
  isMultiChoice,
  maxSelections = Infinity, // Default to no limit if not provided
  onSelectionChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Determine if we should use a single column layout.
  // This happens if any option text is longer than a certain threshold (e.g., 15 characters).
  const useSingleColumn = useMemo(() => {
    return options.some((option) => option.length > 15);
  }, [options]);

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
          // Optional: Add a small visual cue or log that the limit is reached
          console.warn(`Maximum selections (${maxSelections}) reached.`);
          toast.warning(`Maximum selections (${maxSelections}) reached.`);
          return; // Do nothing if limit is reached
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
      className={`grid gap-3 transition-all duration-300 mt-4 ${
        useSingleColumn ? "grid-cols-1" : "grid-cols-2"
      }`}
    >
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option);
        return (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`
              w-full text-center font-medium py-3 px-4 rounded-lg border transition-all duration-200
              focus:outline-none text-black
              ${
                isSelected
                  ? " border-black border-2"
                  : " border-[f3f3f3] hover:border-black"
              }
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
