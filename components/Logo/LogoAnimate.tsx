import { useEffect, useRef } from "react";
import lottie, { AnimationDirection } from "lottie-web";
import useEventListener from "hooks/use-event-listener";
import logo from "../../public/logo-white.json";

let ticking = false;

function useLottie<T extends HTMLElement = HTMLDivElement>(name: string) {
    const ref = useRef<T | null>(null);
    const animeName = name;

    const play = () => lottie.play(animeName);
    const pause = () => lottie.pause(animeName);
    const destroy = () => lottie.destroy(animeName);
    const setSpeed = (v: number) => lottie.setSpeed(v, animeName);
    const setDirection = (v: AnimationDirection) => lottie.setDirection(v, animeName);

    useEffect(() => {
        if (!ref.current) return;
        lottie.loadAnimation({
            animationData: logo,
            renderer: "svg",
            loop: true,
            autoplay: true,
            container: ref.current,
            name: animeName
        });
    }, [ref, animeName]);

    return { ref, play, pause, destroy, setSpeed, setDirection };
}

export default function LogoAnimate() {
    const { ref, play, pause, setSpeed } = useLottie("logo");

    useEffect(() => void setSpeed(0.7), [setSpeed]);

    const handleScroll = () => {
        if (document.hasFocus()) {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setTimeout(() => {
                        play();
                        ticking = false;
                    }, 500);
                });

                pause();
                ticking = true;
            }
        }
    };

    const htmlAttr = "data-blur";
    const handleFocus = () => {
        const html = document.documentElement;
        html.removeAttribute(htmlAttr);
        return play();
    };
    const handleBlur = () => {
        const html = document.documentElement;
        html.setAttribute(htmlAttr, "true");
        return pause();
    };

    useEventListener("scroll", handleScroll);
    useEventListener("focus", handleFocus);
    useEventListener("blur", handleBlur);

    return <div ref={ref} />;
}
