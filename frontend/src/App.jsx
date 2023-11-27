import "./App.css";
import "./Loading.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./constants/route";
import NotFound from "./pages/404";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ToasterProvider from "./providers/ToasterProvider";
import { getToken } from "./utils/authentication";
import { useAuth } from "./hooks/useAuth";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  let isAuthenticated = useAuth();
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToasterProvider />
      <Routes>
        {PUBLIC_ROUTES.map(({ name, path, Element }) => (
          <Route path={path} key={name} element={<Element />} />
        ))}
        {isAuthenticated &&
          PRIVATE_ROUTES.map(({ name, path, Element }) => {
            return true ? (
              <Route path={path} key={name} element={<Element />} />
            ) : (
              <Route path={path} key="404" element={<NotFound />} />
            );
          })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
