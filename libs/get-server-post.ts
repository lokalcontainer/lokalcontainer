import type { GetServerSidePropsContext } from "next";
import fetchJson from "./lib.fetch";
import type { ResponsePost } from "types/post";

export default async function getServerPost(ctx: GetServerSidePropsContext): Promise<ResponsePost> {
    const { params, req } = ctx;
    const slug = params?.post;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;

    const post = await fetchJson<ResponsePost>(`${host}/v1/posts/${slug}`, { method: "GET" });
    return post;
}
