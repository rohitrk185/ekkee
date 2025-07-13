// components/ui/dot.tsx

interface DotProps {
  size?: number; // default 5
  color?: string; // default #5D5D5D
  className?: string;
}

export default function Dot({
  size = 5,
  color = "#5D5D5D",
  className = "",
}: DotProps) {
  return (
    <div
      className={`rounded-full mx-[5px] my-0 inline-block align-middle ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        lineHeight: "5px",
      }}
    />
  );
}
