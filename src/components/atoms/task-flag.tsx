import { IconButton } from "@mui/material";
import { TaskData } from "@/hooks/task";
import { PropsWithoutRef } from "react";
import { Flag, FlagOutlined } from "@mui/icons-material";

type Props = {
  task?: TaskData;
};

export default function TaskFlag({ task }: PropsWithoutRef<Props>) {
  return (
    <IconButton>{task?.priority ? <Flag /> : <FlagOutlined />}</IconButton>
  );
}
