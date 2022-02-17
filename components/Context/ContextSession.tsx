import type { ResponseSession } from "types/session";
import type { BaseUser } from "types/user";
import { createContext, FC, useContext } from "react";
import useSWR, { KeyedMutator } from "swr";
import fetchJson from "libs/lib.fetch";

type ProviderSessionProps = {
    session?: ResponseSession;
};

type ContextSessionProps = {
    session?: BaseUser;
    mutateSession: KeyedMutator<ResponseSession>;
};

const ContextSession = createContext<ContextSessionProps>(undefined!);
export const useSession = () => useContext(ContextSession);

export const ProviderSession: FC<ProviderSessionProps> = (props) => {
    const { children, session: serverSession } = props;

    const { data: clientSession, mutate } = useSWR<ResponseSession>(
        "/api/v1/sessions/me",
        fetchJson,
        {
            fallbackData: serverSession
        }
    );

    return (
        <ContextSession.Provider
            value={{
                session: clientSession?.success ? clientSession.data : undefined,
                mutateSession: mutate
            }}
        >
            {children}
        </ContextSession.Provider>
    );
};
