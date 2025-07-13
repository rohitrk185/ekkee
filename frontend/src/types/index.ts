export interface Question {
  questionId: number;
  questionTitle: string;
  desciption: string;
  options: string[];
  isSkippable: boolean;
  isMultiChoice: boolean;
  maxSelections?: number;
}
