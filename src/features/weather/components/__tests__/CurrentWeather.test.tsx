import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CurrentWeather from "../CurrentWeather";

// Mock the weatherCodeToString utility so we know exactly what it returns
vi.mock("../../utils/weatherCodeToString", () => ({
  weatherCodeToString: vi.fn((code) => {
    if (code === 0) return "Clear sky";
    return "Unknown";
  }),
}));

describe("CurrentWeather Component", () => {
  const defaultProps = {
    location: "Helsinki",
    temperature: 15.6, // should round to 16
    feelsLike: 14.2, // should round to 14
    weatherCode: 0,
    time: "2023-10-15T14:30:00Z",
    units: {
      time: "iso8601",
      interval: "seconds",
      temperature_2m: "°C",
      apparent_temperature: "°C",
      is_day: "",
      weather_code: "wmo code",
      precipitation: "mm",
    },
    isDay: true,
    precipitation: 2.5,
  };

  it("renders accurately with full data", () => {
    render(<CurrentWeather {...defaultProps} />);

    expect(screen.getByText("Helsinki")).toBeInTheDocument();

    expect(screen.getByText("16")).toBeInTheDocument();

    expect(screen.getByText("Feels like 14°C")).toBeInTheDocument();

    expect(screen.getByText("Clear sky")).toBeInTheDocument();

    expect(screen.getByText("2.5mm")).toBeInTheDocument();
    expect(screen.getByText("Precipitation")).toBeInTheDocument();

    expect(screen.getByText("°C")).toBeInTheDocument();
  });

  it("renders fallback states gracefully when optional data is missing", () => {
    render(<CurrentWeather location="Unknown Place" />);

    expect(screen.getByText("Unknown Place")).toBeInTheDocument();

    const exactFallbacks = screen.getAllByText("--");
    expect(exactFallbacks.length).toBe(3);

    expect(screen.getByText("Feels like --°")).toBeInTheDocument();

    const degreeSymbols = screen.getAllByText("°");
    expect(degreeSymbols.length).toBe(1);
  });

  it("applies the correct theme class based on isDay prop", () => {
    const { container: dayContainer } = render(
      <CurrentWeather location="Day City" isDay={true} />,
    );
    expect(dayContainer.firstChild).toHaveClass("current--day");
    expect(dayContainer.firstChild).not.toHaveClass("current--night");

    const { container: nightContainer } = render(
      <CurrentWeather location="Night City" isDay={false} />,
    );
    expect(nightContainer.firstChild).toHaveClass("current--night");
    expect(nightContainer.firstChild).not.toHaveClass("current--day");
  });

  it("formats the time string correctly", () => {
    render(<CurrentWeather {...defaultProps} time="2023-10-15T14:30:00Z" />);

    const timeElement = screen.getByText(/•/);
    expect(timeElement).toBeInTheDocument();
  });
});
