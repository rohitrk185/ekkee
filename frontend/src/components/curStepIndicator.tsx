import { Progress } from "./ui/progress";

type Props = {
  curStep: number;
  totalSteps: number;
};

const CurStepIndicator = ({ curStep, totalSteps }: Props) => {
  const progressValue = (curStep / totalSteps) * 100;
  return (
    <div className="flex flex-col gap-2">
      <h3>Step {`${curStep}/${totalSteps}`}</h3>
      <Progress value={(curStep / totalSteps) * 100} />
    </div>
  );
};

export default CurStepIndicator;
