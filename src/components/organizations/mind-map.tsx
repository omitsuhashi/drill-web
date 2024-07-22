'use client';

import * as d3 from "d3";
import {useEffect, useRef} from "react";

type MindMapData = {
  name: string;
  children?: Array<MindMapData>;
}

export default function MindMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data: MindMapData = {
      name: "Root",
      children: [
        {
          name: "Child 1",
          children: [
            { name: "Grandchild 1" },
            { name: "Grandchild 2" }
          ]
        },
        { name: "Child 2" },
        {
          name: "Child 3",
          children: [
            { name: "Grandchild 1", children: [
                { name: "Grandchild 1" },
                { name: "Grandchild 2" }
              ] },
            { name: "Grandchild 2" }
          ]
        },
      ]
    };

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(40,0)");

    const tree = d3.tree<MindMapData>().size([height, width - 160]);

    const root = d3.hierarchy(data);

    tree(root);

    const link = svg.selectAll(".link")
        .data(root.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal<d3.HierarchyLink<MindMapData>, d3.HierarchyPointNode<MindMapData>>()
            .x(d => d.y)
            .y(d => d.x))
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2);

    const node = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("r", 10)
        .attr("fill", "#fff")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3);

    node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children ? -13 : 13)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name as string)
        .attr("font", "12px sans-serif");

  }, []);

  return (
      <svg ref={svgRef}></svg>
  );
};
