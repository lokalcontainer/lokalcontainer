import { NextRequest, NextResponse } from "next/server";
import countries from "libs/countries.json";

export async function middleware(req: NextRequest) {
    const { nextUrl: url, geo } = req;
    const country = geo?.country || "ID";
    const city = geo?.city || "Surabaya";
    const region = geo?.region || "East Java";

    const countryInfo = countries.find((x) => x.cca2 === country);

    // @ts-ignore
    const currencyCode = Object.keys(countryInfo?.currencies)[0];
    // @ts-ignore
    const currency = countryInfo?.currencies[currencyCode];
    // @ts-ignore
    const languages = Object.values(countryInfo?.languages).join(", ");

    url.searchParams.set("country", country);
    url.searchParams.set("city", city);
    url.searchParams.set("region", region);
    url.searchParams.set("currencyCode", currencyCode);
    url.searchParams.set("currencySymbol", currency.symbol);
    url.searchParams.set("currencyName", currency.name);
    url.searchParams.set("languages", languages);

    return NextResponse.rewrite(url);
}
