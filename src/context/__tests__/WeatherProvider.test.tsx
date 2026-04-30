import { useContext } from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeatherProvider } from "../WeatherProvider";
import WeatherContext from "../WeatherContext";

const TestConsumer = () => {
  const {
    coord,
    setCoord,
    unit,
    setUnit,
    timezone,
    setTimezone,
    locationName,
    setLocationName,
  } = useContext(WeatherContext);

  return (
    <div>
      <div data-testid="lat">{coord.lat}</div>
      <div data-testid="lon">{coord.lon}</div>
      <div data-testid="unit">{unit}</div>
      <div data-testid="timezone">{timezone}</div>
      <div data-testid="locationName">{locationName}</div>
      <button onClick={() => setCoord({ lat: 10, lon: 20 })}>Update Coord</button>
      <button onClick={() => setUnit("fahrenheit")}>Update Unit</button>
      <button onClick={() => setTimezone("America/New_York")}>Update Timezone</button>
      <button onClick={() => setLocationName("New York")}>Update Location</button>
    </div>
  );
};

describe("WeatherProvider Component", () => {
  it("provides correct default values", () => {
    render(
      <WeatherProvider>
        <TestConsumer />
      </WeatherProvider>
    );

    expect(screen.getByTestId("lat").textContent).toBe("0");
    expect(screen.getByTestId("lon").textContent).toBe("0");
    expect(screen.getByTestId("unit").textContent).toBe("celsius");
    expect(screen.getByTestId("locationName").textContent).toBe("");
    
    // Timezone should be a string, not empty
    expect(screen.getByTestId("timezone").textContent).not.toBe("");
  });

  it("updates state correctly when setter functions are called", () => {
    render(
      <WeatherProvider>
        <TestConsumer />
      </WeatherProvider>
    );

    // Update Coord
    act(() => {
      screen.getByText("Update Coord").click();
    });
    expect(screen.getByTestId("lat").textContent).toBe("10");
    expect(screen.getByTestId("lon").textContent).toBe("20");

    // Update Unit
    act(() => {
      screen.getByText("Update Unit").click();
    });
    expect(screen.getByTestId("unit").textContent).toBe("fahrenheit");

    // Update Timezone
    act(() => {
      screen.getByText("Update Timezone").click();
    });
    expect(screen.getByTestId("timezone").textContent).toBe("America/New_York");

    // Update Location
    act(() => {
      screen.getByText("Update Location").click();
    });
    expect(screen.getByTestId("locationName").textContent).toBe("New York");
  });
});
