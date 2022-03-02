import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ResponseSession } from "types/session";
import NextLink from "next/link";
import { getServerSession } from "libs/get-server-session";
import { LayoutMain } from "components/LayoutMain";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: PageProps) {
    return (
        <LayoutMain
            title={`Post New ${
                props.type.substring(0, 1).toUpperCase() +
                props.type.substring(1, props.type.length)
            }`}
        >
            <div>
                <NextLink href="/new?type=font">
                    <a>Font</a>
                </NextLink>
                <NextLink href="/new?type=article">
                    <a>Article</a>
                </NextLink>
                <NextLink href="/new?type=goods">
                    <a>Goods</a>
                </NextLink>
            </div>

            <pre>{JSON.stringify(props, null, 2)}</pre>
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
