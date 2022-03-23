import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ResponseSession } from "types/session";
import NextLink from "next/link";
import { getServerSession } from "libs/get-server-session";
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

const links: { label: string; type: string }[] = [
    { label: "Font", type: "font" },
    { label: "Article", type: "article" },
    { label: "Goods", type: "goods" }
];

export default function Page(props: PageProps) {
    return (
        <>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "1em",
                    position: "sticky",
                    top: "var(--header-height)",
                    backgroundColor: "var(--accents-1)",
                    zIndex: 10,
                    height: "var(--header-height)"
                }}
            >
                {links.map((item, i) => (
                    <li key={i}>
                        <NextLink
                            href={{
                                pathname: "/new",
                                query: { type: item.type }
                            }}
                        >
                            <a>
                                <span>{item.label}</span>
                            </a>
                        </NextLink>
                    </li>
                ))}
            </ul>

            <Editor type={props.type} />
        </>
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
