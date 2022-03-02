import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useOnClickOutside from "hooks/use-on-click-outside";

const buttonStyle: CSSProperties = {
    appearance: "none",
    background: "none",
    border: "1px solid",
    borderRadius: "100%",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: 0,
    margin: 0,
    aspectRatio: "1/1",
    position: "relative"
};

const buttonSpanStyle: CSSProperties = {
    display: "inline-flex",
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center"
};

const list: string[] = ["font", "article", "goods"];

export default function CreatePostButton() {
    const { events } = useRouter();
    const [hover, setHover] = useState(false);
    const refList = useRef<HTMLUListElement>(null);
    useOnClickOutside(refList, () => setHover(false));

    useEffect(() => {
        const handleClose = () => setHover(false);

        events.on("routeChangeStart", handleClose);
        events.on("routeChangeComplete", handleClose);
        events.on("routeChangeError", handleClose);

        return () => {
            events.off("routeChangeStart", handleClose);
            events.off("routeChangeComplete", handleClose);
            events.off("routeChangeError", handleClose);
        };
    }, [events]);

    return (
        <>
            <NextLink href="/new?type=font">
                <a title="New Post" style={buttonStyle} onMouseOver={() => setHover(true)}>
                    <span style={buttonSpanStyle}>
                        <svg
                            name="New Post"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.4em"
                            viewBox="0 0 24 24"
                            width="1.4em"
                            fill="currentColor"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                    </span>
                </a>
            </NextLink>

            {hover && (
                <ul
                    ref={refList}
                    style={{
                        listStyle: "none",
                        padding: "1em",
                        margin: 0,
                        position: "absolute",
                        bottom: "-1em",
                        left: "50%",
                        transform: "translate(-50%, 100%)",
                        minWidth: "10em",
                        borderRadius: "calc(var(--grid-gap) / 1)",
                        backgroundColor: "var(--accents-1)",
                        boxShadow:
                            "0 0 1em -0.45em var(--accents-6), inset 0 0 2px 0 var(--accents-6)"
                    }}
                >
                    {list.map((item, i) => (
                        <li key={i}>
                            <NextLink href={{ pathname: "/new", query: { type: item } }}>
                                <a>
                                    <span style={{ textTransform: "capitalize" }}>{item}</span>
                                </a>
                            </NextLink>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
