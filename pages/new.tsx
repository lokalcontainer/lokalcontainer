import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ResponseSession } from "types/session";
import NextLink from "next/link";
import { getServerSession } from "libs/get-server-session";
import { LayoutMain } from "components/LayoutMain";
import EditorFont from "components/Editor/EditorFont";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

function EditorBlog() {
    return <div>Create Post Blog</div>;
}
function EditorGoods() {
    return <div>Create Post Goods</div>;
}

type EditorProps = {
    type: string;
};
function Editor({ type }: EditorProps) {
    switch (type) {
        case "font":
            return <EditorFont />;
        case "article":
            return <EditorBlog />;
        case "blog":
            return <EditorBlog />;
        case "goods":
            return <EditorGoods />;
        default:
            return <div>No layout found</div>;
    }
}

export default function Page(props: PageProps) {
    return (
        <LayoutMain>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <li>
                    <NextLink href="/new?type=font">
                        <a>
                            <span>Font</span>
                        </a>
                    </NextLink>
                </li>
                <li>
                    <NextLink href="/new?type=article">
                        <a>
                            <span>Article</span>
                        </a>
                    </NextLink>
                </li>
                <li>
                    <NextLink href="/new?type=goods">
                        <a>
                            <span>Goods</span>
                        </a>
                    </NextLink>
                </li>
            </ul>
            <Editor type={props.type} />
        </LayoutMain>
    );
}

type ServerProps = {
    session: ResponseSession;
    type: string;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (ctx) => {
    const { query } = ctx;
    const session = await getServerSession(ctx);

    // Prevent unauthenticated user for accessing this page
    if (!session || !session.success || !session.data) {
        return {
            redirect: {
                permanent: false,
                destination: `/auth?form=sign-in&callback_url=/new?type=${query.type ?? "font"}`
            }
        };
    }

    // Pass type to the client
    if (!query.type) {
        return {
            redirect: { permanent: false, destination: `/new?type=font` },
            props: { session, type: "font" }
        };
    }

    const allowedType = ["font", "article", "blog", "archive", "goods"];
    if (allowedType.indexOf(query.type as string) === -1) {
        return { notFound: true };
    }

    return { props: { session, type: query.type as string } };
};
