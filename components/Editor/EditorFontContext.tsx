import type { Dispatch, SetStateAction } from "react";
import { createContext, FC, useCallback, useContext, useState } from "react";
import fetchJson from "libs/lib.fetch";
import { Typeface } from "components/Editor/typetools";

type ContextEditorFontProps = {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
    typefaces: Typeface[];
    setTypefaces: Dispatch<SetStateAction<Typeface[]>>;
    handleSubmit(): void;
};

const initState: ContextEditorFontProps = {
    files: [],
    setFiles: () => ({}),
    typefaces: [],
    setTypefaces: () => ({}),
    handleSubmit: () => ({})
};

const ContextEditorFont = createContext<ContextEditorFontProps>(initState);
const useEditorFont = () => useContext(ContextEditorFont);
const ConsumerEditorFont = ContextEditorFont.Consumer;
const ProviderEditorFont: FC = (props) => {
    const { children } = props;
    const [files, setFiles] = useState<File[]>([]);
    const [typefaces, setTypefaces] = useState<Typeface[]>([]);

    const handleSubmit = useCallback(() => {
        if (typefaces.length === 0) return;

        const selected = typefaces[0];
        const identifier = selected.subFamily ? selected.subFamily : selected.family;
        const newSlug = identifier.replace(/\s/g, "-").toLowerCase();

        const buildPost = {
            title: identifier,
            slug: newSlug,
            type: "font",
            typefaces
        };

        fetchJson(`/api/v1/posts/${newSlug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildPost)
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }, [typefaces]);

    return (
        <ContextEditorFont.Provider
            value={{ files, setFiles, typefaces, setTypefaces, handleSubmit }}
        >
            {children}
        </ContextEditorFont.Provider>
    );
};

export { useEditorFont, ConsumerEditorFont, ProviderEditorFont };
