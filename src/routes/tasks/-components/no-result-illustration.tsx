import { SearchX } from "lucide-react";

export function NoResultIllustration() {
  return (
    <div className="relative size-28 bg-accent/60 rounded-full">
      <SearchX className="size-20 absolute inset-y-5 inset-x-4 text-neutral-800" />
    </div>
  );
}
