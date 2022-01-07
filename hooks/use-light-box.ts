import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useLightBox() {
    const { query } = useRouter();
    const [state, setState] = useState(() => query.lightBox?.includes("true") || false);

    useEffect(() => {
        if (!query.lightBox) {
            setState(false);
        } else if (query.lightBox.includes("true")) {
            setState(true);
        } else {
            setState(false);
        }

        return () => setState(false);
    }, [query.lightBox]);

    return { lightBox: state };
}
