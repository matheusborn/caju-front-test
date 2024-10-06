import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "~/Store"; // Ajuste o caminho conforme necessário
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
