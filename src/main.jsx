import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BioContextProvider } from "./context/BioManageProvider.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BioContextProvider>
      <App />
    </BioContextProvider>
  </StrictMode>
)
