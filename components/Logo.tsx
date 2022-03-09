import { useRef } from "react";
import Lottie from "lottie-react";
import useMousePosition from "hooks/use-mouse-position";
import usePerspective from "hooks/use-perspective";
import logo from "../public/logo-white.json";

export default function Logo() {
    const refSpan = useRef<HTMLSpanElement>(null);
    const { x, y } = useMousePosition();
    const style = usePerspective(x, y, refSpan);

    return (
        <>
            <div
                style={{
                    width: "10em",
                    aspectRatio: "1/1",
                    position: "fixed",
                    left: "50%",
                    bottom: 0,
                    transform: "translateX(-50%)",
                    zIndex: 2002,
                    mixBlendMode: "difference",
                    padding: "calc(var(--grid-gap) * 3)",
                    pointerEvents: "none",
                    touchAction: "none",
                    userSelect: "none",
                    color: "#fff"
                }}
            >
                <span
                    ref={refSpan}
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        filter: "drop-shadow(0 0 calc(var(--grid-gap) / 4) #fff)",
                        transition: "transform 0.33s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        ...style
                    }}
                >
                    <Lottie loop autoplay animationData={logo} />

                    <span
                        style={{
                            position: "absolute",
                            top: "0.5em",
                            right: "0.75em"
                        }}
                    >
                        <span style={{ fontSize: "1.1em" }}>&trade;</span>
                    </span>
                </span>
            </div>
        </>
    );
}
