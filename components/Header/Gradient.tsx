import styles from "styles/nav.module.scss";
import { useTheme } from "next-themes";

function ThemeSelector() {
    const { themes, theme, setTheme } = useTheme();
    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                height: "100%",
                overflow: "hidden"
            }}
        >
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                    appearance: "none",
                    margin: 0,
                    textTransform: "capitalize",
                    height: "100%",
                    padding: "0 1.5em 0 .5em",
                    outline: "none",
                    width: "100%",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                    backgroundColor: "inherit",
                    color: "var(--accents-1)"
                }}
            >
                {themes.map((item: string, i: number) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    height: "100%",
                    color: "inherit",
                    pointerEvents: "none",
                    overflow: "hidden",
                    padding: 4,
                    flexShrink: 0
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="100%"
                    width="100%"
                    fill="var(--accents-1)"
                >
                    <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
                </svg>
            </span>
        </div>
    );
}

export default function Gradient() {
    const arrayColors = Array(11).fill("");

    return (
        <ul className={styles.gradient} style={{ padding: "0.5em" }}>
            {arrayColors.map((_i, i) => {
                const isOdd = i === 0;
                return (
                    <li
                        key={i}
                        style={{
                            height: "calc(var(--header-height) / 1.6)",
                            backgroundColor: `var(--accents${i - arrayColors.length - 1})`,
                            width: isOdd
                                ? `${100 / (arrayColors.length / 4)}%`
                                : `${100 / arrayColors.length}%`
                        }}
                    >
                        {isOdd && <ThemeSelector />}
                    </li>
                );
            })}
        </ul>
    );
}
