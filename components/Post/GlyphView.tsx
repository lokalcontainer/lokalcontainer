import { CSSProperties, useMemo } from "react";
import { Glyph } from "./FontGlyph";
import GlyphSVG from "./GlyphSVG";

type GlyphViewProps = {
    glyphs: Glyph[];
};

const dtStyle: CSSProperties = {
    marginBlock: "calc(var(--grid-gap) / 2)",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "block",
    fontSize: "0.875em"
};

export default function GlyphView(props: GlyphViewProps) {
    const { glyphs } = props;
    const memoizedGlyphs = useMemo(() => glyphs, [glyphs]);
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "flex-start"
            }}
        >
            {memoizedGlyphs.map((item, i) => (
                <li
                    key={i}
                    style={{
                        position: "relative",
                        width: memoizedGlyphs.length > 1 ? "50%" : "100%",
                        aspectRatio: memoizedGlyphs.length > 1 ? "1/1" : "2/1"
                    }}
                >
                    {memoizedGlyphs.length > 1 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "1em",
                                left: "1em"
                            }}
                        >
                            <span>{i === 0 ? "Off" : "On"}</span>
                        </div>
                    )}
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%",
                            marginBottom: "var(--grid-gap)",
                            boxSizing: "content-box",
                            borderRight:
                                memoizedGlyphs.length > 1 && i === 0
                                    ? "1px solid var(--accents-3)"
                                    : "none",
                            color:
                                memoizedGlyphs.length > 1 && i === 0
                                    ? "var(--accents-6)"
                                    : "currentColor"
                        }}
                    >
                        <GlyphSVG
                            viewBox={item.svg.viewBox}
                            path={item.svg.path}
                            baseWidth={item.svg.baseWidth}
                            ascender={item.svg.ascender}
                            capHeight={item.svg.capHeight}
                            xHeight={item.svg.xHeight}
                            baseLine={item.svg.baseLine}
                            descender={item.svg.descender}
                        />
                    </div>

                    <dl
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            alignItems: "flex-start",
                            width: "100%",
                            padding: "1em",
                            paddingBlock: "calc(0.875em + 0px)",
                            margin: 0,
                            borderTop: "1px solid var(--accents-3)"
                        }}
                    >
                        <dt style={{ ...dtStyle, color: "var(--accents-6)" }}>Feature</dt>
                        <dd style={dtStyle}>{item.feature ?? "-"}</dd>
                        <dt style={{ ...dtStyle, color: "var(--accents-6)" }}>ID</dt>
                        <dd style={dtStyle}>{item.id}</dd>
                        <dt style={{ ...dtStyle, color: "var(--accents-6)" }}>Name</dt>
                        <dd style={{ ...dtStyle, textTransform: "capitalize" }}>
                            {item.name.replace(/[.]/g, " ").replace(/uni/g, "")}
                        </dd>
                        <dt style={{ ...dtStyle, color: "var(--accents-6)" }}>Unicode</dt>
                        <dd style={dtStyle}>{item.unicode ?? "-"}</dd>
                        <dt style={{ ...dtStyle, color: "var(--accents-6)" }}>HTML Entity</dt>
                        <dd style={dtStyle}>{item.html ?? "-"}</dd>
                        <dt style={{ ...dtStyle, color: "var(--accents-6)" }}></dt>
                        <dd
                            style={{
                                ...dtStyle,
                                fontSize: "2em",
                                fontFeatureSettings: item.feature ? `"${item.feature}"` : "initial"
                            }}
                        >
                            {item.character ?? "-"}
                        </dd>
                    </dl>
                </li>
            ))}
        </ul>
    );
}
