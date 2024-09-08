import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { toast } from "sonner";

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
  listId: string;
}

interface State {
  tasks: Task[];
}

interface Actions {
  createTask: (title: string, listId: string) => void;
  toggleTask: (id: string) => void;
  toggleAllTasksByList: (listId: string) => void;
  deleteTask: (id: string) => void;
  deleteAllTasksByList: (listId: string) => void;
}

type InitialState = State & {
  actions: Actions;
};

export const useTaskStore = create<InitialState>()(
  persist(
    immer((set) => ({
      tasks: [
        {
          id: "1",
          title: "Learn Java",
          isDone: false,
          listId: "vasdfasdfajsldfk",
        },
        {
          id: "2",
          title: "Learn React",
          isDone: true,
          listId: "vasdfasdfajsldfk",
        },
      ],
      actions: {
        createTask: (title, listId) => {
          const id = nanoid();

          set((state) => {
            state.tasks.push({ id, title, isDone: false, listId });
          });
          toast.success("Task Created", {
            description: "Now it's time to get productive",
          });
        },
        toggleTask: (id) => {
          set((state) => {
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
              task.isDone = !task.isDone;
            }
            toast.success("Task Updated", {
              description: task?.isDone
                ? "You did it, right?"
                : "Backing down, huh?",
            });
          });
        },
        toggleAllTasksByList: (listId) => {
          set((state) => {
            state.tasks = state.tasks.map((task) =>
              task.listId === listId ? { ...task, isDone: true } : task,
            );
          });
        },
        deleteTask: (id) => {
          set((state) => {
            state.tasks = state.tasks.filter((task) => task.id !== id);
          });
          toast.success("Task Deleted", {
            description: "It's gone forever",
          });
        },
        deleteAllTasksByList: (listId) => {
          set((state) => {
            state.tasks = state.tasks.filter((task) => task.listId !== listId);
          });
        },
      },
    })),
    {
      name: "task-store",
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
);
