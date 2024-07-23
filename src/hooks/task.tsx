import { useState } from "react";
import { ID } from "@/types";
import { MindMapData } from "@/hooks/mind-map";

export type TaskData = {
  id: ID;
  name: string;
  parent?: TaskData;
  children?: TaskData[];
};

export function useTasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);

  const addTask = (newTask: TaskData) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const addChildTask = (parentTask: TaskData) => (childTask: TaskData) => {
    if (parentTask.children === undefined) {
      parentTask.children = [childTask];
    } else {
      parentTask.children.push(childTask);
    }
    updateTask(parentTask);
  };

  const updateTask = (updatedTask: TaskData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const getTaskById = (taskId: number): TaskData | undefined => {
    return tasks.find((task) => task.id === taskId);
  };

  const getChildrenTasks = (parentId: number): TaskData[] => {
    return tasks.filter((task) => task.parent?.id === parentId);
  };

  return {
    tasks,
    addTask,
    addChildTask,
    updateTask,
    deleteTask,
    getTaskById,
    getChildrenTasks,
  };
}

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

export function toMindMap(taskData: TaskData): MindMapData {
  return {
    name: taskData.name,
    children: taskData.children?.map((child) => toMindMap(child)),
  };
}
