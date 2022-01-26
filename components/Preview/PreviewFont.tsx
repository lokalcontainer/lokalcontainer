import { FontType } from "libs/fonts.dummy";
import { ProviderFont, useFont } from "components/Context/ContextFont";

type PreviewFontProps = {
    font?: FontType;
};

const PreviewFontHeader = () => {
    const { selectedTypeface, typefaces, changeTypeface } = useFont();

    return (
        <header>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontWeight: 300 }}>
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
            </ul>
        </header>
    );
};

const PreviewFontContent = () => {
    const { selectedTypeface } = useFont();
    return <div>{selectedTypeface}</div>;
};

export const PreviewFont = (props: PreviewFontProps) => {
    const { font } = props;

    return (
        <ProviderFont font={font}>
            <PreviewFontHeader />
            <PreviewFontContent />
        </ProviderFont>
    );
};
