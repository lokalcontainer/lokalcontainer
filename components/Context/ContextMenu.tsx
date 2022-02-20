import { createContext, FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

type ContextMenuProps = {
    menu: boolean;
    toggleMenu: () => void;
    hideMenu: () => void;
};

const init: ContextMenuProps = {
    menu: false,
    toggleMenu: () => ({}),
    hideMenu: () => ({})
};

const ContextMenu = createContext<ContextMenuProps>(init);
export const useMenu = () => useContext(ContextMenu);
export const ProviderMenu: FC = (props) => {
    const { children } = props;
    const { events } = useRouter();
    const [menu, setMenu] = useState(false);
    const toggleMenu = () => setMenu((prev) => !prev);
    const hideMenu = () => setMenu((prev) => prev && false);

    useEffect(() => {
        if (!menu) return;

        events.on("routeChangeStart", hideMenu);
        events.on("routeChangeComplete", hideMenu);
        events.on("routeChangeError", hideMenu);

        return () => {
            events.off("routeChangeStart", hideMenu);
            events.off("routeChangeComplete", hideMenu);
            events.off("routeChangeError", hideMenu);
        };
    }, [events, menu]);

    return (
        <ContextMenu.Provider value={{ menu, toggleMenu, hideMenu }}>
            {children}
        </ContextMenu.Provider>
    );
};
