import styles from "styles/footer.module.scss";
import { CSSProperties, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import NextDynamic from "next/dynamic";
import NextLink from "next/link";
import { useWindow } from "components/Context/ContextWindow";
import Marquee from "components/Utils/Marquee";
import ThemeSelector from "components/Utils/ThemeSelector";
// import useScrollPosition from "hooks/use-scroll-position";

const Measurment = NextDynamic(() => import("components/Utils/Measurement"), {
    ssr: false,
    loading: () => (
        <span
            style={{
                fontFeatureSettings: `"tnum", "case"`,
                pointerEvents: "none",
                touchAction: "none",
                userSelect: "none",
                fontSize: "0.6em",
                borderRadius: "1em",
                padding: "0.15em 0.75em",
                backgroundColor: "var(--accents-3)"
            }}
        >
            Loading...
        </span>
    )
});

const aStyle: CSSProperties = {
    textDecoration: "underline",
    fontWeight: 600
};

const staticLinks: { label: string; href: string }[] = [
    { label: "About", href: "/about" },
    { label: "Open Source", href: "/open-source" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "FAQs", href: "/faq" }
];

export default function Footer() {
    const date = new Date();
    const currentYear = date.getFullYear();

    const { pathname, query } = useRouter();
    const { focus } = useWindow();
    const isLightBox = !!query.light_box?.includes("true");

    // const [isVisible, setIsVisible] = useState(true);
    // useScrollPosition((v) => {
    //     if (v.prevPos.y >= v.currPos.y) {
    //         setIsVisible(false);
    //     } else {
    //         setIsVisible(true);
    //     }
    // });

    return (
        <motion.footer
            initial={true}
            // animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
            transition={{ type: "just" }}
            className={styles.app_footer}
            data-page={pathname.split("/")[1]}
        >
            <Marquee
                play={focus && !isLightBox}
                pauseOnHover
                speed={30}
                delay={5}
                style={{ fontFeatureSettings: `"tnum", "case"` }}
            >
                <div style={{ marginRight: "2em" }}>
                    <div style={{ fontSize: "0.75em" }}>
                        <span style={{ fontWeight: 600 }}>
                            &copy;{currentYear} Lokal Container with Love.
                        </span>{" "}
                        Find us at{" "}
                        <a
                            style={aStyle}
                            href="https://goo.gl/maps/hbGUeAxtG92uZ5i39"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lou Belle Space
                        </a>{" "}
                        or follow us on{" "}
                        <a
                            style={aStyle}
                            href="https://instagram.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                        ,{" "}
                        <a
                            style={aStyle}
                            href="https://github.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>
                        , and{" "}
                        <a
                            style={aStyle}
                            href="https://twitter.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Twitter
                        </a>
                        .
                    </div>
                </div>

                <div style={{ marginRight: "2em" }}>
                    <ul
                        style={{
                            fontSize: "0.75em",
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "calc(var(--grid-gap) * 1)"
                        }}
                    >
                        {staticLinks.map((item, i) => (
                            <li key={i}>
                                <NextLink href={item.href}>
                                    <a style={{ ...aStyle }}>{item.label}</a>
                                </NextLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    style={{
                        marginRight: "2em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "calc(var(--grid-gap) / 2)"
                    }}
                >
                    <Measurment
                        style={{
                            fontSize: "0.625em",
                            borderRadius: "2em",
                            padding: "0.15em 0.75em",
                            backgroundColor: "var(--accents-3)",
                            color: "var(--accents-12)"
                        }}
                    />
                    <ThemeSelector style={{ fontSize: "0.625em", textTransform: "uppercase" }} />
                </div>

                <div style={{ marginRight: "2em" }}>
                    <div style={{ fontSize: "0.75em" }}>
                        <span style={{ fontWeight: 600 }}>
                            &copy;{currentYear} Lokal Container with Love.
                        </span>{" "}
                        Find us at{" "}
                        <a
                            style={aStyle}
                            href="https://goo.gl/maps/hbGUeAxtG92uZ5i39"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lou Belle Space
                        </a>{" "}
                        or follow us on{" "}
                        <a
                            style={aStyle}
                            href="https://instagram.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                        ,{" "}
                        <a
                            style={aStyle}
                            href="https://github.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>
                        , and{" "}
                        <a
                            style={aStyle}
                            href="https://twitter.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Twitter
                        </a>
                        .
                    </div>
                </div>

                <div style={{ marginRight: "2em" }}>
                    <ul
                        style={{
                            fontSize: "0.75em",
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "calc(var(--grid-gap) * 1)"
                        }}
                    >
                        {staticLinks.map((item, i) => (
                            <li key={i}>
                                <NextLink href={item.href}>
                                    <a style={{ ...aStyle }}>{item.label}</a>
                                </NextLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    style={{
                        marginRight: "2em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "calc(var(--grid-gap) / 2)"
                    }}
                >
                    <Measurment
                        style={{
                            fontSize: "0.625em",
                            borderRadius: "2em",
                            padding: "0.15em 0.75em",
                            backgroundColor: "var(--accents-3)",
                            color: "var(--accents-12)"
                        }}
                    />
                    <ThemeSelector style={{ fontSize: "0.625em", textTransform: "uppercase" }} />
                </div>

                <div style={{ marginRight: "2em" }}>
                    <div style={{ fontSize: "0.75em" }}>
                        <span style={{ fontWeight: 600 }}>
                            &copy;{currentYear} Lokal Container with Love.
                        </span>{" "}
                        Find us at{" "}
                        <a
                            style={aStyle}
                            href="https://goo.gl/maps/hbGUeAxtG92uZ5i39"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lou Belle Space
                        </a>{" "}
                        or follow us on{" "}
                        <a
                            style={aStyle}
                            href="https://instagram.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                        ,{" "}
                        <a
                            style={aStyle}
                            href="https://github.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>
                        , and{" "}
                        <a
                            style={aStyle}
                            href="https://twitter.com/lokalcontainer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Twitter
                        </a>
                        .
                    </div>
                </div>

                <div style={{ marginRight: "2em" }}>
                    <ul
                        style={{
                            fontSize: "0.75em",
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "calc(var(--grid-gap) * 1)"
                        }}
                    >
                        {staticLinks.map((item, i) => (
                            <li key={i}>
                                <NextLink href={item.href}>
                                    <a style={{ ...aStyle }}>{item.label}</a>
                                </NextLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    style={{
                        marginRight: "2em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "calc(var(--grid-gap) / 2)"
                    }}
                >
                    <Measurment
                        style={{
                            fontSize: "0.625em",
                            borderRadius: "2em",
                            padding: "0.15em 0.75em",
                            backgroundColor: "var(--accents-3)",
                            color: "var(--accents-12)"
                        }}
                    />
                    <ThemeSelector style={{ fontSize: "0.625em", textTransform: "uppercase" }} />
                </div>
            </Marquee>
        </motion.footer>
    );
}
