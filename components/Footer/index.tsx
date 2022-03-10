import styles from "styles/footer.module.scss";
import type { CSSProperties } from "react";
import { Fragment } from "react";
import NextDynamic from "next/dynamic";
import NextLink from "next/link";
import useLightBox from "hooks/use-light-box";
import Marquee from "components/Utils/Marquee";

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
    textDecoration: "underline"
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

    const { lightBox } = useLightBox();

    return (
        <>
            {!lightBox && (
                <footer className={styles.app_footer}>
                    <Marquee
                        pauseOnHover
                        speed={24}
                        style={{ fontFeatureSettings: `"tnum", "case"` }}
                    >
                        {Array(3)
                            .fill(
                                <>
                                    <div style={{ marginInline: "1em" }}>
                                        <div style={{ fontSize: "0.75em" }}>
                                            &copy;{currentYear} Lokal Container with Love. Find us
                                            at{" "}
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
                                        </div>
                                    </div>

                                    <Measurment
                                        style={{
                                            fontSize: "0.6em",
                                            borderRadius: "1em",
                                            padding: "0.15em 0.75em",
                                            backgroundColor: "var(--accents-3)"
                                        }}
                                    />

                                    <div style={{ marginInline: "1em" }}>
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
                                                        <a style={aStyle}>{item.label}</a>
                                                    </NextLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Measurment
                                        style={{
                                            fontSize: "0.6em",
                                            borderRadius: "1em",
                                            padding: "0.15em 0.75em",
                                            backgroundColor: "var(--accents-3)"
                                        }}
                                    />
                                </>
                            )
                            .map((item, i) => (
                                <Fragment key={i}>{item}</Fragment>
                            ))}
                    </Marquee>
                </footer>
            )}
        </>
    );
}
