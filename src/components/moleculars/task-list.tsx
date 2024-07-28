import { TaskData } from "@/hooks/task";
import { PropsWithoutRef, useState } from "react";

type Props = {
  data: TaskData;
  addChildTask: (p: TaskData) => (n: TaskData) => void;
};

export default function TaskList({
  data,
  addChildTask,
}: PropsWithoutRef<Props>) {
  const [id, setId] = useState<number>(0);

  const onCLickAddChild = (t: TaskData) => () => {
    addChildTask(t)({ id: id, name: `child ${id}`, status: false });
    setId((prev) => prev + 1);
  };

  return (
    <>
      <p>tasks:</p>
      <div key={data.id}>
        <p>{data.name}</p>
        <p>children:</p>
        <div>
          {data.children?.map((child) => <p key={child.id}>{child.name}</p>)}
        </div>
        <button onClick={onCLickAddChild(data)}>add child task</button>
      </div>
    </>
  );
}
