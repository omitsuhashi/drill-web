"use client";

import { TaskData } from "@/hooks/task";
import { Box, Stack, TextField } from "@mui/material";
import { PropsWithoutRef } from "react";
import { TaskCheck } from "@/components/atoms/task-check";
import TaskFlag from "@/components/atoms/task-flag";

type Props = {
  task?: TaskData;
};

export default function Task({ task }: PropsWithoutRef<Props>) {
  return (
    <>
      <Box>
        <Stack spacing={1} direction="row">
          {/* 完了ボタン */}
          <TaskCheck done={task?.status ?? false} onClick={() => {}} />
          {/* 入力フォーム */}
          <TextField placeholder="タスク名" variant="standard" />
          {/* タグ */}
          {/* フラグ */}
          <TaskFlag />
          {/* 作業見積もり */}
        </Stack>
      </Box>
    </>
  );
}
