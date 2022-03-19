import styles from "styles/select.module.scss";
import type { CSSProperties } from "react";
import { useTheme } from "next-themes";

type ThemeSelectorProps = {
    style?: CSSProperties;
};

export default function ThemeSelector(props: ThemeSelectorProps) {
    const { style } = props;
    const { theme, themes, setTheme } = useTheme();
    return (
        <div className={styles.container} style={style}>
            <select title="Theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                {themes.map((item: string, i: number) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            <span className={styles.suffix}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="1.5em"
                    width="1.5em"
                    fill="currentColor"
                >
                    <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
                </svg>
            </span>
        </div>
    );
}
