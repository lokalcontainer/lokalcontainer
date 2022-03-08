import type { CSSProperties, RefObject } from "react";
import { useEffect, useState } from "react";

export default function usePerspective<T extends HTMLElement = HTMLElement>(
    x: number,
    y: number,
    el?: RefObject<T>
) {
    const [style, setStyle] = useState<CSSProperties>();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const node = el ? el.current : document.documentElement;
        if (!node) return;
        if (x === 0 && y == 0) return;
        const box = node.getBoundingClientRect();
        const calcX = -(y - box.y - box.height / 2) / 100;
        const calcY = (x - box.x - box.width / 2) / 100;
        setStyle({ transform: `perspective(2em) rotateX(${calcX}deg) rotateY(${calcY}deg)` });
    }, [el, x, y]);

    return style;
}
