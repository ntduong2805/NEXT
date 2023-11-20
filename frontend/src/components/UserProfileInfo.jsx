import React, { useState } from "react";
import { useSendOTP, useVerifyOTP } from "../hooks/useVerifyEmail";
import { Avatar, Button, Input, Modal, message } from "antd";

const UserProfileInfo = ({ currentUser }) => {
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const sendOTPHook = useSendOTP(); // Gọi hook useSendOTP ở đây
  const verifyOTPHook = useVerifyOTP();

  const showOtpModal = async () => {
    try {
      await sendOTPHook.mutateAsync();
      setOtpVisible(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpConfirm = async () => {
    try {
      await verifyOTPHook.mutateAsync(otp);
      setOtpVisible(false);
      message.success("OTP confirmed!");
    } catch (error) {
      console.error("Error confirming OTP:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOTPHook.mutateAsync(); // Gọi hàm gửi lại OTP
      message.success("OTP resent!");
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };
  return (
    <div className="bg-white rounded-md">
      <div className="bg-white rounded-2xl border border-black-900 shadow-lg p-4 mb-4">
        <div className="text-center">
          <div className="h-32 w-32 rounded-full overflow-hidden mx-auto">
            <Avatar
              src={
                currentUser?.avatar
                  ? currentUser.avatar
                  : "/images/placeholder.jpg"
              }
              alt="Hồ sơ người dùng Thái Dương"
              className="h-32 w-32 rounded-full object-cover h-28 w-28"
            />
          </div>
          <h2 className="text-2xl font-semibold mt-4">
            {currentUser?.username}
          </h2>
          <span className="text-gray-600">Khách</span>
        </div>
      </div>

      {/* Verification Card */}
      <div className="bg-white rounded-2xl border border-black-900 shadow-lg p-4 ">
        <div className="flex items-center">
          <h2 className="text-md font-semibold">
            Thông tin đã được xác nhận của {currentUser?.username}
          </h2>
        </div>
        <div className="p-2">
          <strong>Email:</strong>{" "}
          {currentUser?.isVerified ? (
            <span style={{ color: "green" }}>&#10003; Đã xác minh</span>
          ) : (
            <span style={{ color: "red" }}>&#10007; Chưa xác minh</span> 
          )}
        </div>

        <div className="p-2">
          <strong>Phone:</strong> 
          {currentUser?.isVerifiedPhone ? (
            <span style={{ color: "green" }}>&#10003; Đã xác minh</span> 
          ) : (
            <span style={{ color: "red" }}>&#10007; Chưa xác minh</span>
          )}
        </div>
        <hr className="my-4" />
        <div className="">
          <h2 className="text-md font-semibold pb-4">
            Xác minh danh tính của bạn
          </h2>
          <div className="text-gray-600 pb-3">
            Bạn cần hoàn tất bước này trước khi đặt phòng/đặt chỗ hoặc đón tiếp
            khách trên Next.
          </div>
          <Button type="primary" className="bg-blue-500" onClick={showOtpModal}>
            Xác minh
          </Button>
        </div>
      </div>
      <Modal
        title="Xác minh danh tính"
        open={otpVisible}
        onOk={handleOtpConfirm}
        onCancel={() => setOtpVisible(false)}
        footer={[
          <Button key="resend" onClick={handleResendOtp}>
            Gửi lại
          </Button>,
          <Button
            key="submit"
            className="bg-blue-500"
            type="primary"
            onClick={handleOtpConfirm}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <p>Nhập mã OTP đã gửi đến email của bạn:</p>
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Nhập OTP"
        />
      </Modal>
    </div>
  );
};

export default UserProfileInfo;
