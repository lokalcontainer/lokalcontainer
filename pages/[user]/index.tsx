import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { FontType } from "libs/fonts.dummy";
import type { BaseResponse } from "types/response";
import type { ResponseUser } from "types/user";
// import NextImage from "next/image";
import { useRouter } from "next/router";

import fetchJson from "libs/lib.fetch";
import { LayoutMain } from "components/LayoutMain";
import { PostCard } from "components/Utils/PostCard";
import Masonry from "components/Masonry";
import LightBox from "components/LightBox";

type ResponseFonts = BaseResponse & { data: FontType[] };

type ResponseProfile = ResponseUser;

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { profile } = props;
    const {
        data: { name, userName, image, email }
    } = profile;

    const { push } = useRouter();
    return (
        <>
            <LayoutMain title={`${profile.data.name} on L / C`}>
                {/* <div
                    style={{
                        position: "sticky",
                        top: "var(--header-height)",
                        zIndex: 10,
                        backgroundColor: "var(--accents-1)",
                        marginBottom: "calc(var(--grid-gap) / 1)"
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "64px 3fr",
                            border: "1px solid"
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "var(--accents-12)",
                                position: "relative",
                                width: 64,
                                height: 64
                            }}
                        >
                            {image ? (
                                <NextImage
                                    src={image}
                                    width="64"
                                    height="64"
                                    alt={`avatar-${userName}`}
                                    priority
                                />
                            ) : (
                                <NextImage
                                    src="/images/avatars/avatar-frown.png"
                                    width="64"
                                    height="64"
                                    alt={`avatar-${userName}`}
                                    priority
                                />
                            )}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "calc(var(--grid-gap) / 2)",
                                borderLeft: "1px solid"
                            }}
                        >
                            <div
                                style={{
                                    padding: "calc(var(--grid-gap) / 2) var(--grid-gap)",
                                    borderBottom: "1px solid"
                                }}
                            >
                                <span style={{ fontSize: "1.3em" }}>{name}</span>
                            </div>
                            <div style={{ padding: "0 var(--grid-gap)" }}>{email}</div>
                        </div>
                    </div>
                </div> */}

                <div>
                    {props.fonts.data.length !== 0 && (
                        <Masonry
                            breakpointCols={{
                                default: 8,
                                1920: 7,
                                1600: 6,
                                1366: 5,
                                960: 4,
                                720: 3,
                                500: 2
                            }}
                        >
                            {props.fonts.data.map((item, i) => (
                                <PostCard
                                    key={i}
                                    index={i}
                                    label={item.subFamily ? item.subFamily : item.family}
                                    link={{
                                        href: {
                                            pathname: "/[user]",
                                            query: {
                                                user: userName,
                                                lightBox: true,
                                                slug: item.slug
                                            }
                                        },
                                        as: `/typeface/${item.slug}`,
                                        scroll: false,
                                        shallow: true
                                    }}
                                    image={{
                                        url: item.meta.heroImage.url,
                                        width: item.meta.heroImage.width,
                                        height: item.meta.heroImage.height
                                    }}
                                    style={{
                                        backgroundColor: `rgb(${item.meta.heroImage.colors[0]}, ${item.meta.heroImage.colors[1]}, ${item.meta.heroImage.colors[2]})`
                                    }}
                                />
                            ))}
                        </Masonry>
                    )}
                </div>

                {/* <pre>{JSON.stringify({ fonts: props.fonts.data }, null, 2)}</pre> */}
            </LayoutMain>

            <LightBox
                onRequestClose={() =>
                    push("/[user]", `/${userName}`, { shallow: true, scroll: false })
                }
            >
                Lightbox
            </LightBox>
        </>
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
