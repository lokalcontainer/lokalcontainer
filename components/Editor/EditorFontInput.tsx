import { readInputFont, getOpentype } from "components/Editor/typetools";
import { useEditorFont } from "./EditorFontContext";

export default function EditorFontInput() {
    const { setFiles, setTypefaces } = useEditorFont();
    const handleInputChange = async (fileList: FileList) => {
        const arrFiles = Array.from(fileList);

        const readBuffer = await readInputFont(arrFiles);
        const typefaces = await getOpentype(readBuffer);

        setTypefaces(typefaces);
        setFiles(arrFiles);
    };
    return (
        <div>
            <form>
                <input
                    type="file"
                    multiple
                    accept=".ttf, .otf, .woff, .woff2, .glyph"
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
