import type { GetServerSidePropsContext } from "next";
import type { BaseResponse } from "types/response";
import fetchJson from "./lib.fetch";

type ResponsePost = BaseResponse & {
    data: any;
};

export default async function getServerPost(ctx: GetServerSidePropsContext): Promise<ResponsePost> {
    const { params, req } = ctx;
    const slug = params?.post;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;

    const post = await fetchJson<ResponsePost>(`${host}/v1/fonts/${slug}`);
    return post;
}
