import { BasePost } from "types/post";

type PreviewGoodsProps = {
    post: BasePost;
};

export default function PreviewGoods(props: PreviewGoodsProps) {
    const { post } = props;
    return (
        <div>
            <div>Preview Goods</div>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
    );
}
