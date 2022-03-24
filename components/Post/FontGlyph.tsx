import { useMemo, useState } from "react";
import BDOGroteskGlyphs from "libs/BDO-Grotesk/bdo-grotesk-variable/glyphs.json";
import BDOGroteskFeatures from "libs/BDO-Grotesk/bdo-grotesk-variable/features.json";
import { useFont } from "components/Context/ContextFont";
import GlyphThumb from "./GlyphThumb";
import GlyphView from "./GlyphView";

type BaseGlyph = typeof BDOGroteskGlyphs[0];
export type Glyph = BaseGlyph & {
    feature?: string;
};

const isProducton = process.env.NODE_ENV === "production";

export default function FontGlyph() {
    const { isModal } = useFont();
    const memoizedGlyphs = useMemo(() => BDOGroteskGlyphs, []);
    const memoizedFeatures = useMemo(
        () => BDOGroteskFeatures.filter((item) => item.features.length !== 0),
        []
    );
    const [selectedGlyphs, setSelectedGlyphs] = useState<Glyph[]>([memoizedGlyphs[0]]);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "max-content 2fr 4.5fr",
                gap: "var(--grid-gap)"
            }}
        >
            <div style={{ width: "14em" }}>
                <div
                    style={{
                        position: "sticky",
                        top: `calc(var(--header-height) * ${isModal ? 1 : 2})`
                    }}
                >
                    Left
                </div>
            </div>
            <aside style={{ borderInline: "1px solid var(--accents-3)" }}>
                <div
                    style={{
                        position: "sticky",
                        top: `calc(var(--header-height) * ${isModal ? 1 : 2})`
                    }}
                >
                    <GlyphView glyphs={selectedGlyphs} />
                </div>
            </aside>
            <div>
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        paddingBlock: "var(--grid-gap)",
                        display: "grid",
                        gridTemplateColumns: "repeat(24, 1fr)",
                        overflow: "hidden",
                        paddingRight: 1
                    }}
                >
                    {memoizedGlyphs
                        // .filter((item) => !!item.unicode)
                        .slice(0, isProducton ? memoizedGlyphs.length : 300)
                        .sort((a, b) => {
                            // @ts-ignore
                            if (a.unicode < b.unicode) return -1;
                            // @ts-ignore
                            if (a.unicode > b.unicode) return 1;
                            return 1;
                        })
                        .map((item, i) => (
                            <GlyphThumb
                                key={i}
                                item={item}
                                isActive={selectedGlyphs && selectedGlyphs[0].id === item.id}
                                onMouseOver={() => setSelectedGlyphs([item])}
                                style={{ margin: "0 -1px -1px 0" }}
                            />
                        ))}
                </ul>

                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0
                    }}
                >
                    {memoizedFeatures.map((item, i) => (
                        <li
                            key={i}
                            style={{
                                borderBottom: "1px solid var(--accents-3)",
                                borderTop: "1px solid var(--accents-3)",
                                // paddingBottom: "var(--grid-gap)",
                                marginBottom: -1
                            }}
                        >
                            <div
                                style={{
                                    paddingTop: "0.5em",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "1em",
                                        fontWeight: "bold",
                                        padding: "0 0.5em 0 0.5em",
                                        display: "inline-flex",
                                        backgroundColor: "var(--accents-2)",
                                        color: "var(--accents-12)",
                                        border: "1px solid var(--accents-3)",
                                        borderRadius: "1em"
                                    }}
                                >
                                    {item.tag}
                                </span>
                            </div>

                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    paddingBlock: "var(--grid-gap)",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(24, 1fr)",
                                    overflow: "hidden",
                                    paddingRight: 1
                                }}
                            >
                                {item.features.map((feat, fi) => {
                                    const glyphBy = memoizedGlyphs[feat.by];
                                    const glyphSub = memoizedGlyphs[feat.sub];
                                    return (
                                        glyphBy &&
                                        glyphSub && (
                                            <GlyphThumb
                                                key={fi}
                                                item={glyphBy}
                                                style={{ margin: "0 -1px -1px 0" }}
                                                isActive={
                                                    selectedGlyphs &&
                                                    selectedGlyphs.length > 1 &&
                                                    selectedGlyphs[1].id === feat.by
                                                }
                                                onMouseOver={() =>
                                                    setSelectedGlyphs([
                                                        glyphSub,
                                                        // @ts-ignore
                                                        {
                                                            ...glyphBy,
                                                            feature: item.tag,
                                                            character:
                                                                glyphBy.character ??
                                                                glyphSub.character
                                                        }
                                                    ])
                                                }
                                            />
                                        )
                                    );
                                })}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
