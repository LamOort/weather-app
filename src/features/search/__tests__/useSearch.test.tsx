/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSearch } from "../useSearch";
import { searchLocations } from "@/api/weather";
import { createQueryWrapper } from "@/test/testUtils";

vi.mock("@/api/weather", () => ({
  searchLocations: vi.fn(),
}));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("useSearch Hook", () => {
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    const utils = createQueryWrapper();
    wrapper = utils.wrapper as React.FC<{ children: React.ReactNode }>;
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSearch(), { wrapper });

    expect(result.current.searchValue).toBe("");
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.status).toBeNull();
  });

  it("should debounce the search value and call API after 300ms", async () => {
    (searchLocations as any).mockImplementation(async () => {
      await delay(100);
      return [{ id: 1, name: "Paris", country: "France" }];
    });

    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchValue("Paris");
    });

    expect(searchLocations).not.toHaveBeenCalled();
    expect(result.current.isFetching).toBe(false);

    // Wait for debounce to finish and API to be called
    await waitFor(
      () => {
        expect(searchLocations).toHaveBeenCalledWith("Paris");
      },
      { timeout: 1000 },
    );

    // Status should say Searching...
    expect(result.current.status).toBe("Searching…");
    expect(result.current.isFetching).toBe(true);

    // Wait for resolution
    await waitFor(
      () => {
        expect(result.current.isFetching).toBe(false);
      },
      { timeout: 1000 },
    );

    expect(result.current.searchResults).toHaveLength(1);
    expect(result.current.status).toBeNull();
  });

  it("should not call the API if search value is less than 2 characters", async () => {
    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchValue("A");
    });

    // Wait longer than the 300ms debounce
    await delay(400);

    expect(searchLocations).not.toHaveBeenCalled();
    expect(result.current.isFetching).toBe(false);
  });

  it("should handle error state correctly", async () => {
    (searchLocations as any).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchValue("Tokyo");
    });

    await waitFor(
      () => {
        expect(searchLocations).toHaveBeenCalledWith("Tokyo");
        expect(result.current.isFetching).toBe(false);
      },
      { timeout: 1000 },
    );

    expect(result.current.status).toBe(
      "Failed to fetch locations. Please try again.",
    );
    expect(result.current.searchResults).toEqual([]);
  });

  it("should handle empty state correctly when no results are found", async () => {
    (searchLocations as any).mockResolvedValue([]);

    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchValue("Unknown place");
    });

    await waitFor(
      () => {
        expect(searchLocations).toHaveBeenCalledWith("Unknown place");
        expect(result.current.isFetching).toBe(false);
      },
      { timeout: 1000 },
    );

    expect(result.current.status).toBe(
      'No locations found for "Unknown place"',
    );
  });
});
