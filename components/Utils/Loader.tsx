type LoaderProps = {
    type: "ripple";
};
export default function Loader(props: LoaderProps) {
    const { type } = props;

    switch (type) {
        case "ripple":
            return (
                <ul className="__loading_ripple">
                    {Array(2)
                        .fill(true)
                        .map((_i, i) => (
                            <li key={i} />
                        ))}
                </ul>
            );

        default:
            return (
                <ul className="__loading_ripple">
                    {Array(4)
                        .fill(true)
                        .map((_i, i) => (
                            <li key={i} />
                        ))}
                </ul>
            );
    }
}
