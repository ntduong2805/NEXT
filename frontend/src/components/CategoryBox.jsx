import React, { useCallback } from "react";
import qs from "query-string";
import { useNavigate } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon, selected }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    // Convert label to lowercase
    const lowerCaseLabel = label.toLowerCase();
  
    // Construct the URL with the lowercase label as a query parameter
    const url = `/category/${lowerCaseLabel}`;
  
    // Use qs.stringify to handle URL encoding for the label if needed
  
    // Navigate to the constructed URL
    navigate(`${url}`);
  }, [label, navigate]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
