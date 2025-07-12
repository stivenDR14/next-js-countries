import { useState, useEffect } from "react";
import { CountryDetail } from "../types/country";

interface UseCountryDetailResult {
  country: CountryDetail | null;
  loading: boolean;
  error: string | null;
}

export function useCountryDetail(code: string): UseCountryDetailResult {
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    let didCancel = false;
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("Request timed out.");
      setLoading(false);
    }, 10000);

    fetch(`/api/countries/${code}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Country not found");
        const data = await res.json();
        if (!didCancel) {
          setCountry(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!didCancel) {
          setError(
            err.name === "AbortError" ? "Request timed out." : err.message
          );
          setLoading(false);
        }
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => {
      didCancel = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [code]);

  return { country, loading, error };
}
