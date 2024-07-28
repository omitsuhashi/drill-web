import { useState } from "react";
import { ID } from "@/types";

export type TaskData = {
  id?: ID;
  name: string;
  status: boolean;
  parent?: TaskData;
  children?: TaskData[];
};

export default function useTask(taskData: TaskData) {
  const [id, setId] = useState(1);
  const [task, setTask] = useState<TaskData>(taskData);

  const addChildTask = (parentTask: TaskData) => (childTask: TaskData) => {
    childTask.id = id;
    setId((prev) => prev + 1);
    if (parentTask.children === undefined) {
      parentTask.children = [childTask];
    } else {
      parentTask.children.push(childTask);
    }
    updateTask(parentTask);
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
