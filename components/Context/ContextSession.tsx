import fetchJson from "libs/lib.fetch";
import { createContext, FC, useContext } from "react";
import useSWR from "swr";
import { Session, ResponseSession } from "types/session";

type ProviderSessionProps = {
    session?: ResponseSession;
};

type ContextSessionProps = {
    session?: Session;
};

const ContextSession = createContext<ContextSessionProps>(undefined!);
export const useSession = () => useContext(ContextSession);

export const ProviderSession: FC<ProviderSessionProps> = (props) => {
    const { children, session: serverSession } = props;

    const { data: clientSession } = useSWR<ResponseSession>("/api/v1/sessions/me", fetchJson, {
        fallbackData: serverSession
    });

    return (
        <ContextSession.Provider
            value={{ session: clientSession?.success ? clientSession.data : undefined }}
        >
            {children}
        </ContextSession.Provider>
    );
};
