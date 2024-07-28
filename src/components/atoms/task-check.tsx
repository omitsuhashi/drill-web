import { Circle, CircleOutlined } from "@mui/icons-material";
import { PropsWithoutRef } from "react";
import { IconButton } from "@mui/material";

type Props = {
  onClick: () => void;
  done: boolean;
};

export function TaskCheck({ done, onClick }: PropsWithoutRef<Props>) {
  return (
    <IconButton onClick={onClick}>
      {done ? <Circle /> : <CircleOutlined />}
    </IconButton>
  );
}
