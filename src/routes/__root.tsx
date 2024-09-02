import { ThemeToggle } from "@/components/theme-toggle";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: () => <RootRouteComponent />,
});

function RootRouteComponent() {
  return (
    <>
      <div className="px-4 py-6 flex flex-col h-full">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="flex h-full justify-center items-center">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
