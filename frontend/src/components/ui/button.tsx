import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = ({
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-white font-medium",
        variant === "default" && "bg-black hover:bg-gray-800",
        variant === "outline" &&
          "border border-black text-black hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
};
