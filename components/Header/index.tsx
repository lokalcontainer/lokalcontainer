import styles from "styles/header.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";

import { STATIC_MENU } from "libs/menu.constants";
import useOnClickOutside from "hooks/use-on-click-outside";
import { useRouter } from "next/router";

const MenuIcon: FC = ({ children }) => {
    return (
        <span
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                backgroundColor: "inherit"
            }}
        >
            {children}
        </span>
    );
};

const MenuButton: FC<{ onClick: (e: any) => void }> = ({ children, onClick }) => {
    return (
        <button
            onClick={(e) => onClick(e)}
            style={{
                appearance: "none",
                background: "none",
                border: "none",
                fontFamily: "inherit",
                fontSize: "inherit",
                color: "inherit",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                height: "100%",
                aspectRatio: "1/1",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2
            }}
        >
            {children}
        </button>
    );
};

const MainMenu = () => {
    const [menu, setMenu] = useState(false);
    const refMenu = useRef<HTMLLIElement>(null);
    useOnClickOutside(refMenu, () => setMenu(false));

    const { events } = useRouter();
    useEffect(() => {
        const handler = () => setMenu(false);
        events.on("routeChangeComplete", handler);
        return () => events.off("routeChangeComplete", handler);
    }, []);

    return (
        <li ref={refMenu} data-menu="icon">
            <AnimatePresence initial={true} exitBeforeEnter>
                {menu && (
                    <motion.span
                        initial={{ opacity: 0, width: "0em" }}
                        animate={{ opacity: 1, width: "10em" }}
                        exit={{ opacity: 0, width: "0em" }}
                        style={{ position: "relative", width: "100%" }}
                    >
                        <span
                            style={{
                                padding: "0 var(--grid-gap)",
                                display: "block",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis"
                            }}
                        >
                            Menu
                        </span>

                        <ul
                            style={{
                                position: "absolute",
                                left: -1,
                                bottom: 0,
                                transform: "translateY(calc(var(--grid-gap) + 100% + 2px))",

                                flexDirection: "column",
                                padding: "calc(var(--grid-gap) * 2) var(--grid-gap)",
                                margin: 0,
                                display: "flex",
                                // gap: "calc(var(--grid-gap) / 2)",
                                backgroundColor: "var(--accents-1)",
                                width: "calc(100% + calc(var(--grid-gap) * 3))",

                                listStyle: "none",
                                boxShadow: "0 0 1em 0 var(--accents-12)",
                                border: "1px solid",
                                borderRadius: "calc(var(--grid-gap) / 3)"
                            }}
                        >
                            {STATIC_MENU.map((item, i) => (
                                <li
                                    key={i}
                                    style={{
                                        borderBottom: "1px solid",
                                        borderTop: "1px solid",
                                        marginBottom: -1
                                    }}
                                >
                                    <NextLink {...item.link}>
                                        <a>
                                            <span>{item.label}</span>
                                        </a>
                                    </NextLink>
                                </li>
                            ))}
                        </ul>
                    </motion.span>
                )}
            </AnimatePresence>

            <MenuButton onClick={() => setMenu((prev) => !prev)}>
                <MenuIcon>M</MenuIcon>
            </MenuButton>
        </li>
    );
};

export const Header = () => {
    const { theme, themes, setTheme } = useTheme();

    const [search, setSearch] = useState(false);

    const refSearch = useRef<HTMLLIElement>(null);
    useOnClickOutside(refSearch, () => setSearch(false));

    return (
        <header className={styles.app_header}>
            <ul>
                <li data-menu="text">
                    <NextLink href="/">
                        <a>
                            <span>Lokal Container Org.</span>
                        </a>
                    </NextLink>
                </li>

                <MainMenu />

                <li ref={refSearch} data-menu="input-text">
                    <AnimatePresence exitBeforeEnter>
                        {search && (
                            <motion.input
                                type="text"
                                placeholder="Search..."
                                style={{
                                    display: "inline-flex",
                                    margin: 0,
                                    boxSizing: "content-box",
                                    height: "100%",
                                    fontFamily: "inherit",
                                    fontSize: "inherit",
                                    border: "none",
                                    appearance: "none",
                                    padding: "0 var(--grid-gap)",
                                    background: "none",
                                    color: "inherit",
                                    outline: "none",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                                initial={{ width: 0, opacity: 0, padding: "0em 0em" }}
                                animate={{
                                    width: "10em",
                                    opacity: 1,
                                    padding: "0em 0.5em"
                                }}
                                exit={{ width: 0, opacity: 0, padding: "0em 0em" }}
                            />
                        )}
                    </AnimatePresence>

                    <MenuButton onClick={() => setSearch((prev) => !prev)}>
                        <MenuIcon>S</MenuIcon>
                    </MenuButton>
                </li>

                {/* <li>
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        style={{ textTransform: "capitalize" }}
                    >
                        {themes.map((item, i) => (
                            <option key={i} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </li> */}
            </ul>

            <ul>
                <li data-menu="text">
                    <NextLink href="/sign-up">
                        <a>
                            <span>Sign Up</span>
                        </a>
                    </NextLink>
                </li>
                <li data-menu="text">
                    <NextLink href="/donate">
                        <a>
                            <span>Donate</span>
                        </a>
                    </NextLink>
                </li>
            </ul>
        </header>
    );
};
