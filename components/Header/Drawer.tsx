import styles from "styles/header.module.scss";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { STATIC_MENU } from "libs/menu.constants";
import useOnEscape from "hooks/use-on-escape";
import useOnClickOutside from "hooks/use-on-click-outside";
import { useSession } from "components/Context/ContextSession";
import { useMenu } from "components/Context/ContextMenu";
import { FormSignIn } from "components/Utils/Forms";

export default function Drawer() {
    const { session, handleLogout } = useSession();
    const { themes, theme, setTheme } = useTheme();
    const { menu, hideMenu } = useMenu();
    const refParent = useRef<HTMLDivElement>(null);
    useOnEscape(refParent, menu, hideMenu);
    useOnClickOutside(refParent, hideMenu);

    const arrayColors = Array(9).fill("");

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            {menu && (
                <motion.nav
                    ref={refParent}
                    className={styles.app_drawer}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { type: "spring", mass: 0.5, damping: 200, stiffness: 2000 }
                    }}
                    exit={{
                        opacity: 0,
                        transition: { type: "spring", mass: 0.5, damping: 100, stiffness: 2000 }
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            justifyContent: "stretch",
                            flexDirection: "row-reverse"
                        }}
                    >
                        <li
                            style={{
                                height: "calc(var(--header-height) / 1.5)",
                                width: `100%`,
                                flexShrink: 4
                            }}
                        >
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                style={{
                                    margin: 0,
                                    textTransform: "capitalize",
                                    height: "100%",
                                    paddingInline: "calc(var(--grid-gap) / 1.5)",
                                    outline: "none",
                                    width: "100%",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "inherit",
                                    fontFamily: "inherit",
                                    fontWeight: "inherit",
                                    backgroundColor: "var(--accents-12)",
                                    color: "var(--accents-1)"
                                }}
                            >
                                {themes.map((item, i) => (
                                    <option key={i} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </li>

                        {arrayColors.map((_i, i) => (
                            <li
                                key={i}
                                style={{
                                    height: "calc(var(--header-height) / 1.5)",
                                    width: `${100 / arrayColors.length}%`,
                                    // aspectRatio: "1/3",
                                    backgroundColor: `var(--accents${i - arrayColors.length - 1})`
                                }}
                            />
                        ))}
                    </ul>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "calc(var(--grid-gap) * 4)"
                        }}
                    >
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {session ? (
                                <li>
                                    <button onClick={handleLogout}>Sign Out</button>
                                </li>
                            ) : (
                                <li>
                                    <FormSignIn />
                                </li>
                            )}
                        </ul>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: "0em 0",
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end"
                            }}
                        >
                            {STATIC_MENU.map((item, i) => (
                                <li key={i}>
                                    <NextLink {...item.link}>
                                        <a datatype="text">
                                            <span style={{ fontSize: "4em", fontWeight: "bold" }}>
                                                {item.label}
                                            </span>
                                        </a>
                                    </NextLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
