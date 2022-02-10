import fontJson from "./fonts.json";
import typefaceJson from "./typefaces.json";

export type FontType = typeof fontJson[0];
// export const fonts: FontType[] = fontJson.concat(
//     fontJson,
//     fontJson,
//     fontJson,
//     fontJson,
//     fontJson,
//     fontJson
// );
export const fonts: FontType[] = fontJson;

export type TypefaceType = typeof typefaceJson[0];
export const typefaces: TypefaceType[] = typefaceJson;
