import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ResponseUser } from "types/user";
import type { ResponsePost } from "types/post";
import getServerUser from "libs/get-server-account";
import getServerPost from "libs/get-server-post";
import NextDynamic from "next/dynamic";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
const PreviewPost = NextDynamic(() => import("components/Preview/PreviewPost"));

export default function Page(props: PageProps) {
    const { tab: serverTab } = props;
    const post = props.post.data;
    return <PreviewPost initTab={serverTab} post={post} />;
}

type ServerProps = {
    user: ResponseUser;
    post: ResponsePost;
    tab?: string | null;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (ctx) => {
    const queries = ctx.query;
    const user = await getServerUser(ctx);
    const post = await getServerPost(ctx);

    if (!user || !user.success || !user.data) return { notFound: true };
    if (!post || !post.success || !post.data) return { notFound: true };

    const isFont = post.data.type === "font";
    if (!queries.tab && isFont)
        return {
            redirect: {
                destination: `/${user.data.userName}/${post.data.slug}?tab=overview`,
                permanent: false
            },
            props: { user, post, tab: "overview" }
        };
    return {
        props: { user, post, tab: isFont ? (queries.tab as string) : null }
    };
};
