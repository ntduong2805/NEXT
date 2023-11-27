import React, { useState } from "react";
import { Button } from "antd";
import VerificationModal from "../modals/VerificationModal";
import ProfileCard from "./ProfileCard";

const ProfileInfo = ({ currentUser }) => {
  const [otpVisible, setOtpVisible] = useState(false);


  const showOtpModal = () => {
    setOtpVisible(true);
  };



  return (
    <div className="bg-white rounded-md">
      <ProfileCard  user={currentUser}/>
      <div className="rounded-2xl border border-black-900 shadow-lg p-4">
        <div className="flex items-center">
          <h2 className="text-sm font-semibold">
            {currentUser?.username}'s information has been confirmed
          </h2>
        </div>
        <div className="p-2">
          <strong>Email:</strong>{" "}
          {currentUser?.isVerifyEmail == 1 ? (
            <span style={{ color: "green" }}>&#10003; Verified</span>
          ) : (
            <span style={{ color: "red" }}>&#10007; Not verified</span>
          )}
        </div>

        {/* <div className="p-2">
          <strong>Phone:</strong>
          {currentUser?.isVerifiedPhone == 1 ? (
            <span style={{ color: "green" }}>&#10003; Verified</span>
          ) : (
            <span style={{ color: "red" }}>&#10007; Not verified</span>
          )}
        </div> */}
        <hr className="my-4" />
        <div className="">
          <h2 className="text-md font-semibold pb-4">
          Verify your identity
          </h2>
          <div className="text-xs text-gray-600 pb-3">
          You need to complete this step before reserving or hosting
          guest on Next.
          </div>
          <Button type="primary" className="bg-blue-500" onClick={showOtpModal}>
            Verification
          </Button>
        </div>
      </div>
      <VerificationModal
        visible={otpVisible}
        onCancel={() => setOtpVisible(false)}
        user={currentUser}
      />
    </div>
  );
};

export default ProfileInfo;



