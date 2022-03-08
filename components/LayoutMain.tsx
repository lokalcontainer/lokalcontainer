import styles from "styles/layout.module.scss";
import type { CSSProperties, PropsWithChildren } from "react";

type LayoutMainProps = PropsWithChildren<{
    style?: CSSProperties;
    title?: string;
    description?: string;
    image?: string;
}>;

export default function LayoutMain(props: LayoutMainProps) {
    const { children, style } = props;
    return (
        <main className={styles.main} style={{ ...style }}>
            {children}
        </main>
    );
}
