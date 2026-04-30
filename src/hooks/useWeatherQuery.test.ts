/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useWeatherQuery } from "./useWeatherQuery";
import { fetchWeather } from "../api/weather";
import { createQueryWrapper } from "../test/testUtils";
import type { FetchWeatherParams } from "../api/types";

vi.mock("../api/weather", () => ({
  fetchWeather: vi.fn(),
}));

describe("useWeatherQuery Hook", () => {
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    const utils = createQueryWrapper();
    wrapper = utils.wrapper as React.FC<{ children: React.ReactNode }>;
    vi.clearAllMocks();
  });

  const validParams: FetchWeatherParams = {
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: "Europe/London",
    temperature_unit: "celsius",
    current: ["temperature_2m"],
    daily: ["weather_code"],
  };

  it("should fetch weather data when all required parameters are provided", async () => {
    (fetchWeather as any).mockResolvedValue({
      current: { temperature_2m: 15 },
    });

    const { result } = renderHook(() => useWeatherQuery(validParams), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchWeather).toHaveBeenCalledTimes(1);
    expect(fetchWeather).toHaveBeenCalledWith(validParams);
    expect(result.current.data).toEqual({ current: { temperature_2m: 15 } });
  });

  it("should disable the query if any required parameter is missing", () => {
    // Missing temperature_unit
    const invalidParams: FetchWeatherParams = {
      latitude: 51.5074,
      longitude: -0.1278,
      timezone: "Europe/London",
      temperature_unit: "" as any,
      daily: [],
      current: [],
    };

    const { result } = renderHook(() => useWeatherQuery(invalidParams), {
      wrapper,
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(fetchWeather).not.toHaveBeenCalled();
  });
});
