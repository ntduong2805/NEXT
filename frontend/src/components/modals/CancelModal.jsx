import React from 'react';
import { GrClose as Close } from "react-icons/gr";



const CancelModal = ({ show, onClose, onConfirm, question, button, isSuccess }) => {
  return (
    show && !isSuccess && (
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70"
          onClick={onClose}
        />
        <div className="absolute bg-white rounded-lg shadow-lg p-4 space-y-4">
          <div className="flex items-center justify-end border-b border-black-300">
            <button
              className="text-gray-400 hover:text-blue-500 focus:outline-none"
              onClick={onClose}
            >
              <Close className="text-xl" />
            </button>
          </div>
          <div className="text-center py-4">
            <div className="font-semibold text-xl text-lg py-8">
              {question}
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold focus:outline-none"
              onClick={() => {
                onConfirm()
              }}
            >
              {button}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CancelModal;
