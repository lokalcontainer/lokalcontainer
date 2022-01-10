import "styles/global.scss";

import { AppProps } from "next/app";
import { ThemeProvider as ProviderTheme } from "next-themes";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <ProviderTheme
                disableTransitionOnChange
                defaultTheme="system"
                themes={["dark", "light"]}
            >
                <Header />
                <Component {...pageProps} />
                <Footer />
            </ProviderTheme>
        </>
    );
}
