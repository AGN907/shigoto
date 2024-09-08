import { Search, X } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input, type InputProps } from "./ui/input";

type SearchInputProps = InputProps & {
  onValueChange: (value: string) => void;
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          value={value}
          className={cn(className, "pl-8")}
          onChange={(e) => onValueChange(e.target.value)}
          {...props}
        />
        <Search
          className={cn(
            "size-4 absolute inset-y-3 text-muted-foreground left-2",
            className,
          )}
        />
        {value ? (
          <Button
            onClick={() => onValueChange("")}
            className="top-0 absolute right-0"
            variant="ghost"
            size="icon"
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
