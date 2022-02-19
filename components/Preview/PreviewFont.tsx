import type { CSSProperties } from "react";
import type { FontType } from "libs/fonts.dummy";

import NextLink from "next/link";
import NextImage from "next/image";
import { ProviderFont, useFont } from "components/Context/ContextFont";

type PreviewFontProps = {
    font?: FontType;
    style?: CSSProperties;
};

// const PreviewFontHeader = () => {
//     const { lightBox } = useLightBox();
//     const { selectedTypeface, typefaces, changeTypeface, font } = useFont();

//     return (
//         <ul
//             style={{
//                 listStyle: "none",
//                 padding: "0 var(--grid-gap)",
//                 margin: 0,
//                 fontWeight: 300,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 height: "var(--header-height)",
//                 // backgroundColor: "var(--alpha-2)",
//                 // borderBottom: "1px solid",
//                 position: "sticky",
//                 top: "var(--header-height)"
//             }}
//         >
//             <li>
//                 <select
//                     value={selectedTypeface}
//                     onChange={(e) => changeTypeface(e.target.value)}
//                     style={{
//                         fontFamily: "inherit",
//                         fontSize: "inherit",
//                         fontWeight: "inherit",
//                         height: "calc(var(--grid-gap) * 3)",
//                         border: "1px solid",
//                         borderRadius: "calc(var(--grid-gap) / 3)",
//                         backgroundColor: "var(--accents-1)",
//                         color: "var(--accents-12)",
//                         padding: "0 calc(var(--grid-gap) / 2)"
//                     }}
//                 >
//                     {typefaces.map((item, i) => (
//                         <option key={i} value={item.fullName}>
//                             {item.fullName}
//                         </option>
//                     ))}
//                 </select>
//             </li>
//             {lightBox && (
//                 <li>
// <NextLink
//     href={{
//         pathname: "/[user]/[post]",
//         query: {
//             user: font.info.designerSlug,
//             post: font.slug
//         }
//     }}
// >
//     <a>
//         <span>Detail</span>
//     </a>
// </NextLink>
//                 </li>
//             )}
//             <li>
//                 <NextLink href="/[user]" as={`/${font.info.designerSlug}`}>
//                     <a>
//                         <span>By {font.info.designer}</span>
//                     </a>
//                 </NextLink>
//             </li>
//         </ul>
//     );
// };

const PreviewFontContent = () => {
    const { selectedTypeface, font } = useFont();
    const { media, info, slug } = font;
    const image1 = media.images[0];

    return (
        <div
            style={{
                height: "calc(100vh - var(--header-height) - calc(var(--grid-gap) * 3))",
                // minHeight: "200vh",
                // backgroundColor: "magenta",
                // border: "1px solid",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "calc(var(--grid-gap) * 4)",
                    // alignItems: "stretch",
                    height: "calc(100% + 1px - var(--header-height))"
                }}
            >
                <div
                    style={{
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--grid-gap)",
                        overflow: "hidden"
                        // padding: "var(--grid-gap)"
                        // backgroundColor: `rgba(${image1.colors[0]}, ${image1.colors[1]}, ${image1.colors[2]}, 100%)`
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            // border: "1px solid",
                            verticalAlign: "middle",
                            maxHeight: "calc(100% + 1px - var(--header-height))",
                            overflow: "hidden",
                            backgroundColor: `rgba(${image1.colors[0]}, ${image1.colors[1]}, ${image1.colors[2]}, 100%)`
                            // padding: "var(--grid-gap)"
                            // transform: "translateY(-50%)",
                            // top: "50%",
                        }}
                    >
                        <NextImage
                            src={image1.url}
                            width={image1.width}
                            height={image1.height}
                            layout="responsive"
                            quality="100%"
                            priority
                        />
                    </div>
                    <div
                        style={{
                            fontFeatureSettings: `"case", "tnum"`,
                            display: "inline-flex",
                            alignItems: "center",
                            alignSelf: "start",
                            backgroundColor: "var(--accents-12)",
                            color: "var(--accents-1)",
                            borderRadius: "calc(var(--grid-gap) * 2)",
                            padding: "calc(var(--grid-gap) / 4) var(--grid-gap)"
                        }}
                    >
                        {/* <span>
                                RGB [{image1.colors[0]}, {image1.colors[1]}, {image1.colors[2]}]
                            </span>{" "}
                            <span>/</span>{" "} */}
                        <span style={{ fontSize: "0.85em" }}>
                            {image1.width} &times; {image1.height}
                        </span>
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <NextLink
                            href={{
                                pathname: "/[user]/[post]",
                                query: {
                                    user: info.designerSlug,
                                    post: slug,
                                    tab: "typetools"
                                }
                            }}
                        >
                            <a style={{ textDecoration: "underline" }}>
                                <span>Typetools</span>
                            </a>
                        </NextLink>
                        <NextLink
                            href={{
                                pathname: "/[user]/[post]",
                                query: {
                                    user: info.designerSlug,
                                    post: slug,
                                    tab: "case-study"
                                }
                            }}
                        >
                            <a style={{ textDecoration: "underline" }}>
                                <span>Case Study</span>
                            </a>
                        </NextLink>
                        <NextLink
                            href={{
                                pathname: "/[user]/[post]",
                                query: {
                                    user: info.designerSlug,
                                    post: slug
                                }
                            }}
                        >
                            <a style={{ textDecoration: "underline" }}>
                                <span>Detail</span>
                            </a>
                        </NextLink>
                    </div>

                    <p
                        style={{
                            fontSize: "5em",
                            textAlign: "justify",
                            fontWeight: "bold",
                            marginBlock: "calc(var(--grid-gap) / 2)"
                        }}
                    >
                        RISET &amp; DATA 4 Kita &amp; Tipografi/ Industri—Masal, ID 17-08-1945
                    </p>

                    <div>
                        <h3>About</h3>
                        <p
                            style={{
                                columnCount: 2,
                                columnGap: "calc(var(--grid-gap) * 4)",
                                textAlign: "justify",
                                hyphens: "auto",
                                lineHeight: 1.5,
                                textIndent: "calc(var(--grid-gap) * 4)"
                                // overflow: "hidden",
                                // textOverflow: "ellipsis",
                                // display: "block",
                                // lineClamp: 2
                            }}
                        >
                            There are many variations of passages of Lorem Ipsum available, but the
                            majority have suffered alteration in some form, by injected humour, or
                            randomised words which don&apos;t look even slightly believable. If you
                            are going to use a passage of Lorem Ipsum, you need to be sure there
                            isn&apos;t anything embarrassing hidden in the middle of text. All the
                            Lorem Ipsum generators on the Internet tend to repeat predefined chunks
                            as necessary, making this the first true generator on the Internet. It
                            uses a dictionary of over 200 Latin words, combined with a handful of
                            model sentence structures, to generate Lorem Ipsum which looks
                            reasonable. The generated Lorem Ipsum is therefore always free from
                            repetition, injected humour, or non-characteristic words etc.
                        </p>
                    </div>
                    {/* <pre>{JSON.stringify(font, null, 2)}</pre> */}
                </div>
            </div>

            <div
                style={{
                    height: "calc(var(--header-height) * 1)",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingInline: "var(--grid-gap)"
                    // backgroundColor: "var(--accents-3)",
                    // border: "1px solid"
                }}
            >
                Footer
            </div>
        </div>
    );
};

export const PreviewFont = (props: PreviewFontProps) => {
    const { font, style } = props;

    return (
        <ProviderFont font={font}>
            {/* <PreviewFontHeader /> */}
            <PreviewFontContent />
        </ProviderFont>
    );
};

export default PreviewFont;
