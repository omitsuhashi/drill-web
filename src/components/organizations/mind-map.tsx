'use client';

import {PropsWithoutRef, } from "react";
import useMindMap from "@/hooks/mind-map";

export type MindMapData = {
  name: string;
  children?: Array<MindMapData>;
}

type Props = {
  data: MindMapData;
}

export default function MindMap({data}: PropsWithoutRef<Props>) {
  const {svgRef} = useMindMap({data});

  return (
      <svg ref={svgRef}></svg>
  );
};
