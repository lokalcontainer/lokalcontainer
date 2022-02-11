import { useEffect, useState } from "react";
import NextImage, { ImageProps } from "next/image";

type Loading = "lazy" | "eager" | undefined;

const isMobileConnection = () => {
    const connection = navigator.connection;
    return connection.type === "cellular";
};

const defer = (cb: any) => {
    if (window.requestIdleCallback) {
        const handle = window.requestIdleCallback(cb);
        return () => window.cancelIdleCallback(handle);
    }
    const handle = setTimeout(cb, 2345 + Math.random() * 1000);
    return () => clearTimeout(handle);
};

export const Image = (props: ImageProps) => {
    const { loading: propsLoading, priority = false } = props;
    const [loading, setLoading] = useState<Loading>(propsLoading);

    useEffect(() => {
        if (propsLoading === "eager" || priority) return;
        if (!isMobileConnection()) {
            let clearDefer: any;
            const onLoad = () => {
                clearDefer = defer(() => setLoading("eager"));
            };
            window.addEventListener("load", onLoad);

            return () => {
                window.removeEventListener("load", onLoad);
                if (clearDefer) {
                    clearDefer();
                }
            };
        }
    }, [propsLoading, priority]);

    return <NextImage {...props} loading={loading} />;
};
