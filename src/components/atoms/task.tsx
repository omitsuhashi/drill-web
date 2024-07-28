import { TaskData } from "@/hooks/task";
import { Box, Grid } from "@mui/material";
import { PropsWithoutRef } from "react";

type Props = {
  task: TaskData;
};

export default function Task({ task }: PropsWithoutRef<Props>) {
  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid xs={1}>{/* 完了などのチェックボックス */}</Grid>
          <Grid xs={1}>{/* フラグ */}</Grid>
          <Grid xs={5}>{/* 入力フォーム */}</Grid>
          <Grid xs={2}>{/* タグ */}</Grid>
          <Grid xs={1}>{/* 作業見積もり */}</Grid>
        </Grid>
      </Box>
    </>
  );
}
