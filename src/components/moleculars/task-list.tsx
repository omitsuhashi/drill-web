import { TaskData } from "@/hooks/task";
import { PropsWithoutRef } from "react";
import TaskListItem from "@/components/moleculars/task-list-item";

type Props = {
  tasks: TaskData[];
};

export default function TaskList({ tasks }: PropsWithoutRef<Props>) {
  return (
    <>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
      <TaskListItem isCreate />
    </>
  );
}
