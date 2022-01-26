import { createContext, FC, useContext, useEffect, useState } from "react";
import { fonts, FontType } from "libs/fonts.dummy";

type ContextFontProps = {
    selectedTypeface: string;
    changeTypeface: (_e: string) => void;
    typefaces: {
        fullName: string;
    }[];
    font: FontType;
};

type ProviderFontProps = {
    font?: FontType;
};

const ContextFont = createContext<ContextFontProps>(undefined!);
export const useFont = () => useContext(ContextFont);

export const ConsumerFont = ContextFont.Consumer;

export const ProviderFont: FC<ProviderFontProps> = (props) => {
    const { children, font } = props;
    const typefaces = font?.typefaces ?? fonts[0].typefaces;
    const [selectedTypeface, setSelectedTypeface] = useState(typefaces[0].fullName);

    const changeTypeface = (fullName: string) => setSelectedTypeface(fullName);

    useEffect(() => {
        changeTypeface(font?.typefaces[0].fullName ?? fonts[0].typefaces[0].fullName);
    }, [font]);

    return (
        <ContextFont.Provider
            value={{ selectedTypeface, changeTypeface, typefaces, font: font ?? fonts[0] }}
        >
            {children}
        </ContextFont.Provider>
    );
};
