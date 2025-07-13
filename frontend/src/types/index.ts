export interface Option {
  optionText: string;
}

export interface Question {
  questionId: number;
  questionTitle: string;
  desciption: string;
  options: Array<Option>;
  isSkippable: boolean;
  isMultiChoice: boolean;
}
