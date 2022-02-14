import styles from "styles/header.module.scss";
// import type { FC } from "react";
// import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
// import { AnimatePresence, motion } from "framer-motion";
// import { useRouter } from "next/router";
import NextLink from "next/link";
// import { DropDown } from "components/Utils/DropDown";

// import { STATIC_MENU } from "libs/menu.constants";
// import useOnClickOutside from "hooks/use-on-click-outside";
// import Logo from "components/Logo";
// import { useSession } from "components/Context/ContextSession";

// const MenuIcon: FC = ({ children }) => {
//     return (
//         <span
//             style={{
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "inherit"
//             }}
//         >
//             {children}
//         </span>
//     );
// };

// const MenuButton: FC<{ onClick: (e: any) => void }> = ({ children, onClick }) => {
//     return (
//         <button
//             onClick={(e) => onClick(e)}
//             style={{
//                 appearance: "none",
//                 background: "none",
//                 border: "none",
//                 fontFamily: "inherit",
//                 fontSize: "inherit",
//                 color: "inherit",
//                 cursor: "pointer",
//                 padding: 0,
//                 margin: 0,
//                 // height: "100%",
//                 // aspectRatio: "1/1",
//                 display: "inline-flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 zIndex: 2
//             }}
//         >
//             {children}
//         </button>
//     );
// };

// const MainMenu = () => {
//     const [menu, setMenu] = useState(false);
//     const refMenu = useRef<HTMLLIElement>(null);
//     useOnClickOutside(refMenu, () => setMenu(false));

//     const { events } = useRouter();
//     useEffect(() => {
//         const handler = () => setMenu(false);
//         events.on("routeChangeComplete", handler);
//         return () => events.off("routeChangeComplete", handler);
//     }, [events]);

//     return (
//         <li ref={refMenu} data-menu="text">
//             <AnimatePresence initial={true} exitBeforeEnter>
//                 {menu && (
//                     <motion.span
//                         initial={{ opacity: 0, width: "0em" }}
//                         animate={{ opacity: 1, width: "10em" }}
//                         exit={{ opacity: 0, width: "0em" }}
//                         style={{ position: "relative", width: "100%" }}
//                     >
//                         <span
//                             style={{
//                                 padding: "0 var(--grid-gap)",
//                                 display: "block",
//                                 overflow: "hidden",
//                                 whiteSpace: "nowrap",
//                                 textOverflow: "ellipsis"
//                             }}
//                         >
//                             Menu
//                         </span>

//                         <ul
//                             style={{
//                                 position: "absolute",
//                                 left: -1,
//                                 bottom: 0,
//                                 transform: "translateY(calc(var(--grid-gap) + 100% + 2px))",

//                                 flexDirection: "column",
//                                 padding: "calc(var(--grid-gap) * 2) var(--grid-gap)",
//                                 margin: 0,
//                                 display: "flex",
//                                 // gap: "calc(var(--grid-gap) / 2)",
//                                 backgroundColor: "var(--accents-1)",
//                                 width: "calc(100% + calc(var(--grid-gap) * 3))",

//                                 listStyle: "none",
//                                 boxShadow: "0 0 1em 0 var(--accents-12)",
//                                 border: "1px solid",
//                                 borderRadius: "calc(var(--grid-gap) / 3)"
//                             }}
//                         >
//                             {STATIC_MENU.map((item, i) => (
//                                 <li
//                                     key={i}
//                                     style={{
//                                         borderBottom: "1px solid",
//                                         borderTop: "1px solid",
//                                         marginBottom: -1
//                                     }}
//                                 >
//                                     <NextLink {...item.link}>
//                                         <a>
//                                             <span>{item.label}</span>
//                                         </a>
//                                     </NextLink>
//                                 </li>
//                             ))}
//                         </ul>
//                     </motion.span>
//                 )}
//             </AnimatePresence>

//             <MenuButton onClick={() => setMenu((prev) => !prev)}>
//                 <span>Menu</span>
//                 {/* <MenuIcon>M</MenuIcon> */}
//             </MenuButton>
//         </li>
//     );
// };

export const Header = () => {
    const { theme, themes, setTheme } = useTheme();
    // const { session } = useSession();

    // const [search, setSearch] = useState(false);

    // const refSearch = useRef<HTMLLIElement>(null);
    // useOnClickOutside(refSearch, () => setSearch(false));

    return (
        <header className={styles.app_header}>
            {/* <ul style={{ alignSelf: "center" }}>
                <li>
                    <NextLink href="/">
                        <a
                            style={{
                                display: "inline-flex",
                                height: "100%",
                                alignItems: "center"
                            }}
                        >
                            <Logo />
                        </a>
                    </NextLink>
                </li>
            </ul> */}

            <ul style={{ padding: 0 }}>
                <li data-menu="text">
                    <NextLink href="/">
                        <a>
                            <span>L / C</span>
                        </a>
                    </NextLink>
                </li>
                {/* <MainMenu /> */}

                {/* <li ref={refSearch} data-menu="input-text">
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
                        <span>Search</span>
                        <MenuIcon>S</MenuIcon>
                    </MenuButton>
                </li> */}
            </ul>

            {/* <ul>
                <li data-menu="text">
                    <NextLink href="/blog">
                        <a>
                            <span>Blog</span>
                        </a>
                    </NextLink>
                </li>

                <li data-menu="text">
                    <NextLink
                        href={{
                            pathname: "/donate/[type]",
                            query: { type: "eth" }
                        }}
                    >
                        <a>
                            <span>Donate</span>
                        </a>
                    </NextLink>
                </li>
                <li data-menu="text">
                    <NextLink href="/[user]" as="/super-lc">
                        <a>
                            <span>Super</span>
                        </a>
                    </NextLink>
                </li>
                {!session ? (
                    <li data-menu="text">
                        <NextLink href="/auth?form=sign-in">
                            <a>
                                <span>Login</span>
                            </a>
                        </NextLink>
                    </li>
                ) : (
                    <li data-menu="text">
                        <NextLink href={`/${session.userName}`}>
                            <a>
                                <span>{session.name}</span>
                            </a>
                        </NextLink>
                    </li>
                )}
            </ul> */}

            <ul />

            {/* <ul /> */}

            <ul>
                {/* <li
                    style={{
                        // backgroundColor: "var(--accents-pink)",
                        backgroundColor: "var(--accents-8)",
                        color: "var(--accents-1)",
                        borderRadius: "calc(var(--grid-gap) * 4)",
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "calc(var(--grid-gap) / 3) calc(var(--grid-gap) / 2)"
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            display: "flex",
                            gap: "calc(var(--grid-gap) / 2)",
                            alignItems: "center"
                        }}
                    >
                        <li data-menu="text">
                            <DropDown
                                label={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1.25em"
                                        width="1.25em"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                    </svg>
                                }
                            />
                        </li>

                        <li data-menu="text">
                            <DropDown
                                label={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1.25em"
                                        width="1.25em"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                    </svg>
                                }
                            />
                        </li>
                    </ul>
                </li> */}
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

            <ul style={{ gap: 0, justifyContent: "end" }}>
                <li>
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        style={{
                            textTransform: "uppercase",
                            border: "1px solid",
                            height: "1.75em",
                            marginRight: "var(--grid-gap)",
                            outline: "none"
                        }}
                    >
                        {themes.map((item, i) => (
                            <option key={i} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </li>

                <li
                    style={{
                        aspectRatio: "1/1",
                        // backgroundColor: "var(--accents-3)",
                        border: "1px solid",
                        padding: "calc(var(--grid-gap) / 3)"
                    }}
                >
                    <a>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.25em"
                                width="1.25em"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                        </span>
                    </a>
                </li>

                <li
                    style={{
                        aspectRatio: "1/1",
                        // backgroundColor: "var(--accents-2)",
                        border: "1px solid",
                        padding: "calc(var(--grid-gap) / 3)",
                        marginLeft: -1
                    }}
                >
                    <a>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.25em"
                                width="1.25em"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                            </svg>
                        </span>
                    </a>
                </li>
            </ul>
        </header>
    );
};
