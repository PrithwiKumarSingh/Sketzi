
export type Tool = "Selection" | "Pencil" | "Rectangle" | "Circle" | "Line" ;

export interface RectangleElement{
    id : string;
    type : "Rectangle";
    x : number;
    y : number;
    width : number;
    height : number;
    strokColor : string;
}

export interface CircleElement{
    id : string;
    type : "Circle";
    centerX : number; 
    centerY : number; 
    radiusX : number;
    radiusY : number;
    rotation : number;
    startAngle : number;
    endAngle : number;
    strokColor : string;
}

export interface LineElement{
    id : string; 
    type : "Line"; 
    startX : number;
    startY : number;
    endX : number; 
    endY : number;
    strokColor : string;
}

export interface Point{
    x : number;
    y : number;
}

export interface PencilElement{
    id : string;
    type : "Pencil";
    points : Point[];
    strokColor : string;
}

export type Element = RectangleElement | CircleElement | LineElement | PencilElement