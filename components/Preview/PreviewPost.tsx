import type { CSSProperties } from "react";
import type { BasePost } from "types/post";

import { useRouter } from "next/router";
import PreviewFont from "./PreviewFont";
import PreviewBlog from "./PreviewBlog";
import PreviewGoods from "./PreviewGoods";

type PreviewPostProps = {
    post?: BasePost;
    style?: CSSProperties;
};

export default function PreviewPost(props: PreviewPostProps) {
    const { post } = props;
    const { pathname } = useRouter();
    if (!post) return <div>Loading...</div>;

    const { images, slug, author, title } = post;
    const image1 = images[0];

    const isPage = pathname === "/[user]/[post]";

    const isFont = post.type === "font";
    const isBlog = post.type === "blog" || post.type === "article";
    const isGood = post.type === "goods";

    if (isFont) return <PreviewFont post={post} />;
    if (isBlog) return <PreviewBlog post={post} />;
    if (isGood) return <PreviewGoods post={post} />;
    return <div>Not match</div>;
}
