import type { FC, CSSProperties } from "react";
import { useRouter } from "next/router";
import NextHead from "next/head";

import { SITE_DATA } from "libs/site-data.constants";

type LayoutMainProps = {
    style?: CSSProperties;
    title?: string;
    description?: string;
    image?: string;
};

export const LayoutMain: FC<LayoutMainProps> = (props) => {
    const {
        children,
        style,
        title = SITE_DATA.title,
        description = SITE_DATA.description,
        image = SITE_DATA.image
    } = props;
    const { asPath } = useRouter();
    const NEW_URL = `${SITE_DATA.url}${asPath}`;

    return (
        <>
            <NextHead>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                <meta property="og:type" content={SITE_DATA.type} />
                <meta property="og:url" content={NEW_URL} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={NEW_URL} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content={image} />
            </NextHead>
            <main
                style={{
                    position: "relative",
                    minHeight: "calc(100vh - var(--header-height))",
                    paddingInline: "calc(var(--grid-gap) * 2)",
                    paddingBottom: "calc(var(--grid-gap) * 2)",
                    backgroundColor: "var(--accents-1)",
                    zIndex: 10,
                    ...style
                }}
            >
                {children}
            </main>
        </>
    );
};
