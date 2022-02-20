import styles from "styles/layout.module.scss";
import { FC, useState } from "react";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import useScrollPosition from "hooks/use-scroll-position";
import { useSession } from "components/Context/ContextSession";

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
    const { session } = useSession();
    const { children, user, slug } = props;
    const { userName } = user;
    const { query } = useRouter();

    const [isScroll, setIsScroll] = useState(false);

    useScrollPosition(
        ({ currPos }) => {
            const isShow = currPos.y < 0;
            if (isShow !== isScroll) setIsScroll(isShow);
        },
        [isScroll]
    );

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
            label: "Typetools",
            slug: "typetools",
            link: {
                shallow: true,
                href: {
                    pathname: "/[user]/[post]",
                    query: { user: userName, post: slug, tab: "typetools" }
                }
            }
        },
        {
            label: "Case Study",
            slug: "case-study",
            link: {
                shallow: true,
                href: {
                    pathname: "/[user]/[post]",
                    query: { user: userName, post: slug, tab: "case-study" }
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
        }
    ];

    return (
        <div className={styles.post}>
            <div className={styles.post_content} data-layout="fluids">
                <div>
                    <ul className={styles.sub_header} data-scroll={isScroll}>
                        {staticLinks.map((item, i) => (
                            <li key={i}>
                                <NextLink {...item.link} scroll>
                                    <a
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
                    <div>{children}</div>
                </div>

                <aside className={styles.aside}>
                    <ul>
                        <li
                            data-scroll={isScroll}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>About</span>
                            {session && session.userName === user.userName && (
                                <span style={{ fontSize: "0.85em", color: "var(--accents-6)" }}>
                                    Edit
                                </span>
                            )}
                        </li>
                        <li>
                            <p style={{ fontWeight: 300, lineHeight: 1.5 }}>
                                {/* Opensource font publishing platform, made by people across the globe */}
                                There are many variations of passages of Lorem Ipsum available, but
                                the majority have suffered alteration in some form, by injected
                                humour, or randomised words which don&apos;t look even slightly
                                believable.
                            </p>
                        </li>

                        <li>
                            <div>License</div>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};
