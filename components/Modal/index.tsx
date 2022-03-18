import type { PropsWithChildren } from "react";
import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";

const portalID = "__lc_portal";
// const bodyOpenClassName = "__lc_modal__body--open";

function createWrapperAndAppendToBody(wrapperID: string) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperID);
    const next = document.getElementById("__next");
    if (next) {
        next.appendChild(wrapperElement);
    }
    return wrapperElement;
}

export default function Modal(
    props: PropsWithChildren<{ state?: boolean; onRequestClose(): void }>
) {
    const { children, onRequestClose } = props;

    const { query } = useRouter();
    const [state, setState] = useState(() => query.light_box?.includes("true") || false);

    useLayoutEffect(() => {
        if (!query.light_box) {
            setState(false);
        } else if (query.light_box?.includes("true")) {
            setState(true);
        } else {
            setState(false);
        }

        return () => setState(false);
    }, [query.light_box]);

    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        if (!state) return;
        const handler = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") return onRequestClose();
        };

        document.body.addEventListener("keydown", handler);
        return () => document.body.removeEventListener("keydown", handler);
    }, [state]);

    // It's important using `useLayoutEffect`
    // Start modal at `0` position when it show up
    useLayoutEffect(() => {
        if (!state) return;

        const body = document.body;
        const originalBody = window.getComputedStyle(body).overscrollBehavior;
        const main = document.getElementById("__main");
        if (!main) return;

        const windowScrollY = window.scrollY;

        body.style.overscrollBehavior = "auto none";

        main.style.position = "fixed";
        main.style.right = "0";
        main.style.left = "0";
        main.style.top = `${-windowScrollY}px`;

        return () => {
            body.style.overscrollBehavior = originalBody;
            main.style.removeProperty("position");
            main.style.removeProperty("top");
            main.style.removeProperty("right");
            main.style.removeProperty("left");
            main.style.removeProperty("height");
            window.scrollTo({ top: windowScrollY });
        };
    }, [state]);

    useLayoutEffect(() => {
        if (!state) return;

        let element = document.getElementById(portalID);
        let systemCreated = false;
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(portalID);
        }

        // element.addEventListener("click", onRequestClose);
        setWrapperElement(element);
        window.scrollTo({ top: 0 });

        return () => {
            if (systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [state]);

    if (!state || !wrapperElement) return null;
    return createPortal(
        <>
            <header
                style={{
                    position: "sticky",
                    top: 0,
                    height: "var(--header-height)",
                    display: "flex",
                    alignItems: "center",
                    paddingInline: "1.5em"
                }}
            >
                <button
                    onClick={onRequestClose}
                    name="Exit"
                    title="Exit"
                    style={{
                        appearance: "none",
                        background: "none",
                        border: "1px solid",
                        borderRadius: "100%",
                        padding: 0,
                        margin: 0,
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        fontWeight: "bold",
                        cursor: "pointer",
                        aspectRatio: "1/1",
                        width: "1.3em",
                        height: "1.3em",
                        backgroundColor: "var(--accents-1)",
                        color: "var(--accents-12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                    }}
                >
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.3em"
                            width="1.3em"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                    </span>
                </button>
            </header>
            {children}
        </>,
        wrapperElement
    );
}
