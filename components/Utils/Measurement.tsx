import type { CSSProperties } from "react";
import useWindowSize from "hooks/use-window-size";

type MeasurementProps = {
    style?: CSSProperties;
};

export default function Measurment(props: MeasurementProps) {
    const { style } = props;
    const { width, height } = useWindowSize();
    return (
        <span
            style={{
                fontFeatureSettings: `"tnum", "case"`,
                pointerEvents: "none",
                touchAction: "none",
                userSelect: "none",
                ...style
            }}
        >
            W / {width} - H / {height}
        </span>
    );
}
