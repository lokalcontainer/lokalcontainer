import { useState, ReactNode, useEffect, FC } from "react";

type MasonryProps = {
    breakpointCols: {
        [key: number]: number;
        default: number;
    };
};

const DEFAULT_COLUMNS = 2;

export const Masonry: FC<MasonryProps> = ({ children, breakpointCols }) => {
    const [columnCount, setColumnCount] = useState<number>(() => {
        if (breakpointCols && breakpointCols.default) {
            return breakpointCols.default;
        } else {
            return DEFAULT_COLUMNS;
        }
    });

    const reCalculateColumnCountDebounce = () => {
        if (typeof window === "undefined") return;
        if (!window || !window.requestAnimationFrame) {
            return reCalculateColumnCount();
        }
        window.requestAnimationFrame(() => reCalculateColumnCount());
    };

    const reCalculateColumnCount = () => {
        const windowWidth = window && window.innerWidth;

        let matchedBreakpoint: number = Infinity;
        let columns: number = breakpointCols.default || DEFAULT_COLUMNS;

        for (const breakpoint in breakpointCols) {
            const optBreakpoint = parseInt(breakpoint);
            const isCurrentBreakpoint = optBreakpoint > 0 && windowWidth <= optBreakpoint;
            if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
                matchedBreakpoint = optBreakpoint;
                columns = breakpointCols[breakpoint];
            }
        }

        columns = Math.max(1, columns || 1);
        if (columnCount !== columns) {
            setColumnCount(columns);
        }
        // setColumnCount(columns);
    };

    const itemsInColumns = () => {
        let newArr: ReactNode[] = [];

        const currentColumnCount = columnCount;
        const itemsInColumns = new Array(currentColumnCount);
        const items: ReactNode[] = newArr.concat(children);

        for (let i = 0; i < items.length; i++) {
            const columnIndex = i % currentColumnCount;
            if (!itemsInColumns[columnIndex]) itemsInColumns[columnIndex] = [];
            itemsInColumns[columnIndex].push(items[i]);
        }

        return itemsInColumns;
    };

    const renderColumns = () => {
        const childrenColumns = itemsInColumns();
        const columnWidth = `${100 / childrenColumns.length}%`;

        const columnAttributes = {
            style: {
                width: columnWidth
            }
        };

        return childrenColumns.map((items: any, i: number) => (
            <ul key={i} className="masonry-column" {...columnAttributes}>
                {items}
            </ul>
        ));
    };

    useEffect(() => {
        reCalculateColumnCount();
    }, [breakpointCols]);

    useEffect(() => {
        window.addEventListener("resize", reCalculateColumnCountDebounce);
        return () => window.removeEventListener("resize", reCalculateColumnCountDebounce);
    }, []);

    return <div className="masonry">{renderColumns()}</div>;
};
