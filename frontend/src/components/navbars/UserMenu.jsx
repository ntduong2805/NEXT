import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import useRentModal from "../../hooks/useRentModal";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { Menu, Dropdown } from "antd";

const UserMenu = ({ currentUser, showRentModal }) => {
  const rentModal = useRentModal();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogOut = () => {
    logout();
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      rentModal.onOpen();
    }
  }, [currentUser]);

  const menuItem = (
    <Menu>
      {currentUser ? (
        <>
          <Menu.Item key="profile" onClick={() => navigate("/profile")}>
            Profile
          </Menu.Item>
          <Menu.Item key="trips" onClick={() => navigate("/trips")}>
            Trips
          </Menu.Item>
          <Menu.Item
            key="reservations"
            onClick={() => navigate("/reservations")}
          >
            Reservations
          </Menu.Item>
          <Menu.Item key="properties" onClick={() => navigate("/properties")}>
            Properties
          </Menu.Item>
          <Menu.Item key="nextHome" onClick={rentModal.onOpen}>
            Next your home
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogOut}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" onClick={loginModal.onOpen}>
            Login
          </Menu.Item>
          <Menu.Item key="signup" onClick={registerModal.onOpen}>
            Sign up
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-2">
        {showRentModal && (
          <div
            onClick={onRent}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-netural-100 transition cursor-pointer hover:shadow-md"
          >
            Next your home
          </div>
        )}
        <Dropdown overlay={menuItem} trigger={["click"]}>
          <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar avatar={currentUser?.avatar} />
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserMenu;
