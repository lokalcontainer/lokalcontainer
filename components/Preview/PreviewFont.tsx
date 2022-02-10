import type { CSSProperties } from "react";
import type { FontType } from "libs/fonts.dummy";

import NextLink from "next/link";
import { ProviderFont, useFont } from "components/Context/ContextFont";

type PreviewFontProps = {
    font?: FontType;
    style?: CSSProperties;
};

const PreviewFontHeader = () => {
    const { selectedTypeface, typefaces, changeTypeface, font } = useFont();

    return (
        <header>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 calc(var(--grid-gap) * 8) 0 0",
                    fontWeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <li>
                    <select
                        value={selectedTypeface}
                        onChange={(e) => changeTypeface(e.target.value)}
                        style={{
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            fontWeight: "inherit",
                            height: "calc(var(--grid-gap) * 3)",
                            border: "1px solid",
                            borderRadius: "calc(var(--grid-gap) / 3)",
                            backgroundColor: "var(--accents-1)",
                            color: "var(--accents-12)",
                            padding: "0 calc(var(--grid-gap) / 2)"
                        }}
                    >
                        {typefaces.map((item, i) => (
                            <option key={i} value={item.fullName}>
                                {item.fullName}
                            </option>
                        ))}
                    </select>
                </li>
                <li>
                    <NextLink href="/[user]" as={`/${font.info.designerSlug}`}>
                        <a>
                            <span>By {font.info.designer}</span>
                        </a>
                    </NextLink>
                </li>
            </ul>
        </header>
    );
};

const PreviewFontContent = () => {
    const { selectedTypeface } = useFont();
    return <div>{selectedTypeface}</div>;
};

export const PreviewFont = (props: PreviewFontProps) => {
    const { font, style } = props;

    return (
        <ProviderFont font={font}>
            <div style={{ ...style }}>
                <PreviewFontHeader />
                <PreviewFontContent />
            </div>
        </ProviderFont>
    );
};

export default PreviewFont;
