import { useEditorFont } from "./EditorFontContext";

export default function EditorFontPreview() {
    const { typefaces } = useEditorFont();
    const variables = typefaces.filter((item) => item.variable !== null);
    const romans = typefaces.filter((item) => item.style !== "italic" && item.variable === null);
    const italics = typefaces.filter((item) => item.style === "italic" && item.variable === null);

    return (
        <div>
            <ul style={{ marginBlock: "2em" }}>
                {variables.map((item, i) => (
                    <li key={i}>
                        <ul style={{ fontFamily: `"${item.fullName}", var(--font-sans)` }}>
                            <li>{item.family}</li>
                            <li>{item.fullName}</li>
                            <li>{item.style}</li>
                            <li>{item.weight}</li>
                        </ul>
                    </li>
                ))}
            </ul>
            <ul style={{ marginBlock: "2em" }}>
                {romans.map((item, i) => (
                    <li key={i}>
                        <ul style={{ fontFamily: `"${item.fullName}", var(--font-sans)` }}>
                            <li>{item.family}</li>
                            <li>{item.fullName}</li>
                            <li>{item.style}</li>
                            <li>{item.weight}</li>
                        </ul>
                    </li>
                ))}
            </ul>
            <ul style={{ marginBlock: "2em" }}>
                {italics.map((item, i) => (
                    <li key={i}>
                        <ul style={{ fontFamily: `"${item.fullName}", var(--font-sans)` }}>
                            <li>{item.family}</li>
                            <li>{item.fullName}</li>
                            <li>{item.style}</li>
                            <li>{item.weight}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
