import { Component, Children } from "react";

type MasonryProps = {
    breakpointCols?: {
        [key: number]: number;
        default: number;
    };
};

const DEFAULT_COLUMNS = 2;

class Masonry extends Component<MasonryProps, { columnCount: number }> {
    constructor(props: MasonryProps) {
        super(props);

        // Correct scope for when methods are accessed externally
        this.reCalculateColumnCount = this.reCalculateColumnCount.bind(this);
        this.reCalculateColumnCountDebounce = this.reCalculateColumnCountDebounce.bind(this);

        // default state
        let columnCount: number;
        if (this.props.breakpointCols && this.props.breakpointCols.default) {
            columnCount = this.props.breakpointCols.default;
        } else {
            // @ts-ignore
            columnCount = parseInt(this.props.breakpointCols) || DEFAULT_COLUMNS;
        }

        this.state = {
            columnCount
        };
    }

    componentDidMount() {
        this.reCalculateColumnCount();

        // window may not be available in some environments
        if (window) {
            window.addEventListener("resize", this.reCalculateColumnCountDebounce);
        }
    }

    componentDidUpdate() {
        this.reCalculateColumnCount();
    }

    componentWillUnmount() {
        if (window) {
            window.removeEventListener("resize", this.reCalculateColumnCountDebounce);
        }
    }

    reCalculateColumnCountDebounce() {
        if (!window || !window.requestAnimationFrame) {
            // IE10+
            this.reCalculateColumnCount();
            return;
        }

        if (window.cancelAnimationFrame) {
            // IE10+
            // @ts-ignore
            window.cancelAnimationFrame(this._lastRecalculateAnimationFrame);
        }

        // @ts-ignore
        this._lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
            this.reCalculateColumnCount();
        });
    }

    reCalculateColumnCount() {
        const windowWidth = (window && window.innerWidth) || Infinity;
        let breakpointColsObject = this.props.breakpointCols;

        // Allow passing a single number to `breakpointCols` instead of an object
        if (typeof breakpointColsObject !== "object") {
            breakpointColsObject = {
                default: breakpointColsObject || DEFAULT_COLUMNS
            };
        }

        let matchedBreakpoint = Infinity;
        let columns = breakpointColsObject.default || DEFAULT_COLUMNS;

        for (let breakpoint in breakpointColsObject) {
            const optBreakpoint = parseInt(breakpoint);
            const isCurrentBreakpoint = optBreakpoint > 0 && windowWidth <= optBreakpoint;

            if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
                matchedBreakpoint = optBreakpoint;
                columns = breakpointColsObject[breakpoint];
            }
        }

        columns = Math.max(1, columns || 1);

        if (this.state.columnCount !== columns) {
            this.setState({
                columnCount: columns
            });
        }
    }

    itemsInColumns() {
        const currentColumnCount = this.state.columnCount;
        const itemsInColumns = new Array(currentColumnCount);

        // Force children to be handled as an array
        const items = Children.toArray(this.props.children);

        for (let i = 0; i < items.length; i++) {
            const columnIndex = i % currentColumnCount;

            if (!itemsInColumns[columnIndex]) {
                itemsInColumns[columnIndex] = [];
            }

            itemsInColumns[columnIndex].push(items[i]);
        }

        return itemsInColumns;
    }

    renderColumns() {
        const childrenInColumns = this.itemsInColumns();
        const columnWidth = `${100 / childrenInColumns.length}%`;
        let className: string | undefined = "my-masonry-grid_column";

        const columnAttributes = {
            style: { width: columnWidth },
            className
        };

        return childrenInColumns.map((items, i) => {
            return (
                <ul {...columnAttributes} key={i}>
                    {items}
                </ul>
            );
        });
    }

    render() {
        const { children, breakpointCols, ...rest } = this.props;

        return (
            <div {...rest} className="my-masonry-grid">
                {this.renderColumns()}
            </div>
        );
    }
}

export default Masonry;
