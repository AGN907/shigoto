export function EmptyListIllustration() {
  return (
    <div className="size-32 relative bg-accent/60 shadow-lg shadow-accent rounded-xl">
      <div className="absolute w-28 h-7 bg-neutral-700 inset-x-2 inset-y-4 border rounded-lg">
        <div className="size-3 absolute inset-x-2 inset-y-2 bg-neutral-500 rounded-full"></div>
        <div className="absolute inset-x-8 inset-y-2 rounded w-5 bg-neutral-200 h-1"></div>
        <div className="absolute inset-x-8 inset-y-4 rounded w-10 bg-neutral-600 h-1"></div>
      </div>
      <div className="absolute h-7 bg-neutral-900 border-white inset-x-2 w-28 inset-y-12 border rounded-lg">
        <div className="size-3 absolute inset-x-2 inset-y-2 bg-neutral-500 to-neutral-600  rounded-full"></div>
        <div className="absolute inset-x-8 inset-y-2 rounded w-5 bg-neutral-200 h-1"></div>
        <div className="absolute inset-x-8 inset-y-4 rounded w-10 bg-neutral-600 h-1"></div>
      </div>
      <div className="absolute h-7 bg-neutral-600 inset-x-2 w-28 inset-y-20 border rounded-lg">
        <div className="size-3 absolute inset-x-2 inset-y-2 bg-neutral-400 rounded-full"></div>
        <div className="absolute inset-x-8 inset-y-2 rounded w-5 bg-neutral-200 h-1"></div>
        <div className="absolute inset-x-8 inset-y-4 rounded w-10 bg-neutral-500 h-1"></div>
      </div>
    </div>
  );
}
