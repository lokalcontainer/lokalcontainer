import type { CSSProperties } from "react";
import type { BasePost } from "types/post";

import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";

type PreviewPostProps = {
    post?: BasePost;
    style?: CSSProperties;
};

const dummyParagraph = `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`;

export const PreviewPost = (props: PreviewPostProps) => {
    const { post } = props;
    const { pathname } = useRouter();
    if (!post) return <div>Loading...</div>;

    const { images, slug, author, title } = post;
    const image1 = images[0];

    const isPage = pathname === "/[user]/[post]";

    const isFont = post.type === "font";
    const isBlog = post.type === "blog" || post.type === "article";
    // const isGood = post.type === "goods";

    return (
        <div
            style={{
                overflow: isPage || !isFont ? "initial" : "hidden",
                height:
                    isPage || !isFont
                        ? "auto"
                        : "calc(100vh - var(--header-height) - calc(var(--grid-gap) * 3))"
            }}
        >
            <div
                style={{
                    display: isPage || !isFont ? "block" : "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "calc(var(--grid-gap) * 4)",
                    height: isPage || !isFont ? "auto" : "calc(100% + 1px - var(--header-height))"
                }}
            >
                {isFont && (
                    <>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "1em",
                                overflow: "hidden",
                                height: "calc(100vh - calc(var(--header-height) * 2) - calc(var(--grid-gap) * 3))",
                                backgroundColor: `rgba(${image1.dominant.r}, ${image1.dominant.g}, ${image1.dominant.b}, 100%)`
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width:
                                        image1.large.width < image1.large.height
                                            ? "40%"
                                            : image1.large.width === image1.large.height
                                            ? "50%"
                                            : "66.66%"
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        border: "1px solid",
                                        borderRadius: "calc(var(--grid-gap) / 2)",
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
                                RISET &amp; DATA 4 Kita &amp; Tipografi / Industri—Masal, ID
                                17-08-1945
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
                                        {dummyParagraph}
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {isBlog && (
                    <article style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>
                        <h1>{title}</h1>
                        <figure>
                            <NextImage
                                src={image1.large.url}
                                width={image1.large.width}
                                height={image1.large.height}
                                layout="responsive"
                                priority
                            />
                            <figcaption>{title}</figcaption>
                        </figure>
                        <p
                            style={{
                                // textAlign: "justify",
                                hyphens: "auto",
                                lineHeight: 1.5,
                                textIndent: "calc(var(--grid-gap) * 4)",
                                fontSize: "1.2em"
                            }}
                        >
                            {dummyParagraph}
                        </p>
                    </article>
                )}
            </div>

            {!isPage && !isBlog && (
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
