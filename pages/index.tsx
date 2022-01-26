import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import NextImage from "next/image";

import { fonts, FontType } from "libs/fonts.dummy";
import rgbDataURL from "libs/lib.blur-url";
// import useLightBox from "hooks/use-light-box";
import { LayoutMain } from "components/LayoutMain";
import { Masonry } from "components/Masonry";
import { LightBox } from "components/LightBox";
import { PreviewFont } from "components/Preview/PreviewFont";

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
    }, [query]);

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
                    whileHover={{
                        boxShadow: "0 0 0.25em 0 var(--accents-12)",
                        transition: { type: "just" }
                    }}
                    style={{
                        position: "relative",
                        display: "block",
                        overflow: "hidden",
                        // border: "1px solid var(--accents-4)",
                        boxShadow: "0 0 0em 0 var(--accents-12)",
                        borderRadius: "calc(var(--grid-gap) / 3)"
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
                            priority
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
                                        padding: "var(--grid-gap)"
                                    }}
                                >
                                    <div style={{ color: "var(--accents-1)" }}>{item.family}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.a>
            </NextLink>
        </li>
    );
};

const CustomLightBox = () => {
    const { query } = useRouter();

    const [newFontObject, setNewFontObject] = useState<FontType | undefined>(() =>
        fonts.find((item) => item.slug === query.slug)
    );

    useEffect(() => {
        setNewFontObject(() => fonts.find((item) => item.slug === query.slug));
    }, [query]);

    return (
        <LightBox>
            <PreviewFont font={newFontObject} />
        </LightBox>
    );
};

export default function Page() {
    const newFonts = fonts;
    // const { lightBox } = useLightBox();
    return (
        <>
            <LayoutMain>
                <motion.div
                // animate={{
                //     width: lightBox ? "50%" : "100%",
                //     transition: { type: "just" }
                // }}
                >
                    <Masonry
                        breakpointCols={{
                            default: 7,
                            1920: 6,
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
                    </Masonry>
                </motion.div>

                <div style={{ minHeight: "150vh" }}></div>
            </LayoutMain>
            <CustomLightBox />
        </>
    );
}
