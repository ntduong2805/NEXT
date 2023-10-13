import React, { useState, useEffect } from "react";
import Navbar from "../components/navbars/Navbar";
import ClientOnly from "../components/ClientOnly";
import RegisterModal from "../components/modals/RegisterModal";
import "../index.css"
import ToasterProvider from "../providers/ToasterProvider";
import LoginModal from "../components/modals/LoginModal";
import getCurrentUser from "../actions/getCurrentUser";
import RentModal from "../components/modals/RentModal";
import Home from "./page";


export const metadata = {
  title: "Next",
  description: "Next LV",
};

function RootLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
      } catch (error) {
        // Xử lý lỗi ở đây nếu cần thiết
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={user} />
      </ClientOnly>
      <div className="pb-20 pt-28">
      <Home/>
      </div>
    </div>
  );
}

export default RootLayout;
