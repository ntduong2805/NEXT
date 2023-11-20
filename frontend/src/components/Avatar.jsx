import React from "react";
import Image from "./Image";

const Avatar = ({ avatar }) => {
  const avatarStyle = {
    borderRadius: "50%", 
    objectFit: "cover",  
    height: "30px",    
    width: "30px",   
  };

  return (
    <Image
      className="rounded-full"
      alt="Avatar"
      src={avatar ? avatar : "/images/placeholder.jpg"}
      style={avatarStyle}
    />
  );
};

export default Avatar;
