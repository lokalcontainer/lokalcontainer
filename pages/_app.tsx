import "styles/global.scss";

import type { AppProps, AppContext } from "next/app";
import type { ResponseSession } from "types/session";

import App from "next/app";
import { ThemeProvider as ProviderTheme } from "next-themes";
import { getServerSession } from "libs/get-server-session";
import { ProviderSession } from "components/Context/ContextSession";
import { Header } from "components/Header";

interface MyAppProps extends AppProps {
    session?: ResponseSession;
}

export default function MyApp(props: MyAppProps) {
    const { Component, pageProps, session } = props;

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
