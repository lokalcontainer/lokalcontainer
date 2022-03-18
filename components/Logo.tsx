import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import LogoAnimate from "./Logo/LogoAnimate";

export default function Logo() {
    const { pathname } = useRouter();
    const { resolvedTheme } = useTheme();
    return (
        <>
            {pathname.split("/")[1] !== "about" && (
                <div
                    style={{
                        width: "6em",
                        aspectRatio: "1/1",
                        position: "fixed",
                        left: "50%",
                        bottom: "var(--footer-height)",
                        transform: "translateX(-50%)",
                        zIndex: 2002,
                        mixBlendMode: "difference",
                        color: "#ffffff",
                        pointerEvents: "none",
                        touchAction: "none",
                        userSelect: "none"
                    }}
                >
                    <LogoAnimate
                        style={{
                            filter:
                                resolvedTheme === "dark"
                                    ? "drop-shadow(0 0 calc(var(--grid-gap) / 2) currentColor)"
                                    : "drop-shadow(0 0 calc(var(--grid-gap) / 3) currentColor)"
                        }}
                    />
                </div>
            )}
        </>
    );
}
