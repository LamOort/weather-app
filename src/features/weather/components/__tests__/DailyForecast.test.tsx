import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DailyForecast from "../DailyForecast";

describe("DailyForecast Component", () => {
  beforeEach(() => {
    // Mock the system time so "Today" logic is deterministic
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-10-15T10:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockData = [
    {
      time: new Date("2023-10-15T00:00:00Z").getTime(), // Today
      weather_code: 0,
      temperature_2m_min: 10.4, // rounds to 10
      temperature_2m_max: 20.6, // rounds to 21
      precipitation_probability_max: 10,
    },
    {
      time: new Date("2023-10-16T00:00:00Z").getTime(), // Tomorrow
      weather_code: 3,
      temperature_2m_min: 12.1,
      temperature_2m_max: 18.2,
      precipitation_probability_max: 80,
    },
  ];

  it("renders the exact number of cards based on data prop length", () => {
    const { container } = render(<DailyForecast data={mockData} />);

    // Query cards by class
    const cards = container.querySelectorAll(".day-card");
    expect(cards.length).toBe(2);
  });

  it("renders the correct Day, Date, Min/Max temperatures, and Rain Probability", () => {
    render(<DailyForecast data={mockData} />);

    // --- First Card (Today) ---
    expect(screen.getByText("Today")).toBeInTheDocument();
    // Assuming locale defaults, just regex match the specific numbers
    expect(screen.getByText("10° / 21°")).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();

    // --- Second Card (Tomorrow) ---
    // The exact short month string depends on locale, but "16" should be present
    expect(screen.getByText(/16/)).toBeInTheDocument();
    expect(screen.getByText("12° / 18°")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("renders cleanly without crashing when an empty array is provided", () => {
    const { container } = render(<DailyForecast data={[]} />);

    const cards = container.querySelectorAll(".day-card");
    expect(cards.length).toBe(0);
  });
});
