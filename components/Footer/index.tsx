import styles from "styles/footer.module.scss";
import NextDynamic from "next/dynamic";
import useLightBox from "hooks/use-light-box";

const Measurment = NextDynamic(() => import("components/Utils/Measurement"), {
    ssr: false,
    loading: () => <span>Loading...</span>
});

export const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    const { lightBox } = useLightBox();

    return (
        <>
            {!lightBox && (
                <footer className={styles.app_footer}>
                    <ul>
                        <li>&copy;{currentYear}</li>
                    </ul>

                    <ul>
                        <li>
                            <Measurment />
                        </li>
                    </ul>
                </footer>
            )}
        </>
    );
};
