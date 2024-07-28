import { TaskData } from "@/hooks/task";
import { PropsWithoutRef } from "react";
import Task from "@/components/moleculars/task";

type Props = {
  tasks: TaskData[];
};

export default function TaskList({ tasks }: PropsWithoutRef<Props>) {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <Task isCreate />
    </>
  );
}
