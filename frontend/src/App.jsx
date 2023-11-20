import './App.css'
import './Loading.css'
import './index.css'
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './constants/route';
import NotFound from './pages/404';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToasterProvider from './providers/ToasterProvider';
import { getToken } from './utils/authentication';


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const isToken = getToken() != null;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <ToasterProvider />
      <Routes>
        {
          PUBLIC_ROUTES.map(({ name, path, Element }) => (
            <Route path={path} key={name} element={<Element />} />
          ))
        }
        {
          isToken && (
            PRIVATE_ROUTES.map(({ name, path, Element}) => {
              return isToken ? (
                <Route path={path} key={name} element={<Element />} />
              ) : (
                <Route path={path} key="404" element={<NotFound />} />
              )
            })
          )
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
