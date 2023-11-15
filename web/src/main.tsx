import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import LoginButton from "./Auth/LoginButton.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <LoginButton />
      <RouterProvider router={router} />
    </ThemeProvider>
  </>,
);
