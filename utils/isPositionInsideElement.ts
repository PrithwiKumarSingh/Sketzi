import type { Element } from "@/types/element";

export const isPointInsideElement = (
  point: { x: number; y: number },
  element: Element
): boolean => {
  if (element.type === "Rectangle") {
  const left = Math.min(
    element.x,
    element.x + element.width
  );

  const right = Math.max(
    element.x,
    element.x + element.width
  );

  const top = Math.min(
    element.y,
    element.y + element.height
  );

  const bottom = Math.max(
    element.y,
    element.y + element.height
  );

  return (
    point.x >= left &&
    point.x <= right &&
    point.y >= top &&
    point.y <= bottom
  );
}

  return false;
};


export const findElementAtPoint = (
  point: { x: number; y: number },
  elements: Element[]
): Element | null => {
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i];

    if (isPointInsideElement(point, element)) {
      return element;
    }
  }

  return null;
};