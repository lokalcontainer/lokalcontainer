import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { fonts, FontType } from "libs/fonts.dummy";
import { LayoutMain } from "components/LayoutMain";
import { PreviewFont } from "components/Preview/PreviewFont";

type ServerProps = {
    font: FontType;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page(props: PageProps) {
    return (
        <LayoutMain>
            <PreviewFont font={props.font} />
        </LayoutMain>
    );
}

export const getStaticProps: GetStaticProps<ServerProps> = async (ctx) => {
    const { params } = ctx;
    const slug = params?.slug as string;
    const font = fonts.find((item) => item.slug === slug);

    if (!font) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }

    return { props: { font }, revalidate: 100 };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: fonts.map((item) => ({ params: { slug: item.slug } })), fallback: "blocking" };
};
