import { nanoid } from "nanoid";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { ListIcon } from "@/components/list-icons";

export interface List {
  id: string;
  name: string;
  icon: ListIcon;
}

interface State {
  lists: List[];
}

interface Actions {
  createList: (name: string) => void;
  updateList: (id: string, name: string) => void;
  deleteList: (id: string) => void;
  duplicateList: (originalId: string) => void;
  reorderList: (lists: List[]) => void;
}

type InitialState = State & {
  actions: Actions;
};

export const useListStore = create<InitialState>()(
  persist(
    immer((set) => ({
      lists: [],
      actions: {
        createList: (name) => {
          if (!name) {
            toast.warning("Blank isn't considered a name");
          }

          const id = nanoid();
          const icon = "Sparkle";

          set((state) => {
            state.lists.push({ id, name, icon });
          });

          toast.success("List Created", {
            description: "Looking productive today!",
          });
        },
        updateList: (id, name) => {
          set((state) => {
            const task = state.lists.find((task) => task.id === id);

            if (task) {
              task.name = name;
            }
          });
          toast.success("List updated", {
            description: "Hopefully you'll get something out of this",
          });
        },
        deleteList: (id) => {
          set((state) => {
            state.lists = state.lists.filter((list) => list.id !== id);
          });
          toast.info("List Deleted", {
            description: "Probably deserve it, right?",
          });
        },
        reorderList: (lists) => {
          set((state) => ({ ...state, lists }));
        },
        duplicateList: (orignalId) => {
          const id = nanoid();
          set((state) => {
            const originalList = state.lists.find(
              (list) => list.id === orignalId,
            )!;

            state.lists.push({ ...originalList, id });
          });
          toast.success("List Duplicated", {
            description: "It's like a copy, but newer",
          });
        },
      },
    })),
    {
      name: "list-store",
      partialize: (state) => ({ lists: state.lists }),
    },
  ),
);
