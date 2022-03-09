import { useTheme } from "next-themes";
import Lottie from "lottie-react";
import logo from "../public/logo-white.json";

export default function Logo() {
    const { resolvedTheme } = useTheme();
    const isProduction = process.env.NODE_ENV === "production";
    return (
        <>
            <div
                style={{
                    width: "6em",
                    aspectRatio: "1/1",
                    position: "fixed",
                    left: "50%",
                    bottom: "calc(var(--grid-gap) * 3)",
                    transform: "translateX(-50%)",
                    zIndex: 2002,
                    mixBlendMode: "difference",
                    color: "#fff",
                    pointerEvents: "none",
                    touchAction: "none",
                    userSelect: "none"
                }}
            >
                <Lottie
                    loop={isProduction}
                    autoplay={isProduction}
                    animationData={logo}
                    style={{
                        filter:
                            resolvedTheme === "dark"
                                ? "drop-shadow(0 0 calc(var(--grid-gap) / 2) currentColor)"
                                : "drop-shadow(0 0 calc(var(--grid-gap) / 4) currentColor)"
                    }}
                />
            </div>
        </>
    );
}
