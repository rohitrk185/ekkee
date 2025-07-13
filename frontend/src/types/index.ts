export interface Option {
  label: string;
  icon?: string;
}

export interface Question {
  questionId: string;
  questionTitle: string;
  description: string;
  options: Option[];
  isSkippable: boolean;
  isMultiChoice: boolean;
  maxSelections?: number;
}
