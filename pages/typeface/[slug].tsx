import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { BaseResponse } from "types/response";
import type { FontType } from "libs/fonts.dummy";

import fetchJson from "libs/lib.fetch";
import { LayoutMain } from "components/LayoutMain";
import { PreviewFont } from "components/Preview/PreviewFont";

type ResponseFont = BaseResponse & {
    data: FontType;
};

type ServerProps = {
    font: ResponseFont;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    return (
        <LayoutMain>
            <PreviewFont font={props.font.data} />
            <pre>{JSON.stringify(props.font.data, null, 2)}</pre>
        </LayoutMain>
    );
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (ctx) => {
    const { params } = ctx;
    const slug = params?.slug;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const reqFont = await fetchJson<ResponseFont>(`${API_URL}/v1/fonts/${slug}`);

    return { props: { font: reqFont }, notFound: !reqFont.success };
};
