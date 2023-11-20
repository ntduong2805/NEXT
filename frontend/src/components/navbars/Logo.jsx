

import React from "react";
import Image from "../Image"; // Import thành phần hình ảnh tùy chỉnh
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Image
      onClick={() => navigate("/")}
      alt="Logo"
      className="hidden md:block cursor-pointer mr-3"
      height={100}
      width={100}
      src="/images/nextlogo.png"
      priority
    />
  );
};

export default Logo;
