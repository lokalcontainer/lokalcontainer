import type { CSSProperties } from "react";
import type { BasePost } from "types/post";

import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";

type PreviewPostProps = {
    post?: BasePost;
    style?: CSSProperties;
};

export const PreviewPost = (props: PreviewPostProps) => {
    const { post } = props;
    const { pathname } = useRouter();
    const isPage = pathname === "/[user]/[post]";
    if (!post) return <div>Loading...</div>;

    const { images, slug, author } = post;
    const image1 = images[0];

    return (
        <div
            style={{
                height: isPage
                    ? "auto"
                    : "calc(100vh - var(--header-height) - calc(var(--grid-gap) * 3))",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    display: isPage ? "block" : "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "calc(var(--grid-gap) * 4)",
                    // alignItems: "stretch",
                    height: isPage ? "auto" : "calc(100% + 1px - var(--header-height))"
                }}
            >
                <div
                    style={{
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--grid-gap)",
                        overflow: "hidden"
                        // padding: "var(--grid-gap)"
                        // backgroundColor: `rgba(${image1.colors[0]}, ${image1.colors[1]}, ${image1.colors[2]}, 100%)`
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            verticalAlign: "middle",
                            maxHeight: "calc(100% + 1px - var(--header-height))",
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
                    <div
                        style={{
                            fontFeatureSettings: `"case", "tnum"`,
                            display: "inline-flex",
                            alignItems: "center",
                            alignSelf: "start",
                            backgroundColor: "var(--accents-12)",
                            color: "var(--accents-1)",
                            borderRadius: "calc(var(--grid-gap) * 2)",
                            padding: "calc(var(--grid-gap) / 4) var(--grid-gap)"
                        }}
                    >
                        {/* <span>
                                RGB [{image1.colors[0]}, {image1.colors[1]}, {image1.colors[2]}]
                            </span>{" "}
                            <span>/</span>{" "} */}
                        <span style={{ fontSize: "0.85em" }}>
                            {image1.large.width} &times; {image1.large.height}
                        </span>
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
                                    // overflow: "hidden",
                                    // textOverflow: "ellipsis",
                                    // display: "block",
                                    // lineClamp: 2
                                }}
                            >
                                There are many variations of passages of Lorem Ipsum available, but
                                the majority have suffered alteration in some form, by injected
                                humour, or randomised words which don&apos;t look even slightly
                                believable. If you are going to use a passage of Lorem Ipsum, you
                                need to be sure there isn&apos;t anything embarrassing hidden in the
                                middle of text. All the Lorem Ipsum generators on the Internet tend
                                to repeat predefined chunks as necessary, making this the first true
                                generator on the Internet. It uses a dictionary of over 200 Latin
                                words, combined with a handful of model sentence structures, to
                                generate Lorem Ipsum which looks reasonable. The generated Lorem
                                Ipsum is therefore always free from repetition, injected humour, or
                                non-characteristic words etc.
                            </p>
                        </div>
                    )}

                    {/* <pre>{JSON.stringify(font, null, 2)}</pre> */}
                </div>
            </div>

            {!isPage && (
                <div
                    style={{
                        height: "calc(var(--header-height) * 1)",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        paddingInline: "var(--grid-gap)"
                        // backgroundColor: "var(--accents-3)",
                        // border: "1px solid"
                    }}
                >
                    Footer
                </div>
            )}
        </div>
    );
};

export default PreviewPost;
