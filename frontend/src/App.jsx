import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import axios from "axios";
import ListingPage from './listings/page';
import TripsPage from './trips/page';


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/listings/:listingId" element={<ListingPage />}/>
        <Route path="/trips" element={<TripsPage />}/>
      </Routes>
  )
}

export default App
