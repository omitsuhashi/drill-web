"use client";

import { TaskData } from "@/hooks/task";
import { Box, Grid } from "@mui/material";
import { PropsWithoutRef } from "react";
import { TaskCheck } from "@/components/atoms/task-check";

type Props = {
  task?: TaskData;
};

export default function Task({ task }: PropsWithoutRef<Props>) {
  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid xs={1} item>
            {/* 完了ボタン */}
            <TaskCheck done={task?.status ?? false} onClick={() => {}} />
          </Grid>
          <Grid xs={1} item>
            {/* フラグ */}
          </Grid>
          <Grid xs={5} item>
            {/* 入力フォーム */}
          </Grid>
          <Grid xs={2} item>
            {/* タグ */}
          </Grid>
          <Grid xs={1} item>
            {/* 作業見積もり */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
