import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";
import "@radix-ui/themes/styles.css";
import { UserProvider } from "./context/UserContext";
import { QuizProvider } from "./context/QuizContext";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <QuizProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </QuizProvider>
  </StrictMode>
);
