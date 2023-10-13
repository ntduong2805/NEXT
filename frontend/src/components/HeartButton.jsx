import React, { useState, useEffect } from "react";
import useFavorite from "../hooks/useFavorite";

const HeartButton = ({ listingId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const favoriteList = await hasFavorited;
      
      if (Array.isArray(favoriteList)) {
        const isFavorited = favoriteList.includes(listingId);
        setFavorited(isFavorited);
      }
    };

    fetchData();
  }, [hasFavorited, listingId]);

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-50 transition cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 fill-current absolute -top-1 -right-1"
        viewBox="0 0 25 25"
        fill={favorited ? "rose-500" : "gray-500"}
        // ^ Sử dụng "rose-500" cho màu hồng và "gray-500" cho màu xám
      >
        <path
          fillRule="evenodd"
          d="M10 18.35l-1.45-1.32C5.32 15.13 2 12.28 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.78-3.32 6.63-6.55 8.54L10 18.35z"
        />
      </svg>
    </div>
  );
};

export default HeartButton;
