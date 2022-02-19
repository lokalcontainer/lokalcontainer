import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { getServerSession } from "libs/get-server-session";
import fetchJson from "libs/lib.fetch";
import { useSession } from "components/Context/ContextSession";
import { LayoutMain } from "components/LayoutMain";

const CustomForm = () => {
    const { query } = useRouter();
    const { session } = useSession();
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    title: "",
                    type: query.type ? (query.type as string) : "font",
                    image: "a-1.jpeg"
                }}
                onSubmit={(v) => {
                    if (!v.title) return;
                    const slug = encodeURI(v.title.replace(/\s/g, "-").toLowerCase());
                    fetchJson("/api/v1/posts", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: v.title, slug, type: v.type, image: v.image })
                    })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));
                }}
            >
                {({ values, handleSubmit, handleChange }) => (
                    <>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <div>Title</div>
                                <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    placeholder="Put title here"
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                <div>Post Type</div>
                                <select value={values.type} name="type" onChange={handleChange}>
                                    <option value="font">Font</option>
                                    <option value="blog">Blog</option>
                                    {session && session.role >= 4 && (
                                        <option value="goods">Goods</option>
                                    )}
                                </select>
                            </label>

                            <label>
                                <div>Image</div>
                                <select value={values.image} name="image" onChange={handleChange}>
                                    {Array(20)
                                        .fill("")
                                        .map((_i, i) => (
                                            <option key={i} value={`a-${i + 1}.jpeg`}>
                                                {`a-${i + 1}.jpeg`}
                                            </option>
                                        ))}
                                </select>
                            </label>

                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default function Page(props: any) {
    return (
        <LayoutMain>
            <CustomForm />
        </LayoutMain>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerSession(ctx);
    if (!session || !session.success) {
        return {
            redirect: {
                destination: `/auth?form=sign-in&callback_url=/post/new?type=${
                    ctx.query.type ?? "font"
                }`,
                permanent: false
            }
        };
    }
    return { props: { session, type: ctx.query.type ?? "font" } };
};
