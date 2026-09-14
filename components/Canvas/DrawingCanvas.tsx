"use client"

import { useEffect, useRef, useState } from "react"
import {Menu, Trash} from "lucide-react"
import type{Element, LineElement, CircleElement, PencilElement} from "../../types/element"
import {drawRectangle,drawLine,drawCircle} from "@/utils/drawElement";
import {renderElement, clearCanvas} from "@/utils/renderCanvas"
import {findElementAtPoint} from "@/utils/isPositionInsideElement";

type Tool = "Pencil" | "Rectangle" | "Circle" | "Line" | "Selection"

interface DrawingCanvasProps{
    strokColor: string;
    activeTool : Tool;
    isMenuActive : boolean;
    setIsMenuActive: (val:boolean)=>void;
    bgColor : string;
}

export default function DrawingCanvas({strokColor,bgColor, activeTool,setIsMenuActive, isMenuActive}:DrawingCanvasProps){
    const canvasRef = useRef<HTMLCanvasElement >(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const previousPoint = useRef< {x:number; y:number} | null>(null)
    const startPoint = useRef< {x:number; y:number} | null>(null)
    const [element, setElements] = useState<Element[] | []>([])
    const [currentElement, setCurrentElement] = useState<Element | null>(null)
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    } | null>(null);

    // console.log(selectedElementId);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        renderElement(
            canvas,
            element,
            currentElement,
            selectedElementId
        );
        }, [element,currentElement,selectedElementId]);

    useEffect(() => {
                resizeCanvas();

                window.addEventListener(
                    "resize",
                    resizeCanvas
                );

                return () => {
                    window.removeEventListener(
                    "resize",
                    resizeCanvas
                    );
                };
}, []);

    const resizeCanvas = () => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
     };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>)=>{
        const point = getMousePosition(e);
        if(!point) return;

        if (activeTool === "Selection") {
            const elem = findElementAtPoint(point, element);

            if (elem) {
                console.log("START DRAG");
                setSelectedElementId(elem.id);
                setIsDragging(true);
                setDragStart(point);
            } else {
                setSelectedElementId(null);
                setIsDragging(false);
                setDragStart(null);
            }

            return;
            }
        setIsDrawing(true);

        if(activeTool==="Pencil"){
            previousPoint.current = point;

            const pencil:PencilElement={
                id : crypto.randomUUID(),
                type : "Pencil",
                points : [point],
                strokColor : strokColor
            }

            setCurrentElement(pencil);
        }
        
        if (activeTool === "Rectangle") {

                startPoint.current = point;

                const rectangle: Element = {
                    id: crypto.randomUUID(),

                    type: "Rectangle",

                    x: point.x,
                    y: point.y,

                    width: 0,
                    height: 0,

                    strokColor,
                };

                setCurrentElement(rectangle);
        }

        if(activeTool==="Line"){
            startPoint.current = point;

            const line:LineElement = {
                id : crypto.randomUUID(),
                type : "Line",
                startX : point.x, 
                startY : point.y, 
                endX : point.x, 
                endY: point.y,
                strokColor

            }
            setCurrentElement(line);
        }

        if(activeTool==="Circle"){
            startPoint.current = point;

            const ellipse:CircleElement = {
                id : crypto.randomUUID(),
                type : "Circle", 
                centerX : point.x,
                centerY : point.y,
                radiusX : 0,
                radiusY : 0,
                rotation : 0,
                startAngle : 0,
                endAngle : Math.PI * 2,
                strokColor: strokColor
            }
            setCurrentElement(ellipse)
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>)=>{

        if(activeTool==="Rectangle" && currentElement){
            

            setElements((previousElements:Element[]) => [
                    ...previousElements,
                    currentElement,
            ]);

            setCurrentElement(null);
        }

        if (activeTool === "Selection") {
            setIsDragging(false);
            setDragStart(null);
            return;
            }

        if(activeTool==="Circle" && currentElement){

           setElements((previousElement)=>[
            ...previousElement,
            currentElement
           ])

           setCurrentElement(null);
        }

        if(activeTool === "Pencil" && currentElement){

            setElements((previousElements)=>[
                ...previousElements,
                currentElement
            ])
        }



        if(activeTool==="Line" && currentElement){

        setElements((previousElement)=>[
            ...previousElement,
            currentElement
        ])
        setCurrentElement(null);

        }


        setIsDrawing(false);
        previousPoint.current = null;
        startPoint.current = null;
    }

    const getMousePosition = (e : React.MouseEvent<HTMLCanvasElement>)=>{
        const canvas = canvasRef.current;
        if(!canvas) return;

        const rect = canvas.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        return {x,y};
    }

     const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>)=>{
        
        const point = getMousePosition(e);
        if(!point) return;

        if (activeTool === "Selection") {
            if (!isDragging || !selectedElementId || !dragStart) {
                return;
            }

            const dx = point.x - dragStart.x;
            const dy = point.y - dragStart.y;

            setElements((previousElements) =>
                previousElements.map((element) => {
                if (element.id !== selectedElementId) {
                    return element;
                }

                if (element.type !== "Rectangle") {
                    return element;
                }

                return {
                    ...element,
                    x: element.x + dx,
                    y: element.y + dy,
                };
                })
            );

            setDragStart(point);

            return;
            }


            if(!isDrawing) return;

        if(activeTool==="Pencil"){ 
        
        setCurrentElement((previous)=>{
            if(!previous) return null;

            if(previous.type !== "Pencil") return previous;

            return{
                ...previous,
                points : [
                    ...previous.points,
                    point
                ]
            }
        })

        previousPoint.current = point;
    }

        if(activeTool==="Rectangle"){
            const start = startPoint.current;
            if(!start) return;

            setCurrentElement((previous)=>{
                if(!previous) return null;

                return {
                    ...previous, 
                    width: point.x - start.x,
                    height : point.y - start.y

                }
            })
        }

        if(activeTool==="Circle"){
            const start = startPoint.current;
            if(!start) return; 

            const width = point.x - start.x;
            const height = point.y - start.y;

            const centerX = start.x + width/2; 
            const centerY = start.y + height/2;

            const radiusX = Math.abs(width/2);
            const radiusY = Math.abs(height/2);

            setCurrentElement((previous)=>{
                if(!previous) return null;

                return{
                    ...previous,
                    centerX : centerX,
                    centerY : centerY,
                    radiusX : radiusX,
                    radiusY : radiusY
                }
            })
            
        }

        if(activeTool==="Line"){
            setCurrentElement((previous)=>{
                if(!previous) return null;

                return{
                    ...previous, 
                    endX : point.x,
                    endY : point.y

                }
            })
        }
    
    
        
    }
    


    return (
        <div>
            <div className=" absolute my-2 right-5 bottom-5 z-10">
                <button
                onClick={()=>{
                    setElements([]);
                    clearCanvas
                }}
                 className=" text-xl border hover:text-red-500 border-gray-600 px-4 py-2 rounded cursor-pointer hover:scale-105 bg-[#1B1B1F] text-white duration-200 transition ease-in-out flex items-center gap-2">
                    Clear
                    <Trash size={22}/>
                    </button>
            </div>

            <div className=" absolute my-2 left-8 top-4 z-10">
                <button
                onClick={()=>setIsMenuActive(!isMenuActive)}
                 className="px-4 py-2 rounded cursor-pointer hover:scale-105 bg-[#1B1B1F] text-white duration-200 transition ease-in-out"><Menu/> </button>
            </div>
        <canvas 
        ref={canvasRef} 
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
        onMouseMove={handleMouseMove} 
        style={{backgroundColor : bgColor}}
        className=" insert-0 z-0 w-full h-full shadow-sm cursor-crosshair " />
        </div>
    )
}