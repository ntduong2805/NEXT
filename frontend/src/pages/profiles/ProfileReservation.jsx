import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { MdHome as Home } from "react-icons/md";
import { AiFillMessage as Speaks } from "react-icons/ai";
import { RiShieldCheckLine as Verified } from "react-icons/ri";
import { FaRegStar as StarOutline } from "react-icons/fa";
import { FaCheck as Check } from "react-icons/fa";
import ReservationResult from "../../components/ReservationResult";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const ProfileReservation = ({ reservations, currentUser, isLoading }) => {
  const navigate = useNavigate();
  return (
    <div className="p-12 grid md:grid-cols-3 lg:grid-cols-7 gap-x-10 sm:mb-4">
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-300 sm:h-auto md:col-span-1 lg:col-span-2 h-[auto] max-h-[510px] overflow-auto">
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={currentUser?.avatar ? currentUser.avatar : "/images/placeholder.jpg"}
              alt=""
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-4">
            <StarOutline className="text-lg" />
            <p className="text-xs">Outstanding reviews</p>
          </div>
          <div className="flex items-center space-x-4">
            <Verified className="text-lg" />
            <p className="text-xs">Identity verified</p>
          </div>
        </div>
        <div className="pt-4">
          <h1 className="text-sm font-bold">
            {currentUser?.username} confirmed
          </h1>
          <div className="flex items-center space-x-4 pt-4">
            <Check className="text-xs" />
            <p className="text-xs">Identity</p>
          </div>
          <div className="flex items-center space-x-4">
            <Check className="text-xs" />
            <p className="text-xs">Email address</p>
          </div>
          <div className="flex items-center space-x-4">
            <Check className="text-xs" />
            <p className="text-xs">Awesomeness</p>
          </div>
          <div className="mt-5 text-xs">
            <span className="font-semibold underline">Learn more</span> about
            how confirming account info helps keep the Airbnb community secure.
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-xl border border-gray-300 md:col-span-2 lg:col-span-5 mt-8 md:mt-0">
        {" "}
        <div className="space-y-4 pb-4 border-b-[1px]">
          <h1 className="text-4xl font-semibold">
            Hi, I'm {currentUser?.username}
          </h1>
          <h6 className="text-sm text-gray-600">Joined in</h6>
          <div className="line-height-0">
            <button
              onClick={() => {
                navigate("/profile/setting");
              }}
              className="text-base font-bold underline bg-transparent border-none cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
          <h3 className="text-2xl font-semibold">About</h3>
          
          <div className="flex items-center space-x-4">
            <Home className="text-xl" />
            <p>Lives anywhere in the world</p>
          </div>
          <div className="flex items-center space-x-4">
            <Speaks className="text-xl" />
            <p>Speaks English</p>
          </div>
        </div>
        <div className="py-6">
          {isLoading ? (
            <Loading />
          ) : (
            reservations.map((reservation) => (
              <ReservationResult
                reservation={reservation}
                key={reservation.reservationId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileReservation;
