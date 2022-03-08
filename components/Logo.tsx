import { useRef } from "react";
import useMousePosition from "hooks/use-mouse-position";
import usePerspective from "hooks/use-perspective";

export default function Logo() {
    const refSVG = useRef<HTMLSpanElement>(null);
    const { x, y } = useMousePosition();
    const style = usePerspective(x, y, refSVG);

    return (
        <>
            <div
                style={{
                    width: "6em",
                    aspectRatio: "1/1",
                    position: "fixed",
                    left: "50%",
                    // bottom: "calc(var(--grid-gap) * 3)",
                    // right: 0,
                    bottom: 0,
                    transform: "translateX(-50%)",
                    zIndex: 2002,
                    mixBlendMode: "difference",
                    padding: "calc(var(--grid-gap) * 3)",
                    pointerEvents: "none",
                    touchAction: "none",
                    userSelect: "none",
                    color: "#fff"
                    // border: "1px solid"
                }}
            >
                <span
                    ref={refSVG}
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        filter: "drop-shadow(0 0 calc(var(--grid-gap) / 4) #fff)",
                        transition: "transform 0.33s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        borderRadius: "100%",
                        ...style
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 128"
                        width="100%"
                        height="100%"
                        fill="currentColor"
                    >
                        <polygon points="76.3 76.94 52.74 92.54 22.61 47.02 11.68 54.26 48.86 110.43 83.36 87.6 76.3 76.94" />
                        <path d="M87.48,20.29C78.1,17.57,68.71,18.45,61,22.79S47.7,34.68,45,44.15c-4.31,14.82-.14,28.67,11.14,37l2.61,1.94L66.61,72.4,64,70.49c-7-5-9.51-13.52-6.81-22.8C60.78,35.15,71.23,29.4,83.77,33.05s18.29,14.09,14.65,26.63C95.62,69.31,88.78,75,79.66,75.29l-3.44.11,1.25,13.37,3.11-.18c14.42-.8,25.65-10.28,30-25.37,5.71-19.66-3.8-37.31-23.13-42.93" />
                    </svg>

                    <span
                        style={{
                            position: "absolute",
                            top: "-0.5em",
                            right: "-0.5em"
                        }}
                    >
                        <span style={{ fontSize: "1.1em" }}>&trade;</span>
                    </span>
                </span>
            </div>
        </>
    );
}
