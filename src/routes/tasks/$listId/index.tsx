import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useListStore } from "@/stores/list-store";
import { useTaskStore } from "@/stores/task-store";

import { CreateTaskDialog } from "./-components/create-task-dialog";
import { TaskItem } from "./-components/task-item";

export const Route = createFileRoute("/tasks/$listId/")({
  component: () => <ListTasksRoute />,
});

export function ListTasksRoute() {
  const { listId } = Route.useParams();

  const lists = useListStore((state) => state.lists);
  const tasks = useTaskStore((state) => state.tasks);
  const { toggleTask, toggleAllTasksByList, deleteTask, deleteAllTasksByList } =
    useTaskStore((state) => state.actions);

  const [showCompleted, setShowCompleted] = useState(false);

  const selectedList = lists.find((list) => list.id === listId);
  const listTasks = tasks.filter((task) => task.listId === listId);

  const filteredTasks = showCompleted
    ? listTasks.filter((task) => task.isDone === true)
    : listTasks;

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="border-b">
        <CardTitle className="flex gap-2 justify-between items-center">
          <div className="flex gap-4 items-center">
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              asChild
            >
              <Link to="/tasks">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <span>{selectedList?.name}</span>
          </div>
          <CreateTaskDialog listId={listId} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <ul className="flex flex-col gap-2 p-4">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center text-muted-foreground">
            <span>Completed: </span>
            <span>
              {listTasks.filter((task) => task.isDone).length}/
              {listTasks.length}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <MoreHorizontal className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => toggleAllTasksByList(listId)}>
                Complete All tasks
              </DropdownMenuItem>
              <DropdownMenuCheckboxItem
                className="flex-row-reverse flex"
                checked={showCompleted}
                onCheckedChange={setShowCompleted}
              >
                Show Completed Tasks
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onSelect={() => deleteAllTasksByList(listId)}
              >
                Clear all tasks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
