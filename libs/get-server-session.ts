import type { GetServerSidePropsContext, NextPageContext } from "next";
import { ResponseSession } from "types/session";

export const getServerSession = async (
    ctx: GetServerSidePropsContext | NextPageContext
): Promise<ResponseSession> => {
    const { req } = ctx;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;
    const reqUser = await fetch(`${host}/v1/sessions/me`, {
        // @ts-ignore
        headers: req?.headers
    });

    return reqUser.json();
};
