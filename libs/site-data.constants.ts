const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const SITE_DATA = {
    name: "Lokal Container",
    title: "Lokal Container - An Open Source Font Publisher",
    description:
        "Open source typographic platform initiated by young people from Bandung, Indonesia",
    image: `${API_URL}/static/images/cards/og_image.jpg`,
    type: "website",
    url: SITE_URL
};
