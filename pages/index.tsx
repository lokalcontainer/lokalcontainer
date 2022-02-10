import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { BaseResponse } from "types/response";
import type { FontType } from "libs/fonts.dummy";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import NextDynamic from "next/dynamic";
import NextLink from "next/link";
import NextImage from "next/image";

import rgbDataURL from "libs/lib.blur-url";
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
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <NextImage
                            alt={`image-${item.slug}`}
                            src={item.meta.heroImage.url}
                            width={item.meta.heroImage.width}
                            height={item.meta.heroImage.height}
                            layout="responsive"
                            // priority={index < 12}
                            placeholder="blur"
                            blurDataURL={rgbDataURL(200, 200, 200)}
                        />

                        <AnimatePresence>
                            {(hover || isActive) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { type: "just" } }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundColor: "var(--accents-12)",
                                        padding: "var(--grid-gap)",
                                        color: "var(--accents-1)"
                                    }}
                                >
                                    <div style={{ fontSize: "2em" }}>{index + 1}</div>
                                    <div>{item.family}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
    // const newFonts = serverFonts;

    const [selectedFont, setSelectedFont] = useState<FontType | undefined>(undefined);

    useEffect(() => {
        const willBePreview = serverFonts.find((item) => item.slug === query.slug);
        setSelectedFont(willBePreview);
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

export const getServerSideProps: GetServerSideProps<ServerData> = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fonts = await fetchJson<ResponseFonts>(`${API_URL}/v1/fonts`);
    return { props: { fonts } };
};
