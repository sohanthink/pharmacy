
import { SafeAreaProvider, } from "react-native-safe-area-context";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from "../components/SignIn";
const queryClient = new QueryClient();

const index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SignIn />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default index;
