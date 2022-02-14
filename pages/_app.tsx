import "styles/global.scss";

import type { AppProps, AppContext } from "next/app";
import type { ResponseSession } from "types/session";

import App from "next/app";
import { ThemeProvider as ProviderTheme } from "next-themes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { getServerSession } from "libs/get-server-session";
import { ProviderSession } from "components/Context/ContextSession";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

interface MyAppProps extends AppProps {
    session?: ResponseSession;
}

nProgress.configure({ showSpinner: false });

export default function MyApp(props: MyAppProps) {
    const { Component, pageProps, session } = props;
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
            <ProviderSession session={session}>
                <ProviderTheme
                    disableTransitionOnChange
                    defaultTheme="system"
                    themes={["dark", "light"]}
                >
                    <Header />
                    <Component {...pageProps} session={session} />
                    <Footer />
                </ProviderTheme>
            </ProviderSession>
        </>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const responseSession = await getServerSession(appContext.ctx);

    return { ...appProps, session: responseSession };
};
