// Trong ProfileModal.js
import { Modal } from "antd";
import ProfileCard from "../profiles/ProfileCard";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const ProfileModal = ({ isVisible, onCancel, user }) => {
  return (
    <Modal
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      className="max-w-[390px]"
      
    >
      <div className="pt-8 space-y-4">
        <ProfileCard user={user} />
        <div className="py-4 text-md">
          <div className="p-2 text-lg">
          <PhoneOutlined /> Phone number: {user?.phoneNumber}
          </div>
          <div className="p-2 text-lg">
          <MailOutlined /> Email: {user?.email}
          </div>
        </div>
        <hr />
        <div className="bg-white rounded-2xl border border-black-900  p-4 ">
          <div className="flex items-center">
            <h2 className="text-sm font-semibold">
              {user?.username}'s information has been confirmed
            </h2>
          </div>
          <div className="p-2">
            <strong>Email:</strong>{" "}
            {user?.isVerifyEmail == 1 ? (
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
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
