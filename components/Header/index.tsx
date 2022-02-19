import styles from "styles/header.module.scss";
import { CSSProperties, Fragment } from "react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import useBreadCrumb from "hooks/use-breadcrumb";
import { useSession } from "components/Context/ContextSession";
import { HeaderAvatar } from "./Avatar";

const listStyle: CSSProperties = {
    display: "inline-flex",
    height: "100%",
    color: "var(--accents-12)",
    alignItems: "center"
};

const linkStyle: CSSProperties = {
    display: "inline-flex",
    height: "100%",
    alignItems: "center",
    color: "currentcolor"
};

const textStyle: CSSProperties = {
    fontSize: "1.5em",
    fontWeight: 500,
    textTransform: "capitalize"
};

export const Header = () => {
    const { theme, themes, setTheme } = useTheme();
    const { session } = useSession();
    const { breadcrumbs, convertBreadcrumb } = useBreadCrumb();

    return (
        <header className={styles.app_header}>
            <ul>
                {breadcrumbs.length >= 1 && (
                    <>
                        <li style={listStyle}>
                            <NextLink href="/">
                                <a style={linkStyle} title="Globe">
                                    <span style={{ ...textStyle, fontSize: "1.75em" }}>
                                        &#127760;
                                    </span>
                                    {/* <span style={textStyle}>&#8627;</span> */}
                                </a>
                            </NextLink>
                        </li>

                        <li style={listStyle}>
                            <span style={textStyle}>/</span>
                        </li>

                        <li style={listStyle}>
                            <NextLink href="/">
                                <a style={linkStyle} title="Index">
                                    <span style={textStyle}>L - C</span>
                                </a>
                            </NextLink>
                        </li>

                        {breadcrumbs.length !== 0 &&
                            breadcrumbs.map((item, i) => {
                                return (
                                    <Fragment key={i}>
                                        {item.href !== "/" && (
                                            <li style={listStyle}>
                                                <span style={textStyle}>/</span>
                                            </li>
                                        )}

                                        <li style={listStyle}>
                                            <NextLink href={item.href}>
                                                <a style={linkStyle}>
                                                    <span style={textStyle}>
                                                        {convertBreadcrumb(
                                                            item.breadcrumb.replace(/-/g, " ")
                                                        )}
                                                    </span>
                                                </a>
                                            </NextLink>
                                        </li>
                                    </Fragment>
                                );
                            })}
                    </>
                )}
            </ul>

            <ul style={{ justifyContent: "end" }}>
                <HeaderAvatar />

                {session && (
                    <>
                        <li
                            style={{
                                color: "var(--accents-8)",
                                border: "1px solid var(--accents-8)",
                                borderRadius: "calc(var(--grid-gap) / 3)",
                                width: "1.5em",
                                padding: 0,
                                aspectRatio: "1/1"
                            }}
                        >
                            <NextLink href="/post/new?type=font">
                                <a>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1.5em"
                                            width="1.5em"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                        </svg>
                                    </span>
                                </a>
                            </NextLink>
                        </li>
                    </>
                )}

                <li
                    style={{
                        height: "1.55em",
                        border: "1px solid var(--accents-8)",
                        color: "var(--accents-8)",
                        borderRadius: "calc(var(--grid-gap) *2)",
                        display: "inline-flex",
                        alignItems: "center"
                    }}
                >
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        style={{
                            margin: 0,
                            textTransform: "capitalize",
                            height: "100%",
                            paddingInline: "calc(var(--grid-gap) / 4)",
                            outline: "none",
                            color: "var(--accents-8)"
                        }}
                    >
                        {themes.map((item, i) => (
                            <option key={i} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </li>
            </ul>
        </header>
    );
};
