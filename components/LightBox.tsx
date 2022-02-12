import { CSSProperties, FC, useCallback } from "react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import useLightBox from "hooks/use-light-box";

type LightBoxProps = {
    style?: CSSProperties;
};

export const LightBox: FC<LightBoxProps> = (props) => {
    const { children, style } = props;
    const { push } = useRouter();

    const { lightBox: state } = useLightBox();

    const closeHandler = useCallback(
        () => push("/", "/", { shallow: true, scroll: false }),
        [push]
    );

    // const closeHandler = () => push("/", "/", { shallow: true, scroll: false });

    const refParent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const keyboardHandler = (e: globalThis.KeyboardEvent) => {
            const key = e.key;
            if (key === "Escape") return closeHandler();
        };

        if (!state) return;
        if (!refParent.current) return;
        const html = document.documentElement;
        const body = document.body;
        const bodyAttr = "data-scroll-hide";

        const cssProps = "--no-scroll-padding";

        const scrollBarWidth = window.innerWidth - html.clientWidth;
        const bodyPaddingRight =
            parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0;

        const parentCurrent = refParent.current;
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
    }, [state, closeHandler]);

    return (
        <AnimatePresence initial={true} exitBeforeEnter>
            {state && (
                <motion.div
                    ref={refParent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { type: "just" } }}
                    exit={{ opacity: 0, transition: { type: "just" } }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 2000,
                        overflowY: "scroll",
                        padding:
                            "calc(var(--header-height) + var(--grid-gap)) calc(var(--grid-gap) * 6) calc(var(--grid-gap) * 3) calc(var(--grid-gap) * 6)",
                        backgroundColor: "var(--alpha-1)"
                    }}
                >
                    <div
                        onClick={closeHandler}
                        style={{
                            position: "fixed",
                            inset: 0
                        }}
                    />

                    <motion.div
                        style={{
                            minHeight: "calc(100vh - calc(var(--grid-gap) * 8))",
                            // overflow: "hidden",
                            backgroundColor: "var(--accents-1)",
                            // backgroundColor: "var(--alpha-1)",
                            position: "relative",
                            // boxShadow: "0 0 0.5em 0 var(--accents-3)",
                            padding: "var(--grid-gap)",
                            // borderRadius: "calc(var(--grid-gap) / 1)",
                            border: "1px solid",
                            ...style
                        }}
                    >
                        {children}
                    </motion.div>

                    <motion.button
                        // whileHover={{ scale: 1.2 }}
                        onClick={closeHandler}
                        style={{
                            appearance: "none",
                            background: "none",
                            border: "none",
                            borderRadius: "100%",
                            padding: 0,
                            margin: 0,
                            position: "fixed",
                            top: "calc(var(--grid-gap) * 1)",
                            left: "calc(var(--grid-gap) * 1)",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            cursor: "pointer",
                            aspectRatio: "1/1",
                            width: "1.5em",
                            backgroundColor: "var(--accents-1)",
                            color: "var(--accents-12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <span style={{ fontSize: "0.8em", fontWeight: "bold" }}>&#9587;</span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LightBox;

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
