import { cn } from "@/lib/utils";
import React from "react";

export const Card = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};
