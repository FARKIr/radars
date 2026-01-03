"use client";

import { useEffect, useRef, useState } from "react";
import { Graph } from "@antv/x6";
import { Card } from "@/components/ui/card";
import { Region } from "@/data/radary";

interface InteraktivnaHlavaX6Props {
  data: Array<{ mesto: string; region: Region }>;
  onMestoClick: (mesto: string) => void;
}

export function InteraktivnaHlavaX6({
  data,
  onMestoClick,
}: InteraktivnaHlavaX6Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    const poctyPoRegionoch = data.reduce((acc, item) => {
      acc[item.region] = (acc[item.region] || 0) + 1;
      return acc;
    }, {} as Record<Region, number>);

    const poctyPoMestach = data.reduce((acc, item) => {
      acc[item.mesto] = (acc[item.mesto] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const unikatneMesta = Array.from(new Set(data.map((d) => d.mesto)));
    const mestaPoRegionoch: Record<Region, string[]> = {
      [Region.ZAPAD]: [],
      [Region.STRED]: [],
      [Region.VYCHOD]: [],
    };

    data.forEach((item) => {
      if (!mestaPoRegionoch[item.region].includes(item.mesto)) {
        mestaPoRegionoch[item.region].push(item.mesto);
      }
    });

    const graph = new Graph({
      container: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: 400,
      background: {
        color: "#f8fafc",
      },
      grid: false,
      interacting: {
        nodeMovable: false,
      },
      panning: {
        enabled: true,
        eventTypes: ["leftMouseDown", "mouseWheel"],
      },
      mousewheel: {
        enabled: true,
        modifiers: ["ctrl", "meta"],
      },
    });

    graphRef.current = graph;

    const regionColors: Record<Region, string> = {
      [Region.ZAPAD]: "#3b82f6",
      [Region.STRED]: "#10b981",
      [Region.VYCHOD]: "#f59e0b",
    };

    const regionNodes: Record<Region, string> = {} as Record<Region, string>;
    const regionYPositions = {
      [Region.ZAPAD]: 100,
      [Region.STRED]: 200,
      [Region.VYCHOD]: 300,
    };

    Object.values(Region).forEach((region, idx) => {
      const node = graph.addNode({
        shape: "circle",
        x: 150,
        y: regionYPositions[region],
        width: 80,
        height: 80,
        label: `${region}\n(${poctyPoRegionoch[region] || 0})`,
        attrs: {
          body: {
            fill: regionColors[region],
            stroke: "#fff",
            strokeWidth: 3,
          },
          label: {
            fill: "#fff",
            fontSize: 12,
            fontWeight: "bold",
          },
        },
      });
      regionNodes[region] = node.id;
    });

    Object.entries(mestaPoRegionoch).forEach(([region, mesta]) => {
      mesta.forEach((mesto, idx) => {
        const xPos = 350 + (idx % 8) * 150;
        const yPos =
          regionYPositions[region as Region] + Math.floor(idx / 8) * 60 - 30;

        const mestoNode = graph.addNode({
          shape: "rect",
          x: xPos,
          y: yPos,
          width: 120,
          height: 40,
          label: `${mesto}\n(${poctyPoMestach[mesto]})`,
          attrs: {
            body: {
              fill: "#fff",
              stroke: regionColors[region as Region],
              strokeWidth: 2,
              rx: 6,
              ry: 6,
            },
            label: {
              fill: "#1f2937",
              fontSize: 10,
            },
          },
        });

        graph.addEdge({
          source: regionNodes[region as Region],
          target: mestoNode.id,
          attrs: {
            line: {
              stroke: regionColors[region as Region],
              strokeWidth: 1,
              strokeDasharray: "5 5",
            },
          },
        });

        mestoNode.on("click", () => {
          onMestoClick(mesto);
        });

        mestoNode.on("mouseenter", () => {
          mestoNode.attr("body/fill", "#e0f2fe");
        });

        mestoNode.on("mouseleave", () => {
          mestoNode.attr("body/fill", "#fff");
        });
      });
    });

    graph.centerContent();

    const handleResize = () => {
      if (containerRef.current) {
        graph.resize(containerRef.current.offsetWidth, 400);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      graph.dispose();
    };
  }, [data, onMestoClick, isClient]);

  if (!isClient) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">
          Načítava sa interaktívna mapa...
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-x-auto">
      <div ref={containerRef} className="w-full min-w-[800px]" />
    </Card>
  );
}
