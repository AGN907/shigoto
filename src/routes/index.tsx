import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ListTodo, Timer } from "lucide-react";

export const Route = createFileRoute("/")({
  component: () => <IndexRoute />,
});

export function IndexRoute() {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-rows-3 gap-4">
        <div className="grid cols-start-5">
          <Button className="col-start-2" variant="outline" size="icon">
            <ListTodo className="size-50" />
          </Button>
        </div>
        <div className="grid grid-cols-5 row-start-2">
          <Button className="col-start-2" variant="outline" size="icon">
            <Timer className="size-20" />
          </Button>
          <Button className="col-start-4" variant="outline" size="icon">
            <Timer className="size-20" />
          </Button>
        </div>
        <div className="grid grid-cols-5 row-start-3">
          <Button className="col-start-1" variant="outline" size="icon">
            <Timer className="size-20" />
          </Button>
          <Button className="col-start-5" variant="outline" size="icon">
            <Timer className="size-20" />
          </Button>
        </div>
      </div>
    </div>
  );
}
