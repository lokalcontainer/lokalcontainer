import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";
import useEventListener from "hooks/use-event-listener";

type ContextWindowAttr = {
    focus: boolean;
};
type ProviderWindowProps = PropsWithChildren<{}>;

const ContextWindow = createContext<ContextWindowAttr>({ focus: true });
export function useWindow() {
    return useContext(ContextWindow);
}
export default function ProviderWindow(props: ProviderWindowProps) {
    const { children } = props;
    const [focus, setFocus] = useState<boolean>(true);

    const htmlAttr = "data-blur";
    function handleFocus() {
        const html = document.documentElement;
        html.removeAttribute(htmlAttr);
        setFocus(true);
    }
    function handleBlur() {
        const html = document.documentElement;
        html.setAttribute(htmlAttr, "true");
        setFocus(false);
    }

    useEventListener("focus", handleFocus);
    useEventListener("blur", handleBlur);

    return <ContextWindow.Provider value={{ focus }}>{children}</ContextWindow.Provider>;
}
