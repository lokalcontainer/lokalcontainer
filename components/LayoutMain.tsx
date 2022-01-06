import type { FC, CSSProperties } from "react";

type LayoutMainProps = {
    style?: CSSProperties;
};

export const LayoutMain: FC<LayoutMainProps> = (props) => {
    const { children, style } = props;

    return (
        <>
            <main
                style={{
                    position: "relative",
                    minHeight:
                        "calc(calc(100vh - var(--footer-height)) - calc(var(--grid-gap) * 5))",
                    padding: "0 var(--grid-gap)",
                    marginBottom: "var(--footer-height)",
                    backgroundColor: "var(--accents-1)",
                    zIndex: 10,
                    ...style
                }}
            >
                {children}
            </main>
        </>
    );
};
