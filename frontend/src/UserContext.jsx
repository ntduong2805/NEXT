import { createContext, useEffect, useState } from "react";
import authApi from "./apis/auth";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Kiểm tra xem token đã tồn tại trong localStorage hay chưa
    const token = localStorage.getItem("token");

    if (token && !user) {
      // Nếu tồn tại token và user chưa được thiết lập, thực hiện gọi API
      authApi.profile().then(({ data }) => {
        setUser(data?.data);
        setReady(true);
      });
    } else {
      // Nếu không tồn tại token hoặc user đã được thiết lập, đánh dấu sẵn sàng
      setReady(true);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
