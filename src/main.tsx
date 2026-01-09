import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";
import "@radix-ui/themes/styles.css";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <App />
  </UserProvider>
);
