import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import NextImage from "next/image";
import fetchJson from "libs/lib.fetch";
import { useSession } from "components/Context/ContextSession";

export const HeaderAvatar = () => {
    const { session } = useSession();
    const [modal, setModal] = useState(false);
    const { asPath, events } = useRouter();

    useEffect(() => {
        if (!modal) return;
        const handler = () => setModal(false);

        events.on("routeChangeStart", handler);
        events.on("routeChangeComplete", handler);
        events.on("routeChangeError", handler);

        return () => {
            events.off("routeChangeStart", handler);
            events.off("routeChangeComplete", handler);
            events.off("routeChangeError", handler);
        };
    }, [events, asPath]);

    return (
        <li
            onMouseOver={() => setModal(true)}
            onMouseLeave={() => setModal(false)}
            style={{
                position: "relative",
                border: "1px solid",
                borderRadius: "calc(var(--grid-gap) / 3)",
                height: session ? "1.4em" : "1.4em",
                width: session ? "1.4em" : "auto",
                color: "var(--accents-8)"
            }}
        >
            {session ? (
                <>
                    <NextLink
                        href={{
                            pathname: "/[user]",
                            query: { user: session.userName }
                        }}
                    >
                        <a
                            style={{
                                position: "relative",
                                display: "block"
                            }}
                        >
                            <span
                                style={{
                                    position: "relative",
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "var(--accents-3)",
                                    // padding: "2px",
                                    borderRadius: "inherit",
                                    overflow: "hidden"
                                }}
                            >
                                <NextImage
                                    src="/images/avatars/avatar-frown.png"
                                    width="28"
                                    height="28"
                                    layout="responsive"
                                    priority
                                    quality={100}
                                />
                            </span>
                        </a>
                    </NextLink>

                    <AnimatePresence initial={false} exitBeforeEnter>
                        {modal && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { type: "just" } }}
                                exit={{ opacity: 0, transition: { type: "just" } }}
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    transform: "translate(0%, 100%)",
                                    paddingTop: "var(--grid-gap)"
                                }}
                            >
                                <ul
                                    style={{
                                        backgroundColor: "var(--accents-1)",
                                        backdropFilter: "blur(5px)",
                                        listStyle: "none",
                                        margin: 0,
                                        padding: "calc(var(--grid-gap) * 2)",
                                        borderRadius: "calc(var(--grid-gap) / 2)",
                                        minWidth: "18em",
                                        boxShadow:
                                            "0 0.35em 1em -0.5em var(--accents-4), 0 0 0.15em 0em var(--accents-6)"
                                    }}
                                >
                                    <li>
                                        <NextLink
                                            href={{
                                                pathname: "/[user]",
                                                query: {
                                                    user: session.userName
                                                }
                                            }}
                                        >
                                            <a>
                                                <span>{session.name}</span>
                                            </a>
                                        </NextLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() =>
                                                fetchJson("/api/v1/logout", {
                                                    method: "POST"
                                                }).then(() => window.location.reload())
                                            }
                                        >
                                            <span>Sign Out</span>
                                        </button>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <NextLink href={`/auth?form=sign-in&callback_url=${asPath}`}>
                    <a
                        style={{
                            paddingInline: "var(--grid-gap)",
                            textTransform: "initial"
                        }}
                    >
                        <span>Sign In</span>
                    </a>
                </NextLink>
            )}
        </li>
    );
};
