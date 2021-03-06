import useMousePosition from "hooks/use-mouse-position";
import usePerspective from "hooks/use-perspective";

export default function Page() {
    const { x, y } = useMousePosition();
    const style = usePerspective(x, y);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "calc(100vw - calc(var(--grid-gap) * 3))",
                height: "calc(100vh - var(--header-height) - var(--footer-height))",
                marginInline: "calc(0px - calc(var(--grid-gap) * 1.5))"
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--grid-gap)",
                    padding: "1em",
                    borderRadius: "1em",
                    filter: "drop-shadow(0 0 calc(var(--grid-gap) / 6) var(--accents-12))",
                    transition: "transform 0.33s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    ...style
                }}
            >
                <span style={{ textAlign: "center", fontSize: "2em" }}>
                    Unfortunately, <br />
                    this page doesn&#39;t exist.
                </span>
            </div>
        </div>
    );
}
