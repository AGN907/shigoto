import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Edit, GripVertical, Trash, X } from "lucide-react";
import { useState } from "react";

import ListIcons from "@/components/list-icons";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { List } from "@/stores/list-store";

interface ListProps {
  list: List;
  onEditList: (id: string, newName: string) => void;
  onDuplicateList: (id: string) => void;
  onDeleteList: (id: string) => void;
}

export function ListItem({
  list,
  onEditList,
  onDuplicateList,
  onDeleteList,
}: ListProps) {
  const { id, name, icon } = list;

  const [isEditing, setIsEditing] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Get Icon component by name as the icon can't be persisted
  const Icon = ListIcons[icon];

  const onEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;

    onEditList(id, name);
    setIsEditing(false);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li
          ref={setNodeRef}
          style={style}
          className="relative border px-2 py-4 flex items-center group rounded-xl hover:bg-accent/60 transition-colors duration-300"
        >
          <div className="group items-center flex gap-4">
            <Icon className="size-5" />

            {isEditing ? (
              <form className="flex items-center gap-2" onSubmit={onEditSubmit}>
                <Input defaultValue={name} name="name" />
                <div className="flex">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="link"
                    size="icon"
                    type="button"
                  >
                    <X className="size-4" />
                  </Button>
                  <Button variant="link" size="icon">
                    <Check className="size-4" />
                  </Button>
                </div>
              </form>
            ) : (
              <Link
                to="/tasks/$listId"
                params={{ listId: id }}
                className="w-full"
              >
                {name}
              </Link>
            )}
          </div>
          <div className="ml-auto flex">
            <Button
              data-navigate={false}
              className={cn("group-hover:opacity-100 opacity-0")}
              variant="link"
              size="icon"
              {...listeners}
              {...attributes}
            >
              <GripVertical className="size-5 text-muted-foreground" />
            </Button>
          </div>
        </li>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => setIsEditing(true)}>
          <Edit className="size-4 mr-2" />
          <span>Edit</span>
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => onDuplicateList(id)}>
          <Copy className="size-4 mr-2" />
          <span>Duplicate list</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="text-red-500"
          onSelect={() => onDeleteList(id)}
        >
          <Trash className="size-4 mr-2" />
          <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
