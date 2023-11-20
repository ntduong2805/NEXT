import React from "react";

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative 
        disabled:opacity-60 
        disabled:cursor-not-allowed 
        rounded-lg 
        hover:opacity-80 
        transition 
        w-full
        ${outline ? "bg-white" : "bg-blue-500"}
        ${outline ? "border-black" : "border-blue-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && <Icon className="absolute left-4 top-3" size={24} />}
      {label}
    </button>
  );
}

export default Button;