import { useMemo } from "react";
import { Glyph } from "./FontGlyph";
import GlyphSVG from "./GlyphSVG";

type GlyphThumbProps = {
    item: Glyph;
    onMouseOver(): void;
    isActive?: boolean;
};

export default function GlyphThumb(props: GlyphThumbProps) {
    const memoizedProps = useMemo(() => props, [props]);
    const { item, isActive, onMouseOver } = memoizedProps;
    return (
        <li
            onMouseOver={onMouseOver}
            style={{
                position: "relative",
                border: "1px solid var(--accents-3)",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    borderBottom: "1px solid var(--accents-3)",
                    paddingInline: "0.5em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 500,
                    height: "1.25em",
                    display: "flex",
                    alignItems: "center",
                    color: "var(--accents-12)",
                    backgroundColor: "var(--accents-3)",
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
                        whiteSpace: "nowrap"
                    }}
                >
                    {item.name}
                </span>
            </div>

            <div
                style={{
                    aspectRatio: "1/1",
                    backgroundColor: isActive ? "var(--accents-blue)" : "transparent"
                }}
            >
                <GlyphSVG viewBox={item.svg.viewBox} path={item.svg.path} />
            </div>
        </li>
    );
}
