import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "hooks/useToast";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "theme/GlobalStyle";
import { theme } from "theme/theme";
import { UserProvider } from "hooks/useUser";

const AppProvider = ({ children }: { children: React.ReactChild }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <BrowserRouter>
          <UserProvider>
            <>
              <GlobalStyle />
              {children}
            </>
          </UserProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
