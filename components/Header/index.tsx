import styles from "styles/header.module.scss";
import { CSSProperties, Fragment } from "react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import NextDynamic from "next/dynamic";
// import toast from "react-hot-toast";
import { ConsumerMenu, ProviderMenu, useMenu } from "components/Context/ContextMenu";
import useBreadCrumb from "hooks/use-breadcrumb";
import { useSession } from "components/Context/ContextSession";

const Drawer = NextDynamic(() => import("./Drawer"), { ssr: false });
const CreatePostButton = NextDynamic(() => import("components/CreatePostButton"), { ssr: false });

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
    aspectRatio: "1/1"
};

const buttonSpanStyle: CSSProperties = {
    display: "inline-flex",
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center"
};

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

const ToggleMenu = () => {
    const { menu, toggleMenu } = useMenu();
    return (
        <button
            name="Menu"
            title="Menu"
            data-tooltip="Open Menu"
            onClick={toggleMenu}
            style={buttonStyle}
        >
            <motion.span
                initial={{ scale: 1 }}
                animate={{ scale: menu ? 1.2 : 1 }}
                whileHover={{ scale: 1.2 }}
                style={buttonSpanStyle}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    width="1.5em"
                    fill="currentColor"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
            </motion.span>
        </button>
    );
};

export const Header = () => {
    const { session } = useSession();
    const { breadcrumbs, convertBreadcrumb } = useBreadCrumb();

    return (
        <ProviderMenu>
            <ConsumerMenu>
                {({ menu }) => (
                    <>
                        <header className={styles.app_header} data-menu={menu}>
                            <ul>
                                {breadcrumbs.length >= 1 && (
                                    <>
                                        <li style={listStyle}>
                                            <NextLink href="/">
                                                <a style={linkStyle} title="Globe">
                                                    <span
                                                        style={{ ...textStyle, fontSize: "1.75em" }}
                                                    >
                                                        &#127760;
                                                    </span>
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
                                                                            item.breadcrumb.replace(
                                                                                /-/g,
                                                                                " "
                                                                            )
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
                                {/* <li>
                                    <div>
                                        <button onClick={() => toast.error("Error")}>Error</button>
                                        <button onClick={() => toast.success("Success")}>
                                            Success
                                        </button>
                                    </div>
                                </li> */}
                                {session && (
                                    <li style={{ width: "1.5em", position: "relative" }}>
                                        <CreatePostButton />
                                    </li>
                                )}

                                <li style={{ height: "1.5em" }}>
                                    <button
                                        name="Search"
                                        title="Search"
                                        data-tooltip="Search something on L - C"
                                        style={buttonStyle}
                                    >
                                        <span style={buttonSpanStyle}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="1.3em"
                                                viewBox="0 0 24 24"
                                                width="1.3em"
                                                fill="currentColor"
                                            >
                                                <path d="M0 0h24v24H0V0z" fill="none" />
                                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                            </svg>
                                        </span>
                                    </button>
                                </li>

                                <li style={{ height: "1.5em" }}>
                                    <ToggleMenu />
                                </li>
                            </ul>
                        </header>

                        <Drawer />
                    </>
                )}
            </ConsumerMenu>
        </ProviderMenu>
    );
};
