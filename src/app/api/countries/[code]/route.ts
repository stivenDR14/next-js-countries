import { NextResponse } from "next/server";
import { restCountriesToCountryDetail } from "@/utils/countries-info";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!res.ok) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }
  const data = await res.json();
  const countryDetail = restCountriesToCountryDetail(data[0]);
  //for each of the countryDetail.borders, fetch the name of each country with the endpoint https://restcountries.com/v3.1/alpha?codes={code},{code},{code}&fields=name
  const borders = await Promise.all(
    countryDetail.borders.map(async (border) => {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${border}&fields=name`
      );
      const data = await res.json();
      return data[0].name.common;
    })
  );
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch borders" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ...countryDetail, borders });
}
