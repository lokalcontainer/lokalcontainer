import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";

type Breadcrumb = {
    breadcrumb: string;
    href: string;
};

export default function useBreadCrumb(): {
    breadcrumbs: Breadcrumb[];
    convertBreadcrumb: (
        title: string,
        transformLabel?: ((title: string) => ReactNode) | undefined
    ) => React.ReactNode;
} {
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb>>([
        { breadcrumb: "", href: "/" }
    ]);

    const getPathFromUrl = (url: string): string => {
        return url.split(/[?#]/)[0];
    };

    const convertBreadcrumb = (
        title: string,
        transformLabel?: ((title: string) => ReactNode) | undefined
    ): React.ReactNode => {
        let transformedTitle = getPathFromUrl(title);

        if (transformLabel) {
            return transformLabel(transformedTitle);
        }

        // decode for utf-8 characters and return ascii.
        return decodeURI(transformedTitle);
    };

    useEffect(() => {
        if (router) {
            const finalPath = router.asPath.split("/");
            finalPath.shift();

            const pathArray = finalPath.map((path, i) => {
                return {
                    breadcrumb: path,
                    href: `/${finalPath.slice(0, i + 1).join("/")}`
                };
            });
            setBreadcrumbs(pathArray);
        }
    }, [router]);

    return { breadcrumbs, convertBreadcrumb };
}
