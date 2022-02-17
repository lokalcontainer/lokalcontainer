import type { GetServerSidePropsContext } from "next";
import type { ResponseUser } from "types/user";
import fetchJson from "./lib.fetch";

export default async function getServerUser(ctx: GetServerSidePropsContext): Promise<ResponseUser> {
    const { params, req } = ctx;
    const slug = params?.user;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;

    const reqProfile = await fetchJson<ResponseUser>(`${host}/v1/users/${slug}`);

    return reqProfile;
}
