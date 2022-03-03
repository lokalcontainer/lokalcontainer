import { load, Font } from "opentype.js";
import VariableTools from "components/Editor/VariableTools";

type FileReaderOutput = {
    fileName: string;
    fileSize: number;
    fileType: string;
    fileUrl: string;
    fileDestination: string;
};

type Metrics = {
    unitsPerEm: number;
    usWinAscent: number;
    usWinDescent: number;
    sTypoAscender: number;
    sTypoDescender: number;
    descender: number;
    ascender: number;
    xHeight: number;
    capHeight: number;
    baseLine: number;
    xMax: number;
    xMin: number;
    yMax: number;
    yMin: number;
};

type VariableAxes = {
    defaultValue: number;
    max: number;
    min: number;
    name: string;
    step: number;
    tag: string;
    value: number;
};
type VariableInstance = {
    name: string;
    coordinates: {
        [key: string]: string;
    };
};
type VariableFont = {
    axes: Array<VariableAxes>;
    instances: Array<VariableInstance> | null;
};

function checkItalic(font: Font) {
    const italic = font.tables.post.italicAngle !== 0;
    return italic;
}

function readInputFont(files: Array<File>) {
    return Promise.all(
        files.map((file) => {
            const fileReader = new FileReader();
            return new Promise<FileReaderOutput>((resolve, reject) => {
                fileReader.onloadend = (e) => {
                    resolve({
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: file.type,
                        fileUrl: e.target!.result!.toString(),
                        fileDestination: ""
                    });
                };
                fileReader.onerror = () => reject("Error while reading font file");
                fileReader.readAsDataURL(file);
            });
        })
    );
}

function getFamily(font: Font): string {
    // @ts-ignore
    return font.names.preferredFamily
        ? // @ts-ignore
          font.names.preferredFamily.en
        : font.names.fontFamily.en;
}

function getItalic(font: Font) {
    const italic = checkItalic(font);
    return italic ? "italic" : "roman";
}

function getMetrics(font: Font): Metrics {
    return {
        unitsPerEm: font.unitsPerEm,
        usWinAscent: font.tables.os2.usWinAscent,
        usWinDescent: font.tables.os2.usWinDescent,
        sTypoAscender: font.tables.os2.sTypoAscender,
        sTypoDescender: font.tables.os2.sTypoDescender,
        descender: font.tables.hhea.descender,
        ascender: font.tables.hhea.ascender,
        xHeight: font.tables.os2.sxHeight,
        capHeight: font.tables.os2.sCapHeight,
        baseLine: 0,
        xMax: font.tables.head.xMax,
        xMin: font.tables.head.xMin,
        yMax: font.tables.head.yMax,
        yMin: font.tables.head.yMin
    };
}

function getVariableFont(font: Font): VariableFont | null {
    const variableFont = new VariableTools(font);
    const axes = variableFont.getAxes();
    const instances = variableFont.getInstances() as Array<any>;
    const newAxes: Array<VariableAxes> = [];

    if (axes) {
        axes.map((item: any) => {
            newAxes.push({
                tag: item.tag,
                name: item.name.en,
                value: item.defaultValue,
                defaultValue: item.defaultValue,
                min: item.minValue,
                max: item.maxValue,
                step: item.maxValue <= 1 && item.maxValue >= -1 ? 0.01 : 1
            });
        });
    }

    if (newAxes.length !== 0)
        return {
            axes: newAxes,
            instances: instances.map((item) => ({
                coordinates: item.coordinates,
                name: item.name.en
            })) as Array<VariableInstance>
        };

    return null;
}

function getFullName(font: Font): string {
    const fullName = font.names.fullName.en;
    const variable = getVariableFont(font);
    const italic = checkItalic(font);

    return variable
        ? fullName.includes("Var" || "Variable")
            ? fullName
            : `${fullName} ${
                  italic && !fullName.includes("Italic" || "Ital") ? "Italic Variable" : "Variable"
              }`
        : fullName;
}

export type Typeface = {
    family: string;
    subFamily: string | null;
    fullName: string;
    variable: VariableFont | null;
    weight: number;
    style: "italic" | "roman";
    metrics: Metrics;
    file: {
        url: string;
        name: string;
        destination: string;
        size: number;
        path: string;
    };
};

async function generateOpentype(files: FileReaderOutput[]) {
    return Promise.all(
        files
            .filter((item) => item.fileType === "font/ttf")
            .map(async (file) => {
                const font = await load(file.fileUrl);
                const weight = font.tables.os2.usWeightClass;

                return new Promise<Typeface>((resolve) =>
                    resolve({
                        family: getFamily(font),
                        subFamily: null,
                        fullName: getFullName(font),
                        variable: getVariableFont(font),
                        weight,
                        style: getItalic(font),
                        metrics: getMetrics(font),
                        file: {
                            url: file.fileUrl,
                            name: file.fileName,
                            destination: "",
                            size: file.fileSize,
                            path: ""
                        }
                        // font
                    })
                );
            })
    );
}

function installToDOM(typefaces: Typeface[]) {
    return Promise.all(
        typefaces.map(async (item) => {
            if (typeof window !== undefined) {
                const fullName = item.fullName;
                const weight = item.weight.toString();
                const style = item.style === "italic" ? "italic" : "normal";
                const fontFace = new FontFace(fullName, `url("${item.file.url}")`, {
                    weight,
                    style
                });

                try {
                    await fontFace.load();
                    document.fonts.add(fontFace);
                    console.log(`%c>>> ${fullName} / [${style}] / ${weight}.`, `color: #0000ff;`);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    );
}

const ital = (test: "italic" | "roman") => test === "italic";
const asignValue = (val: any) => (val === null ? Infinity : 0);

async function getOpentype(files: FileReaderOutput[]) {
    const typefaces = await generateOpentype(files);
    const sortedTypefaces = typefaces
        .sort((a, b) => a.weight - b.weight) // Sort weight
        .sort((a, b) => (ital(a.style) === ital(b.style) ? 0 : ital(a.style) ? 1 : -1)) // Sort italic
        .sort((a, b) => asignValue(a.variable) - asignValue(b.variable));

    await installToDOM(sortedTypefaces);
    return sortedTypefaces;
}

export { readInputFont, generateOpentype, getOpentype };
