// import styles from "styles/preview.module.scss";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import type { BasePost } from "types/post";

import { NextSeo, ArticleJsonLd } from "next-seo";
import NextLink, { LinkProps } from "next/link";
// import NextImage from "next/image";
import { useRouter } from "next/router";
// import { DUMMY_PARAGRAPH } from "libs/util.contants";
import FontTypetools from "components/Post/FontTypetools";
import FontOverview from "components/Post/FontOverview";
import FontGlyph from "components/Post/FontGlyph";
import FontCase from "components/Post/FontCase";
import ProviderFont from "components/Context/ContextFont";

type PreviewFontProps = {
    post: BasePost;
    style?: CSSProperties;
    tab?: string | null;
};

type StaticLink = {
    label: string;
    slug: string;
    link: LinkProps;
};

type FontTabProps = {
    tab?: string | null;
};

function FontTab(props: FontTabProps) {
    const { tab } = props;
    switch (tab) {
        case "overview":
            return <FontOverview />;
        case "typetools":
            return <FontTypetools />;
        case "glyph":
            return <FontGlyph />;
        case "case-study":
            return <FontCase />;
        default:
            return <div>Query Tab not match</div>;
    }
}

export default function PreviewFont(props: PreviewFontProps) {
    const { post, tab: initTab } = props;
    const { pathname, query, asPath } = useRouter();
    const isPage = pathname === "/[user]/[post]";

    const { images, slug, author } = post;
    const { userName } = author;
    const image1 = images[0];

    const [tab, setTab] = useState<string | null | undefined>(initTab);

    useEffect(() => {
        if (!query.tab) return;
        setTab(query.tab as string);
    }, [query.tab]);

    const buildLink = useCallback(
        (label: string, tabslug: string): StaticLink => {
            const lightBox = !!query.light_box?.includes("true");
            return {
                label,
                slug: tabslug,
                link: {
                    shallow: true,
                    as: `/${userName}/${slug}?tab=${tabslug}`,
                    href: {
                        pathname: lightBox ? pathname : "/[user]/[post]",
                        query: {
                            user: userName,
                            post: slug,
                            tab: tabslug,
                            type: post.type,
                            light_box: lightBox
                        }
                    }
                }
            };
        },
        [query, pathname, post.type, slug, userName]
    );

    const fontLinks: StaticLink[] = [
        buildLink("Overview", "overview"),
        buildLink("Typetools", "typetools"),
        buildLink("Glyph", "glyph"),
        buildLink("Case Study", "case-study")
    ];

    function capitalizeSentence(sentence: string | null | undefined) {
        if (!sentence) return "No String";
        return sentence
            .replace(/-/g, " ")
            .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    }

    return (
        <>
            <NextSeo
                title={`${post.title} | ${capitalizeSentence(tab)}`}
                canonical={`${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`}
                description={`${`${post.title} | ${capitalizeSentence(tab)}`} is a bla bla bla...`}
                openGraph={{
                    type: "article",
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`,
                    title: `${post.title} | ${capitalizeSentence(tab)}`,
                    description: `${`${post.title} | ${capitalizeSentence(
                        tab
                    )}`} is a bla bla bla...`,
                    images: post.images.map((item) => ({
                        url: `${process.env.NEXT_PUBLIC_SITE_URL}${item.large.url}`,
                        width: item.large.width,
                        height: item.large.height,
                        alt: `${`${post.title} | ${capitalizeSentence(tab)}`} is a bla bla bla...`
                    }))
                }}
            />

            <ProviderFont slug={slug} isModal={!isPage}>
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        position: "sticky",
                        top: isPage ? "var(--header-height)" : 0,
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isPage ? "initial" : "center",
                        height: "var(--header-height)",
                        paddingInline: isPage ? 0 : "4em",
                        gap: "calc(var(--grid-gap) * 2)",
                        borderBottom: "1px solid var(--accents-3)",
                        backgroundColor: "var(--accents-1)",
                        color: "var(--accents-12)"
                    }}
                >
                    {fontLinks.map((item, i) => (
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

                <FontTab tab={tab} />
            </ProviderFont>

            {/* <div data-modal={!isPage} className={styles.font}>
                <div data-modal={!isPage} className={styles.font_content}>
                    <div
                        data-modal={!isPage}
                        className={styles.font_image_container}
                        style={{
                            backgroundColor: `rgba(${image1.dominant.r}, ${image1.dominant.g}, ${image1.dominant.b}, 100%)`
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "100%"
                                // overflow: "hidden",
                                // width: isPage
                                //     ? "100%"
                                //     : image1.large.width < image1.large.height
                                //     ? "60%"
                                //     : image1.large.width === image1.large.height
                                //     ? "100%"
                                //     : "100%"
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    border: isPage ? "none" : "1px solid",
                                    overflow: "hidden",
                                    backgroundColor: `rgb(${image1.dominant.r}, ${image1.dominant.g}, ${image1.dominant.b})`
                                }}
                            >
                                <NextImage
                                    src={image1.large.url}
                                    width={image1.large.width}
                                    height={image1.large.height}
                                    layout="responsive"
                                    quality="100%"
                                    priority
                                />
                            </div>

                            {!isPage && (
                                <div
                                    style={{
                                        fontFeatureSettings: `"case", "tnum"`,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        alignSelf: "start",
                                        backgroundColor: "var(--accents-12)",
                                        color: "var(--accents-1)",
                                        borderRadius: "calc(var(--grid-gap) * 2)",
                                        padding: "calc(var(--grid-gap) / 4) var(--grid-gap)",
                                        marginBlock: "var(--grid-gap)",
                                        position: "absolute",
                                        bottom: "-1em",
                                        transform: "translateY(100%)"
                                    }}
                                >
                                    <span style={{ fontSize: "0.75em" }}>
                                        {image1.large.width} &times; {image1.large.height}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        {!isPage && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <NextLink
                                    href={{
                                        pathname: "/[user]/[post]",
                                        query: {
                                            user: author.userName,
                                            post: slug,
                                            tab: "typetools"
                                        }
                                    }}
                                >
                                    <a style={{ textDecoration: "underline" }}>
                                        <span>Typetools</span>
                                    </a>
                                </NextLink>
                                <NextLink
                                    href={{
                                        pathname: "/[user]/[post]",
                                        query: {
                                            user: author.userName,
                                            post: slug,
                                            tab: "case-study"
                                        }
                                    }}
                                >
                                    <a style={{ textDecoration: "underline" }}>
                                        <span>Case Study</span>
                                    </a>
                                </NextLink>
                                <NextLink
                                    href={{
                                        pathname: "/[user]/[post]",
                                        query: {
                                            user: author.userName,
                                            post: slug
                                        }
                                    }}
                                >
                                    <a style={{ textDecoration: "underline" }}>
                                        <span>Detail</span>
                                    </a>
                                </NextLink>
                            </div>
                        )}

                        <p
                            style={{
                                fontSize: "5em",
                                textAlign: "justify",
                                fontWeight: "bold",
                                marginBlock: "calc(var(--grid-gap) / 2)"
                            }}
                        >
                            RISET &amp; DATA 4 Kita &amp; Tipografi / Industri—Masal, ID 17-08-1945
                        </p>

                        {!isPage && (
                            <div>
                                <h3>About</h3>
                                <p
                                    style={{
                                        columnCount: 2,
                                        columnGap: "calc(var(--grid-gap) * 4)",
                                        textAlign: "justify",
                                        hyphens: "auto",
                                        lineHeight: 1.5,
                                        textIndent: "calc(var(--grid-gap) * 4)"
                                    }}
                                >
                                    {DUMMY_PARAGRAPH}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {!isPage && (
                    <footer className={styles.footer}>
                        <button>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1.5em"
                                    width="1.5em"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
                                </svg>
                            </span>
                        </button>
                        <button>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1.5em"
                                    width="1.5em"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
                                </svg>
                            </span>
                        </button>
                    </footer>
                )}
            </div> */}
        </>
    );
}
