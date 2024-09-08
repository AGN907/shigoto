import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SearchInput } from "@/components/search-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useListStore } from "@/stores/list-store";

import { CreateListDialog } from "./-components/create-list-dialog";
import { EmptyListIllustration } from "./-components/empty-list-illustration";
import { ListItem } from "./-components/list-item";
import { NoResultIllustration } from "./-components/no-result-illustration";

export const Route = createFileRoute("/tasks/")({
  component: () => <TasksRoute />,
});

function TasksRoute() {
  const { lists } = useListStore(({ lists }) => ({ lists }));
  const { updateList, deleteList, reorderList, duplicateList } = useListStore(
    (state) => state.actions,
  );
  const [query, setQuery] = useState("");

  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(query.toLowerCase()),
  );

  const isEmpty = lists.length === 0;
  const isSearchedEmpty = filteredLists.length === 0;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = filteredLists.findIndex((list) => list.id === active.id);
      const newIndex = filteredLists.findIndex((list) => list.id === over?.id);
      reorderList(arrayMove(filteredLists, oldIndex, newIndex));
    }
  }

  const emptyList = (
    <div className="flex flex-col gap-4 items-center">
      {isEmpty ? (
        <EmptyListIllustration />
      ) : isSearchedEmpty ? (
        <NoResultIllustration />
      ) : null}
      <span className="text-muted-foreground">
        {isEmpty
          ? "No list yet, create one to start"
          : isSearchedEmpty
            ? `No results for '${query}'`
            : null}
      </span>
    </div>
  );

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="flex justify-between gap-10">
          <SearchInput
            value={query}
            onValueChange={(value) => setQuery(value)}
            className={cn("", isEmpty && "opacity-0")}
            placeholder="Search..."
          />
          <div>
            <CreateListDialog />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          (isEmpty || isSearchedEmpty) && "justify-center items-center flex",
        )}
      >
        <ScrollArea className="h-[400px]">
          {emptyList}
          <ul className="flex flex-col gap-2 p-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredLists}
                strategy={verticalListSortingStrategy}
              >
                {filteredLists.map((list) => (
                  <ListItem
                    key={list.id}
                    list={list}
                    onEditList={updateList}
                    onDuplicateList={duplicateList}
                    onDeleteList={deleteList}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
