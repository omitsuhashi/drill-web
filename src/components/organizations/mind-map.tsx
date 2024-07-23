"use client";

import { PropsWithoutRef } from "react";
import useMindMap, { MindMapData } from "@/hooks/mind-map";

type Props = {
  data: MindMapData;
};

export default function MindMap({ data }: PropsWithoutRef<Props>) {
  const { svgRef } = useMindMap({ data });

  return <svg ref={svgRef}></svg>;
}
