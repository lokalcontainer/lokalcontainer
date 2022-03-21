import { useState } from "react";
import Dialog from "@unforma-club/dialog";
import ButtonSVG from "./Utils/ButtonSVG";

export default function ButtonSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleClose = () => setIsOpen(false);
    const handleToggle = () => setIsOpen((prev) => !prev);

    return (
        <>
            <ButtonSVG title="Search" onClick={handleToggle} icon="search" isActive={isOpen} />

            <Dialog
                isOpen={isOpen}
                parentId="__next"
                floatId="__lc_portal_search"
                stackId="__main"
                onRequestClose={handleClose}
            >
                <ButtonSVG
                    title="Close"
                    icon="close"
                    onClick={handleClose}
                    style={{ position: "absolute", top: "0.5em", left: "0.5em" }}
                />
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <label>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                            style={{
                                appearance: "none",
                                border: "1px solid",
                                backgroundColor: "var(--accents-2)",
                                font: "inherit",
                                fontSize: "2em",
                                padding: "var(--grid-gap) calc(var(--grid-gap) * 2)",
                                borderRadius: "4em",
                                color: "currentcolor",
                                minWidth: 280,
                                outlineColor: "var(--accents-green)"
                            }}
                        />
                    </label>
                </form>
            </Dialog>
        </>
    );
}
