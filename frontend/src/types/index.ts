export interface Option {
  label: Record<string, string>;
  icon?: string;
}

export interface Question {
  questionId: string;
  questionTitle: Record<string, string>;
  description: Record<string, string>;
  instruction?: Record<string, string>;
  options: Option[];
  isSkippable: boolean;
  isMultiChoice: boolean;
  maxSelections?: number;
  order: number;
}
