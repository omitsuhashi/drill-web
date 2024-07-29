"use client";

import useMindMap from "@/hooks/mind-map";
import useTask, { TaskData } from "@/hooks/task";
import { PropsWithoutRef, useEffect } from "react";
import TaskList from "@/components/moleculars/task-list";

type Props = {
  data: TaskData;
};

// 方針としてmind-mapに複数のルートノードは作らせない
// なので、親タスクがあればそれをルートノードとして
// なければ"root"というノードを仮でルートノードとする
// 将来的には"project"などをルートとする
export default function TaskMindMap({ data }: PropsWithoutRef<Props>) {
  const { task, addChildTask, updateTask } = useTask(data);
  const { svgRef, drawMindMap } = useMindMap({
    data: task,
    updateTask,
    addChildTask,
  });

  useEffect(() => {
    drawMindMap();
  }, [task, drawMindMap]);

  return (
    <>
      <svg ref={svgRef} />
    </>
  );
}
