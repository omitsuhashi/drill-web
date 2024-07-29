"use client";

import { TaskData } from "@/hooks/task";
import { Stack, TextField } from "@mui/material";
import { PropsWithoutRef } from "react";
import { TaskCheck } from "@/components/atoms/task-check";
import TaskFlag from "@/components/atoms/task-flag";

type Props = {
  task?: TaskData;
  isCreate?: boolean;
};

export default function TaskListItem({
  task,
  isCreate = false,
}: PropsWithoutRef<Props>) {
  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center" width="100%">
        {/* 完了ボタン */}
        <TaskCheck done={task?.status} onClick={() => {}} />
        {/* 入力フォーム */}
        <TextField
          fullWidth
          defaultValue={task?.name}
          placeholder="タスク名"
          variant="standard"
          disabled={!isCreate}
        />
        {/* フラグ */}
        <TaskFlag task={task} />
      </Stack>
    </>
  );
}
