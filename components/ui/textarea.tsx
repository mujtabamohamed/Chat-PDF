import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // Reset the height to calculate the correct scrollHeight
    target.style.height = `${Math.min(target.scrollHeight, 150)}px`; // Set the height, capped at 200px
  };

  return (
    <textarea
      className={cn(
        "flex w-full rounded-lg border border-input bg-background px-3 py-4 pl-4 pr-16 text-base ring-offset-background placeholder:text-opacity-40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      rows={1} // Initial number of rows
      onInput={handleInput}
      style={{ overflow: "auto", resize: "none" }} // Disable manual resizing
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
