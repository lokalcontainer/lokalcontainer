import type { CSSProperties } from "react";
import type { PostType } from "types/post";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import NextLink, { LinkProps } from "next/link";

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
    type?: PostType;
    image: {
        url: string;
        width: number;
        height: number;
    };
};

export const PostCard = (props: PostCardProps) => {
    const {
        label,
        link,
        image = {
            url: "/images/avatars/avatar-frown.png",
            width: 128,
            height: 128
        },
        index,
        isActive,
        style,
        author,
        type
    } = props;

    const isPortrait = image.height > image.width;
    const isLandscape = image.width > image.height;
    const isSquare = image.width === image.height;

    const [hover, setHover] = useState(false);
    return (
        <li
            style={{
                userSelect: "none",
                paddingBottom: "calc(var(--grid-gap) / 2)"
            }}
        >
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
                        width: "100%"
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            ...style
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                width: "100%",
                                display: "block",
                                aspectRatio: isPortrait ? "4/5" : isLandscape ? "4/3" : "1/1"
                            }}
                        >
                            <NextImage
                                alt={`image-${label.toLowerCase().trim()}`}
                                src={image.url}
                                width={isSquare ? image.width : undefined}
                                height={isSquare ? image.height : undefined}
                                layout={isSquare ? "responsive" : "fill"}
                                objectFit={isSquare ? undefined : "cover"}
                                objectPosition={isSquare ? undefined : "center"}
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
                                        padding: "var(--grid-gap)",
                                        backdropFilter: "blur(3px)"
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
                        display: "flex",
                        alignItems: "center",
                        gap: "calc(var(--grid-gap) / 2)",
                        userSelect: "none",
                        padding: "calc(var(--grid-gap) / 2) 0"
                    }}
                >
                    <span
                        style={{
                            fontSize: "1em",
                            fontWeight: "bold",
                            color:
                                type === "font"
                                    ? "var(--accents-blue)"
                                    : type === "blog" || type === "article"
                                    ? "var(--accents-magenta)"
                                    : "var(--accents-green)",
                            WebkitTextStroke: 1,
                            WebkitTextStrokeColor: "var(--accents-12)"
                        }}
                    >
                        &#8627;
                    </span>
                    <span
                        style={{
                            border: "1px solid",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "calc(var(--grid-gap) * 2)",
                            paddingInline: "calc(var(--grid-gap) / 1.5)",
                            color: "var(--accents-12)",
                            backgroundColor:
                                type === "font"
                                    ? "var(--accents-blue)"
                                    : type === "blog" || type === "article"
                                    ? "var(--accents-magenta)"
                                    : "var(--accents-green)"
                        }}
                    >
                        <span
                            style={{
                                fontSize: "0.75em",
                                fontWeight: 340,
                                textTransform: "uppercase",
                                display: "inline-block"
                            }}
                        >
                            {type}
                        </span>
                    </span>
                </div>
            )}

            <div style={{ paddingInline: "calc(var(--grid-gap) * 2.25)" }}>
                <div
                    style={{
                        fontSize: "1em",
                        fontWeight: "bold",
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%"
                    }}
                >
                    {label}
                </div>
                {author && (
                    <div style={{ fontWeight: 340, fontSize: "0.75em" }}>
                        <NextLink
                            href={{
                                pathname: "/[user]",
                                query: { user: author.userName }
                            }}
                        >
                            <a>
                                <span>By {author.name}</span>
                            </a>
                        </NextLink>
                    </div>
                )}
            </div>
        </li>
    );
};
