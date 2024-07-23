"use client";

import useTask, { TaskData } from "@/hooks/task";
import { PropsWithoutRef, useState } from "react";

type Props = {};

export default function Task({}: PropsWithoutRef<Props>) {
  const [id, setId] = useState<number>(0);
  const { tasks, addChildTask, addTask } = useTask();

  const onClickAddButton = () => {
    addTask({ id: id, name: `${id}` });
    setId((prev) => prev + 1);
  };

  const onCLickAddChild = (parent: TaskData) => () => {
    addChildTask(parent)({ id: id, name: `child ${id}` });
    setId((prev) => prev + 1);
  };

  return (
    <>
      <p>tasks:</p>
      {tasks.map((v) => (
        <div key={v.id}>
          <p>{v.name}</p>
          <p>children:</p>
          <div>
            {v.children?.map((child) => <p key={child.id}>{child.name}</p>)}
          </div>
          <button onClick={onCLickAddChild(v)}>add child task</button>
        </div>
      ))}
      <button onClick={onClickAddButton}>add task</button>
    </>
  );
}
