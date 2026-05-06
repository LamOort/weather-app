import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import Wrapper from "./components/layout/Wrapper/Wrapper";
import ErrorFallback from "./components/shared/ErrorFallback/ErrorFallback";
import { WeatherProvider } from "./context/WeatherProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <ErrorBoundary
          fallbackRender={ErrorFallback}
          onError={(error, info) => {
            console.error("Uncaught rendering error:", error, info.componentStack);
          }}
        >
          <Wrapper />
        </ErrorBoundary>
      </WeatherProvider>
    </QueryClientProvider>
  );
}

export default App;
