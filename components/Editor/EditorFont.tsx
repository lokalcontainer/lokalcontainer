import type { FC } from "react";
import { createContext, useContext, useState } from "react";

type ContextEditorFontProps = {
    files: File[];
    handleInputChange: (fileList: FileList) => void;
};

const initState: ContextEditorFontProps = {
    files: [],
    handleInputChange: () => ({})
};

const ContextEditorFont = createContext<ContextEditorFontProps>(initState);
const useEditorFont = () => useContext(ContextEditorFont);
const ConsumerEditorFont = ContextEditorFont.Consumer;
const ProviderEditorFont: FC = (props) => {
    const { children } = props;
    const [files, setFiles] = useState<File[]>([]);
    const handleInputChange = (fileList: FileList) => {
        const arrFiles = Array.from(fileList);
        setFiles(arrFiles);
    };
    return (
        <ContextEditorFont.Provider value={{ files, handleInputChange }}>
            {children}
        </ContextEditorFont.Provider>
    );
};

function EditorFontInput() {
    const { handleInputChange } = useEditorFont();
    return (
        <div>
            <form>
                <input
                    type="file"
                    multiple
                    accept=".ttf, .otf"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        handleInputChange(files);
                    }}
                />
            </form>
        </div>
    );
}

function EditorFontPreview() {
    return <div>Editor Font Preview</div>;
}

export default function EditorFont() {
    return (
        <ProviderEditorFont>
            <ConsumerEditorFont>
                {({ files }) => (files.length === 0 ? <EditorFontInput /> : <EditorFontPreview />)}
            </ConsumerEditorFont>
        </ProviderEditorFont>
    );
}
