import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import {
  MessageOutlined,
  MailOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useSendOTP, useVerifyOTP } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const STEPS = {
  SELECT: 0,
  SEND: 1,
};

const VerificationModal = ({ visible, onCancel, user }) => {
  const [step, setStep] = useState(STEPS.SELECT);
  const {mutateAsync: sendOTPMutateAsync} = useSendOTP();
  const {mutateAsync: verifyOTPMutateAsync, isLoading:isLoadingVerify} = useVerifyOTP();
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = async () => {
    try {
      await sendOTPMutateAsync();
      setStep((prev) => prev + 1);
      toast.success("Send OTP successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const onResend = async () => {
    try {
      await sendOTPMutateAsync();
      toast.success("Send OTP successfully");
    } catch (err) {
      toast.error(err.message);
    }
  }

  const onSubmit = async () => {
    if (step !== STEPS.SEND) {
      return onNext();
    }
    try {
      await verifyOTPMutateAsync(otp.join(""));
      // Handle logic after successful verification, e.g., close the modal
      onCancel();
      setStep(STEPS.SELECT);
      setOTP(["", "", "", "", "", ""]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleClose = () => {
    onCancel(); // Close the modal
    setStep(STEPS.SELECT); // Set the step back to SELECT
  };

  const handleInputChange = (index, value, event) => {
    // Handle backspace
    if (event.key === "Backspace") {
      const newOTP = [...otp];
      newOTP[index] = "";
      setOTP(newOTP);

      // Move focus to the previous input field
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else {
      // Handle regular input
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move to the next input field
      if (index < newOTP.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  let footerContent = null;
  let bodyContent = (
    <div>
      <h1 className="py-6 font-semibold text-xl">
        Giúp chúng tôi xác minh danh tính của bạn
      </h1>
      <hr />
      <div>
        <div className="py-3">
          <Button
            onClick={onNext}
            block
            type="text"
            className="flex items-center border-none"
            disabled={user?.isVerifyEmail}
          >
            <MailOutlined />
            <span className="pl-4">Email: {user?.email}</span>
            <div className="flex-grow" />
            <RightOutlined className="text-right" />
          </Button>
        </div>
      </div>
      <hr />
    </div>
  );

  if (step === STEPS.SEND) {
    bodyContent = (
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          
            <div className="bg-white py-3 rounded ">
            <h1 className="text-2xl font-bold"> <LeftOutlined className="ml-1 left-0" onClick={onBack}/> OTP Verification</h1>
              <div className="flex flex-col ml-2 mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">{email}</span>
              </div>

              <div
                id="otp"
                className="flex flex-row justify-center text-center px-2 mt-5"
              >
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="m-2 border h-10 w-10 text-center form-control rounded"
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) =>
                      handleInputChange(index, e.target.value, e)
                    }
                    onKeyDown={(e) => handleInputChange(index, "", e)}
                    disabled={isLoadingVerify}
                  />
                ))}
              </div>
            </div>
        </div>
      </div>
    );
    console.log(isLoadingVerify);
    footerContent = (
      <div className="py-3">
        <Button onClick={onResend} type="default" loading={isLoadingVerify}>
          Resend OTP
        </Button>
        <Button onClick={onSubmit} type="primary" className="bg-blue-500" loading={isLoadingVerify}>
          Xác nhận
        </Button>
      </div>
    );
  }

  return (
    <Modal
      title=""
      centered
      open={visible}
      onCancel={handleClose}
      footer={footerContent}
    >
      {bodyContent}
      
    </Modal>
  );
};

export default VerificationModal;
