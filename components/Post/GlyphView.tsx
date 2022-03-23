import { CSSProperties, useMemo } from "react";
import { Glyph } from "./FontGlyph";
import GlyphSVG from "./GlyphSVG";

type GlyphViewProps = {
    glyphs: Glyph[];
};

const dtStyle: CSSProperties = {
    marginBlock: "0.25em",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "block"
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
                        width: glyphs.length > 1 ? "50%" : "100%",
                        aspectRatio: glyphs.length > 1 ? "1/1" : "2/1"
                    }}
                >
                    {glyphs && glyphs.length > 1 && (
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
                            borderBottom: "1px solid var(--accents-3)",
                            borderRight:
                                glyphs.length > 1 && i === 0 ? "1px solid var(--accents-3)" : "none"
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
                            // style={{
                            //     transform: "scale(1.3)"
                            // }}
                        />
                    </div>

                    <dl
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            width: "100%",
                            padding: "1em",
                            paddingBlock: "calc(0.875em + 1px)",
                            margin: 0
                        }}
                    >
                        <dt style={dtStyle}>ID</dt>
                        <dd style={dtStyle}>{item.id}</dd>
                        <dt style={dtStyle}>Name</dt>
                        <dd style={dtStyle}>{item.name}</dd>
                        <dt style={dtStyle}>Unicode</dt>
                        <dd style={dtStyle}>{item.unicode}</dd>
                        <dt style={dtStyle}>HTML Entity</dt>
                        <dd style={dtStyle}>{item.html}</dd>
                    </dl>
                </li>
            ))}
        </ul>
    );
}
