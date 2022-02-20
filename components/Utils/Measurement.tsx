import useWindowSize from "hooks/use-window-size";

export default function Measurment() {
    const { width, height } = useWindowSize();
    return (
        <span
            style={{
                fontFeatureSettings: `"tnum", "case"`,
                pointerEvents: "none",
                touchAction: "none",
                userSelect: "none"
            }}
        >
            W / {width} - H / {height}
        </span>
    );
}
