import CountriesPageClient from "@/components/countries-page-client";
import { fetchCountriesWithRevalidation } from "@/utils/countries-info";

export default async function HomePage() {
  const countries = await fetchCountriesWithRevalidation();

  return <CountriesPageClient countries={countries} />;
}
