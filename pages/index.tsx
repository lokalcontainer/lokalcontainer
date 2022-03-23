import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { BasePost, ResponsePosts } from "types/post";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextDynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";

import fetchJson from "libs/lib.fetch";
import MasonryNew from "components/Masonry";
import { PostCard } from "components/Utils/PostCard";
import ButtonSVG from "components/Utils/ButtonSVG";
import Loader from "components/Utils/Loader";
import HeaderPost from "components/Header/HeaderPost";

const Dialog = NextDynamic(() => import("@unforma-club/dialog"), { ssr: false });
const PreviewPost = NextDynamic(() => import("components/Preview/PreviewPost"), { ssr: false });

type ServerData = {
    posts: ResponsePosts;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { query, push } = useRouter();
    const serverPosts = props.posts.data;

    const [posts, setPosts] = useState<BasePost[]>(serverPosts.concat(serverPosts));
    const concatMorePosts = async () => {
        const newPosts = await fetchJson<ResponsePosts>("/api/v1/posts", { method: "GET" });
        if (newPosts.success && newPosts.data.length !== 0) {
            const newServerPosts = newPosts.data;
            setTimeout(() => {
                setPosts((prev) => prev.concat(newServerPosts));
            }, 1000);
        }
    };

    const [selectedPost, setSelectedPost] = useState<BasePost | undefined>(undefined);
    useEffect(() => {
        setSelectedPost(() => serverPosts.find((item) => item.slug === query.post));
    }, [query, serverPosts]);

    return (
        <>
            {/* <div style={{ height: "16.66vh" }} /> */}
            <HeaderPost
                style={{ width: "100vw", marginInline: "-1.5em", paddingInline: "1.5em" }}
            />
            <InfiniteScroll
                dataLength={posts.length}
                next={concatMorePosts}
                hasMore={posts.length < 300}
                loader={
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "20vh",
                            color: "var(--accents-6)"
                        }}
                    >
                        <Loader type="ripple" />
                    </div>
                }
                endMessage={
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "20vh",
                            color: "var(--accents-6)"
                        }}
                    >
                        <div style={{ fontSize: "2em", textAlign: "center" }}>
                            You&apos;ve reach the end of the road.
                            <br />
                            Thank you for scrolling.
                        </div>
                    </div>
                }
            >
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
                                author={{
                                    name: item.author.name,
                                    userName: item.author.userName
                                }}
                                link={{
                                    href: {
                                        pathname: "/",
                                        query: { light_box: true, post: item.slug }
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
            </InfiniteScroll>

            <Dialog
                parentId="__next"
                stackId="__main"
                floatId="__lc_portal_post"
                isOpen={!!query.light_box?.includes("true")}
                onRequestClose={() => push("/", "/", { shallow: true, scroll: false })}
                removeOverscrollBehavior
            >
                <ButtonSVG
                    title="Exit"
                    icon="close"
                    style={{ position: "fixed", top: "0.5em", left: "0.5em", zIndex: 10 }}
                    onClick={() => push("/", "/", { shallow: true, scroll: false })}
                />
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
