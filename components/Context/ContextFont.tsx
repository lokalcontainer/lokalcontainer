import { createContext, FC, useContext, useEffect, useState } from "react";
import { fonts, FontType, typefaces, TypefaceType } from "libs/fonts.dummy";

type ContextFontProps = {
    selectedTypeface: string;
    changeTypeface: (_e: string) => void;
    typefaces: TypefaceType[];
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
    const filteredTypefaces = font?.typefacesID?.map(
        (parent) => typefaces.find((item) => item.id === parent)!
    )!;
    const [selectedTypeface, setSelectedTypeface] = useState(filteredTypefaces[0]?.fullName);

    const changeTypeface = (fullName: string) => setSelectedTypeface(fullName);

    useEffect(() => {
        changeTypeface(filteredTypefaces[0].fullName);
    }, [font, filteredTypefaces]);

    return (
        <ContextFont.Provider
            value={{
                selectedTypeface,
                changeTypeface,
                typefaces: filteredTypefaces,
                font: font ?? fonts[0]
            }}
        >
            {children}
        </ContextFont.Provider>
    );
};
