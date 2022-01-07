import type { CSSProperties } from "react";

const ulStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0
};

export const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <footer
            style={{
                padding: "var(--grid-gap)",
                height: "var(--footer-height)",
                position: "fixed",
                bottom: 0,
                width: "100%",
                backgroundColor: "var(--accents-1)",
                fontWeight: 300
            }}
        >
            <ul style={ulStyle}>
                <li>Lokalcontainer &copy; {currentYear}</li>
            </ul>
        </footer>
    );
};
