import { LinkProps } from "next/link";

type Menu = {
    label: string;
    link: LinkProps;
};

export const STATIC_MENU: Menu[] = [
    {
        label: "Index",
        link: { href: "/" }
    },
    {
        label: "Blog",
        link: { href: "/blog" }
    },
    {
        label: "Goods",
        link: { href: "/goods" }
    }
];
