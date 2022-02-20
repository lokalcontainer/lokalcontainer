import styles from "styles/modal.module.scss";
import type { CSSProperties, FC } from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NextHead from "next/head";
import useLightBox from "hooks/use-light-box";
import useOnClickOutside from "hooks/use-on-click-outside";
import useOnEscape from "hooks/use-on-escape";

type BaseProps = {
    onRequestClose: () => void;
    title?: string | JSX.Element;
};

type LightBoxProps = BaseProps & {
    style?: CSSProperties;
};

type LightBoxHeaderProps = BaseProps & {};

const LightBoxHeader = (props: LightBoxHeaderProps) => {
    const { onRequestClose } = props;
    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                margin: "0 auto",
                pointerEvents: "initial"
            }}
        >
            <div style={{ height: "var(--header-height)" }}>
                <button
                    onClick={onRequestClose}
                    style={{
                        appearance: "none",
                        background: "none",
                        border: "1px solid",
                        borderRadius: "calc(var(--grid-gap) / 3)",
                        padding: 0,
                        margin: 0,
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        fontWeight: "bold",
                        cursor: "pointer",
                        aspectRatio: "1/1",
                        width: "1.4em",
                        backgroundColor: "var(--accents-1)",
                        color: "var(--accents-12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        left: 0,
                        top: "var(--grid-gap)"
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
            </div>
        </header>
    );
};

export const LightBox: FC<LightBoxProps> = (props) => {
    const { children, style, onRequestClose, title = "Light Box" } = props;

    const { lightBox: state } = useLightBox();

    const refParent = useRef<HTMLDivElement>(null);
    const refContent = useRef<HTMLDivElement>(null);
    useOnClickOutside(refContent, onRequestClose);
    useOnEscape(refParent, state, onRequestClose);

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
                        animate={{
                            opacity: 1,
                            transition: { type: "spring", mass: 0.5, damping: 200, stiffness: 2000 }
                        }}
                        exit={{
                            opacity: 0,
                            transition: { type: "spring", mass: 0.5, damping: 200, stiffness: 2000 }
                        }}
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
                                // padding: "0 0 calc(var(--grid-gap) * 3) 0",
                                padding: 0,
                                paddingInline: "calc(var(--grid-gap) * 3)"
                            }}
                        >
                            <LightBoxHeader title={title} onRequestClose={onRequestClose} />

                            <div
                                ref={refContent}
                                className={styles.content_box}
                                // data-layout="fluid"
                                style={{ ...style }}
                            >
                                {children}
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
