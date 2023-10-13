import React, { useCallback } from "react"; // Import React and useCallback from 'react'
import qs from "query-string";

const CategoryBox = ({ label, icon: Icon, selected }) => {
  const handleClick = useCallback(() => {
    let currentQuery = {};

    // Use the built-in URLSearchParams object to get query parameters
    const params = new URLSearchParams(window.location.search);

    if (params) {
      currentQuery = Object.fromEntries(params.entries());
    }

    const updateQuery = {
      ...currentQuery,
      category: label.toLowerCase(),
    };

    if (params.get("category") === label.toLowerCase()) {
      delete updateQuery.category;
    }

    const queryString = qs.stringify(updateQuery, { skipNull: true });
    const url = `/?${queryString}`;

    window.history.pushState(null, null, url);
  }, [label]);

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
