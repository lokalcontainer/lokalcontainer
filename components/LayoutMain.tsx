import type { FC, CSSProperties } from "react";
import { useRouter } from "next/router";
import NextHead from "next/head";

import { SITE_DATA } from "libs/site-data.constants";

type LayoutMainProps = {
    style?: CSSProperties;
};

export const LayoutMain: FC<LayoutMainProps> = (props) => {
    const { children, style } = props;
    const { asPath } = useRouter();
    const NEW_URL = `${SITE_DATA.url}${asPath}`;

    return (
        <>
            <NextHead>
                <title>{SITE_DATA.title}</title>
                <meta name="title" content={SITE_DATA.title} />
                <meta name="description" content={SITE_DATA.description} />

                <meta property="og:type" content={SITE_DATA.type} />
                <meta property="og:url" content={NEW_URL} />
                <meta property="og:title" content={SITE_DATA.title} />
                <meta property="og:description" content={SITE_DATA.description} />
                <meta property="og:image" content={SITE_DATA.image} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={NEW_URL} />
                <meta property="twitter:title" content={SITE_DATA.title} />
                <meta property="twitter:description" content={SITE_DATA.description} />
                <meta property="twitter:image" content={SITE_DATA.image} />
            </NextHead>
            <main
                style={{
                    position: "relative",
                    minHeight:
                        "calc(calc(100vh - var(--footer-height)) - calc(var(--grid-gap) * 5))",
                    padding:
                        "calc(var(--grid-gap) * 0) calc(var(--grid-gap) * 2) 0 calc(var(--grid-gap) * 2)",
                    marginBottom: "var(--footer-height)",
                    backgroundColor: "var(--accents-1)",
                    zIndex: 10,
                    // boxShadow: "0 0 1em -0.5em rgba(0, 0, 0, 1)",
                    ...style
                }}
            >
                {children}
            </main>
        </>
    );
};
