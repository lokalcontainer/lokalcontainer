import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useOnClickOutside from "hooks/use-on-click-outside";
import ButtonSVG from "./Utils/ButtonSVG";

const list: string[] = ["font", "article", "goods"];

export default function CreatePostButton() {
    const { events, push } = useRouter();
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
            <ButtonSVG
                title="New Post"
                icon="add"
                onClick={() => push("/new?type=font")}
                onMouseOver={() => setHover(true)}
            />

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
