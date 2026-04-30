import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UnitToggle from "./UnitToggle";

const mockSetUnit = vi.fn();

vi.mock("@/context/WeatherContext", () => ({
  useWeatherContext: () => ({
    unit: "celsius",
    setUnit: mockSetUnit,
  }),
}));

describe("UnitToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders both Celsius and Fahrenheit buttons", () => {
    render(<UnitToggle />);
    expect(screen.getByLabelText("Celsius")).toBeInTheDocument();
    expect(screen.getByLabelText("Fahrenheit")).toBeInTheDocument();
  });

  it("calls setUnit when a different unit is clicked", async () => {
    render(<UnitToggle />);
    const fahrenheitBtn = screen.getByLabelText("Fahrenheit");
    
    await userEvent.click(fahrenheitBtn);
    
    expect(mockSetUnit).toHaveBeenCalledWith("fahrenheit");
  });
});
