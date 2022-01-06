import { useRouter } from "next/router";
import { FC, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEventListener from "hooks/use-event-listener";

export const LightBox: FC = (props) => {
    const { children } = props;
    const { query, push } = useRouter();
    const [state, setState] = useState(() => query.lightBox?.includes("true") || false);

    const closeHandler = () => push("/", "/", { shallow: true, scroll: false });

    useEffect(() => {
        if (!query.lightBox) {
            setState(false);
        } else if (query.lightBox.includes("true")) {
            setState(true);
        } else {
            setState(false);
        }

        return () => setState(false);
    }, [query.lightBox]);

    useEffect(() => {
        if (!state) return;
        const newBodyAttr = "data-scroll-hide";
        const html = document.documentElement;
        const body = document.body;

        const cssProps = "--no-scroll-padding";

        const scrollBarWidth = window.innerWidth - html.clientWidth;
        const bodyPaddingRight =
            parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0;

        html.style.setProperty(cssProps, `${bodyPaddingRight + scrollBarWidth}px`);
        body.setAttribute(newBodyAttr, "true");

        return () => {
            html.style.setProperty(cssProps, "0px");
            body.removeAttribute(newBodyAttr);
        };
    }, [state]);

    const refParent = useRef<HTMLDivElement>(null);

    const keyHandler = (e: globalThis.KeyboardEvent) => {
        const key = e.key;
        if (key === "Escape") return closeHandler();
    };

    useEffect(() => {
        if (!state) return;
        const html = document.documentElement;
        html.addEventListener("keydown", keyHandler);

        return () => {
            html.removeEventListener("keydown", keyHandler);
        };
    }, [state]);

    return (
        <AnimatePresence initial={true} exitBeforeEnter>
            {state && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.1 } }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 1001,
                        overflowY: "scroll",
                        padding: "calc(var(--grid-gap) * 2)"
                    }}
                >
                    <div
                        ref={refParent}
                        onClick={closeHandler}
                        style={{
                            position: "fixed",
                            inset: 0
                            // backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                    />

                    <motion.div
                        initial={{ boxShadow: "0 0 0 0 var(--accents-12)" }}
                        animate={{
                            boxShadow: "0 0 1em 0 var(--accents-12)",
                            transition: { type: "just" }
                        }}
                        style={{
                            height: "calc(100vh - calc(var(--grid-gap) * 4))",
                            backgroundColor: "var(--accents-1)",
                            border: "1px solid",
                            position: "relative",
                            boxShadow: "0 0 1em 0 var(--accents-12)",
                            padding: "var(--grid-gap)",
                            borderRadius: "calc(var(--grid-gap) / 3)"
                        }}
                    >
                        <pre>{JSON.stringify(query, null, 2)}</pre>

                        {children}

                        <button
                            onClick={closeHandler}
                            style={{
                                appearance: "none",
                                background: "none",
                                border: "1px solid",
                                borderRadius: 0,
                                padding: 0,
                                margin: 0,
                                position: "absolute",
                                top: "var(--grid-gap)",
                                right: "var(--grid-gap)",
                                fontFamily: "inherit",
                                fontSize: "inherit",
                                cursor: "pointer",
                                aspectRatio: "1/1",
                                width: "2em"
                            }}
                        >
                            <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>&#9587;</span>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
