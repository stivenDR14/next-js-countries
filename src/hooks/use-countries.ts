import { useState, useEffect, useCallback } from "react";
import { Country } from "../types/country";

interface UseCountriesResult {
  countries: Country[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useCountries(): UseCountriesResult {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const reload = useCallback(() => {
    setReloadFlag((f) => f + 1);
  }, []);

  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("Request timed out.");
      setLoading(false);
    }, 10000);

    fetch("/api/countries", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        if (!didCancel) {
          setCountries(data);
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
  }, [reloadFlag]);

  return { countries, loading, error, reload };
}
