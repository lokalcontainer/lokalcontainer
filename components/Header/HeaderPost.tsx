import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import styles from "styles/header.module.scss";

interface HeaderPostProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export default function HeaderPost(props: PropsWithChildren<HeaderPostProps>) {
    const { children, style } = props;
    return (
        <header
            className={styles.post}
            style={{
                display: "flex",
                alignItems: "center",
                // height: "calc(var(--grid-gap) * 4)",
                height: "calc(var(--header-height) / 1.25)",
                color: "var(--accents-6)",
                position: "sticky",
                top: "var(--header-height)",
                backgroundColor: "var(--accents-1)",
                zIndex: 1,
                marginBottom: "calc(var(--grid-gap) * 3)",
                ...style
            }}
        >
            {children ? children : <div style={{ fontSize: "0.875em" }}>Post Header</div>}
        </header>
    );
}
