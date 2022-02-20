import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ResponseUser } from "types/user";
import type { ResponsePost } from "types/post";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import getServerUser from "libs/get-server-account";
import getServerPost from "libs/get-server-post";
import { LayoutMain } from "components/LayoutMain";
import { LayoutPost } from "components/Utils/LayoutPost";
import PreviewPost from "components/Preview/PreviewPost";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { tab: serverTab } = props;
    const { name, userName } = props.user.data;
    const post = props.post.data;
    const [tab, setTab] = useState<string | null | undefined>(serverTab);

    const { query } = useRouter();
    useEffect(() => {
        if (!query.tab) return;
        setTab(query.tab as string);
    }, [query.tab]);

    return (
        <LayoutMain>
            <LayoutPost slug={post.slug} postType={post.type} user={{ userName, fullName: name }}>
                <div
                    style={{
                        minHeight:
                            "calc(100vh - calc(var(--header-height) * 2) - calc(var(--header-height) / 2))"
                    }}
                >
                    <div>
                        {!tab || tab === "overview" ? (
                            <PreviewPost post={post} />
                        ) : (
                            <>
                                <span
                                    style={{
                                        textTransform: "capitalize",
                                        fontSize: "2em",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {tab.replace(/-/g, " ").trim()}
                                </span>
                                <p
                                    style={{
                                        fontSize: "10em",
                                        fontWeight: "bold",
                                        marginBlock: "calc(var(--grid-gap) / 2)",
                                        margin: 0,
                                        lineHeight: 1
                                    }}
                                >
                                    Type Height <br />
                                    in Point &amp; <br />
                                    Millimeter
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </LayoutPost>
        </LayoutMain>
    );
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

    if (!user || !user.success) return { notFound: true };
    if (!post || !post.success) return { notFound: true };
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
