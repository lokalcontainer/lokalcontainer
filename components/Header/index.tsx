import styles from "styles/header.module.scss";
import { CSSProperties, Fragment } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import NextDynamic from "next/dynamic";
import useBreadCrumb from "hooks/use-breadcrumb";
import { ConsumerMenu, ProviderMenu } from "components/Context/ContextMenu";
import ButtonSVG from "components/Utils/ButtonSVG";
import ButtonSearch from "components/ButtonSearch";

const Drawer = NextDynamic(() => import("./Drawer"), { ssr: false });
const CreatePostButton = NextDynamic(() => import("components/CreatePostButton"), { ssr: false });

const listStyle: CSSProperties = {
    display: "inline-flex",
    height: "100%",
    alignItems: "center"
};

const linkStyle: CSSProperties = {
    display: "inline-flex",
    height: "100%",
    alignItems: "center"
};

const textStyle: CSSProperties = {
    fontSize: "1.25em",
    fontWeight: 500,
    textTransform: "capitalize",
    paddingBottom: "0.1em"
};

export default function Header() {
    const { pathname } = useRouter();
    const { breadcrumbs, convertBreadcrumb } = useBreadCrumb();

    return (
        <ProviderMenu>
            <ConsumerMenu>
                {({ menu, toggleMenu }) => (
                    <header
                        className={styles.app_header}
                        data-menu={menu}
                        data-page={pathname.split("/")[1]}
                    >
                        <ul>
                            {breadcrumbs.length >= 1 && (
                                <>
                                    <li style={listStyle}>
                                        <NextLink href="/">
                                            <a style={linkStyle} title="Globe" aria-label="Index">
                                                <span
                                                    style={{
                                                        ...textStyle,
                                                        fontSize: "1.5em",
                                                        paddingBottom: "0.05em"
                                                    }}
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

                                    {breadcrumbs[0].href !== "/" &&
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
                                                            <a
                                                                style={linkStyle}
                                                                title={item.breadcrumb.replace(
                                                                    /-/g,
                                                                    " "
                                                                )}
                                                            >
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

                        <ul style={{ justifyContent: "end", gap: 0 }}>
                            <li>
                                <ButtonSearch />
                            </li>
                            <li>
                                <CreatePostButton />
                            </li>
                            <li>
                                <ButtonSVG
                                    title="Menu"
                                    onClick={toggleMenu}
                                    icon="menu"
                                    data-active={menu}
                                />
                            </li>
                        </ul>

                        <Drawer />
                    </header>
                )}
            </ConsumerMenu>
        </ProviderMenu>
    );
}
