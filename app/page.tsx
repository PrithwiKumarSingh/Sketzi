"use client"

import DrawingCanvas from "@/components/Canvas/DrawingCanvas";
import Sidebar from "@/components/Sidebar/Sidebar";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useState } from "react";

type Tool = "Pencil" | "Rectangle" | "Circle" | "Line"

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>("Pencil");
  const [strokColor, setStrokColor] = useState<string>("#ffffff");
  const [bgColor, setBgColor] = useState<string>("#161718");
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const [elements, setElements] = useState<Element[]>([]);

  return (
    <main
    style={{backgroundColor : bgColor}}
     className="relative h-screen w-screen overflow-hidden">
      <Toolbar 
      activeTool={activeTool}
      setActiveTool={setActiveTool}
      setStrokColor={setStrokColor}
      />
      <div>{
            isMenuActive && 
              <Sidebar
              strokColor={strokColor}
              setStrokColor={setStrokColor}
              setIsMenuActive={setIsMenuActive}
              setBgColor={setBgColor}
              />
      }
      </div>
      <div className="flex h-screen items-center justify-center bg-[#2E2D39]">
      <DrawingCanvas
        strokColor={strokColor}
        activeTool={activeTool}
        setIsMenuActive={setIsMenuActive}
        isMenuActive={isMenuActive}
        bgColor={bgColor}
       />
       </div>
       
    </main>
  );
}