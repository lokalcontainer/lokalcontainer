import { useState, MouseEvent, useEffect, RefObject } from "react";

export default function useMousePosition<T extends HTMLElement = HTMLElement>(
    element?: RefObject<T>
) {
    const [state, setState] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement, MouseEvent> | globalThis.MouseEvent) => {
        const { clientX, clientY } = e;

        setState((state) => ({
            ...state,
            x: clientX,
            y: clientY
        }));
    };

    useEffect(() => {
        if (typeof window === "undefined") return;
        const node = element ? element.current : document.documentElement;
        if (!node) return;
        node.addEventListener("mousemove", handleMouseMove);
        return () => node.removeEventListener("mousemove", handleMouseMove);
    }, [element]);

    return { x: state.x, y: state.y };
}
