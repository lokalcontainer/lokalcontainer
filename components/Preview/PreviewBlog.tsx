import styles from "styles/preview.module.scss";
import type { BasePost } from "types/post";
import NextImage from "next/image";
import NextLink from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import { DUMMY_PARAGRAPH } from "libs/util.contants";

type PreviewBlogProps = {
    post: BasePost;
};

type ButtonIcon = "twitter" | "pinterest" | "linkedin" | "folder" | "love" | "link";
type SocialButtonType = {
    type: ButtonIcon;
    href: string;
};

const socialButtons: SocialButtonType[] = [
    { type: "love", href: "https://lokalcontainer.org" },
    { type: "twitter", href: "https://twitter.com" },
    { type: "pinterest", href: "https://pinterest.com" },
    { type: "linkedin", href: "https://linkedin.com" },
    { type: "link", href: "https://linkedin.com" }
];

type SocialButtonProps = {
    item: SocialButtonType;
};

type SocialButtonIconProps = {
    icon: ButtonIcon;
};

const SocialButtonIcon = ({ icon }: SocialButtonIconProps) => {
    switch (icon) {
        case "twitter":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                </svg>
            );

        case "pinterest":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13.37 2.094A10.003 10.003 0 0 0 8.002 21.17a7.757 7.757 0 0 1 .163-2.293c.185-.839 1.296-5.463 1.296-5.463a3.739 3.739 0 0 1-.324-1.577c0-1.485.857-2.593 1.923-2.593a1.334 1.334 0 0 1 1.342 1.508c0 .9-.578 2.262-.88 3.54a1.544 1.544 0 0 0 1.575 1.923c1.898 0 3.17-2.431 3.17-5.301 0-2.2-1.457-3.848-4.143-3.848a4.746 4.746 0 0 0-4.93 4.794 2.96 2.96 0 0 0 .648 1.97.48.48 0 0 1 .162.554c-.046.184-.162.623-.208.784a.354.354 0 0 1-.51.254c-1.384-.554-2.036-2.077-2.036-3.816 0-2.847 2.384-6.255 7.154-6.255 3.796 0 6.32 2.777 6.32 5.747 0 3.909-2.177 6.848-5.394 6.848a2.861 2.861 0 0 1-2.454-1.246s-.578 2.316-.692 2.754a8.026 8.026 0 0 1-1.019 2.131c.923.28 1.882.42 2.846.416a9.988 9.988 0 0 0 9.996-10.003 10.002 10.002 0 0 0-8.635-9.903z" />
                </svg>
            );

        case "linkedin":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                </svg>
            );

        case "love":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" />
                </svg>
            );

        case "link":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm6.355-6.048v-.105c0-.922 0-1.343-.652-1.716a7.374 7.374 0 0 0-.645-.325c-.367-.167-.61-.276-.938-.756a12.014 12.014 0 0 1-.116-.172c-.345-.525-.594-.903-1.542-.753-1.865.296-2.003.624-2.085 1.178l-.013.091c-.121.81-.143 1.082.195 1.437 1.265 1.327 2.023 2.284 2.253 2.844.112.273.4 1.1.202 1.918a8.185 8.185 0 0 0 3.151-2.237c.11-.374.19-.84.19-1.404zM12 3.833c-2.317 0-4.41.966-5.896 2.516.177.123.331.296.437.534.204.457.204.928.204 1.345 0 .328 0 .64.105.865.144.308.766.44 1.315.554.197.042.399.084.583.135.506.14.898.595 1.211.96.13.151.323.374.42.43.05-.036.211-.211.29-.498.062-.22.044-.414-.045-.52-.56-.66-.529-1.93-.356-2.399.272-.739 1.122-.684 1.744-.644.232.015.45.03.614.009.622-.078.814-1.025.949-1.21.292-.4 1.186-1.003 1.74-1.375A8.138 8.138 0 0 0 12 3.833z" />
                </svg>
            );

        default:
            return <></>;
    }
};

const SocialButton = ({ item }: SocialButtonProps) => {
    const { type, href } = item;

    return (
        <li
            style={{
                aspectRatio: "1/1",
                width: "1.5em",
                borderRadius: "100%",
                overflow: "hidden",
                backgroundColor: "var(--accents-12)",
                color: "var(--accents-1)"
            }}
        >
            <a
                title={`Share to ${type}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "calc(var(--grid-gap) / 2)",
                    overflow: "hidden"
                }}
            >
                <span
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <SocialButtonIcon icon={type} />
                </span>
            </a>
        </li>
    );
};

const SocialButtons = () => {
    const { pathname } = useRouter();
    const isPage = pathname === "/[user]/[post]";
    return (
        <ul
            style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                marginBottom: "1em",
                position: "sticky",
                display: "flex",
                alignItems: "center",
                height: "calc(var(--header-height) * 1)",
                backgroundColor: "var(--accents-1)",
                backdropFilter: "blur(3px)",
                zIndex: 1,
                gap: "calc(var(--grid-gap) / 1.5)",
                top: isPage ? "var(--header-height)" : 0,
                marginTop: !isPage ? "calc(0px - var(--header-height))" : 0
            }}
        >
            {socialButtons.map((item, i) => (
                <SocialButton key={i} item={item} />
            ))}
        </ul>
    );
};

export default function PreviewBlog(props: PreviewBlogProps) {
    const { post } = props;
    const { images, title, author, updatedAt, slug } = post;
    const image1 = images[0];

    return (
        <div className={styles.blog}>
            <div className={styles.left}>
                <div>
                    <div
                        style={{
                            height: "var(--header-height)",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        On this page
                    </div>
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            marginBlock: "1.5em",
                            display: "flex",
                            flexDirection: "column",
                            gap: "calc(var(--grid-gap) * 1)"
                        }}
                    >
                        <li style={{ fontSize: "0.85em", color: "var(--accents-8)" }}>
                            Localized name
                        </li>
                        <li style={{ fontSize: "0.85em", color: "var(--accents-8)" }}>
                            Style linking
                        </li>
                        <li style={{ fontSize: "0.85em", color: "var(--accents-8)" }}>
                            Naming for Windows and Office
                        </li>
                        <li style={{ fontSize: "0.85em", color: "var(--accents-8)" }}>
                            Naming for Adobe menus
                        </li>
                        <li style={{ fontSize: "0.85em", color: "var(--accents-8)" }}>
                            Compatible name table
                        </li>
                        <li style={{ fontSize: "0.85em", color: "var(--accents-8)" }}>
                            Name Table Entries
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.center}>
                <SocialButtons />

                <div
                    style={{
                        display: "flex",
                        gap: "calc(var(--grid-gap) * 2)",
                        alignItems: "start"
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            borderRadius: "100%",
                            overflow: "hidden",
                            width: "3em",
                            height: "3em"
                        }}
                    >
                        <NextImage
                            src={author.image ?? "/images/avatars/avatar-frown.png"}
                            width={48}
                            height={48}
                            quality={100}
                            layout="responsive"
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
                        When doing the spacing of a Latin alphabet, it is a good idea to start out
                        with n and o. Once those two letters have proper sidebearings, the rest is
                        relatively easy. So, I recommend you type something like{" "}
                        <code>noononno</code> and fiddle around with those sidebearings until
                        you&apos;re satisfied. The string contains an n between two o&apos;s, an o
                        between two n&apos;s, double-o and double-n: if you manage to make them all
                        appear, for your eyes, equidistant to each other, you win.
                    </p>

                    <blockquote>
                        <p>
                            <strong>Tip: </strong>
                            Make sure you do your spacing in the correct size. If you are zoomed in
                            too much, you will tend to make it too tight. Consider opening the
                            Preview area at the bottom with the eye symbol in the bottom left corner
                            of the window. You can drag its separator line to the intended reading
                            size. The Preview area has options for blurring and flipping your text
                            so you can keep a fresh look at your design.
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

                    <figure style={{ marginInline: "var(--header-height)", marginBlock: "3em" }}>
                        <figcaption>
                            You can check on the sidebearings and the width of any glyph by taking a
                            look at the grey info panel:
                        </figcaption>

                        <div
                            style={{
                                position: "relative",
                                marginBlock: "1em"
                            }}
                        >
                            <NextImage
                                src={image1.large.url}
                                width={image1.large.width}
                                height={image1.large.height}
                                layout="responsive"
                                quality={100}
                                priority
                                alt={`image-${slug}`}
                            />
                        </div>
                        {/* <figcaption>{title}</figcaption> */}
                        <figcaption>
                            There are many variations of passages of Lorem Ipsum available, but the
                            majority have suffered alteration in some form, by injected humour, or
                            randomised words which don't look even slightly believable.
                        </figcaption>
                    </figure>

                    <p>
                        You can access the same values through the glyph info area in the bottom
                        left of the Font tab. Or the LSB and RSB columns in list mode. You may need
                        to activate the columns first via the context menu of the list header. You
                        can rearrange the column order by dragging the column headers.
                    </p>

                    <p>{DUMMY_PARAGRAPH}</p>
                </article>
            </div>
        </div>
    );
}
