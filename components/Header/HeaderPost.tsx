export default function HeaderPost() {
    return (
        <header
            style={{
                display: "flex",
                alignItems: "center",
                height: "1.75em",
                width: "100vw",
                marginInline: "-1.5em",
                paddingInline: "1.5em",
                color: "var(--accents-6)",
                position: "sticky",
                top: "var(--header-height)",
                backgroundColor: "var(--accents-1)",
                zIndex: 1,
                boxShadow: "0 5px 12px -12px var(--accents-6), 0 2px 2px -2px var(--accents-4)",
                transition: "all 300ms cubic-bezier(0, 0.3, 0.8, 1)",
                marginBottom: "calc(var(--grid-gap) * 3)"
            }}
        >
            <div style={{ fontSize: "0.875em" }}>Post Header</div>
        </header>
    );
}
