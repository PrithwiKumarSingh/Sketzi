"use client"

import DrawingCanvas from "@/components/Canvas/DrawingCanvas";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useState } from "react";

type Tool = "Pencil" | "Rectangle" | "Circle" | "Line"

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>("Pencil");
  const [color, setColor] = useState<string>("#ffffff");

  const [elements, setElements] = useState<Element[]>([]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#121212]">
      <Toolbar 
      activeTool={activeTool}
      setActiveTool={setActiveTool}
      setColor={setColor}
      />
      <div className="flex h-screen items-center justify-center bg-[#2E2D39]">
      <DrawingCanvas
        color={color}
        activeTool={activeTool}
       />
       </div>
       
    </main>
  );
}