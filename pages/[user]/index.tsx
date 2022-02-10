import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { FontType } from "libs/fonts.dummy";
import type { BaseResponse } from "types/response";

import fetchJson from "libs/lib.fetch";
import { LayoutMain } from "components/LayoutMain";

type ResponseFonts = BaseResponse & { data: FontType[] };

type ResponseProfile = BaseResponse & { data: any };

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
    const { params, req } = ctx;
    const slug = params?.user;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;
    const reqProfile = await fetchJson<ResponseProfile>(`${host}/v1/users/${slug}`);
    const reqFonts = await fetchJson<ResponseFonts>(`${host}/v1/fonts/owner/${slug}`);

    if (!reqProfile || !reqProfile.success) {
        return {
            notFound: true
        };
    }

    return {
        props: { profile: reqProfile, slug: slug as string, fonts: reqFonts }
    };
};
