import styles from "styles/modal.module.scss";
import type { CSSProperties, FC } from "react";
import { useRef } from "react";
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
                        className={styles.container}
                        data-active={state}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            type: "spring",
                            mass: 0.5,
                            damping: 200,
                            stiffness: 2000,
                            delay: 0.25
                        }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                position: "sticky",
                                top: 0,
                                height: "var(--header-height)",
                                paddingInline: "1.5em",
                                zIndex: 10
                            }}
                        >
                            <button
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
                                    width: "1.5em",
                                    backgroundColor: "var(--accents-1)",
                                    color: "var(--accents-12)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        width: "100%",
                                        height: "100%"
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        width="24px"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        <div
                            style={{
                                pointerEvents: "none",
                                position: "relative",
                                paddingBottom: "calc(var(--grid-gap) * 3)",
                                paddingInline: "calc(var(--grid-gap) * 3)"
                            }}
                        >
                            <div ref={refContent} className={styles.content_box} style={style}>
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
