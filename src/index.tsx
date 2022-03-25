import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Root from "./view/Root";
import AppProvider from "./providers/AppProvider";

ReactDOM.render(
  <StrictMode>
    <AppProvider>
      <Root />
    </AppProvider>
  </StrictMode>,
  document.getElementById("root")
);
