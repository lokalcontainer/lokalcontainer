import type { GetServerSidePropsContext, NextPageContext } from "next";
import { ResponseSession } from "types/session";

export const getServerSession = async (
    ctx: GetServerSidePropsContext | NextPageContext
): Promise<ResponseSession> => {
    const { req } = ctx;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const reqUser = await fetch(`${API_URL}/v1/sessions/me`, {
        // @ts-ignore
        headers: req?.headers
    });

    return reqUser.json();
};
