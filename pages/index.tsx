import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { BasePost, ResponsePosts } from "types/post";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import NextDynamic from "next/dynamic";
import Dialog from "@unforma-club/dialog";

import fetchJson from "libs/lib.fetch";
import MasonryNew from "components/Masonry";
import LayoutMain from "components/LayoutMain";
import { PostCard } from "components/Utils/PostCard";

const PreviewPost = NextDynamic(() => import("components/Preview/PreviewPost"), { ssr: false });

type ServerData = {
    posts: ResponsePosts;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { query, push } = useRouter();
    const serverPosts = props.posts.data;
    const newPosts = serverPosts.concat(serverPosts, serverPosts, serverPosts);
    // const newPosts = serverPosts;
    const posts = useMemo(() => newPosts, [newPosts]);

    const [selectedPost, setSelectedPost] = useState<BasePost | undefined>(undefined);

    useEffect(() => {
        setSelectedPost(() => serverPosts.find((item) => item.slug === query.post));
    }, [query, serverPosts]);

    return (
        <>
            <LayoutMain>
                <MasonryNew
                    breakpointCols={{
                        default: 6,
                        2560: 8,
                        2200: 7,
                        1920: 6,
                        1536: 5,
                        1366: 4,
                        1280: 3,
                        810: 2
                    }}
                >
                    {posts.length !== 0 &&
                        posts.map((item, i) => (
                            <PostCard
                                key={i}
                                index={i}
                                label={item.title}
                                type={item.type}
                                author={{ name: item.author.name, userName: item.author.userName }}
                                link={{
                                    href: {
                                        pathname: "/",
                                        query: { light_box: true, post: item.slug, index: i }
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
                </MasonryNew>
            </LayoutMain>

            <Dialog
                isOpen={!!query.light_box?.includes("true")}
                onRequestClose={() => push("/", "/", { shallow: true, scroll: false })}
                parentId="__next"
                stackId="__main"
                floatId="__lc_portal"
                removeOverscrollBehavior
            >
                <button
                    onClick={() => push("/", "/", { shallow: true, scroll: false })}
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

export const getServerSideProps: GetServerSideProps<ServerData> = async (ctx) => {
    const { req } = ctx;
    const protocol = "http";
    const url = req?.headers.host;
    const host = `${protocol}://${url}/api`;
    const posts = await fetchJson<ResponsePosts>(`${host}/v1/posts`, { method: "GET" });
    return { props: { posts } };
};
