import Dot from "@/components/ui/dot";

interface WordSeparatorProps {
  text: string;
  className?: string;
}

export default function WordSeparator({
  text,
  className = "",
}: WordSeparatorProps) {
  const words = text.split(" ");

  return (
    <div className={`flex flex-wrap items-center justify-center ${className}`}>
      {words.map((word, index) => (
        <div key={index} className="flex items-center space-x-1">
          <span>{word}</span>
          {index !== words.length - 1 && <Dot />}
        </div>
      ))}
    </div>
  );
}
