import NextDynamic from "next/dynamic";
import { ConsumerEditorFont, ProviderEditorFont } from "./EditorFontContext";
import EditorFontInput from "./EditorFontInput";

const EditorFontPreview = NextDynamic(() => import("./EditorFontPreview"), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

export default function EditorFont() {
    return (
        <ProviderEditorFont>
            <ConsumerEditorFont>
                {({ typefaces }) =>
                    typefaces.length === 0 ? <EditorFontInput /> : <EditorFontPreview />
                }
            </ConsumerEditorFont>
        </ProviderEditorFont>
    );
}
