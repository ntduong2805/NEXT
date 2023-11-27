import React, { useEffect, useRef } from 'react';

const OTPVerification = () => {
  useEffect(() => {
    function OTPInput() {
      const inputs = document.querySelectorAll('#otp > *[id]');
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keydown', function (event) {
          if (event.key === 'Backspace') {
            inputs[i].value = '';
            if (i !== 0) inputs[i - 1].focus();
          } else {
            if (i === inputs.length - 1 && inputs[i].value !== '') {
              return true;
            } else if (event.keyCode > 47 && event.keyCode < 58) {
              inputs[i].value = event.key;
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
            } else if (event.keyCode > 64 && event.keyCode < 91) {
              inputs[i].value = String.fromCharCode(event.keyCode);
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
            }
          }
        });
      }
    }

    OTPInput();
  }, []);

  return (
    <div className="h-screen bg-blue-500 py-20 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white h-64 py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">+91 ******876</span>
              </div>

              <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxLength="1" />
                <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxLength="1" />
                <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxLength="1" />
                <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxLength="1" />
                <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxLength="1" />
                <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxLength="1" />
              </div>

              <div className="flex justify-center text-center mt-5">
                <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                  <span className="font-bold">Resend OTP</span>
                  <i className='bx bx-caret-right ml-1'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
