import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import logo from "../../public/logo-white.json";
import lottie from "lottie-web";

// const isProduction = process.env.NODE_ENV !== "production";
let ticking = false;

function useLottie<T extends HTMLElement = HTMLElement>(play: boolean, parent: RefObject<T>) {
    const animeName = "Logo";
    const playMemo = useMemo(() => play, [play]);
    useEffect(() => {
        if (!parent.current) return;
        lottie.loadAnimation({
            animationData: logo,
            renderer: "svg",
            loop: true,
            autoplay: true,
            container: parent.current,
            name: animeName
        });

        lottie.setSpeed(0.7, animeName);

        if (playMemo) {
            setTimeout(() => {
                lottie.play(animeName);
                console.log("PLAY");
            }, 1000);

            return () => {
                lottie.pause(animeName);
                console.log("PAUSE");
            };
        }
    }, [parent, playMemo]);
}

export default function LogoAnimate(props: any) {
    const refParent = useRef<HTMLDivElement>(null);

    const [playState, setPlayState] = useState(true);

    useLottie(playState, refParent);

    const handlePlay = () => setPlayState(true);
    const handlePause = () => setPlayState(false);

    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === "hidden") {
                handlePause();
            } else {
                handlePlay();
            }
        };

        handleVisibility();
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setTimeout(() => {
                        handlePlay();
                        ticking = false;
                    }, 1000);
                });

                handlePause();
                ticking = true;
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return <div ref={refParent} />;
}
