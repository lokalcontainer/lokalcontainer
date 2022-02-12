import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { FontType } from "libs/fonts.dummy";
import type { BaseResponse } from "types/response";

import fetchJson from "libs/lib.fetch";
import { LayoutMain } from "components/LayoutMain";
import { ResponseUser } from "types/user";

type ResponseFonts = BaseResponse & { data: FontType[] };

type ResponseProfile = ResponseUser;

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { profile } = props;
    const {
        data: { name, userName, id, image, email }
    } = profile;
    return (
        <LayoutMain title={`${profile.data.name} on L / C`}>
            <div
                style={{
                    display: "inline-flex",
                    border: "1px solid",
                    gap: "var(--grid-gap)"
                }}
            >
                <div
                    style={{
                        backgroundColor: "var(--accents-12)",
                        display: "inline-block",
                        position: "relative",
                        width: 64,
                        height: 64
                    }}
                >
                    {image ? (
                        <img
                            src={image}
                            width="64"
                            height="64"
                            alt={`avatar-${userName}`}
                            style={{
                                verticalAlign: "middle",
                                borderRadius: "100%",
                                transform: "scale(0.9)"
                            }}
                        />
                    ) : (
                        <img
                            src="/images/avatars/avatar-frown.png"
                            width="64"
                            height="64"
                            alt={`avatar-${userName}`}
                            style={{
                                verticalAlign: "middle",
                                borderRadius: "100%",
                                transform: "scale(0.9)"
                            }}
                        />
                    )}
                </div>

                <div style={{ paddingRight: "var(--grid-gap)" }}>
                    <div>{name}</div>
                    <div>{email}</div>
                </div>
            </div>

            {/* <pre>
                {JSON.stringify({ profile: props.profile.data, fonts: props.fonts.data }, null, 2)}
            </pre> */}
        </LayoutMain>
    );
}

type ServerProps = {
    profile: ResponseUser;
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
