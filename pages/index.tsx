import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { BaseResponse } from "types/response";
import type { FontType } from "libs/fonts.dummy";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import NextDynamic from "next/dynamic";
import NextLink from "next/link";
import NextImage from "next/image";

// import rgbDataURL from "libs/lib.blur-url";
import fetchJson from "libs/lib.fetch";
import MasonryNew from "components/Masonry";
import { LayoutMain } from "components/LayoutMain";

const LightBox = NextDynamic(() => import("components/LightBox"), { ssr: false });
const PreviewFont = NextDynamic(() => import("components/Preview/PreviewFont"), { ssr: false });

type ResponseFonts = BaseResponse & {
    data: FontType[];
};

type ServerData = {
    fonts: ResponseFonts;
};

type FontCardProps = {
    index: number;
    item: FontType;
};

// const toBase64 = (str: string) =>
//     typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

// const convertImage = (w: number, h: number) => `
//   <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//     <defs>
//       <linearGradient id="g">
//         <stop stop-color="#333" offset="20%" />
//         <stop stop-color="#222" offset="50%" />
//         <stop stop-color="#333" offset="70%" />
//       </linearGradient>
//     </defs>
//     <rect width="${w}" height="${h}" fill="#333" />
//     <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//     <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
//   </svg>`;

const FontCard = (props: FontCardProps) => {
    const { item, index } = props;
    const { query } = useRouter();

    const [hover, setHover] = useState(false);
    const [isActive, setIsActive] = useState(
        () => query.lightBox?.includes("true") && query.slug?.includes(item.slug)
    );

    useEffect(() => {
        if (!query.lightBox) return;
        setIsActive(() => query.lightBox?.includes("true") && query.slug?.includes(item.slug));
        return () => setIsActive(false);
    }, [query, item.slug]);

    return (
        <li>
            <NextLink
                href={{ pathname: "/", query: { lightBox: true, slug: item.slug, index } }}
                as={`/typeface/${item.slug}`}
                scroll={false}
                shallow={true}
                passHref
            >
                <motion.a
                    aria-label={item.family}
                    title={item.family}
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    // whileHover={{
                    //     boxShadow: "0 0 0.25em 0 var(--accents-12)",
                    //     transition: { type: "just" }
                    // }}
                    style={{
                        position: "relative",
                        display: "block",
                        overflow: "hidden",
                        boxShadow: "0 0 0em 0 var(--accents-12)"
                        // borderBottom: "1px solid"
                        // backgroundColor: `rgb(${item.meta.heroImage.colors[0]}, ${item.meta.heroImage.colors[1]}, ${item.meta.heroImage.colors[2]})`
                        // backgroundImage: `url(${rgbDataURL(
                        //     item.meta.heroImage.colors[0],
                        //     item.meta.heroImage.colors[1],
                        //     item.meta.heroImage.colors[2]
                        // )})`
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            // padding: "calc(var(--grid-gap) / 1)",
                            width: "100%",
                            height: "100%",
                            backgroundColor: `rgb(${item.meta.heroImage.colors[0]}, ${item.meta.heroImage.colors[1]}, ${item.meta.heroImage.colors[2]})`
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
                                alt={`image-${item.slug}`}
                                src={item.meta.heroImage.url}
                                width={item.meta.heroImage.width}
                                height={item.meta.heroImage.height}
                                layout="responsive"
                                quality={100}
                                // priority
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

                    <div
                        style={{
                            margin: "calc(var(--grid-gap) / 2) 0 calc(var(--grid-gap) * 3) 0"
                        }}
                    >
                        <span
                            style={{
                                fontSize: "0.75em",
                                fontFeatureSettings: `"case"`,
                                textTransform: "uppercase",
                                fontWeight: 300
                                // textDecoration: hover ? "underline" : "none",
                            }}
                        >
                            {item.subFamily ? item.subFamily : item.family} /{" "}
                            {item.typefacesID.length} style(s)
                        </span>
                    </div>
                </motion.a>
            </NextLink>
        </li>
    );
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { query } = useRouter();
    const serverFonts = props.fonts.data;
    const newFonts = serverFonts.concat(serverFonts, serverFonts, serverFonts, serverFonts);

    const [selectedFont, setSelectedFont] = useState<FontType | undefined>(undefined);

    useEffect(() => {
        setSelectedFont(() => serverFonts.find((item) => item.slug === query.slug));
    }, [query, serverFonts]);

    return (
        <>
            <LayoutMain>
                <MasonryNew
                    breakpointCols={{
                        default: 8,
                        1920: 7,
                        1600: 5,
                        1366: 4,
                        960: 3,
                        720: 2,
                        500: 1
                    }}
                >
                    {newFonts.map((item, i) => (
                        <FontCard key={i} index={i} item={item} />
                    ))}
                </MasonryNew>
            </LayoutMain>

            <LightBox>
                <PreviewFont font={selectedFont} style={{ minHeight: "200vh" }} />
            </LightBox>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<ServerData> = async (ctx) => {
    const { req } = ctx;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;
    const fonts = await fetchJson<ResponseFonts>(`${host}/v1/fonts`);
    return { props: { fonts } };
};
