import type {
    Element,
  RectangleElement,
  LineElement,
  CircleElement,
} from "@/types/element";

    export const drawRectangle = (
        context : CanvasRenderingContext2D,
        element : Element
    )=>{

        if(element.type != "Rectangle") return;

        context.strokeStyle = element.strokColor;
        context.lineWidth = 5;

        context.strokeRect(
            element.x, 
            element.y, 
            element.width,
            element.height,
        )
    }
    export const drawCircle = (
        context : CanvasRenderingContext2D,
        element : Element
    )=>{

        if(element.type != "Circle") return;

        context.beginPath();

        context.strokeStyle = element.strokColor;
        context.lineWidth = 5;

        context.ellipse(
            element.centerX,
            element.centerY,
            element.radiusX,
            element.radiusY,
            element.rotation,
            element.startAngle,
            element.endAngle,
        )

        context.stroke();
    }

    export const drawLine = (
        context : CanvasRenderingContext2D,
        element : Element
    )=>{

        if(element.type != "Line") return;

        context.beginPath();
        context.lineWidth = 5; 
        context.strokeStyle = element.strokColor;
        
        context.moveTo(
            element.startX,
            element.startY
        )

        context.lineTo(
            element.endX,
            element.endY
        )

        context.stroke()
    }

    export const drawPencil =(
        context : CanvasRenderingContext2D,
        element : Element
    )=> {

        if(element.type !== "Pencil") return;

        context.beginPath();
        context.lineWidth = 5; 
        context.lineCap = "round";
        context.lineJoin = "round";
        const firstPoint = element.points[0];

        context.strokeStyle = element.strokColor;

        context.moveTo(
            firstPoint.x,
            firstPoint.y
        )

        element.points.forEach((point)=>{
            context.lineTo(
                point.x,
                point.y
            )
        })

        context.stroke();
    }   