import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { BaseResponse } from "types/response";
import type { FontType } from "libs/fonts.dummy";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import NextDynamic from "next/dynamic";

// import rgbDataURL from "libs/lib.blur-url";
import fetchJson from "libs/lib.fetch";
import MasonryNew from "components/Masonry";
import { LayoutMain } from "components/LayoutMain";
import { PostCard } from "components/Utils/PostCard";

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

    const [isActive, setIsActive] = useState(
        () => query.lightBox?.includes("true") && query.slug?.includes(item.slug)
    );

    useEffect(() => {
        if (!query.lightBox) return;
        setIsActive(() => query.lightBox?.includes("true") && query.slug?.includes(item.slug));
        return () => setIsActive(false);
    }, [query, item.slug]);

    return (
        <>
            <PostCard
                index={index}
                label={`${item.subFamily ? item.subFamily : item.family} / ${
                    item.typefacesID.length
                } style(s)`}
                isActive={isActive}
                link={{
                    href: {
                        pathname: "/",
                        query: { lightBox: true, slug: item.slug, index }
                    },
                    as: `/typeface/${item.slug}`,
                    scroll: false,
                    shallow: true,
                    passHref: true
                }}
                image={{
                    url: item.meta.heroImage.url,
                    width: item.meta.heroImage.width,
                    height: item.meta.heroImage.height
                }}
                style={{
                    backgroundColor: `rgb(${item.meta.heroImage.colors[0]}, ${item.meta.heroImage.colors[1]}, ${item.meta.heroImage.colors[2]})`
                }}
            />
        </>
    );
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { query, push } = useRouter();
    const serverFonts = props.fonts.data;
    const newFonts = serverFonts.concat(serverFonts, serverFonts, serverFonts, serverFonts);
    // const newFonts = serverFonts;
    const fonts = useMemo(() => newFonts, [newFonts]);

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
                        2200: 7,
                        1920: 6,
                        1680: 5,
                        1440: 4,
                        1280: 3,
                        960: 2
                    }}
                >
                    {fonts.map((item, i) => (
                        <FontCard key={i} index={i} item={item} />
                    ))}
                </MasonryNew>
            </LayoutMain>

            <LightBox
                title={`${
                    selectedFont?.subFamily ? selectedFont.subFamily : selectedFont?.family
                } by ${selectedFont?.info.designer}`}
                onRequestClose={() => push("/", "/", { shallow: true, scroll: false })}
            >
                <PreviewFont font={selectedFont} />
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
