import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { fonts, FontType } from "libs/fonts.dummy";

type ContextFontProps = {
    slug: string;
    font: FontType;
    isModal: boolean;
};

type ProviderFontProps = PropsWithChildren<{
    font?: FontType;
    slug: string;
    isModal: boolean;
}>;

const ContextFont = createContext<ContextFontProps>(undefined!);
export const useFont = () => useContext(ContextFont);

export const ConsumerFont = ContextFont.Consumer;

export default function ProviderFont(props: ProviderFontProps) {
    const { children, font, slug, isModal } = props;
    return (
        <ContextFont.Provider
            value={{
                slug: slug,
                font: font ?? fonts[0],
                isModal
            }}
        >
            {children}
        </ContextFont.Provider>
    );
}
