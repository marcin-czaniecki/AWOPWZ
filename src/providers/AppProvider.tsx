import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "hooks/useToast";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "theme/GlobalStyle";
import { theme } from "theme/theme";
import { UserProvider } from "hooks/useUser";
import MainTemplate from "components/templates/MainTamplate/MainTamplate";

const AppProvider = ({ children }: { children: React.ReactChild }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastProvider>
          <UserProvider>
            <MainTemplate>
              <>
                <GlobalStyle />
                {children}
              </>
            </MainTemplate>
          </UserProvider>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppProvider;
