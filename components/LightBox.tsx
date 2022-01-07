import { FC } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import useLightBox from "hooks/use-light-box";
import { fonts } from "libs/fonts.dummy";
import NextImage from "next/image";

export const LightBox: FC = (props) => {
    const { children } = props;
    const { query, push } = useRouter();

    const { lightBox: state } = useLightBox();

    const closeHandler = () => push("/", "/", { shallow: true, scroll: false });

    // Store query object in a state
    const [queryObject, setQueryObject] = useState(query);

    useEffect(() => {
        setQueryObject(query);
        return () => setQueryObject(query);
    }, [query]);

    const fontObject = fonts.find((item) => item.slug === queryObject.slug);

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
                        overflowY: "scroll",
                        padding:
                            "calc(var(--grid-gap) * 5) 0 calc(var(--grid-gap) * 1) calc(var(--grid-gap) * 1)"
                    }}
                >
                    <motion.div
                        style={{
                            height: "calc(100vh - calc(var(--grid-gap) * 6))",
                            backgroundColor: "var(--accents-3)",
                            position: "relative",
                            // boxShadow: "0 0 0.5em 0 rgba(0, 0, 0, 0.3)",
                            padding: "var(--grid-gap)",
                            border: "1px solid",
                            borderRight: "none",
                            borderRadius: "calc(var(--grid-gap) / 3)",
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }}
                    >
                        {fontObject && (
                            <div>
                                <NextImage
                                    src={fontObject.meta.heroImage.url}
                                    width={fontObject.meta.heroImage.width}
                                    height={fontObject.meta.heroImage.height}
                                    layout="responsive"
                                    placeholder="blur"
                                    blurDataURL={fontObject.meta.heroImage.url}
                                />
                                <div>{fontObject.slug}</div>
                            </div>
                        )}
                        {/* <pre>{JSON.stringify(fontObject, null, 2)}</pre> */}

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
