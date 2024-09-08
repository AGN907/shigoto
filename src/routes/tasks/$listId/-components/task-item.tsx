import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type Task } from "@/stores/task-store";
import { X } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskItem({ task, onToggleTask, onDeleteTask }: TaskItemProps) {
  const { id, title, isDone } = task;

  return (
    <li>
      <div className="group flex border px-2 py-4 rounded-xl hover:bg-accent/60">
        <label
          className={cn(
            "flex items-center w-full gap-4",
            isDone && "line-through text-muted-foreground opacity-50",
          )}
        >
          <Checkbox onCheckedChange={() => onToggleTask(id)} checked={isDone} />
          <p className="w-full text-lg font-medium"> {title}</p>
        </label>
        <Button
          onClick={() => onDeleteTask(id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          variant="link"
          size="icon"
        >
          <X className="size-5" />
        </Button>
      </div>
    </li>
  );
}
