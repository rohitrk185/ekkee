export interface Option {
  label: string;
  icon?: string;
}

export interface Question {
  questionId: number;
  questionTitle: string;
  desciption: string;
  options: Option[];
  isSkippable: boolean;
  isMultiChoice: boolean;
  maxSelections?: number;
}
