import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOnEscape from "hooks/use-on-escape";
import { useMenu } from "components/Context/ContextMenu";

export default function Drawer() {
    const { menu, hideMenu } = useMenu();
    const refParent = useRef<HTMLElement>(null);
    useOnEscape(refParent, menu, hideMenu);

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            {menu && (
                <motion.nav
                    ref={refParent}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { type: "spring", mass: 0.5, damping: 200, stiffness: 2000 }
                    }}
                    exit={{
                        opacity: 0,
                        transition: { type: "spring", mass: 0.5, damping: 100, stiffness: 2000 }
                    }}
                    style={{
                        position: "fixed",
                        top: 0,
                        right: "calc(var(--grid-gap) * 3)",
                        left: "calc(var(--grid-gap) * 3)",
                        backgroundColor: "var(--alpha-1)",
                        backdropFilter: "blur(3px)",
                        minHeight: "50vh",
                        zIndex: 999,
                        padding:
                            "calc(var(--header-height) + var(--grid-gap)) var(--grid-gap) var(--grid-gap)"
                    }}
                >
                    Main Menu
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
