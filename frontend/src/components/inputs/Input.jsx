import React from 'react';
import { BiDollar } from 'react-icons/bi';

function Input({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  errors,
  isTextArea,
  isPriceInput,
  onChange,
}) {
  const isRequired = isPriceInput; // Kiểm tra isPriceInput

  return (
    <div className="relative">
      {formatPrice && isPriceInput && (
        <BiDollar size={24} className="absolute top-3.5 right-4 text-neutral-700" />
      )}
      {isTextArea ? (
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required: isRequired })} // Đã thay đổi ở đây
          placeholder=""
          rows={4}
          onChange={onChange}
          className={`w-full p-4 pt-8 font-light bg-white border-2 rounded-md outline-none transition ${
            formatPrice && isPriceInput ? 'pl-9' : 'pl-4'
          } ${errors[id] ? 'border-rose-500 focus-border-rose-500' : 'border-neutral-300 focus-border-black'} ${
            disabled ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        />
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required: isRequired })} // Đã thay đổi ở đây
          placeholder=""
          type={type}
          onChange={onChange}
          className={`w-full p-4 pt-8 font-light bg-white border-2 rounded-md outline-none transition ${
            formatPrice && isPriceInput ? 'pl-9 p-5' : 'pl-4'
          } ${errors[id] ? 'border-rose-500 focus-border-rose-500' : 'border-neutral-300 focus-border-black'} ${
            disabled ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute text-sm duration-150 transform -translate-y-3 top-2 left-4 bg-white px-2 ${
          errors[id] ? 'text-rose-500' : 'text-neutral-500'
        } ${formatPrice && isPriceInput ? 'left-9' : ''} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
