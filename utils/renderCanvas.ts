
import type { Element } from "@/types/element";

import {
  drawRectangle,
  drawLine,
  drawCircle,
  drawPencil,
} from "./drawElement";


    export const renderElement = (
        canvas : HTMLCanvasElement,
        element : Element[],
        currentElement : Element | null,
        selectedElementId : string | null
    )=>{
        if(!canvas)return;

        const context = canvas.getContext("2d");
        if(!context) return; 
        
        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        element.forEach((elem:Element)=>{
            if(elem.type === "Rectangle"){
                drawRectangle(context,elem);
            }
            if(elem.type === "Line"){
                drawLine(context,elem)
            }
            if(elem.type==="Circle"){
                drawCircle(context,elem)
            }
            if(elem.type === "Pencil"){
                drawPencil(context,elem);
            }
        })

        if (currentElement) {
            
            if(currentElement.type === "Rectangle"){
            drawRectangle(context,currentElement);
            }

            if(currentElement.type=== "Line"){
                drawLine(context,currentElement);
            }

            if(currentElement.type === "Circle"){
                drawCircle(context,currentElement);
            }
            if(currentElement.type === "Pencil"){
                drawPencil(context,currentElement)
            }

        }

        if (selectedElementId) {
            const selectedElement = element.find(
                (elem) => elem.id === selectedElementId
            );

            if (selectedElement && selectedElement.type === "Rectangle") {
                context.save();

                context.strokeStyle = "#6965db";
                context.lineWidth = 3;
                context.setLineDash([6, 4]);

                context.strokeRect(
                selectedElement.x - 5,
                selectedElement.y - 5,
                selectedElement.width + 10,
                selectedElement.height + 10
                );

                context.restore();
            }
            }
    }


    export const clearCanvas = (
        canvas : HTMLCanvasElement
    )=>{
    
            if(!canvas) return;
    
            const context = canvas.getContext("2d");
            if(!context) return;
    
            context.clearRect(
                0,
                0,
                canvas.width, 
                canvas.height
            );
        }