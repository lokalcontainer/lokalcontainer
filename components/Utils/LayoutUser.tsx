import styles from "styles/layout.module.scss";
import type { FC } from "react";
import type { ResponseUser } from "types/user";
import NextImage from "next/image";
import NextLink from "next/link";

type LayoutUserProps = {
    user: ResponseUser;
};

const Aside = (props: LayoutUserProps) => {
    const {
        data: { name, userName, image, email }
    } = props.user;
    return (
        <aside className={styles.aside}>
            <ul>
                <li
                    style={{
                        flexShrink: 0,
                        overflow: "hidden",
                        marginBottom: "calc(var(--grid-gap) * 4)",
                        display: "flex"
                    }}
                >
                    <span
                        style={{
                            backgroundColor: "var(--accents-pink)",
                            overflow: "hidden",
                            position: "relative",
                            width: 64,
                            height: 64,
                            display: "block"
                        }}
                    >
                        {image ? (
                            <NextImage
                                src={image}
                                width="64"
                                height="64"
                                alt={`avatar-${userName}`}
                                priority
                            />
                        ) : (
                            <NextImage
                                src="/images/avatars/avatar-frown.png"
                                width="64"
                                height="64"
                                alt={`avatar-${userName}`}
                                priority
                            />
                        )}
                    </span>
                </li>

                <li>
                    <span
                        style={{
                            fontSize: "1.3em",
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

                <li>
                    <span
                        style={{
                            display: "inline-block",
                            width: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {email}
                    </span>
                </li>
            </ul>
        </aside>
    );
};

export const LayoutUser: FC<LayoutUserProps> = (props) => {
    const { children, user } = props;
    const { userName } = user.data;

    return (
        <>
            <div className={styles.user}>
                <Aside user={user} />

                <div>
                    <ul
                        style={{
                            position: "sticky",
                            top: "var(--header-height)",
                            height: "var(--header-height)",
                            zIndex: 1,
                            backgroundColor: "var(--accents-1)",
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

                    {children}
                </div>
            </div>
        </>
    );
};
