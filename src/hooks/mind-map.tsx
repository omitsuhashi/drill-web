import {useEffect, useRef} from "react";
import * as d3 from "d3";

export type MindMapData = {
  name: string;
  children?: Array<MindMapData>;
}

type Props = {
  data: MindMapData,
}

export default function useMindMap({data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  function drawMindMap() {
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
        .attr("dy", "-1em")
        .attr("text-anchor", "middle")
        .text(d => d.data.name as string)
        .attr("font", "12px sans-serif")
        .style('fill', 'red');

    // Add hover or click event to generate the + button
    node.on('click', function(event, d) {
      d3.selectAll(".button").remove();

      d3.select<SVGElement, d3.HierarchyNode<MindMapData>>(this).append("circle")
          .attr("class", "button")
          .attr("cx", 20)
          .attr("cy", 0)
          .attr("r", 5)
          .attr("fill", "lightgreen")
          .attr("stroke", "darkgreen")
          .attr("stroke-width", 2)
          .on('click', function(event, d) {
            event.stopPropagation(); // To prevent triggering parent click event

            const newNode: MindMapData = { name: `New Node ${Math.random().toFixed(2)}` };
            if (!d.data.children) {
              d.data.children = [];
            }
            d.data.children.push(newNode);
            d3.select(svgRef.current).selectAll("*").remove(); // Clear the SVG
            drawMindMap(); // Redraw the mind map
          });
    });
  }

  useEffect(() => {
    drawMindMap();
  }, [data]);

  return {
    svgRef
  }
}
