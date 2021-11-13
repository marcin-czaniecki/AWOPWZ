import { BrowserRouter } from "react-router-dom";
import { ErrorProvider } from "hooks/useError";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "theme/GlobalStyle";
import { theme } from "theme/theme";

const AppProvider = ({ children }: { children: React.ReactChild }) => {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </ErrorProvider>
  );
};

export default AppProvider;
