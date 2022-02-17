import useWindowSize from "hooks/use-window-size";

export default function Measurment() {
    const { width } = useWindowSize();
    return (
        <span
            style={{
                fontFeatureSettings: `"tnum", "case"`,
                cursor: "initial",
                pointerEvents: "none",
                touchAction: "none",
                userSelect: "none"
            }}
        >
            W / {width}
        </span>
    );
}