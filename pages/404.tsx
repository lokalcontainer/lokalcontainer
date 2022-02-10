import { LayoutMain } from "components/LayoutMain";

export default function Page() {
    return (
        <LayoutMain style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--grid-gap)"
                }}
            >
                <span style={{ fontSize: "6em", lineHeight: 1 }}>&#9785;</span>
                <span>
                    Unfortunately, <br />
                    this page doesn&#39;t exist.
                </span>
            </div>
        </LayoutMain>
    );
}
