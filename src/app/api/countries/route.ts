import { restCountriesToCountry } from "@/utils/countries-info";
import { NextResponse } from "next/server";
export async function GET() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3"
  );
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
  const data = await res.json();
  const countries = data.map(restCountriesToCountry);
  return NextResponse.json(countries);
}
