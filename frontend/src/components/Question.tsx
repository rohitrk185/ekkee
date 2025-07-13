import React from "react";

type Props = {
  questionTitle: string;
  questionDesc: string;
};

const Question = ({ questionDesc, questionTitle }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      <h3 className="text-2xl font-[600] leading-9">{questionTitle}</h3>

      <p className="font-[300] leading-6">{questionDesc}</p>
    </div>
  );
};

export default Question;
