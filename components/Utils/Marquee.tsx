import styles from "styles/marquee.module.scss";
import type { CSSProperties, PropsWithChildren } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type MarqueeProps = PropsWithChildren<{
    style?: CSSProperties;
    className?: string;
    play?: boolean;
    pauseOnHover?: boolean;
    pauseOnClick?: boolean;
    direction?: "left" | "right";
    speed?: number;
    delay?: number;
    loop?: number;
    onFinish?: () => void;
    onCycleComplete?: () => void;
}>;

const isProduction = process.env.NODE_ENV === "production";

export default function Marquee(props: MarqueeProps) {
    const {
        children,
        style = {},
        play = true,
        pauseOnHover = false,
        pauseOnClick = false,
        direction = "left",
        speed = 20,
        delay = 0,
        loop = 0,
        onFinish,
        onCycleComplete
    } = props;

    const memoChildren = useMemo(() => children, [children]);

    const [containerWidth, setContainerWidth] = useState(0);
    const [marqueeWidth, setMarqueeWidth] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    const calculateWidth = () => {
        if (marqueeRef.current && containerRef.current) {
            setContainerWidth(containerRef.current.getBoundingClientRect().width);
            setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width);
        }
        if (marqueeWidth < containerWidth) {
            setDuration(containerWidth / speed);
        } else {
            setDuration(marqueeWidth / speed);
        }
    };

    useEffect(() => {
        calculateWidth();
        // Rerender on window resize
        window.addEventListener("resize", calculateWidth);
        return () => {
            window.removeEventListener("resize", calculateWidth);
        };
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div
            ref={containerRef}
            className={styles.container}
            style={{
                ...style,
                ["--pause-on-hover" as string]: pauseOnHover ? "paused" : "running",
                ["--pause-on-click" as string]: pauseOnClick ? "paused" : "running"
            }}
        >
            {isMounted && (
                <>
                    <div
                        ref={marqueeRef}
                        className={styles.marquee}
                        data-running={isProduction}
                        style={{
                            ["--play" as string]: play ? "running" : "paused",
                            ["--direction" as string]: direction === "left" ? "normal" : "reverse",
                            ["--duration" as string]: `${duration}s`,
                            ["--delay" as string]: `${delay}s`,
                            ["--iteration-count" as string]: !!loop ? `${loop}` : "infinite"
                        }}
                        onAnimationIteration={onCycleComplete}
                        onAnimationEnd={onFinish}
                    >
                        {memoChildren}
                    </div>

                    <div
                        className={styles.marquee}
                        style={{
                            ["--play" as string]: play ? "running" : "paused",
                            ["--direction" as string]: direction === "left" ? "normal" : "reverse",
                            ["--duration" as string]: `${duration}s`,
                            ["--delay" as string]: `${delay}s`,
                            ["--iteration-count" as string]: !!loop ? `${loop}` : "infinite"
                        }}
                    >
                        {memoChildren}
                    </div>
                </>
            )}
        </div>
    );
}
