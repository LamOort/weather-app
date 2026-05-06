import type { FallbackProps } from "react-error-boundary";
import { MdErrorOutline } from "react-icons/md";

import "./ErrorFallback.scss";

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="error-fallback" role="alert">
      <MdErrorOutline className="error-fallback__icon" />
      <h1 className="error-fallback__title">Something went wrong</h1>
      <p className="error-fallback__message">
        An unexpected error occurred. Please try again.
      </p>
      <button
        className="error-fallback__btn"
        type="button"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
