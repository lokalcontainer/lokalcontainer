import Lottie, { LottieComponentProps } from "lottie-react";
import logo from "../../public/logo-white.json";

type LogoAnimateProps = LottieComponentProps & {};

export default function LogoAnimate(props: LogoAnimateProps) {
    const isProduction = process.env.NODE_ENV === "production";

    return (
        <Lottie
            loop={isProduction}
            autoplay={isProduction}
            animationData={logo}
            data-lottie={true}
            {...props}
        />
    );
}
