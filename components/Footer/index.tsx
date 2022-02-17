import styles from "styles/footer.module.scss";
import NextDynamic from "next/dynamic";
// import NextLink from "next/link";
// import { STATIC_SOCIAL_MENU } from "libs/menu.constants";
import useLightBox from "hooks/use-light-box";

const Measurment = NextDynamic(() => import("components/Utils/Measurement"), {
    ssr: false,
    loading: () => <span>Loading...</span>
});

export const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    const { lightBox } = useLightBox();

    return (
        <>
            {!lightBox && (
                <footer className={styles.app_footer}>
                    <ul>
                        <li>Lokal Container &copy; {currentYear}</li>
                        {/* <li>hey@lokalcontainer.org</li> */}
                    </ul>

                    <ul>
                        <li>
                            <Measurment />
                        </li>
                    </ul>

                    {/* <ul>
                        {STATIC_SOCIAL_MENU.map((item, i) => (
                            <li key={i}>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul> */}

                    {/* <ul>
                        <li>
                            In use{" "}
                            <NextLink href="/typeface/[slug]" as="/typeface/bdo-grotesk">
                                <a>
                                    <span>BDO Grotesk</span>
                                </a>
                            </NextLink>
                        </li>
                        <li>
                            Site by{" "}
                            <a
                                href="https://unforma.club"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>Unforma™Club</span>
                            </a>
                        </li>
                    </ul> */}
                </footer>
            )}

            {/* <AnimatePresence initial={false}>
                {!lightBox && (
                    <motion.footer
                        // initial={{ opacity: 0 }}
                        // animate={{ opacity: 1, transition: { type: "just" } }}
                        // exit={{ opacity: 0, transition: { type: "just" } }}
                        className={styles.app_footer}
                    >
                        <ul>
                            <li>Lokalcontainer &copy; {currentYear}</li>
                        </ul>

                        <ul>
                            {STATIC_SOCIAL_MENU.map((item, i) => (
                                <li key={i}>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <ul>
                            <li>
                                In use{" "}
                                <NextLink href="/typeface/[slug]" as="/typeface/bdo-grotesk">
                                    <a>
                                        <span>BDO Grotesk</span>
                                    </a>
                                </NextLink>
                            </li>
                            <li>
                                Site by{" "}
                                <a
                                    href="https://unforma.club"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>Unforma™Club</span>
                                </a>
                            </li>
                        </ul>
                    </motion.footer>
                )}
            </AnimatePresence> */}
        </>
    );
};
