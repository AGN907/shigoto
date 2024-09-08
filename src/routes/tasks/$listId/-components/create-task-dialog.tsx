import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/stores/task-store";

interface CreateTaskDialogProps {
  listId: string;
}

export function CreateTaskDialog({ listId }: CreateTaskDialogProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const { createTask } = useTaskStore((state) => state.actions);

  const onCreateTask = () => {
    createTask(taskTitle, listId);
    setTaskTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="icon">
          <Plus className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCreateTask}>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
