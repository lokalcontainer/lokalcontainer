import type { FC } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import useLightBox from "hooks/use-light-box";

export const LightBox: FC = (props) => {
    const { children } = props;
    const { push } = useRouter();

    const { lightBox: state } = useLightBox();

    const closeHandler = () => push("/", "/", { shallow: true, scroll: false });

    const keyboardHandler = (e: globalThis.KeyboardEvent) => {
        const key = e.key;
        if (key === "Escape") return closeHandler();
    };

    useEffect(() => {
        if (!state) return;
        const html = document.documentElement;
        html.addEventListener("keydown", keyboardHandler);

        return () => {
            html.removeEventListener("keydown", keyboardHandler);
        };
    }, [state]);

    return (
        <AnimatePresence initial={true} exitBeforeEnter>
            {state && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "0%", transition: { type: "just" } }}
                    exit={{ x: "100%", transition: { type: "just" } }}
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: "50vw",
                        minWidth: "50vw",
                        zIndex: 999,
                        padding:
                            "calc(var(--grid-gap) * 6) calc(var(--grid-gap) * 1) calc(var(--grid-gap) * 1)"
                    }}
                >
                    <motion.div
                        style={{
                            height: "calc(100vh - calc(var(--grid-gap) * 7))",
                            overflow: "hidden",
                            backgroundColor: "var(--accents-1)",
                            position: "relative",
                            boxShadow: "0 0 0.5em 0 var(--accents-3)",
                            padding: "var(--grid-gap)",
                            borderRadius: "calc(var(--grid-gap) / 3)"
                        }}
                    >
                        {children}
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={closeHandler}
                            style={{
                                appearance: "none",
                                background: "none",
                                border: "none",
                                borderRadius: "100%",
                                padding: 0,
                                margin: 0,
                                position: "absolute",
                                top: "calc(var(--grid-gap) * 2)",
                                right: "calc(var(--grid-gap) * 2)",
                                fontFamily: "inherit",
                                fontSize: "inherit",
                                cursor: "pointer",
                                aspectRatio: "1/1",
                                width: "2em",
                                backgroundColor: "var(--accents-12)",
                                color: "var(--accents-1)"
                            }}
                        >
                            <span style={{ fontSize: "1em", fontWeight: "bold" }}>&#9587;</span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// useEffect(() => {
//     if (!state) return;
//     const newBodyAttr = "data-scroll-hide";
//     const html = document.documentElement;
//     const body = document.body;

//     const cssProps = "--no-scroll-padding";

//     const scrollBarWidth = window.innerWidth - html.clientWidth;
//     const bodyPaddingRight =
//         parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0;

//     html.style.setProperty(cssProps, `${bodyPaddingRight + scrollBarWidth}px`);
//     body.setAttribute(newBodyAttr, "true");

//     return () => {
//         html.style.setProperty(cssProps, "0px");
//         body.removeAttribute(newBodyAttr);
//     };
// }, [state]);
