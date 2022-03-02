import styles from "styles/nav.module.scss";
import { CSSProperties, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import NextDynamic from "next/dynamic";
import { STATIC_MENU } from "libs/menu.constants";
import useOnEscape from "hooks/use-on-escape";
import useOnClickOutside from "hooks/use-on-click-outside";
import { useSession } from "components/Context/ContextSession";
import { useMenu } from "components/Context/ContextMenu";
import { FormSignIn } from "components/Utils/Forms";

const ProfileCard = NextDynamic(() => import("components/Utils/ProfileCard"), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

const listStyle: CSSProperties = {
    width: "1.5em",
    aspectRatio: "1/1",
    borderRadius: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--accents-6)"
};

const linkStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const spanStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const SocialMedia = () => {
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "flex-end"
            }}
        >
            <li style={listStyle}>
                <a
                    href="https://instagram.com/lokalcontainer"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    aria-label="Instagram"
                    style={linkStyle}
                >
                    <span style={spanStyle}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="2em"
                            height="2em"
                            fill="currentColor"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                        </svg>
                    </span>
                </a>
            </li>
            <li style={listStyle}>
                <a
                    href="https://github.com/lokalcontainer/lokalcontainer"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Github"
                    aria-label="Github"
                    style={linkStyle}
                >
                    <span style={spanStyle}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="2em"
                            height="2em"
                            fill="currentColor"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
                        </svg>
                    </span>
                </a>
            </li>
        </ul>
    );
};

export default function Drawer() {
    const { session } = useSession();
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
                    className={styles.container}
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
                    <ul className={styles.gradient}>
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
                                {themes.map((item: string, i: number) => (
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
                                    backgroundColor: `var(--accents${i - arrayColors.length - 1})`
                                }}
                            />
                        ))}
                    </ul>

                    <div className={styles.content}>
                        {/* <div
                            style={{
                                width: "8em",
                                aspectRatio: "1/1",
                                padding: "var(--grid-gap)",
                                // backgroundColor: "var(--accents-12)",
                                // border: "4px solid",
                                borderRadius: "100%",
                                color: "var(--accents-12)",
                                marginBlock: "1em",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)"
                            }}
                        >
                            <Logo />
                        </div> */}

                        <ul
                            style={{
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column"
                                // justifyContent: "space-between"
                            }}
                        >
                            {session ? (
                                <ProfileCard />
                            ) : (
                                <li>
                                    <FormSignIn />
                                </li>
                            )}

                            <li style={{ justifySelf: "flex-end", marginTop: "auto" }}>
                                <SocialMedia />
                            </li>
                        </ul>

                        <ul className={styles.menu}>
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
