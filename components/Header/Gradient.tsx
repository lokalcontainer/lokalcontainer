import styles from "styles/nav.module.scss";
import { useTheme } from "next-themes";

export default function Gradient() {
    const { themes, theme, setTheme } = useTheme();
    const arrayColors = Array(9).fill("");

    return (
        <ul className={styles.gradient}>
            <li
                style={{
                    height: "calc(var(--header-height) / 1.25)",
                    width: `100%`,
                    flexShrink: 4
                }}
            >
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    style={{
                        margin: 0,
                        textTransform: "capitalize",
                        height: "100%",
                        paddingInline: "calc(var(--grid-gap) / 1.5)",
                        outline: "none",
                        width: "100%",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "inherit",
                        fontFamily: "inherit",
                        fontWeight: "inherit",
                        backgroundColor: "var(--accents-12)",
                        color: "var(--accents-1)"
                    }}
                >
                    {themes.map((item: string, i: number) => (
                        <option key={i} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </li>

            {arrayColors.map((_i, i) => (
                <li
                    key={i}
                    style={{
                        height: "calc(var(--header-height) / 1.25)",
                        width: `${100 / arrayColors.length}%`,
                        backgroundColor: `var(--accents${i - arrayColors.length - 1})`
                    }}
                />
            ))}
        </ul>
    );
}
