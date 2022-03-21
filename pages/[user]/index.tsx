import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ResponseUser } from "types/user";
import type { BasePost, ResponsePosts } from "types/post";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import NextDynamic from "next/dynamic";

import fetchJson from "libs/lib.fetch";
import getServerUser from "libs/get-server-account";
import LayoutMain from "components/LayoutMain";
import Masonry from "components/Masonry";
import LayoutUser from "components/Utils/LayoutUser";
import { PostCard } from "components/Utils/PostCard";
import PreviewPost from "components/Preview/PreviewPost";

const Dialog = NextDynamic(() => import("@unforma-club/dialog"), { ssr: false });

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { profile, posts } = props;
    const {
        data: { userName }
    } = profile;

    const { push, query, asPath } = useRouter();
    const serverPosts = posts.data;
    const newPosts = serverPosts.concat(serverPosts, serverPosts, serverPosts, serverPosts);
    // const newPosts = serverPosts;

    const [selectedPost, setSelectedPost] = useState<BasePost | undefined>(undefined);

    useEffect(() => {
        setSelectedPost(() => serverPosts.find((item) => item.slug === query.post));
    }, [query, serverPosts]);

    return (
        <>
            <NextSeo
                title={`${profile.data.name} on L - C`}
                description={`${profile.data.name} is a bla bla bla...`}
                canonical={`${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`}
                openGraph={{
                    title: `${profile.data.name} on L - C`,
                    description: `${profile.data.name} is a bla bla bla...`,
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${profile.data.userName}`,
                    type: "profile",
                    profile: {
                        firstName: profile.data.name.split(" ").shift(),
                        lastName: profile.data.name.split(" ").pop(),
                        username: profile.data.userName
                    },
                    images: [
                        {
                            url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/avatars/avatar-frown.png`,
                            width: 128,
                            height: 128,
                            alt: `${profile.data.userName}-avatar-image`
                        }
                    ]
                }}
            />

            <LayoutMain title={`${profile.data.name} on L / C`}>
                <LayoutUser user={profile}>
                    {newPosts.length !== 0 && (
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
                            {newPosts.map((item, i) => (
                                <PostCard
                                    key={i}
                                    index={i}
                                    label={item.title}
                                    type={item.type}
                                    link={{
                                        href: {
                                            pathname: "/[user]",
                                            query: {
                                                light_box: true,
                                                post: item.slug,
                                                index: i,
                                                user: item.slug,
                                                type: item.type
                                            }
                                        },
                                        as: `/${item.author.userName}/${item.slug}`,
                                        scroll: false,
                                        shallow: true,
                                        passHref: true
                                    }}
                                    image={{
                                        url: item.images[0].small.url,
                                        width: item.images[0].small.width,
                                        height: item.images[0].small.height
                                    }}
                                    style={{
                                        backgroundColor: `rgb(${item.images[0].dominant.r}, ${item.images[0].dominant.g}, ${item.images[0].dominant.b})`
                                    }}
                                />
                            ))}
                        </Masonry>
                    )}
                </LayoutUser>
            </LayoutMain>

            <Dialog
                isOpen={!!query.light_box?.includes("true")}
                onRequestClose={() =>
                    push("/[user]", `/${userName}`, { shallow: true, scroll: false })
                }
                parentId="__next"
                stackId="__main"
                floatId="__lc_portal"
            >
                <button
                    onClick={() =>
                        push("/[user]", `/${userName}`, { shallow: true, scroll: false })
                    }
                    name="Exit"
                    title="Exit"
                    style={{
                        appearance: "none",
                        background: "none",
                        border: "1px solid",
                        borderRadius: "100%",
                        padding: 0,
                        margin: 0,
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        fontWeight: "bold",
                        cursor: "pointer",
                        aspectRatio: "1/1",
                        width: "1.3em",
                        height: "1.3em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        position: "fixed",
                        top: "1em",
                        left: "1em",
                        zIndex: 10
                    }}
                >
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.3em"
                            width="1.3em"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                    </span>
                </button>
                <PreviewPost post={selectedPost} />
            </Dialog>
        </>
    );
}

type ServerProps = {
    profile: ResponseUser;
    slug: string;
    posts: ResponsePosts;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (ctx) => {
    const { params, req } = ctx;
    const slug = params?.user;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;
    const profile = await getServerUser(ctx);

    const posts = await fetchJson<ResponsePosts>(`${host}/v1/posts/owner/${slug}`);

    if (!profile || !profile.success || !profile.data) return { notFound: true };
    return {
        props: { profile, slug: slug as string, posts }
    };
};
