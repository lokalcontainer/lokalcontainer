import { DetailedHTMLProps, LiHTMLAttributes, useMemo } from "react";
import { Glyph } from "./FontGlyph";
import GlyphSVG from "./GlyphSVG";

interface GlyphThumbProps
    extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    item: Glyph;
    isActive?: boolean;
}

export default function GlyphThumb(props: GlyphThumbProps) {
    const memoizedProps = useMemo(() => props, [props]);
    const { item, isActive, style, ...rest } = memoizedProps;
    return (
        <li
            {...rest}
            style={{
                position: "relative",
                border: "1px solid var(--accents-3)",
                overflow: "hidden",
                backgroundColor: isActive ? "var(--accents-2)" : "transparent",
                ...style
            }}
        >
            <div
                style={{
                    borderBottom: "1px solid var(--accents-3)",
                    paddingInline: "0.3em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 500,
                    height: "1.25em",
                    display: "flex",
                    alignItems: "center",
                    color: "var(--accents-12)",
                    backgroundColor: item.unicode ? "var(--accents-2)" : "var(--accents-4)",
                    zIndex: 1
                }}
            >
                <span
                    style={{
                        fontSize: "0.65em",
                        width: "100%",
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textTransform: "uppercase",
                        fontFeatureSettings: `"tnum", "case"`
                    }}
                >
                    {item.unicode ?? item.name.replace(/[.]/g, " ")}
                </span>
            </div>

            <div style={{ aspectRatio: "1/1" }}>
                <GlyphSVG
                    viewBox={item.svg.viewBox}
                    path={item.svg.path}
                    style={{ color: isActive ? "var(--accents-12)" : "var(--accents-6)" }}
                />
            </div>
        </li>
    );
}
