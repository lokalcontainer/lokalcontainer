import { useSession } from "components/Context/ContextSession";
import fetchJson from "libs/lib.fetch";
import { CSSProperties, useEffect, useState } from "react";
import { ResponseUser, Profile } from "types/user";
import NextImage from "next/image";
import NextLink from "next/link";

const liStyle: CSSProperties = {
    display: "flex",
    width: "100%"
    // backgroundColor: "magenta"
};

const linkStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
    // width: "100%"
};

const buttonStyle: CSSProperties = {
    ...linkStyle,
    appearance: "none",
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer"
};

const spanStyle: CSSProperties = {
    fontSize: "1.2em"
};

export default function ProfileCard() {
    const { session, handleLogout } = useSession();
    const [user, setUser] = useState<Profile | null>(null);

    useEffect(() => {
        if (!session) return;
        fetchJson<ResponseUser>(`/api/v1/users/${session.userName}`).then((res) => {
            if (!res.success || !res.data) return;
            setUser(res.data);
        });
    }, [session]);

    if (!user) return <div>Loading...</div>;
    return (
        <>
            <li
                style={{
                    ...liStyle,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1em",
                    paddingBottom: "1em"
                }}
            >
                <NextLink href={{ pathname: "/[user]", query: { user: user.userName } }}>
                    <a
                        style={{
                            display: "inline-block",
                            width: 64,
                            aspectRatio: "1/1",
                            borderRadius: "100%",
                            overflow: "hidden"
                        }}
                    >
                        <NextImage
                            src={user.image ?? "/images/avatars/avatar-frown.png"}
                            width={64}
                            height={64}
                            quality={100}
                            priority
                        />
                    </a>
                </NextLink>

                <div>
                    <div style={{ fontSize: "2em", fontWeight: 600 }}>{user.name}</div>
                    <a
                        href={`mailto:${user.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "var(--accents-6)",
                            border: "1px solid",
                            padding: "calc(var(--grid-gap) / 5) var(--grid-gap)",
                            borderRadius: "2em",
                            fontSize: "0.85em",
                            marginTop: "calc(var(--grid-gap) / 2)",
                            display: "block"
                        }}
                    >
                        {user.email}
                    </a>
                </div>
            </li>

            <li>
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        paddingLeft: "calc(64px + 1em)"
                    }}
                >
                    <li style={liStyle}>
                        <NextLink href={{ pathname: "/[user]", query: { user: user.userName } }}>
                            <a style={linkStyle}>
                                <span style={spanStyle}>Profile</span>
                            </a>
                        </NextLink>
                    </li>

                    <li style={liStyle}>
                        <NextLink href="/setting">
                            <a style={linkStyle}>
                                <span style={spanStyle}>Settings</span>
                            </a>
                        </NextLink>
                    </li>

                    <li style={liStyle}>
                        <a
                            style={linkStyle}
                            href="https://help.lokalcontainer.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span style={spanStyle}>Help</span>
                        </a>
                    </li>

                    <li style={{ ...liStyle, marginTop: "3em" }}>
                        <button
                            onClick={handleLogout}
                            style={{
                                ...buttonStyle,
                                // border: "1px solid",
                                padding: "calc(var(--grid-gap) / 4) calc(var(--grid-gap) * 1.5)",
                                fontFamily: "inherit",
                                borderRadius: "3em",
                                backgroundColor: "var(--accents-12)",
                                color: "var(--accents-1)"
                            }}
                        >
                            <span style={spanStyle}>Sign Out</span>
                        </button>
                    </li>
                </ul>
            </li>
        </>
    );
}
