import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ResponseUser } from "types/user";
import type { BaseResponse } from "types/response";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import getServerUser from "libs/get-server-account";
import getServerPost from "libs/get-server-post";
import { LayoutMain } from "components/LayoutMain";
import { LayoutPost } from "components/Utils/LayoutPost";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    const { tab: serverTab } = props;
    const { name, userName } = props.user.data;
    const post = props.post.data;
    const [tab, setTab] = useState(serverTab);

    const { query } = useRouter();
    useEffect(() => {
        if (!query.tab) return;
        setTab(query.tab as string);
    }, [query.tab]);

    return (
        <LayoutMain>
            <LayoutPost slug={post.slug} user={{ userName, fullName: name }}>
                <div style={{ minHeight: "150vh" }}>
                    <div>
                        <span
                            style={{
                                textTransform: "capitalize",
                                fontSize: "2em",
                                fontWeight: "bold"
                            }}
                        >
                            {tab.replace(/-/g, " ").trim()}
                        </span>
                    </div>
                </div>
            </LayoutPost>
        </LayoutMain>
    );
}

type ServerProps = {
    user: ResponseUser;
    post: BaseResponse & {
        data: any;
    };
    tab: string;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (ctx) => {
    const queries = ctx.query;
    const user = await getServerUser(ctx);
    const post = await getServerPost(ctx);

    if (!user || !user.success) return { notFound: true };
    if (!post || !post.success) return { notFound: true };
    return {
        props: {
            user,
            post,
            tab: queries.tab ? (queries.tab as string) : "overview"
        }
    };
};
