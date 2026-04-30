import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "@/api/weather";
import type { Location } from "@/api/types";

interface UseSearchReturn {
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchResults: Location[];
  isFetching: boolean;
  status: ReactNode | null;
}

export const useSearch = (): UseSearchReturn => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Debounce: only update the query key 300ms after the user stops typing.
  useEffect(() => {
    const delay = searchValue === "" ? 0 : 300;
    const timer = setTimeout(() => setDebouncedValue(searchValue), delay);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const {
    data: searchResults = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["locations", debouncedValue],
    queryFn: () => searchLocations(debouncedValue),
    enabled: debouncedValue.length >= 2,
    staleTime: 1000 * 60 * 3, // cache results for 3 minutes
  });

  function getStatus(): ReactNode | null {
    if (isFetching) return "Searching…";
    if (isError) return "Failed to fetch locations. Please try again.";
    if (searchValue === "") return null;
    if (debouncedValue.length >= 2 && searchResults.length === 0)
      return `No locations found for "${debouncedValue}"`;
    return null;
  }

  return {
    searchValue,
    setSearchValue,
    searchResults,
    isFetching,
    status: getStatus(),
  };
};
