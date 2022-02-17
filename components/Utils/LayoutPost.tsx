import styles from "styles/layout.module.scss";
import type { FC } from "react";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/router";

type LayoutPostProps = {
    user: {
        userName: string;
        fullName: string;
    };
    slug: string;
};

type StaticLink = {
    label: string;
    slug: string;
    link: LinkProps;
};

export const LayoutPost: FC<LayoutPostProps> = (props) => {
    const { children, user, slug } = props;
    const { fullName, userName } = user;
    const { query } = useRouter();

    const staticLinks: StaticLink[] = [
        {
            label: "Overview",
            slug: "overview",
            link: {
                shallow: true,
                href: {
                    pathname: "/[user]/[post]",
                    query: { user: userName, post: slug, tab: "overview" }
                }
            }
        },
        {
            label: "Glyph",
            slug: "glyph",
            link: {
                shallow: true,
                href: {
                    pathname: "/[user]/[post]",
                    query: { user: userName, post: slug, tab: "glyph" }
                }
            }
        },
        {
            label: "Character Set",
            slug: "character-set",
            link: {
                shallow: true,
                href: {
                    pathname: "/[user]/[post]",
                    query: { user: userName, post: slug, tab: "character-set" }
                }
            }
        }
    ];

    return (
        <div className={styles.post}>
            <div className={styles.post_content}>
                <div>
                    <ul className={styles.sub_header}>
                        {staticLinks.map((item, i) => (
                            <li key={i}>
                                <NextLink {...item.link} scroll>
                                    <a
                                        style={{ backgroundColor: `var(--accents-${i + 3})` }}
                                        data-active={
                                            (!query.tab && item.slug === "overview") ||
                                            query.tab === item.slug
                                        }
                                    >
                                        <span style={{ fontSize: "0.9em" }}>{item.label}</span>
                                    </a>
                                </NextLink>
                            </li>
                        ))}
                    </ul>
                    {children}
                </div>

                <aside className={styles.aside}>
                    <ul>
                        <li
                            style={{
                                fontWeight: "bold",
                                height: "var(--header-height)",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            About
                        </li>
                        <li>
                            <p style={{ fontWeight: 300, marginBottom: "2em" }}>
                                Opensource font publishing platform, made by people across the globe
                            </p>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};
