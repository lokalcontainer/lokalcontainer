import { LinkProps } from "next/link";

type Menu = {
    label: string;
    link: LinkProps;
};

type ExternalLink = {
    label: string;
    link: string;
};

export const STATIC_MENU: Menu[] = [
    {
        label: "Index",
        link: { href: "/" }
    },
    // {
    //     label: "About",
    //     link: { href: "/about" }
    // },
    {
        label: "Blog",
        link: { href: "/blog" }
    },
    {
        label: "Goods",
        link: { href: "/goods" }
    },
    {
        label: "Archive",
        link: { href: "/archive" }
    }
];

export const STATIC_SOCIAL_MENU: ExternalLink[] = [
    { label: "Github", link: "https://github.com/lokalcontainer" },
    { label: "Instagram", link: "https://instagram.com/lokalcontainer" },
    { label: "Twitter", link: "https://twitter.com/lokalcontainer" }
];
