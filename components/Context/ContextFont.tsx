import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { fonts, FontType } from "libs/fonts.dummy";

type ContextFontProps = {
    slug: string;
    font: FontType;
};

type ProviderFontProps = PropsWithChildren<{
    font?: FontType;
    slug: string;
}>;

const ContextFont = createContext<ContextFontProps>(undefined!);
export const useFont = () => useContext(ContextFont);

export const ConsumerFont = ContextFont.Consumer;

export default function ProviderFont(props: ProviderFontProps) {
    const { children, font, slug } = props;
    return (
        <ContextFont.Provider
            value={{
                slug: slug,
                font: font ?? fonts[0]
            }}
        >
            {children}
        </ContextFont.Provider>
    );
}
