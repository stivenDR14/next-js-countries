import { NextResponse } from "next/server";
import { restCountriesToCountryDetail } from "@/utils/countries-info";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!res.ok) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }
  const data = await res.json();
  const countryDetail = restCountriesToCountryDetail(data[0]);
  return NextResponse.json(countryDetail);
}
