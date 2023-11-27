import React, { useEffect, useState } from "react";
import ClientOnly from "../../components/ClientOnly";
import { useAuth, useUploadAvatar } from "../../hooks/useAuth";
import { Avatar, Spin } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import ProfilePage from ".";

function ProfileSetting() {
  const navigate = useNavigate();
  const { mutateAsync: uploadAvatar, isLoading } = useUploadAvatar();

  const [avatar, setAvatar] = useState(null);
  const [userUpdate, setUserUpdate] = useState({});
  const [activeInput, setActiveInput] = useState({
    username: false,
    email: false,
    phoneNumber: false,
    avatar: false,
  });
  const { data: currentUser, isLoading: isLoadingUser } = useAuth();

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const cloudinaryResponse = await uploadToCloudinary(file);

        if (cloudinaryResponse.error) {
          console.error(
            "Error uploading to Cloudinary:",
            cloudinaryResponse.error
          );
          return;
        }
        const cloudinaryUrl = cloudinaryResponse.secure_url;
        await uploadAvatar(cloudinaryUrl);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  const uploadToCloudinary = async (file) => {
    try {
      // Replace "YOUR_CLOUDINARY_URL" and "YOUR_UPLOAD_PRESET" with your actual values
      const cloudinaryUrl = "https://api.cloudinary.com/v1_1/ntduong/upload";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ntduong");

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Cloudinary upload failed with status ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);

  useEffect(() => {
    if (Object.keys(userUpdate).length > 0) {
      setIsUpdateEnabled(true);
    } else {
      setIsUpdateEnabled(false);
    }
  }, [userUpdate]);
  console.log(userUpdate);
  return (
    <ProfilePage>
      <ClientOnly>
        <div
          className={`px-24 md:px-30 ${
            isLoadingUser ? "flex items-center justify-center h-screen" : ""
          }`}
        >
          {isLoadingUser ? (
            <Spin size="large" />
          ) : (
            <>
              <NavLink to={`/profile`} className="flex items-center pb-12">
                <span className="w-12 h-12 flex items-center justify-center bg-black-38 hover:border rounded-full transition duration-300 hover:bg-lightgray">
                  <FaAngleLeft size={24} className="text-36 text-black-500" />
                </span>
                <span className="ml-4 text-lg">Back to Profile</span>
              </NavLink>

              <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-x-10 sm:mb-4">
                <div className="bg-white p-8 rounded-xl sm:h-auto md:col-span-1 lg:col-span-2 overflow-auto">
                  <h1 className="text-xl font-semibold pl-8 mb-8 select-none">
                    Change your avatar
                  </h1>
                  <div className="mb-8 flex flex-col items-center">
                    <div className="relative">
                      <Avatar
                        src={avatar || currentUser?.avatar}
                        alt=""
                        className={`h-32 w-32 pb-2 rounded-full object-cover cursor-pointer ${
                          isLoading ? "opacity-50" : ""
                        }`}
                        onClick={() =>
                          document.getElementById("avatar-input").click()
                        }
                      />
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Spin size="large" className="" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="avatar-input"
                        onChange={handleAvatarChange}
                      />
                      <label
                        htmlFor="avatar-input"
                        className="absolute  bottom-0 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition-all duration-300"
                      >
                        Select new photo
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-xl border border-gray-300 md:col-span-2 lg:col-span-5 min-h-[510px] mt-8 md:mt-0">
                  <h1 className="text-2xl font-semibold mb-8 select-none">
                    Personal information
                  </h1>
                  <div className="mb-8">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-3">
                        <div className="font-semibold">Full Name:</div>
                        <div className="mt-2 flex items-center">
                          <input
                            required
                            type="text"
                            className={`w-1/2 text-sm py-1 border border-gray-300 rounded outline-none mr-4 ${
                              activeInput.username
                                ? "text-black"
                                : "text-gray-400"
                            }`}
                            defaultValue={currentUser?.username}
                            disabled={!activeInput.username}
                            onChange={(event) =>
                              setUserUpdate((prevUser) => ({
                                ...prevUser,
                                username: event.target.value,
                              }))
                            }
                          />
                          <button
                            className={`button bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-full whitespace-nowrap`}
                            style={{ minWidth: "100px" }}
                            onClick={() => {
                              const active = activeInput.username || false;
                              if (active === false) {
                                setActiveInput((prev) => ({
                                  ...prev,
                                  username: !active,
                                }));
                              } else {
                                // Call your update function here
                                // mutateAsync(userUpdate);
                                setActiveInput((prev) => ({
                                  ...prev,
                                  username: !active,
                                }));
                              }
                            }}
                          >
                            {activeInput.username ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mt-4">
                        Your full name.
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-3">
                        <div className="font-semibold">Email:</div>
                        <div className="mt-2 flex items-center">
                          <input
                            required
                            type="email"
                            className={`w-1/2 text-sm py-1 border border-gray-300 rounded outline-none mr-4 ${
                              activeInput.email ? "text-black" : "text-gray-400"
                            }`}
                            defaultValue={currentUser?.email}
                            disabled={!activeInput.email}
                            onChange={(event) =>
                              setUserUpdate((prevUser) => ({
                                ...prevUser,
                                email: event.target.value,
                              }))
                            }
                          />
                          <button
                            className={`button bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-full whitespace-nowrap`}
                            style={{ minWidth: "100px" }}
                            onClick={() => {
                              const active = activeInput.email || false;
                              if (active === false) {
                                setActiveInput((prev) => ({
                                  ...prev,
                                  email: !active,
                                }));
                              } else {
                                // Call your update function here
                                // mutateAsync(userUpdate);
                                setActiveInput((prev) => ({
                                  ...prev,
                                  email: !active,
                                }));
                              }
                            }}
                          >
                            {activeInput.email ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mt-4">
                        Your email address.
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-3">
                        <div className="font-semibold">Number phone</div>
                        <div className="mt-2 flex items-center">
                          <input
                            required
                            type="text"
                            className={`w-1/2 text-sm py-1 border border-gray-300 rounded outline-none mr-4 ${
                              activeInput.phoneNumber
                                ? "text-black"
                                : "text-gray-400"
                            }`}
                            defaultValue={currentUser?.phoneNumber}
                            disabled={!activeInput.phoneNumber}
                            onChange={(event) =>
                              setUserUpdate((prevUser) => ({
                                ...prevUser,
                                phoneNumber: event.target.value,
                              }))
                            }
                          />
                          <button
                            className={`button hover-bg-blue-700 bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-full whitespace-nowrap`}
                            style={{ minWidth: "100px" }}
                            onClick={() => {
                              const active = activeInput.phoneNumber || false;
                              if (active === false) {
                                setActiveInput((prev) => ({
                                  ...prev,
                                  phoneNumber: !active,
                                }));
                              } else {
                                // Call your update function here
                                // mutateAsync(userUpdate);
                                setActiveInput((prev) => ({
                                  ...prev,
                                  phoneNumber: !active,
                                }));
                              }
                            }}
                          >
                            {activeInput.phoneNumber ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mt-4">
                        Your phone number.
                      </p>
                    </div>
                  </div>
                  {isUpdateEnabled && ( // Hiển thị nút "Update" nếu trạng thái "isUpdating" là true và nút "Update" được kích hoạt
                    <button
                      className="button bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                      onClick={() => {}}
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </ClientOnly>
    </ProfilePage>
  );
}

export default ProfileSetting;
