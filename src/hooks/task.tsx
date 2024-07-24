import { useState } from "react";
import { ID } from "@/types";

export type TaskData = {
  id: ID;
  name: string;
  parent?: TaskData;
  children?: TaskData[];
};

export default function useTask(taskData: TaskData) {
  const [task, setTask] = useState<TaskData>(taskData);

  const addChildTask = (childTask: TaskData) => {
    if (task.children === undefined) {
      task.children = [childTask];
    } else {
      task.children.push(childTask);
    }
    setTask({ ...task });
  };

  const updateTask = (newTask: TaskData) => {
    const updateRecursive = (currentTask: TaskData): boolean => {
      if (currentTask.id === newTask.id) {
        Object.assign(currentTask, newTask);
        return true;
      }

      if (currentTask.children) {
        for (let i = 0; i < currentTask.children.length; i++) {
          if (updateRecursive(currentTask.children[i])) {
            return true;
          }
        }
      }
      return false;
    };

    if (updateRecursive(task)) {
      setTask({ ...task });
    }
  };

  return {
    task,
    addChildTask,
    updateTask,
  };
}
