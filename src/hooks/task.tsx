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

  const addChildTask = () => (childTask: TaskData) => {
    if (task.children === undefined) {
      task.children = [childTask];
    } else {
      task.children.push(childTask);
    }
    setTask(task);
  };

  return {
    task,
    addChildTask,
  };
}
