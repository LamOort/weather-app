import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Wrapper from "./components/layout/Wrapper/Wrapper";
import { WeatherProvider } from "./context/WeatherProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <Wrapper />
      </WeatherProvider>
    </QueryClientProvider>
  );
}

export default App;
