import TypeWritter from "./TypeWritter";

const LCap = () => {
    return (
        <svg
            width="2.5em"
            height="2.5em"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M7.48,3V18h12v3H4.5V3Z" />
        </svg>
    );
};

const CCap = () => {
    return (
        <svg
            width="2.5em"
            height="2.5em"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M17.66,14.89c-.09,0-.2.13-.24.22a5.36,5.36,0,0,1-5.21,3.23,5.41,5.41,0,0,1-5.39-3.63A8.46,8.46,0,0,1,6.43,11,5.85,5.85,0,0,1,7.52,8a5.41,5.41,0,0,1,4.55-2.12c2.33,0,4.23.77,5.32,3a.41.41,0,0,0,.26.19h2.88a8.15,8.15,0,0,0-2-3.69,8.34,8.34,0,0,0-7.19-2.59A8.22,8.22,0,0,0,4.23,8.09a10.49,10.49,0,0,0-.46,6.43,8,8,0,0,0,4.69,5.95,9.24,9.24,0,0,0,6,.5,7.72,7.72,0,0,0,6-5.78,1.3,1.3,0,0,0,0-.31C19.54,14.88,18.6,14.87,17.66,14.89Z" />
        </svg>
    );
};

const Logo = () => {
    const text = "Lokal Container".replace(/\s/g, "\n");
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "inline-flex",
                alignItems: "center",
                textTransform: "uppercase",
                fontSize: "2em",
                height: "100%",
                filter: "drop-shadow(0 0 var(--grid-gap) var(--accents-pink))"
                // backgroundColor: "var(--accents-1)"
            }}
        >
            <li>
                <span>
                    <LCap />
                </span>
            </li>
            <li>
                <TypeWritter
                    sentences={[
                        { text, style: { fontSize: "0.75em", fontFamily: "serif" } },
                        { text, style: { fontSize: "0.75em", fontFamily: "BDO Grotesk" } },
                        { text, style: { fontSize: "0.75em", fontFamily: "monospace" } }
                    ]}
                    typingSpeed={40}
                    pauseTime={2000}
                    startDelay={1000}
                    style={{
                        display: "block",
                        height: "calc(var(--grid-gap) * 4)"
                    }}
                />
            </li>
            <li>
                <span>
                    <CCap />
                </span>
            </li>
        </ul>
    );
};

export default Logo;
