import "styles/global.scss";

import type { AppProps } from "next/app";
import type { ResponseSession } from "types/session";

import { ThemeProvider as ProviderTheme } from "next-themes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import nProgress from "nprogress";
import { ProviderSession } from "components/Context/ContextSession";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import Logo from "components/Logo";

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

export default function MyApp(props: MyAppProps) {
    const { Component, pageProps } = props;
    const { events } = useRouter();

    useEffect(() => {
        const handleStart = () => nProgress.start();
        const handleStop = () => nProgress.done();

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
            <ProviderSession>
                <ProviderTheme
                    disableTransitionOnChange
                    defaultTheme="system"
                    themes={["dark", "light"]}
                >
                    <div
                        style={{
                            width: "4em",
                            aspectRatio: "1/1",
                            position: "fixed",
                            right: "2em",
                            bottom: "2em",
                            zIndex: 2000,
                            color: "#fff",
                            mixBlendMode: "exclusion",
                            pointerEvents: "none",
                            touchAction: "none",
                            borderRadius: "100%"
                        }}
                    >
                        <Logo />
                    </div>
                    <Header />
                    <Component {...pageProps} />
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
                                color: "var(--accents-1)"
                            }
                        }}
                    />
                </ProviderTheme>
            </ProviderSession>
        </>
    );
}
