import toast from "react-hot-toast";
import { readInputFont, getOpentype } from "components/Editor/typetools";
import { useEditorFont } from "./EditorFontContext";

export default function EditorFontInput() {
    const { setFiles, setTypefaces } = useEditorFont();
    const handleInputChange = async (fileList: FileList) => {
        const arrFiles = Array.from(fileList);

        const ttfs = arrFiles.filter((item) => item.type === "font/ttf");
        const woffs = arrFiles.filter((item) => item.type === "application/font-woff");
        const woff2s = arrFiles.filter((item) => item.name.split(".").pop() === "woff2");

        if (ttfs.length === 0) {
            toast.error("Must be include `.ttf` file(s).");
            return;
        }
        if (woffs.length === 0) {
            toast.error("Must be include `.woff` file(s).");
            return;
        }
        if (woff2s.length === 0) {
            toast.error("Must be include `.woff2` file(s).");
            return;
        }

        const readBuffer = await readInputFont(arrFiles);
        const typefaces = await getOpentype(readBuffer);

        toast.promise(
            readInputFont(arrFiles),
            {
                loading: "Reading font files...",
                success: (v) => `Successfuly read (${v.length}) font files!`,
                error: (err) => err
            },
            { duration: 5000 }
        );

        setTypefaces(typefaces);
        setFiles(arrFiles);
    };
    return (
        <div>
            <form>
                <input
                    type="file"
                    multiple
                    accept=".ttf, .woff, .woff2"
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
