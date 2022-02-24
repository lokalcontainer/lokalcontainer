import type { BasePost } from "types/post";
import { useRouter } from "next/router";
import NextImage from "next/image";
import NextLink from "next/link";
import moment from "moment";
import { DUMMY_PARAGRAPH } from "libs/util.contants";

type PreviewBlogProps = {
    post: BasePost;
};

export default function PreviewBlog(props: PreviewBlogProps) {
    const { post } = props;
    const { images, title, author, updatedAt } = post;
    const image1 = images[0];

    const { pathname } = useRouter();
    return (
        <div
            style={{
                width: "100%",
                maxWidth: 800,
                margin: "0 auto",
                backgroundColor: "var(--accents-1)",
                // pointerEvents: "initial",
                padding: "calc(var(--grid-gap) * 2)",
                border: pathname === "/[user]/[post]" ? "none" : "1px solid",
                borderRadius: "var(--grid-gap)"
            }}
        >
            <div style={{ display: "flex", gap: "calc(var(--grid-gap) * 2)", alignItems: "start" }}>
                <div
                    style={{
                        position: "relative",
                        borderRadius: "100%",
                        overflow: "hidden",
                        width: 40,
                        height: 40
                    }}
                >
                    <NextImage
                        src={author.image ?? "/images/avatars/avatar-frown.png"}
                        width={40}
                        height={40}
                        // layout="responsive"
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%"
                    }}
                >
                    <NextLink
                        href={{
                            pathname: "/[user]",
                            query: { user: author.userName }
                        }}
                    >
                        <a>
                            <span>{author.name}</span>
                        </a>
                    </NextLink>
                    <div style={{ fontSize: "0.75em" }}>
                        {moment(updatedAt).startOf("hour").fromNow()}
                    </div>
                </div>
            </div>

            <article
                style={{
                    lineHeight: 1.5,
                    fontFamily: "inherit"
                }}
            >
                <h1>{title}</h1>

                <p>
                    When doing the spacing of a Latin alphabet, it is a good idea to start out with
                    n and o. Once those two letters have proper sidebearings, the rest is relatively
                    easy. So, I recommend you type something like <code>noononno</code> and fiddle
                    around with those sidebearings until you&apos;re satisfied. The string contains
                    an n between two o&apos;s, an o between two n&apos;s, double-o and double-n: if
                    you manage to make them all appear, for your eyes, equidistant to each other,
                    you win.
                </p>

                <blockquote>
                    <p>
                        <strong>Tip: </strong>
                        Make sure you do your spacing in the correct size. If you are zoomed in too
                        much, you will tend to make it too tight. Consider opening the Preview area
                        at the bottom with the eye symbol in the bottom left corner of the window.
                        You can drag its separator line to the intended reading size. The Preview
                        area has options for blurring and flipping your text so you can keep a fresh
                        look at your design.
                    </p>
                </blockquote>

                <h2>Prerequisites</h2>

                <ul>
                    <li>
                        <em>Github</em> account -- create one if you don&apos;t have it.
                    </li>
                    <li>
                        <em>Node.js</em> installed in your development machine -- recomemnd LTS
                        version
                    </li>
                    <li>
                        Basic knowledge of <em>Typescript</em> -- learn it and it will make your
                        life easier.
                    </li>
                </ul>

                <figure style={{ marginInline: 0 }}>
                    <figcaption>
                        You can check on the sidebearings and the width of any glyph by taking a
                        look at the grey info panel:
                    </figcaption>

                    <NextImage
                        src={image1.large.url}
                        width={image1.large.width}
                        height={image1.large.height}
                        layout="responsive"
                        priority
                    />
                    <figcaption>{title}</figcaption>
                </figure>

                <p>
                    You can access the same values through the glyph info area in the bottom left of
                    the Font tab. Or the LSB and RSB columns in list mode. You may need to activate
                    the columns first via the context menu of the list header. You can rearrange the
                    column order by dragging the column headers.
                </p>

                <p>{DUMMY_PARAGRAPH}</p>
            </article>

            {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
        </div>
    );
}
