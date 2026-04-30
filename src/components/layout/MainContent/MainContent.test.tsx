/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MainContent from "./MainContent";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { useWeatherContext } from "@/context/WeatherContext";

vi.mock("@/hooks/useWeatherQuery", () => ({
  useWeatherQuery: vi.fn(),
}));

vi.mock("@/context/WeatherContext", () => ({
  useWeatherContext: vi.fn(),
}));

// Mock the child components so we don't need to mount their complex internals
vi.mock("@/features/weather/components/CurrentWeather", () => ({
  default: () => <div data-testid="current-weather-mock" />,
}));
vi.mock("@/features/weather/components/DailyForecast", () => ({
  default: () => <div data-testid="daily-forecast-mock" />,
}));
vi.mock("@/features/weather/components/WeatherSkeleton", () => ({
  CurrentWeatherSkeleton: () => <div data-testid="current-skeleton-mock" />,
  DailyForecastSkeleton: () => <div data-testid="daily-skeleton-mock" />,
}));

describe("MainContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useWeatherContext as any).mockReturnValue({
      coord: { lat: 0, lon: 0 },
      timezone: "UTC",
      locationName: "Test City",
      unit: "celsius",
    });
  });

  it("renders loading skeletons when fetching", () => {
    (useWeatherQuery as any).mockReturnValue({
      data: null,
      isFetching: true,
      isSuccess: false,
      isError: false,
    });

    render(<MainContent />);

    expect(screen.getByTestId("current-skeleton-mock")).toBeInTheDocument();
    expect(screen.getByTestId("daily-skeleton-mock")).toBeInTheDocument();
    expect(
      screen.queryByText(/Please try again later/i),
    ).not.toBeInTheDocument();
  });

  it("renders the error message when an error occurs", () => {
    (useWeatherQuery as any).mockReturnValue({
      data: null,
      isFetching: false,
      isSuccess: false,
      isError: true,
    });

    render(<MainContent />);

    expect(screen.getByText("Please try again later")).toBeInTheDocument();
    expect(
      screen.queryByTestId("current-skeleton-mock"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("current-weather-mock"),
    ).not.toBeInTheDocument();
  });

  it("renders the weather components on success", () => {
    (useWeatherQuery as any).mockReturnValue({
      data: {
        current: { temperature_2m: 20 },
        daily: [],
      },
      isFetching: false,
      isSuccess: true,
      isError: false,
    });

    render(<MainContent />);

    expect(screen.getByTestId("current-weather-mock")).toBeInTheDocument();
    expect(screen.getByTestId("daily-forecast-mock")).toBeInTheDocument();
    expect(
      screen.queryByText(/Please try again later/i),
    ).not.toBeInTheDocument();
  });
});
