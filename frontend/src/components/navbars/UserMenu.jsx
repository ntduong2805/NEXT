import { useState, useCallback} from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import authApi from "../../apis/auth";
import useRentModal from "../../hooks/useRentModal";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

const UserMenu = ({ currentUser }) => {
  const rentModal = useRentModal();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const logout = useLogout();

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      rentModal.onOpen();
    }
  }, [currentUser, loginModal, rentModal]);

  
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-2">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-netural-100 transition cursor-pointer hover:shadow-md"
        >
          Next your home
        </div>
        <div
          onClick={toggleOpen}
        
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar avatar={currentUser?.avatar}/>
          </div>
        </div>
      </div>

      {isOpen && (
        
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="My profile" onClick={() => {navigate("/profile")}} />
                <MenuItem label="My reservations" onClick={() => {navigate("/reservations")}} />
                <MenuItem label="My properties" onClick={() => {navigate("/properties")}} />
                <MenuItem
                  label="Next your home"
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => logout()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
