import { format, parseISO } from "date-fns";
import React from "react";
import { Spin } from "antd";
import Heading from "../Heading";

const PlaceReview = ({ data, isLoading }) => {
  const reviews = data?.reviews;
  const totalData = data?.totalData;

  if (isLoading) {
    return <Spin />;
  }

  if (!totalData || totalData === 0) {
    return (
      <Heading
        title="There are no reviews yet"
        subtitle="Please experience it and rate it"
      />
    );
  }

  // Function to generate stars based on the rating
  const generateStars = (rating) => {
    const starCount = Math.floor(rating); // Take the floor to get the integer part
    const stars = Array.from({ length: starCount }, (_, index) => (
      <span key={index} className="text-yellow-500">&#9733;</span>
    ));

    // If there is a decimal part, add a half star
    if (rating % 1 !== 0) {
      stars.push(
        <span key="half" className="text-yellow-500">
          &#9733;&#189;
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="grid grid-rows-9 grid-cols-7 flex flex-col gap-6">
      <div className="row-span-1 col-span-8 flex items-center pb-10">
        <span className="text-2xl font-semibold">{data?.rating}</span>
        <Heading
          title={
            totalData > 1 ? (
              <>
                <span className="text-yellow-500">&#9733;</span> {data?.avgRating} · ({totalData} reviews)
              </>
            ) : (
              <>
                <span className="text-yellow-500">&#9733;</span> {data?.avgRating} · ({totalData} review)
              </>
            )
          }
          subtitle=""
        />
      </div>
      <div className="row-span-1 col-span-8 grid grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div key={review.reviewId} className="pb-10">
            <div className="flex items-center pb-4">
              <img
                src={review?.avatar}
                alt=""
                className="h-14 w-14 object-cover rounded-full"
              />
              <div className="pl-4">
                <h2>{review?.username}</h2>
                <div className="flex items-center">
                  {generateStars(review?.rating)}
                  <p className="text-xs font-normal text-gray-700 ml-2">
                    {format(new Date(review?.createddate), "PP")}
                  </p>
                </div>
              </div>
            </div>
            <div className="line-height-6 text-gray-800">
              <p>{review?.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceReview;
