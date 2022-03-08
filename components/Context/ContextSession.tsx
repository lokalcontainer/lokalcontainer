import type { ResponseSession } from "types/session";
import type { BaseUser } from "types/user";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect } from "react";
import useSWR, { KeyedMutator } from "swr";
import toast from "react-hot-toast";
import fetchJson from "libs/lib.fetch";

type ProviderSessionProps = PropsWithChildren<{
    session?: ResponseSession;
}>;

type ContextSessionProps = {
    session?: BaseUser;
    mutateSession: KeyedMutator<ResponseSession>;
    handleLogout: () => void;
};

const ContextSession = createContext<ContextSessionProps>(undefined!);
export const useSession = () => useContext(ContextSession);

export default function ProviderSession(props: ProviderSessionProps) {
    const { children, session: serverSession } = props;

    const { data: clientSession, mutate } = useSWR<ResponseSession>(
        "/api/v1/sessions/me",
        fetchJson,
        { fallbackData: serverSession }
    );

    const handleLogout = () =>
        fetchJson("/api/v1/logout", {
            method: "POST"
        })
            .then(() => toast.success("See you next time..."))
            .then(() => window.location.reload());

    useEffect(() => {
        const timout = setTimeout(() => {
            if (!clientSession || !clientSession.success || !clientSession.data) return;

            toast.success(
                (t) => (
                    <div>
                        <div style={{ marginBottom: "var(--grid-gap)" }}>
                            Logged in as <strong>{clientSession?.data?.name}</strong> using
                            <br />
                            <i>
                                <u>{clientSession?.data?.email}</u>
                            </i>
                        </div>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            style={{
                                appearance: "none",
                                fontSize: "inherit",
                                fontFamily: "inherit",
                                border: "1px solid",
                                borderRadius: "calc(var(--grid-gap) * 2)",
                                cursor: "pointer",
                                padding: "calc(var(--grid-gap) / 4) var(--grid-gap)",
                                margin: 0,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <span style={{ fontSize: "0.75em" }}>Dismiss</span>
                        </button>
                    </div>
                ),
                {
                    duration: 10000,
                    style: { backgroundColor: "var(--accents-pink)", color: "var(--accents-12)" }
                }
            );
        }, 1000);

        return () => clearTimeout(timout);
    }, [clientSession]);

    return (
        <ContextSession.Provider
            value={{
                session: clientSession?.success ? clientSession.data : undefined,
                mutateSession: mutate,
                handleLogout
            }}
        >
            {children}
        </ContextSession.Provider>
    );
}
