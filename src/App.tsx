import React from "react";
import Contents from "components/contents";
import Footer from "components/footer";
import Header from "components/header";
import GlobalThemeProvider from "./styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MobilEditMode from "contexts/MobilEditMode";
import Toast from "./components/common/toast";
import ConfirmDialog from "./components/common/confirm";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalThemeProvider>
        <MobilEditMode>
          <Header />
          <Contents />
          <Footer />
          <Toast />
          <ConfirmDialog />
        </MobilEditMode>
      </GlobalThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
