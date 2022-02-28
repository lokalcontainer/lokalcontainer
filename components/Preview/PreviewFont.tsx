import type { CSSProperties } from "react";
import type { BasePost } from "types/post";

import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { DUMMY_PARAGRAPH } from "libs/util.contants";

type PreviewFontProps = {
    post: BasePost;
    style?: CSSProperties;
};

export default function PreviewFont(props: PreviewFontProps) {
    const { post } = props;
    const { pathname } = useRouter();
    const isPage = pathname === "/[user]/[post]";

    const { images, slug, author, title } = post;
    const image1 = images[0];

    return (
        <div
            style={{
                pointerEvents: "initial",
                overflow: isPage ? "initial" : "hidden",
                height: isPage
                    ? "auto"
                    : "calc(100vh - var(--header-height) - calc(var(--grid-gap) * 3))"
            }}
        >
            <div
                style={{
                    display: isPage ? "block" : "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "calc(var(--grid-gap) * 4)",
                    height: isPage ? "100%" : "calc(100% + 1px - var(--header-height))"
                }}
            >
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        padding: isPage ? 0 : "1em",
                        height: isPage
                            ? "auto"
                            : "calc(100vh - calc(var(--header-height) * 2) - calc(var(--grid-gap) * 3))",
                        backgroundColor: `rgba(${image1.dominant.r}, ${image1.dominant.g}, ${image1.dominant.b}, 100%)`
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: isPage
                                ? "100%"
                                : image1.large.width < image1.large.height
                                ? "60%"
                                : image1.large.width === image1.large.height
                                ? "100%"
                                : "100%"
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                border: isPage ? "none" : "1px solid",
                                // borderRadius: "calc(var(--grid-gap) / 2)",
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
}
