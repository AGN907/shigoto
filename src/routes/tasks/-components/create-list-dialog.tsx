import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useListStore } from "@/stores/list-store";

export function CreateListDialog() {
  const [listName, setListName] = useState("");
  const { createList } = useListStore((state) => state.actions);

  const onCreateList = () => {
    setListName("");
    createList(listName);
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
          <DialogTitle>Create List</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="List Name"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCreateList}>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
