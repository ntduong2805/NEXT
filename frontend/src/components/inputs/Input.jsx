import React, { useState } from "react";
import { BiDollar } from "react-icons/bi";

function Input({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  isTextArea,
  isPriceInput,
}) {
  const [value, setValue] = useState(""); // State để theo dõi giá trị của input

  // Hàm xử lý khi giá trị của input thay đổi
  const handleChange = (event) => {
    let inputValue = event.target.value;

    // Kiểm tra nếu là input price thì chỉ cho phép nhập số và dấu "."
    if (isPriceInput) {
      inputValue = inputValue.replace(/[^0-9.]/g, "");
    }

    setValue(inputValue);
  };

  return (
    <div className="relative">
      {formatPrice && isPriceInput && (
        <BiDollar size={24} className="absolute top-3.5 right-4 text-neutral-700" />
      )}
      {isTextArea ? (
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required: isPriceInput ? "required" : false })}
          placeholder=""
          rows={4}
          className={`w-full p-4 pt-8 font-light bg-white border-2 rounded-md outline-none transition ${
            formatPrice && isPriceInput ? "pl-9" : "pl-4"
          } ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black"
          } disabled:opacity-70 disabled:cursor-not-allowed`}
          value={value} // Giá trị của input
          onChange={handleChange} // Xử lý khi giá trị thay đổi
        />
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required: isPriceInput ? "required" : false })}
          placeholder=""
          type={type}
          className={`w-full p-4 pt-8 font-light bg-white border-2 rounded-md outline-none transition ${
            formatPrice && isPriceInput ? "pl-9 p-5" : "pl-4"
          } ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black"
          } disabled:opacity-70 disabled:cursor-not-allowed`}
          value={value} // Giá trị của input
          onChange={handleChange} // Xử lý khi giá trị thay đổi
        />
      )}
      <label
        htmlFor={id}
        className={`absolute text-md duration-150 transform -translate-y-3 top-2 left-4 bg-white px-2 ${
          errors[id] ? "text-rose-500" : "text-neutral-500"
        } ${formatPrice && isPriceInput ? "left-9" : ""} ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
