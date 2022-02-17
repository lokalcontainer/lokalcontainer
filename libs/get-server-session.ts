import type { GetServerSidePropsContext, NextPageContext } from "next";
import type { ResponseSession } from "types/session";
import fetchJson from "./lib.fetch";

export const getServerSession = async (
    ctx: GetServerSidePropsContext | NextPageContext
): Promise<ResponseSession> => {
    const { req } = ctx;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;
    const reqUser = await fetchJson<ResponseSession>(`${host}/v1/sessions/me`, {
        // @ts-ignore
        headers: req?.headers,
        method: "GET"
    });

    return reqUser;
};
