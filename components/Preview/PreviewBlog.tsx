import styles from "styles/preview.module.scss";
import type { BasePost } from "types/post";
import NextImage from "next/image";
import NextLink from "next/link";
import moment from "moment";
import { NextSeo, ArticleJsonLd } from "next-seo";
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
    { type: "twitter", href: "https://twitter.com" },
    { type: "pinterest", href: "https://pinterest.com" },
    { type: "linkedin", href: "https://linkedin.com" },
    { type: "love", href: "https://lokalcontainer.org" },
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
                    width="1.5em"
                    height="1.5em"
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
                    width="1.5em"
                    height="1.5em"
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
                    width="1.5em"
                    height="1.5em"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2.5 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-1 1h2v7.5h-2V10zm5.5.43c.584-.565 1.266-.93 2-.93 2.071 0 3.5 1.679 3.5 3.75v4.25h-2v-4.25a1.75 1.75 0 0 0-3.5 0v4.25h-2V10h2v.43z" />
                </svg>
            );

        case "love":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1.5em"
                    height="1.5em"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z" />
                </svg>
            );

        case "link":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1.5em"
                    height="1.5em"
                    fill="currentColor"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M6.235 6.453a8 8 0 0 0 8.817 12.944c.115-.75-.137-1.47-.24-1.722-.23-.56-.988-1.517-2.253-2.844-.338-.355-.316-.628-.195-1.437l.013-.091c.082-.554.22-.882 2.085-1.178.948-.15 1.197.228 1.542.753l.116.172c.328.48.571.59.938.756.165.075.37.17.645.325.652.373.652.794.652 1.716v.105c0 .391-.038.735-.098 1.034a8.002 8.002 0 0 0-3.105-12.341c-.553.373-1.312.902-1.577 1.265-.135.185-.327 1.132-.95 1.21-.162.02-.381.006-.613-.009-.622-.04-1.472-.095-1.744.644-.173.468-.203 1.74.356 2.4.09.105.107.3.046.519-.08.287-.241.462-.292.498-.096-.056-.288-.279-.419-.43-.313-.365-.705-.82-1.211-.96-.184-.051-.386-.093-.583-.135-.549-.115-1.17-.246-1.315-.554-.106-.226-.105-.537-.105-.865 0-.417 0-.888-.204-1.345a1.276 1.276 0 0 0-.306-.43zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
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
                overflow: "hidden"
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
                    overflow: "hidden",
                    color: "var(--accents-6)",
                    aspectRatio: "1/1",
                    // backgroundColor: "var(--accents-3)",
                    padding: "0.1em"
                }}
            >
                <SocialButtonIcon icon={type} />
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
                // marginBottom: "1em",
                position: "sticky",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(var(--header-height) * 1)",
                backgroundColor: "var(--accents-1)",
                backdropFilter: "blur(3px)",
                zIndex: 1,
                gap: "calc(var(--grid-gap) / 1.5)",
                top: isPage ? "var(--header-height)" : 0,
                borderBottom: "1px solid var(--accents-3)",
                marginInline: isPage ? "calc(0px - calc(var(--grid-gap) * 3))" : 0
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

    const { pathname, asPath } = useRouter();
    const isPage = pathname === "/[user]/[post]";

    return (
        <>
            <NextSeo
                title={post.title}
                canonical={`${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`}
                description={`${post.title} is a bla bla bla...`}
                openGraph={{
                    type: "article",
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`,
                    title: post.title,
                    description: `${post.title} is a bla bla bla...`,
                    images: post.images.map((item) => ({
                        url: `${process.env.NEXT_PUBLIC_SITE_URL}${item.large.url}`,
                        width: item.large.width,
                        height: item.large.height,
                        alt: `${post.title} is a bla bla bla...`
                    })),
                    article: {
                        publishedTime: post.createdAt,
                        modifiedTime: post.updatedAt,
                        authors: [`${process.env.NEXT_PUBLIC_SITE_URL}/${post.author.userName}`],
                        tags: ["font", "opensource"]
                    }
                }}
            />
            <ArticleJsonLd
                type="Blog"
                url={`${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`}
                title={post.title}
                images={post.images.map(
                    (item) => `${process.env.NEXT_PUBLIC_SITE_URL}${item.large.url}`
                )}
                datePublished={post.createdAt}
                dateModified={post.updatedAt}
                authorName={[post.author.name]}
                description={`${post.title} is a bla bla bla...`}
                publisherName="Lokal Container Org."
            />
            <figure
                style={{
                    margin: 0,
                    borderBottom: "1px solid var(--accents-3)",
                    marginInline: isPage ? "calc(0px - calc(var(--grid-gap) * 3))" : 0,
                    backgroundColor: `rgb(${image1.dominant.r}, ${image1.dominant.g}, ${image1.dominant.b})`
                }}
            >
                <div style={{ position: "relative", width: "100%", aspectRatio: "128/17" }}>
                    <NextImage
                        src={image1.large.url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={100}
                        priority
                        alt={`image-${slug}`}
                    />
                </div>
            </figure>
            <SocialButtons />
            <div className={styles.blog}>
                <div className={styles.left}>
                    <div style={{ paddingBlock: "calc(var(--header-height) * 1)" }}>
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

                <div
                    className={styles.center}
                    style={{
                        borderInline: "1px solid var(--accents-3)",
                        paddingBlock: "var(--header-height)"
                    }}
                >
                    <article
                        style={{
                            lineHeight: 1.5,
                            fontFamily: "inherit"
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
                                    alt={`image-${author.userName}`}
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

                        <h1>{title}</h1>

                        <p>
                            When doing the spacing of a Latin alphabet, it is a good idea to start
                            out with n and o. Once those two letters have proper sidebearings, the
                            rest is relatively easy. So, I recommend you type something like{" "}
                            <code>noononno</code> and fiddle around with those sidebearings until
                            you&apos;re satisfied. The string contains an n between two o&apos;s, an
                            o between two n&apos;s, double-o and double-n: if you manage to make
                            them all appear, for your eyes, equidistant to each other, you win.
                        </p>

                        <blockquote>
                            <p>
                                <strong>Tip: </strong>
                                Make sure you do your spacing in the correct size. If you are zoomed
                                in too much, you will tend to make it too tight. Consider opening
                                the Preview area at the bottom with the eye symbol in the bottom
                                left corner of the window. You can drag its separator line to the
                                intended reading size. The Preview area has options for blurring and
                                flipping your text so you can keep a fresh look at your design.
                            </p>
                        </blockquote>

                        <h2>Prerequisites</h2>

                        <ul>
                            <li>
                                <em>Github</em> account -- create one if you don&apos;t have it.
                            </li>
                            <li>
                                <em>Node.js</em> installed in your development machine -- recomemnd
                                LTS version
                            </li>
                            <li>
                                Basic knowledge of <em>Typescript</em> -- learn it and it will make
                                your life easier.
                            </li>
                        </ul>

                        <figure style={{ marginBlock: "3em" }}>
                            <figcaption>
                                You can check on the sidebearings and the width of any glyph by
                                taking a look at the grey info panel:
                            </figcaption>

                            <div
                                style={{
                                    position: "relative",
                                    marginBlock: "1em",
                                    backgroundColor: `rgb(${image1.dominant.r}, ${image1.dominant.g}, ${image1.dominant.b})`
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
                                There are many variations of passages of Lorem Ipsum available, but
                                the majority have suffered alteration in some form, by injected
                                humour, or randomised words which don&apos;t look even slightly
                                believable.
                            </figcaption>
                        </figure>

                        <p>
                            You can access the same values through the glyph info area in the bottom
                            left of the Font tab. Or the LSB and RSB columns in list mode. You may
                            need to activate the columns first via the context menu of the list
                            header. You can rearrange the column order by dragging the column
                            headers.
                        </p>

                        <p>{DUMMY_PARAGRAPH}</p>
                    </article>
                </div>
            </div>
        </>
    );
}
