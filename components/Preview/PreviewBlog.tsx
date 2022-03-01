import type { BasePost } from "types/post";
import NextImage from "next/image";
import NextLink from "next/link";
import moment from "moment";
import { DUMMY_PARAGRAPH } from "libs/util.contants";

type PreviewBlogProps = {
    post: BasePost;
};

type ButtonIcon = "twitter" | "pinterest" | "linkedin" | "folder" | "love";
type SocialButtonType = {
    type: ButtonIcon;
    href: string;
};

const socialButtons: SocialButtonType[] = [
    { type: "love", href: "https://lokalcontainer.org" },
    { type: "twitter", href: "https://twitter.com" },
    { type: "pinterest", href: "https://pinterest.com" },
    { type: "linkedin", href: "https://linkedin.com" }
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
                    width="24"
                    height="24"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M15.3 5.55a2.9 2.9 0 0 0-2.9 2.847l-.028 1.575a.6.6 0 0 1-.68.583l-1.561-.212c-2.054-.28-4.022-1.226-5.91-2.799-.598 3.31.57 5.603 3.383 7.372l1.747 1.098a.6.6 0 0 1 .034.993L7.793 18.17c.947.059 1.846.017 2.592-.131 4.718-.942 7.855-4.492 7.855-10.348 0-.478-1.012-2.141-2.94-2.141zm-4.9 2.81a4.9 4.9 0 0 1 8.385-3.355c.711-.005 1.316.175 2.669-.645-.335 1.64-.5 2.352-1.214 3.331 0 7.642-4.697 11.358-9.463 12.309-3.268.652-8.02-.419-9.382-1.841.694-.054 3.514-.357 5.144-1.55C5.16 15.7-.329 12.47 3.278 3.786c1.693 1.977 3.41 3.323 5.15 4.037 1.158.475 1.442.465 1.973.538z" />
                </svg>
            );

        case "pinterest":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M8.49 19.191c.024-.336.072-.671.144-1.001.063-.295.254-1.13.534-2.34l.007-.03.387-1.668c.079-.34.14-.604.181-.692a3.46 3.46 0 0 1-.284-1.423c0-1.337.756-2.373 1.736-2.373.36-.006.704.15.942.426.238.275.348.644.302.996 0 .453-.085.798-.453 2.035-.071.238-.12.404-.166.571-.051.188-.095.358-.132.522-.096.386-.008.797.237 1.106a1.2 1.2 0 0 0 1.006.456c1.492 0 2.6-1.985 2.6-4.548 0-1.97-1.29-3.274-3.432-3.274A3.878 3.878 0 0 0 9.2 9.1a4.13 4.13 0 0 0-1.195 2.961 2.553 2.553 0 0 0 .512 1.644c.181.14.25.383.175.59-.041.168-.14.552-.176.68a.41.41 0 0 1-.216.297.388.388 0 0 1-.355.002c-1.16-.479-1.796-1.778-1.796-3.44 0-2.985 2.491-5.584 6.192-5.584 3.135 0 5.481 2.329 5.481 5.14 0 3.532-1.932 6.104-4.69 6.104a2.508 2.508 0 0 1-2.046-.959l-.043.177-.207.852-.002.007c-.146.6-.248 1.017-.288 1.174-.106.355-.24.703-.4 1.04a8 8 0 1 0-1.656-.593zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
            );

        case "linkedin":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 9.55C12.917 8.613 14.111 8 15.5 8a5.5 5.5 0 0 1 5.5 5.5V21h-2v-7.5a3.5 3.5 0 0 0-7 0V21h-2V8.5h2v1.05zM5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-1 2h2V21H4V8.5z" />
                </svg>
            );

        case "folder":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M22 8v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7h19a1 1 0 0 1 1 1zm-9.586-3H2V4a1 1 0 0 1 1-1h7.414l2 2z" />
                </svg>
            );

        case "love":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
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
                border: "1px solid",
                borderRadius: "100%",
                overflow: "hidden",
                backgroundColor: "var(--accents-1)",
                marginBlock: "calc(var(--grid-gap) / 2)"
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
                    padding: "calc(var(--grid-gap) / 1.5)",
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
    return (
        <ul
            style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                width: "calc(var(--header-height) / 1.25)",
                position: "sticky",
                // top: "calc(var(--header-height) * 4.25)",
                top: "calc(var(--header-height) + 1em)"
                // paddingBlock: "calc(var(--grid-gap) / 1.25)",
                // backgroundColor: "magenta"
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
    const { images, title, author, updatedAt } = post;
    const image1 = images[0];

    return (
        <div
            style={{
                width: "100%",
                maxWidth: 800,
                margin: "0 auto"
                // display: "grid",
                // gridTemplateColumns: "max-content 1fr",
                // gap: "calc(var(--grid-gap) * 2)"
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0 }}>
                <SocialButtons />
            </div>

            <div
                style={{
                    padding: "calc(var(--grid-gap) * 2)",
                    // paddingInline: 0,
                    paddingInline: "calc(var(--header-height) + 1em)"
                }}
            >
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
                            width: 40,
                            height: 40
                        }}
                    >
                        <NextImage
                            src={author.image ?? "/images/avatars/avatar-frown.png"}
                            width={40}
                            height={40}
                            quality={100}
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
                        fontFamily: "inherit",
                        textAlign: "justify"
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

                    <figure style={{ marginInline: 0 }}>
                        <figcaption>
                            You can check on the sidebearings and the width of any glyph by taking a
                            look at the grey info panel:
                        </figcaption>

                        <div
                            style={{
                                position: "relative",
                                border: "1px solid",
                                marginBlock: "var(--grid-gap)"
                            }}
                        >
                            <NextImage
                                src={image1.large.url}
                                width={image1.large.width}
                                height={image1.large.height}
                                layout="responsive"
                                quality={100}
                                priority
                            />
                        </div>
                        <figcaption>{title}</figcaption>
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
