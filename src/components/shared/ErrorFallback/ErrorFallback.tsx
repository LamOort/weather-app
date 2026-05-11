import type { FallbackProps } from "react-error-boundary";
import { MdErrorOutline } from "react-icons/md";

import styles from "./ErrorFallback.module.scss";

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className={styles.container} role="alert">
      <MdErrorOutline className={styles.icon} />
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.message}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        className={styles.btn}
        type="button"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
