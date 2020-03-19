import React from "react";
import AppPresenter from "./AppPresenter";
import { ThemeProvider } from "styled-components";
import theme from "../../Styles/theme";

const AppContainer = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppPresenter />
      </ThemeProvider>
    </>
  );
};

export default AppContainer;
