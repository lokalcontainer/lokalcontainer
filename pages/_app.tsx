import "styles/global.scss";

import type { AppProps } from "next/app";
import type { ResponseSession } from "types/session";

import { ThemeProvider as ProviderTheme } from "next-themes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { Toaster } from "react-hot-toast";
import NextScript from "next/script";
// import NextDynamic from "next/dynamic";
import nProgress from "nprogress";
import { SITE_DATA } from "libs/site-data.constants";
import ProviderSession from "components/Context/ContextSession";
import Header from "components/Header";
import Footer from "components/Footer";

interface MyAppProps extends AppProps {
    session?: ResponseSession;
}

nProgress.configure({
    showSpinner: true,
    easing: "ease-in",
    speed: 250,
    minimum: 0.01,
    trickleSpeed: 80
});

// const Logo = NextDynamic(() => import("components/Logo"), {
//     ssr: false,
//     loading: () => (
//         <div
//             style={{
//                 width: "6em",
//                 aspectRatio: "1/1",
//                 position: "fixed",
//                 left: "50%",
//                 bottom: "var(--footer-height)",
//                 transform: "translateX(-50%)",
//                 zIndex: 2002,
//                 mixBlendMode: "difference",
//                 color: "#fff",
//                 pointerEvents: "none",
//                 touchAction: "none",
//                 userSelect: "none",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 filter: "drop-shadow(0 0 calc(var(--grid-gap) / 2) currentColor)"
//             }}
//         >
//             Loading...
//         </div>
//     )
// });

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
function pageView(url: string) {
    // @ts-ignore
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url
    });
}

export default function MyApp(props: MyAppProps) {
    const { Component, pageProps, router } = props;
    const { events } = useRouter();

    useEffect(() => {
        const handleStart = () => nProgress.start();
        const handleStop = (url: string) => {
            nProgress.done();
            IS_PRODUCTION && pageView(url);
        };

        events.on("routeChangeStart", handleStart);
        events.on("routeChangeComplete", handleStop);
        events.on("routeChangeError", handleStop);

        return () => {
            events.off("routeChangeStart", handleStart);
            events.off("routeChangeComplete", handleStop);
            events.off("routeChangeError", handleStop);
        };
    }, [events]);

    return (
        <>
            {IS_PRODUCTION && (
                <>
                    <NextScript
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <NextScript
                        id="gtag-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${GA_TRACKING_ID}', {
                          page_path: window.location.pathname,
                        });
                    `
                        }}
                    />
                </>
            )}

            <DefaultSeo
                defaultTitle={SITE_DATA.title}
                description={SITE_DATA.description}
                canonical={SITE_DATA.url}
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: SITE_DATA.url,
                    site_name: SITE_DATA.name,
                    description: SITE_DATA.description,
                    images: [
                        { url: SITE_DATA.image, width: 800, height: 450, alt: "L - C OG Image" }
                    ]
                }}
                twitter={{
                    handle: "@lokalcontainer",
                    site: "@lokalcontainer",
                    cardType: "summary_large_image"
                }}
            />
            <ProviderSession>
                <ProviderTheme
                    enableSystem
                    disableTransitionOnChange
                    defaultTheme="system"
                    themes={["dark", "light"]}
                >
                    {/* <Logo /> */}
                    <Header />
                    <main id="__main">
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                    <Toaster
                        position="top-center"
                        gutter={4}
                        containerStyle={{
                            top: "2.5em",
                            right: "1em",
                            bottom: "1em",
                            left: "1em"
                        }}
                        toastOptions={{
                            style: {
                                zIndex: 2002,
                                padding: "calc(var(--grid-gap) * 0.75) calc(var(--grid-gap) * 1)",
                                borderRadius: "calc(var(--grid-gap) / 1.5)",
                                boxShadow:
                                    "0 0 1em 0 var(--accents-4), inset 0 0 0.2em 0 var(--accents-6)",
                                fontSize: "0.85em",
                                fontFamily: "inherit",
                                backgroundColor: "var(--accents-4)",
                                color: "var(--accents-12)"
                            }
                        }}
                    />
                </ProviderTheme>
            </ProviderSession>
        </>
    );
}
