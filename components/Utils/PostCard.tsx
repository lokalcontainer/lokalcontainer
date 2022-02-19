import NextImage from "next/image";
import NextLink, { LinkProps } from "next/link";
import { CSSProperties, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PostCardProps = {
    index: number;
    label: string;
    link: LinkProps;
    author?: {
        name: string;
        userName: string;
    };
    style?: CSSProperties;
    isActive?: boolean;
    type?: "font" | "blog" | "article" | "goods";
    image?: {
        url: string;
        width: number;
        height: number;
    };
};

export const PostCard = (props: PostCardProps) => {
    const { label, link, image, index, isActive, style, author, type } = props;

    const [hover, setHover] = useState(false);
    return (
        <li style={{ marginBottom: "calc(var(--grid-gap) * 4)", userSelect: "none" }}>
            <NextLink {...link}>
                <a
                    title={label}
                    aria-label={label}
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                        position: "relative",
                        display: "block",
                        overflow: "hidden",
                        boxShadow: "0 0 0em 0 var(--accents-12)",
                        width: "100%"
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%",
                            ...style
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%",
                                display: "block"
                            }}
                        >
                            <NextImage
                                alt={`image-${label.toLowerCase().trim()}`}
                                src={image ? image.url : "/images/avatars/avatar-frown.png"}
                                width={image ? image.width : 128}
                                height={image ? image.height : 128}
                                layout="responsive"
                                quality={100}
                                loading="lazy"
                                // priority={index <= 16}
                                // placeholder="blur"
                                // blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                //     convertImage(item.meta.heroImage.width, item.meta.heroImage.height)
                                // )}`}
                                // blurDataURL={rgbDataURL(
                                //     item.meta.heroImage.colors[0],
                                //     item.meta.heroImage.colors[1],
                                //     item.meta.heroImage.colors[2]
                                // )}
                            />
                        </div>

                        <AnimatePresence>
                            {(hover || isActive) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { type: "just" } }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundColor: "var(--alpha-2)",
                                        padding: "var(--grid-gap)"
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "6em",
                                            lineHeight: 0.8
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </a>
            </NextLink>

            {type && (
                <div
                    style={{
                        textTransform: "capitalize",
                        // marginBlock: "calc(var(--grid-gap) / 4)",
                        display: "flex",
                        alignItems: "center",
                        gap: "calc(var(--grid-gap) / 2)",
                        fontWeight: 600,
                        userSelect: "none",
                        paddingBlock: "calc(var(--grid-gap) / 2)"
                        // backgroundColor: "var(--accents-3)"
                    }}
                >
                    <span
                        style={{
                            color:
                                type === "font"
                                    ? "turquoise"
                                    : type === "blog" || type === "article"
                                    ? "magenta"
                                    : "red"
                        }}
                    >
                        &#8627;
                    </span>
                    <span
                        style={{
                            fontSize: "0.65em",
                            border: "1px solid",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "calc(var(--grid-gap) * 2)",
                            paddingInline: "var(--grid-gap)",
                            paddingBlock: "calc(var(--grid-gap) / 2.5)",
                            color: "var(--accents-1)",
                            backgroundColor:
                                type === "font"
                                    ? "turquoise"
                                    : type === "blog" || type === "article"
                                    ? "magenta"
                                    : "red"
                        }}
                    >
                        {type}
                    </span>
                </div>
            )}

            <div
                style={{
                    // marginTop: "var(--grid-gap)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginInline: "calc(var(--grid-gap) * 2.25)"
                }}
            >
                <span
                    style={{
                        fontSize: "1em",
                        fontFeatureSettings: `"case"`,
                        textTransform: "uppercase",
                        fontWeight: 500,
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%"
                    }}
                >
                    {label}
                </span>
            </div>

            {author && (
                <div
                    style={{
                        color: "var(--accents-5)",
                        fontWeight: 600,
                        fontSize: "0.65em",
                        marginBottom: "var(--grid-gap)",
                        marginInline: "calc(var(--grid-gap) * 3.5)"
                    }}
                >
                    <span>By</span>{" "}
                    <NextLink
                        href={{
                            pathname: "/[user]",
                            query: { user: author.userName }
                        }}
                    >
                        <a>
                            <span style={{ color: "var(--accents-5)" }}>{author.name}</span>
                        </a>
                    </NextLink>
                </div>
            )}
        </li>
    );
};
