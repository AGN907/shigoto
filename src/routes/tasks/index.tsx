import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/")({
  component: () => <TasksRouteComponent />,
});

function TasksRouteComponent() {
  return <div></div>;
}

