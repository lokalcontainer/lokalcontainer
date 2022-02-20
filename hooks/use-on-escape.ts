import { RefObject, useEffect } from "react";

export default function useOnEscape<T extends HTMLElement = HTMLElement>(
    element: RefObject<T>,
    state: boolean,
    cb: () => void
): void {
    useEffect(() => {
        if (!state) return;
        if (!element.current) return;

        const keyboardHandler = (e: globalThis.KeyboardEvent) => {
            const key = e.key;
            if (key === "Escape") return cb();
        };

        const html = document.documentElement;
        const body = document.body;
        const bodyAttr = "data-scroll-hide";

        const cssProps = "--no-scroll-padding";

        const scrollBarWidth = window.innerWidth - html.clientWidth;
        const bodyPaddingRight =
            parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0;

        const parentCurrent = element.current;
        const parentStyle = parentCurrent.style.getPropertyValue("right");

        html.addEventListener("keydown", keyboardHandler);

        html.style.setProperty(cssProps, `${bodyPaddingRight + scrollBarWidth}px`);
        body.setAttribute(bodyAttr, "true");
        parentCurrent.style.setProperty("right", parentStyle);

        return () => {
            html.removeEventListener("keydown", keyboardHandler);
            html.style.setProperty(cssProps, "0px");
            body.removeAttribute(bodyAttr);
            parentCurrent.style.setProperty("right", `-${bodyPaddingRight + scrollBarWidth}px`);
        };
    }, [state]);
}
