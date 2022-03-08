import styles from "styles/footer.module.scss";
import NextDynamic, { DynamicOptions } from "next/dynamic";
import useLightBox from "hooks/use-light-box";

const Measurment = NextDynamic(() => import("components/Utils/Measurement"), {
    ssr: false,
    loading: () => <span>Loading...</span>
});

export default function Footer() {
    const date = new Date();
    const currentYear = date.getFullYear();

    const { lightBox } = useLightBox();

    return (
        <>
            {!lightBox && (
                <footer className={styles.app_footer}>
                    <ul>
                        <li>&copy;2018-{currentYear}</li>
                    </ul>

                    <ul style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <li>
                            <Measurment />
                        </li>
                    </ul>
                </footer>
            )}
        </>
    );
}
