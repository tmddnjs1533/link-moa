import React from "react";
import Contents from "components/contents";
import Footer from "components/footer";
import Header from "components/header";
import GlobalThemeProvider from "./styles/theme";

function App() {
  return (
    <GlobalThemeProvider>
      <Header />
      <Contents />
      <Footer />
    </GlobalThemeProvider>
  );
}

export default App;
