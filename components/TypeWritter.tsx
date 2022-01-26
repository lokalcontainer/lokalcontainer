import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type TextProps = {
    readonly sentences: { text: string; style?: CSSProperties }[];
    readonly typingSpeed?: number;
    readonly pauseTime?: number;
    readonly deletingSpeed?: number;
    readonly loop?: boolean;
    readonly startDelay?: number;
    readonly style?: CSSProperties;
};

const TypeWritter = (props: TextProps) => {
    const {
        sentences,
        typingSpeed = 60,
        pauseTime = 1000,
        deletingSpeed = 20,
        loop = true,
        startDelay = typingSpeed * 4,
        style = {}
    } = props;

    const [text, setText] = useState("");
    const [textStyle, setTextStyle] = useState<CSSProperties | undefined>(undefined);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [writtingSpeed, setWrittingSpeed] = useState(typingSpeed);
    const mountedRef = useRef(false);

    const refText = useRef(text);
    const refTextStyle = useRef(textStyle);
    const refIsDeleting = useRef(isDeleting);
    const refLoopNum = useRef(loopNum);
    const refWrittingSpeed = useRef(writtingSpeed);

    const refTimer = useRef(0);
    const timer1 = useRef(0);
    const timer2 = useRef(0);
    const timer3 = useRef(0);
    const refIsGoingToDelete = useRef(false);
    const refIsFinished = useRef(false);

    clearTimeout(refTimer.current);

    refText.current = text;
    refTextStyle.current = textStyle;
    refIsDeleting.current = isDeleting;
    refLoopNum.current = loopNum;
    refWrittingSpeed.current = writtingSpeed;

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
            clearTimeout(refTimer.current);
            clearTimeout(timer1.current);
            clearTimeout(timer2.current);
            clearTimeout(timer3.current);
        };
    }, []);

    const handleType = useCallback(() => {
        const i = refLoopNum.current % sentences.length;
        const fullText = sentences[i].text;
        const fullTextStyle = sentences[i].style;
        setTextStyle(fullTextStyle);
        setText(
            refIsDeleting.current
                ? fullText.substring(0, refText.current.length - 1)
                : fullText.substring(0, refText.current.length + 1)
        );

        if (!refIsDeleting.current && refText.current === fullText && !refIsGoingToDelete.current) {
            refIsGoingToDelete.current = true;
            // @ts-ignore
            timer1.current = setTimeout(() => {
                setIsDeleting(true);
                setWrittingSpeed(deletingSpeed);
                refIsGoingToDelete.current = false;
            }, pauseTime);
        } else if (refIsDeleting.current && refText.current === "") {
            setIsDeleting(false);
            setWrittingSpeed(typingSpeed);
            setLoopNum(refLoopNum.current + 1);
        }

        if (loop || i !== sentences.length - 1 || refText.current.length !== fullText.length) {
            if (refIsGoingToDelete.current) {
                // @ts-ignore
                timer2.current = setTimeout(() => {
                    // @ts-ignore
                    refTimer.current = setTimeout(handleType, refWrittingSpeed.current);
                }, pauseTime);
            } else {
                // @ts-ignore
                refTimer.current = setTimeout(handleType, refWrittingSpeed.current);
            }
        } else {
            refIsFinished.current = true;
        }
    }, [deletingSpeed, loop, pauseTime, typingSpeed, sentences]);

    useEffect(() => {
        // @ts-ignore
        timer3.current = setTimeout(() => {
            if (!mountedRef.current) return;
            handleType();
        }, startDelay);
    }, [handleType, startDelay]);

    return (
        <span style={{ ...style }}>
            <div style={{ whiteSpace: "pre-line", ...textStyle }}>{text}</div>
        </span>
    );
};

export default TypeWritter;
