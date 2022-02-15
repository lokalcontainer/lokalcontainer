import { useEffect, useState } from "react";
import useEventListener from "./use-event-listener";

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const handleSize = () =>
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    useEventListener("resize", handleSize);
    useEffect(() => {
        handleSize();
    }, []);

    return { width: windowSize.width, height: windowSize.height };
}
