import styles from "styles/preview.module.scss";
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

    const { images, slug, author } = post;
    const image1 = images[0];

    return (
        <div data-modal={!isPage} className={styles.font}>
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
        </div>
    );
}
