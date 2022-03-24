import type { CSSProperties } from "react";
import type { BasePost } from "types/post";

import NextDynamic from "next/dynamic";

const PreviewFont = NextDynamic(() => import("components/Preview/PreviewFont"));
const PreviewBlog = NextDynamic(() => import("components/Preview/PreviewBlog"));
const PreviewGoods = NextDynamic(() => import("components/Preview/PreviewGoods"));

type PreviewPostProps = {
    post?: BasePost;
    style?: CSSProperties;
    initTab?: string | null;
};

export default function PreviewPost(props: PreviewPostProps) {
    const { post, initTab } = props;
    if (!post) return <div>Loading...</div>;
    switch (post.type) {
        case "font":
            return <PreviewFont post={post} tab={initTab} />;
        case "article":
            return <PreviewBlog post={post} />;
        case "blog":
            return <PreviewBlog post={post} />;
        case "goods":
            return <PreviewGoods post={post} />;
        default:
            return <div>404</div>;
    }
}
