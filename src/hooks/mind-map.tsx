import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";
import { TaskData } from "@/hooks/task";

export type MindMapData = {} & TaskData;

type Props = {
  data: MindMapData;
  addChildTask: (parent: TaskData) => (task: TaskData) => void;
  updateTask: (task: TaskData) => void;
};

export default function useMindMap({ data, updateTask, addChildTask }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const drawMindMap = useCallback(() => {
    d3.select(svgRef.current).selectAll("*").remove();
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    let width = 800;
    let height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const tree = d3.tree<MindMapData>();

    const root = d3.hierarchy(data);
    tree(root);

    // Calculate the new dimensions based on the tree layout
    const nodes = root.descendants();
    const links = root.links();

    const maxDepth = d3.max(nodes, (d) => d.depth) || 1;
    const maxHeight = nodes.length * 50; // Example: each node has a vertical space of 50px

    width = maxDepth * 200 + margin.left + margin.right;
    height = maxHeight + margin.top + margin.bottom;

    d3.select(svgRef.current).attr("width", width).attr("height", height);

    tree.size([
      height - margin.top - margin.bottom,
      width - margin.left - margin.right,
    ]);

    tree(root);

    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal<
            d3.HierarchyLink<MindMapData>,
            d3.HierarchyPointNode<MindMapData>
          >()
          .x((d) => d.y)
          .y((d) => d.x),
      )
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("r", 10)
      .attr("fill", "#fff")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3);

    const foreignObject = node
      .append("foreignObject")
      .attr("x", (d) => -((d.data.name.length * 0.6) / 2) + "em")
      .attr("y", "-2em")
      .attr("width", (d) => d.data.name.length * 0.6 + "em")
      .attr("height", "2em");

    foreignObject
      .append<HTMLDivElement>("xhtml:div")
      .attr("contenteditable", true)
      .style("display", "flex")
      .style("align-items", "center")
      .style("justify-content", "center")
      .text((d) => d.data.name)
      .on("blur", function (_, d) {
        const newText = d3.select(this).text();
        d.data.name = newText;
        if (this.parentNode != null) {
          updateTask(d.data);
          d3.select(this.parentNode.nodeName)
            .attr("width", newText.length * 0.6 + "em")
            .attr("x", -((newText.length * 0.6) / 2) + "em");
        }
      });

    // 初期設定のための中央揃えスタイルを適用
    d3.selectAll("foreignObject xhtml\\:div")
      .style("text-align", "center")
      .style("font", "12px sans-serif")
      .style("color", "red");

    function handleAddNode(el: SVGElement) {
      d3.selectAll(".button").remove();

      d3.select<SVGElement, d3.HierarchyNode<MindMapData>>(el)
        .append("circle")
        .attr("class", "button")
        .attr("cx", 20)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", "lightgreen")
        .attr("stroke", "darkgreen")
        .attr("stroke-width", 2)
        .on("click", function (event, d) {
          event.stopPropagation(); // To prevent triggering parent click event

          const newNode: MindMapData = {
            name: `New Node ${Math.random().toFixed(2)}`,
            status: false,
          };

          if (!d.data.children) {
            d.data.children = [];
          }
          addChildTask(d.data)(newNode);
        });
    }

    // Add hover or click event to generate the + button
    node.on("click", function () {
      handleAddNode(this);
    });
  }, [addChildTask, data, updateTask]);

  useEffect(() => {
    drawMindMap();
  }, [drawMindMap]);

  return {
    svgRef,
    drawMindMap,
  };
}
