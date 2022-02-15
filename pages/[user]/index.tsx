import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { FontType } from "libs/fonts.dummy";
import type { BaseResponse } from "types/response";
import type { ResponseUser } from "types/user";
import { useRouter } from "next/router";

import fetchJson from "libs/lib.fetch";
import { LayoutMain } from "components/LayoutMain";
import { LayoutUser } from "components/Utils/LayoutUser";
import { PostCard } from "components/Utils/PostCard";
import Masonry from "components/Masonry";
import LightBox from "components/LightBox";

type ResponseFonts = BaseResponse & { data: FontType[] };

type ResponseProfile = ResponseUser;

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { profile } = props;
    const {
        data: { userName }
    } = profile;

    const { push } = useRouter();
    return (
        <>
            <LayoutMain title={`${profile.data.name} on L / C`}>
                <LayoutUser user={profile}>
                    {props.fonts.data.length !== 0 && (
                        <Masonry
                            breakpointCols={{
                                default: 6,
                                1680: 5,
                                1440: 4,
                                1280: 6,
                                1024: 5,
                                860: 4,
                                720: 3,
                                520: 2
                            }}
                        >
                            {props.fonts.data.concat(props.fonts.data).map((item, i) => (
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
                </LayoutUser>

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
