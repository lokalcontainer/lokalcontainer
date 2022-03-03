import type { Dispatch, FC, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { Typeface } from "components/Editor/typetools";

type ContextEditorFontProps = {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
    typefaces: Typeface[];
    setTypefaces: Dispatch<SetStateAction<Typeface[]>>;
};

const initState: ContextEditorFontProps = {
    files: [],
    setFiles: () => ({}),
    typefaces: [],
    setTypefaces: () => ({})
};

const ContextEditorFont = createContext<ContextEditorFontProps>(initState);
const useEditorFont = () => useContext(ContextEditorFont);
const ConsumerEditorFont = ContextEditorFont.Consumer;
const ProviderEditorFont: FC = (props) => {
    const { children } = props;
    const [files, setFiles] = useState<File[]>([]);
    const [typefaces, setTypefaces] = useState<Typeface[]>([]);

    return (
        <ContextEditorFont.Provider value={{ files, setFiles, typefaces, setTypefaces }}>
            {children}
        </ContextEditorFont.Provider>
    );
};

export { useEditorFont, ConsumerEditorFont, ProviderEditorFont };
