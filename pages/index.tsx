import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import NextDynamic from "next/dynamic";

import type { BasePost, ResponsePosts } from "types/post";
import fetchJson from "libs/lib.fetch";
import MasonryNew from "components/Masonry";
import { LayoutMain } from "components/LayoutMain";
import { PostCard } from "components/Utils/PostCard";

const LightBox = NextDynamic(() => import("components/LightBox"), { ssr: false });
const PreviewPost = NextDynamic(() => import("components/Preview/PreviewPost"), { ssr: false });

type ServerData = {
    posts: ResponsePosts;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { query, push } = useRouter();
    const serverPosts = props.posts.data;
    const newPosts = serverPosts.concat(serverPosts, serverPosts, serverPosts, serverPosts);
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
                        default: 8,
                        2200: 7,
                        1920: 6,
                        1680: 5,
                        1440: 4,
                        1280: 3,
                        960: 2
                    }}
                >
                    {props.posts.success &&
                        posts.length !== 0 &&
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
                                        query: { lightBox: true, post: item.slug, index: i }
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

            <LightBox
                title={`${selectedPost?.title} by ${selectedPost?.author.name}`}
                onRequestClose={() => push("/", "/", { shallow: true, scroll: false })}
            >
                <PreviewPost post={selectedPost} />
            </LightBox>
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
