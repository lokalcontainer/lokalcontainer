import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { FontType } from "libs/fonts.dummy";
import type { BaseResponse } from "types/response";

import fetchJson from "libs/lib.fetch";
import { LayoutMain } from "components/LayoutMain";

type ResponseFonts = BaseResponse & { data: FontType[] };

type ResponseProfile = BaseResponse & {
    data: any;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    return (
        <LayoutMain>
            <pre>
                {JSON.stringify({ profile: props.profile.data, fonts: props.fonts.data }, null, 2)}
            </pre>
        </LayoutMain>
    );
}

type ServerProps = {
    profile: any;
    slug: string;
    fonts: ResponseFonts;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (ctx) => {
    const { params } = ctx;
    const slug = params?.user;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const reqProfile = await fetchJson<ResponseProfile>(`${API_URL}/v1/users/${slug}`);
    const reqFonts = await fetchJson<ResponseFonts>(`${API_URL}/v1/fonts/owner/${slug}`);

    return {
        props: { profile: reqProfile, slug: slug as string, fonts: reqFonts },
        notFound: !reqProfile.success
    };
};
