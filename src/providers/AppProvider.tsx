import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "hooks/useToast";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "theme/GlobalStyle";
import { theme } from "theme/theme";
import { UserProvider } from "hooks/useUser";

const AppProvider = ({ children }: { children: React.ReactChild }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastProvider>
          <UserProvider>
            <>
              <GlobalStyle />
              {children}
            </>
          </UserProvider>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppProvider;
