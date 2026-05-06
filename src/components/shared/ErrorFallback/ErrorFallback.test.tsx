import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

// A helper component that conditionally throws during render
const ThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test rendering error");
  }
  return <div>Content rendered successfully</div>;
};

describe("ErrorFallback", () => {
  beforeEach(() => {
    // Suppress React's default error logging during error boundary tests
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders children normally when no error is thrown", () => {
    render(
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(
      screen.getByText("Content rendered successfully"),
    ).toBeInTheDocument();
  });

  it("renders fallback UI when a child component throws", () => {
    render(
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred. Please try again."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it("resets the error boundary and re-renders children when 'Try Again' is clicked", async () => {
    const user = userEvent.setup();
    let shouldThrow = true;

    const ConditionalThrower = () => {
      if (shouldThrow) {
        throw new Error("Test rendering error");
      }
      return <div>Content rendered successfully</div>;
    };

    render(
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <ConditionalThrower />
      </ErrorBoundary>,
    );

    // Fallback should be visible
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Fix the error condition before resetting
    shouldThrow = false;

    await user.click(screen.getByRole("button", { name: /try again/i }));

    // Children should re-render successfully
    expect(
      screen.getByText("Content rendered successfully"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });

  it("calls onError callback when an error is caught", () => {
    const onError = vi.fn();

    render(
      <ErrorBoundary fallbackRender={ErrorFallback} onError={onError}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Test rendering error" }),
      expect.objectContaining({ componentStack: expect.any(String) }),
    );
  });
});
