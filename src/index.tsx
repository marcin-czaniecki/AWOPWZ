import { StrictMode } from "react";
import ReactDOM from "react-dom";
import AppProvider from "./providers/AppProvider";
import Root from "./view/Root";

ReactDOM.render(
  <StrictMode>
    <AppProvider>
      <Root />
    </AppProvider>
  </StrictMode>,
  document.getElementById("root")
);
