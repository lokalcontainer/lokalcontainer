import { useEditorFont } from "./EditorFontContext";
import { Typeface } from "./typetools";

type GroupListProps = {
    title: string;
    typefaces: Typeface[];
};

const GroupList = ({ title, typefaces }: GroupListProps) => {
    return typefaces.length !== 0 ? (
        <div style={{ marginBlock: "2em" }}>
            <div
                style={{
                    height: "var(--header-height)",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "var(--grid-gap)"
                }}
            >
                <span style={{ fontSize: "2em" }}>{title}</span>
            </div>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--grid-gap)"
                }}
            >
                {typefaces.map((item, i) => (
                    <li
                        key={i}
                        style={{
                            // border: "1px solid",
                            // width: "calc(16.66% - var(--grid-gap))",
                            // width: "minmax(280px, 50%)",
                            // aspectRatio: "4/5",
                            borderRadius: "var(--grid-gap)",
                            boxShadow:
                                "0 0 0.5em -0.2em var(--accents-6), inset 0 0 2px 0 var(--accents-6)",
                            overflow: "hidden"
                        }}
                    >
                        <ul
                            style={{
                                fontFamily: `"${item.fullName}", var(--font-sans)`,
                                listStyle: "none",
                                padding: "1em",
                                margin: 0
                            }}
                        >
                            <li>{item.family}</li>
                            <li style={{ fontSize: "1.5em" }}>{item.fullName}</li>
                            <li>{item.style}</li>
                            <li>{item.weight}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <></>
    );
};

export default function EditorFontPreview() {
    const { typefaces, handleSubmit } = useEditorFont();
    const variables = typefaces.filter((item) => item.variable !== null);
    const romans = typefaces.filter((item) => item.style !== "italic" && item.variable === null);
    const italics = typefaces.filter((item) => item.style === "italic" && item.variable === null);

    return (
        <div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <GroupList title="Variable" typefaces={variables} />
            <GroupList title="Roman" typefaces={romans} />
            <GroupList title="Italic" typefaces={italics} />
        </div>
    );
}
