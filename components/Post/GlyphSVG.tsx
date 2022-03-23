import { CSSProperties, useMemo } from "react";

type GlyphSVGProps = {
    viewBox: string;
    path: string;
    style?: CSSProperties;
    baseWidth?: number;
    ascender?: number;
    capHeight?: number;
    xHeight?: number;
    baseLine?: number;
    descender?: number;
};

type SVGLineProps = {
    x: number;
    y: number;
    dashed?: boolean;
};

function SVGLine(props: SVGLineProps) {
    const { x, y, dashed } = props;
    const memoizedX = useMemo(() => x, [x]);
    const memoizedY = useMemo(() => y, [y]);
    return (
        <line
            x1={-memoizedX}
            x2={memoizedX * 2}
            y1={memoizedY}
            y2={memoizedY}
            stroke={`var(--accents-${dashed ? "blue" : 3})`}
            strokeWidth={1}
            strokeDasharray={dashed ? "4 4" : "0 0"}
        />
    );
}

export default function GlyphSVG(props: GlyphSVGProps) {
    const { viewBox, path, style, baseWidth, baseLine, xHeight, ascender, capHeight, descender } =
        props;
    return (
        <svg viewBox={viewBox} width="100%" height="100%" fill="currentColor" style={{ ...style }}>
            <g>
                {baseWidth && ascender && <SVGLine x={baseWidth} y={ascender} />}
                {baseWidth && capHeight && <SVGLine x={baseWidth} y={capHeight} />}
                {baseWidth && xHeight && <SVGLine x={baseWidth} y={xHeight} dashed />}
                {baseWidth && baseLine && <SVGLine x={baseWidth} y={baseLine} dashed />}
                {baseWidth && descender && <SVGLine x={baseWidth} y={descender} />}
            </g>

            <path d={path} />
        </svg>
    );
}
