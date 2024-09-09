import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <RootRouteComponent />,
});

function RootRouteComponent() {
  return (
    <div className="px-4 py-6 flex flex-col flex-1">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <div className="flex h-full justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
