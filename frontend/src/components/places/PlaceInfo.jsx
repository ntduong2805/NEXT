import React, { Suspense, useState } from "react";
import PlaceCategory from "./PlaceCategory";
import useCountries from "../../hooks/useCountries";
import { Avatar, Button } from "antd";
import ProfileModal from "../modals/ProfileModal";
import { useGetUserById } from "../../hooks/useAuth";
import PlaceReview from "./PlaceReview";
import { useGetReviewByPlace } from "../../hooks/useReview";


// Chú ý rằng bạn không cần dùng dynamic ở đây
const Map = React.lazy(() => import("../Map"));

const PlaceInfo = ({
  ownerId,
  placeId,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { data: owner } = useGetUserById(ownerId);
  
  const openProfileModal = () => {
    setShowProfileModal(true);
  };
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by</div>
          <div className="flex items-center mt-2">
                <Button
                  icon={<Avatar src={owner?.avatar} size={24} />}
                  size="large"
                  onClick={openProfileModal}
                >
                  {owner?.username}
                </Button>
              </div>
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
        <Map center={coordinates} zoom={10}/>
      </Suspense>
      <hr />
      <ProfileModal
        isVisible={showProfileModal}
        onCancel={() => setShowProfileModal(false)}
        user={owner}
      />
    </div>
  );
};

export default PlaceInfo;
