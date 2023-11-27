import { Avatar } from "antd";
import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-950 shadow-2xl p-4 mb-4 text-center">
      <div className="h-28 w-28 rounded-full overflow-hidden mx-auto">
        <Avatar
          src={
            user?.avatar ? user.avatar : "/images/placeholder.jpg"
          }
          alt="Hồ sơ người dùng"
          className="rounded-full object-cover h-24 w-24"
        />
      </div>
      <h2 className="text-md font-semibold mt-2">{user?.username}</h2>
      <span className="text-gray-600">Guest</span>
    </div>
  );
};

export default ProfileCard;
