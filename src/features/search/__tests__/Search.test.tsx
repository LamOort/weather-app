/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Search from "../Search";
import { useSearch } from "../useSearch";
import { useWeatherContext } from "@/context/WeatherContext";

vi.mock("../useSearch", () => ({
  useSearch: vi.fn(),
}));

vi.mock("@/context/WeatherContext", () => ({
  useWeatherContext: vi.fn(),
}));

describe("Search Component", () => {
  const mockSetSearchValue = vi.fn();
  const mockSetCoord = vi.fn();
  const mockSetTimezone = vi.fn();
  const mockSetLocationName = vi.fn();

  const defaultMockSearch = {
    searchValue: "",
    setSearchValue: mockSetSearchValue,
    searchResults: [],
    isFetching: false,
    status: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (useWeatherContext as any).mockReturnValue({
      setCoord: mockSetCoord,
      setTimezone: mockSetTimezone,
      setLocationName: mockSetLocationName,
    });

    (useSearch as any).mockReturnValue(defaultMockSearch);
  });

  it("renders the search input with the correct placeholder", () => {
    render(<Search />);
    expect(
      screen.getByPlaceholderText("Search for a city or town"),
    ).toBeInTheDocument();
  });

  it("updates searchValue on user typing", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search for a city or town");

    await userEvent.type(input, "Lon");

    expect(mockSetSearchValue).toHaveBeenCalledWith("L");
    expect(mockSetSearchValue).toHaveBeenCalledWith("o");
    expect(mockSetSearchValue).toHaveBeenCalledWith("n");
  });

  it("displays a loading spinner and status when isFetching is true", async () => {
    (useSearch as any).mockReturnValue({
      ...defaultMockSearch,
      isFetching: true,
      status: "Searching…",
    });

    render(<Search />);
    const input = screen.getByPlaceholderText("Search for a city or town");
    await userEvent.type(input, "{arrowdown}");

    expect(screen.getByText(/Searching…/i)).toBeInTheDocument();
  });

  it("displays the error status", async () => {
    (useSearch as any).mockReturnValue({
      ...defaultMockSearch,
      status: "Failed to fetch locations. Please try again.",
    });

    render(<Search />);
    const input = screen.getByPlaceholderText("Search for a city or town");
    await userEvent.type(input, "{arrowdown}");

    expect(screen.getByText(/Failed to fetch locations/i)).toBeInTheDocument();
  });

  it("handles the empty state with no results", async () => {
    (useSearch as any).mockReturnValue({
      ...defaultMockSearch,
      status: 'No locations found for "XYZ"',
    });

    render(<Search />);
    const input = screen.getByPlaceholderText("Search for a city or town");
    await userEvent.type(input, "{arrowdown}");

    expect(
      screen.getByText(/No locations found for "XYZ"/i),
    ).toBeInTheDocument();
  });

  it("renders a list of locations and handles selection", async () => {
    const mockLocations = [
      {
        id: 1,
        name: "London",
        admin1: "England",
        country: "United Kingdom",
        latitude: 51.5,
        longitude: -0.1,
        timezone: "Europe/London",
      },
      {
        id: 2,
        name: "London",
        admin1: "Ontario",
        country: "Canada",
        latitude: 42.9,
        longitude: -81.2,
        timezone: "America/Toronto",
      },
    ];

    (useSearch as any).mockReturnValue({
      ...defaultMockSearch,
      searchValue: "",
      searchResults: mockLocations,
      status: null,
    });

    render(<Search />);
    const input = screen.getByPlaceholderText("Search for a city or town");
    await userEvent.type(input, "{arrowdown}");

    // should see both London locations
    const results = screen.getAllByText("London");
    expect(results).toHaveLength(2);
    expect(screen.getByText("England, United Kingdom")).toBeInTheDocument();
    expect(screen.getByText("Ontario, Canada")).toBeInTheDocument();

    // Click the first result
    await userEvent.click(results[0]);

    // Verify context updaters were called
    expect(mockSetCoord).toHaveBeenCalledWith({ lat: 51.5, lon: -0.1 });
    expect(mockSetTimezone).toHaveBeenCalledWith("Europe/London");
    expect(mockSetLocationName).toHaveBeenCalledWith("London");
  });
});
