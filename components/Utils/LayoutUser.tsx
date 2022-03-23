import styles from "styles/layout.module.scss";
import type { PropsWithChildren } from "react";
import type { ResponseUser } from "types/user";
import NextImage from "next/image";
import NextLink from "next/link";
import moment from "moment";
import HeaderPost from "components/Header/HeaderPost";

type LayoutUserProps = PropsWithChildren<{
    user: ResponseUser;
}>;

const Aside = (props: LayoutUserProps) => {
    const {
        data: { name, userName, image, email, createdAt }
    } = props.user;
    return (
        <aside className={styles.aside}>
            <ul style={{ padding: "1em" }}>
                <li style={{ marginBottom: "calc(var(--grid-gap) * 4)" }}>
                    <span
                        style={{
                            backgroundColor: "var(--accents-pink)",
                            overflow: "hidden",
                            position: "relative",
                            width: 128,
                            height: 128,
                            display: "block",
                            borderRadius: "100%"
                        }}
                    >
                        <NextImage
                            src={image ?? "/images/avatars/avatar-frown.png"}
                            width="128"
                            height="128"
                            alt={`avatar-${userName}`}
                            quality={100}
                            priority
                        />
                    </span>
                </li>

                <li>
                    <span
                        style={{
                            fontSize: "2em",
                            display: "inline-block",
                            width: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: "bold"
                        }}
                    >
                        {name}
                    </span>
                </li>

                <li style={{ marginBottom: "2em" }}>
                    <span
                        style={{
                            display: "inline-block",
                            width: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "var(--accents-6)"
                        }}
                    >
                        {email}
                    </span>
                </li>

                <li>
                    <span
                        style={{
                            fontSize: "0.75em",
                            color: "var(--accents-6)",
                            textTransform: "uppercase"
                        }}
                    >
                        Since {moment(createdAt).format("MMMM D, YYYY")}
                    </span>
                </li>
            </ul>
        </aside>
    );
};

export default function LayoutUser(props: LayoutUserProps) {
    const { children, user } = props;
    const { userName } = user.data;

    return (
        <>
            <div className={styles.user}>
                <Aside user={user} />

                <div>
                    <HeaderPost>
                        <ul
                            style={{
                                display: "flex",
                                alignItems: "center",
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                gap: "var(--grid-gap)"
                            }}
                        >
                            <li style={{ fontSize: "0.85em" }}>
                                <NextLink
                                    href={{
                                        pathname: "/[user]",
                                        query: { user: userName }
                                    }}
                                >
                                    <a>
                                        <span>All</span>
                                    </a>
                                </NextLink>
                            </li>
                            <li style={{ fontSize: "0.85em" }}>Appreciations</li>
                        </ul>
                    </HeaderPost>

                    {children}
                </div>
            </div>
        </>
    );
}
