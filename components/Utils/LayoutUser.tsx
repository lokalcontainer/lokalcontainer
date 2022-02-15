import styles from "styles/layout.module.scss";
import type { FC } from "react";
import type { ResponseUser } from "types/user";
import NextImage from "next/image";

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
                        backgroundColor: "var(--accents-pink)",
                        position: "relative",
                        width: 128,
                        height: 128,
                        flexShrink: 0,
                        // borderRadius: "100%",
                        overflow: "hidden",
                        marginBottom: "calc(var(--grid-gap) * 4)"
                    }}
                >
                    {image ? (
                        <NextImage
                            src={image}
                            width="128"
                            height="128"
                            alt={`avatar-${userName}`}
                            priority
                        />
                    ) : (
                        <NextImage
                            src="/images/avatars/avatar-frown.png"
                            width="128"
                            height="128"
                            alt={`avatar-${userName}`}
                            priority
                        />
                    )}
                </li>

                <li>
                    <span
                        style={{
                            fontSize: "1.3em",
                            display: "inline-block",
                            width: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
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

    return (
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
                    <li>Works</li>
                    <li>Thoughts</li>
                    <li>Appreciations</li>
                </ul>

                {children}
            </div>
        </div>
    );
};
