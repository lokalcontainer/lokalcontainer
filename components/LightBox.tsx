import styles from "styles/modal.module.scss";
import type { CSSProperties, FC } from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NextHead from "next/head";
import useLightBox from "hooks/use-light-box";

type BaseProps = {
    onRequestClose: () => void;
    title?: string | JSX.Element;
};

type LightBoxProps = BaseProps & {
    style?: CSSProperties;
};

type LightBoxHeaderProps = BaseProps & {};

const LightBoxHeader = (props: LightBoxHeaderProps) => {
    const { title, onRequestClose } = props;
    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                // backgroundColor: "var(--alpha-2)",
                zIndex: 1,
                height: "var(--header-height)",
                width: "100%",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                // boxShadow: "0 0 1em -0.75em var(--accents-6), 0 -1px 0.25em 0em var(--accents-4)",
                padding: "0 var(--grid-gap)",
                pointerEvents: "initial"
            }}
        >
            <button
                onClick={onRequestClose}
                style={{
                    appearance: "none",
                    background: "none",
                    border: "1px solid",
                    padding: 0,
                    margin: 0,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "bold",
                    cursor: "pointer",
                    aspectRatio: "1/1",
                    width: "1.5em",
                    backgroundColor: "var(--accents-1)",
                    color: "var(--accents-12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    right: "calc(var(--grid-gap) * 2)"
                }}
            >
                <span
                    style={{
                        fontSize: "0.8em",
                        fontWeight: "bold",
                        display: "inline-flex",
                        alignItems: "center"
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.5em"
                        width="1.5em"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                </span>
            </button>
            <ul
                style={{
                    listStyle: "none",
                    padding: "0 var(--grid-gap)",
                    margin: "0 auto",
                    width: "100%",
                    display: "flex"
                    // maxWidth: 1200
                }}
            >
                <li
                    style={{
                        border: "1px solid",
                        backgroundColor: "var(--accents-1)",
                        height: "1.5em",
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0 var(--grid-gap)"
                    }}
                >
                    {title}
                </li>
            </ul>
        </header>
    );
};

export const LightBox: FC<LightBoxProps> = (props) => {
    const { children, style, onRequestClose, title = "Light Box" } = props;

    const { lightBox: state } = useLightBox();

    const refParent = useRef<HTMLDivElement>(null);
    const refContent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!state) return;
        if (!refParent.current) return;

        const keyboardHandler = (e: globalThis.KeyboardEvent) => {
            const key = e.key;
            if (key === "Escape") return onRequestClose();
        };

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
    }, [state]);

    return (
        <AnimatePresence initial={true} exitBeforeEnter>
            {state && (
                <>
                    <NextHead>
                        <title>{title}</title>
                    </NextHead>

                    <motion.div
                        ref={refParent}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { type: "just" } }}
                        exit={{ opacity: 0, transition: { type: "just" } }}
                        className={styles.container}
                    >
                        <div
                            onClick={onRequestClose}
                            style={{
                                position: "fixed",
                                inset: 0,
                                cursor: "zoom-out"
                            }}
                        />

                        <div
                            style={{
                                pointerEvents: "none",
                                position: "relative",
                                padding: "0 0 calc(var(--grid-gap) * 3) 0"
                            }}
                        >
                            <LightBoxHeader title={title} onRequestClose={onRequestClose} />

                            <div
                                ref={refContent}
                                className={styles.content_box}
                                data-layout="fluid"
                                style={{ ...style }}
                            >
                                <div style={{ height: "100%" }}>{children}</div>
                            </div>
                        </div>
                    </motion.div>
                </>
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
