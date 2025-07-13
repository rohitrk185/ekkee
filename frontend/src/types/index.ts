export interface Option {
  label: Record<string, string>;
  icon?: string;
}

export interface Question {
  questionId: number;
  questionTitle: Record<string, string>;
  desciption: Record<string, string>;
  instruction?: Record<string, string>;
  options: Option[];
  isSkippable: boolean;
  isMultiChoice: boolean;
  maxSelections?: number;
}
