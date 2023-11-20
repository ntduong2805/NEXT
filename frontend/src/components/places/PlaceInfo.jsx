import React, { Suspense } from "react";
import PlaceCategory from "./PlaceCategory";
import useCountries from "../../hooks/useCountries";
import { Avatar } from "antd";

// Chú ý rằng bạn không cần dùng dynamic ở đây
const Map = React.lazy(() => import("../Map"));

const PlaceInfo = ({
  owner,
  avatar,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {owner}</div>
          <Avatar src={avatar} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <PlaceCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <Map center={coordinates} />
      </Suspense>
    </div>
  );
};

export default PlaceInfo;
