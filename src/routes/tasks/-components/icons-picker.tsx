import ListOfIcons, { ListIcon } from "@/components/list-icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useListStore } from "@/stores/list-store";

interface IconPickerProps {
  listId: string;
  activeIcon: string;
  children: React.ReactNode;
}

export function IconPicker({ listId, activeIcon, children }: IconPickerProps) {
  const { changeListIcon } = useListStore((state) => state.actions);

  const listIcons = Object.entries(ListOfIcons);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-6">
          {listIcons.map(([name, Icon], index) => (
            <Button
              key={index}
              onClick={() => changeListIcon(listId, name as ListIcon)}
              variant="ghost"
              size="icon"
              className={cn(name === activeIcon ? "bg-accent" : "")}
              aria-label={name}
            >
              <Icon className="size-5 cursor-pointer" />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
