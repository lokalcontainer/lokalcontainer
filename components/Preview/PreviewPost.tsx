import type { CSSProperties } from "react";
import type { BasePost } from "types/post";

import PreviewFont from "./PreviewFont";
import PreviewBlog from "./PreviewBlog";
import PreviewGoods from "./PreviewGoods";

type PreviewPostProps = {
    post?: BasePost;
    style?: CSSProperties;
};

export default function PreviewPost(props: PreviewPostProps) {
    const { post } = props;
    if (!post) return <div>Loading...</div>;

    const isFont = post.type === "font";
    const isBlog = post.type === "blog" || post.type === "article";
    const isGood = post.type === "goods";

    if (isFont) return <PreviewFont post={post} />;
    if (isBlog) return <PreviewBlog post={post} />;
    if (isGood) return <PreviewGoods post={post} />;
    return <div>Not match</div>;
}
