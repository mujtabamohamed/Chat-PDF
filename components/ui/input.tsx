import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const target = e.target as HTMLInputElement;
    //   target.style.height = "auto"; // Reset the height to calculate the correct scrollHeight
    //   target.style.height = `${Math.min(target.scrollHeight, 200)}px`; // Set the height, capped at 200px
    // };
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-base placeholder:text-opacity-40 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        // onInput={handleInput}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
