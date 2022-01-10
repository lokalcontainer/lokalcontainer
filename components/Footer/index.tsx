import styles from "styles/footer.module.scss";
import NextLink from "next/link";
import { STATIC_SOCIAL_MENU } from "libs/menu.constants";

export const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <footer className={styles.app_footer}>
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
                    <a href="https://unforma.club" target="_blank" rel="noopener noreferrer">
                        <span>Unforma™Club</span>
                    </a>
                </li>
            </ul>
        </footer>
    );
};
