import { NavLink, useLocation, useNavigate } from "react-router-dom";

import RareFind from "/images/rare-find.png";
import { RiStarSFill as Star } from "react-icons/ri";
import { useMemo } from "react";
import { format } from "date-fns";
import { FaAngleLeft } from "react-icons/fa";
import Navbar from "./navbars/Navbar";
import { useCreateReservation } from "../hooks/useCreateReservation";
const ReservationProcess = () => {
  const navigate = useNavigate();
  const { reservation } = useLocation().state;
  const currentUser = reservation.currentUser;
  const owner = reservation.owner;
  const place = reservation?.place;
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  const startDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    return `${format(start, "PP")}`;
  }, [reservation]);
  const numGuests = reservation.numGuests;
  const totalPrice = reservation.totalPrice;
  const serviceFee = (place.price * 0.05).toFixed(2);
  const total = (parseFloat(totalPrice) + parseFloat(serviceFee)).toFixed(2);;
  console.log(total);
  const { data, isLoading, mutateAsync , isSuccess } = useCreateReservation();

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      userId: currentUser.userId,
      placeId: place.placeId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      nightCount: reservation.nightCount,
      guestCount: reservation.numGuests,
      totalPrice: total
    }
    mutateAsync(data)
  };
  if (isSuccess) {
    navigate("/profile")
  }

  return (
    <>
      <Navbar currentUser={currentUser}/>
      <div className="max-w-screen-xl mx-auto pb-20 pt-28">
        <div className="flex items-center justify-between md:pl-10 lg:pl-10">
          <NavLink
            to={`/places/${place?.placeId}`}
            className="flex items-center"
          >
            <span className="w-12 h-12 flex items-center justify-center bg-black-38 hover:border rounded-full transition duration-300 hover:bg-lightgray">
              <FaAngleLeft size={24} className="text-36 text-black-500" />
            </span>
            <span className="ml-4 text-lg">
              Reservation/reservation required
            </span>
          </NavLink>
        </div>
        <div className="md:order-2 max-w-screen-lg mx-auto p-4 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
          <div className="rounded-lg md:col-span-3 lg:col-span-3 p-3 md:p-3 lg:p-3 mb-4 mt-0">
            <div className="rounded-lg p-4 md:p-4 lg:p-4 mb-4">
              <h2 className="text-22">This is a rare find.</h2>
              <p className="mb-2">
                {owner}'s place is usually booked.
              </p>
              <div className="rare__find-logo">
                <img src={RareFind} alt="" />
              </div>
            </div>
            <div className="p-4 md:p-4 lg:p-4 mb-4 border-b border-gray-300">
              <h2 className="text-22 mb-2">Your trip</h2>
              <div className="mb-2">
                <span className="font-semibold text-base">Dates: </span>
                {reservationDate}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-base">Guests: </span>
                {numGuests}
              </div>
            </div>
            <div className="p-4 md:p-4 lg:p-4 mb-4 border-b border-gray-300">
              <h2 className="text-22 mb-2">Cancellation policy</h2>
              <p>
                Free cancellation for 48 hours. After that, cancel before 3:00
                PM on {startDate} and get a full refund, minus the service fee.
              </p>
              <p className="mt-2">
                Make sure this host’s cancellation policy works for you. Our
                Extenuating Circumstance policy may not cover travel disruptions
                caused by known events, like COVID-19, or foreseeable events,
                like common severe weather.
              </p>
            </div>
            <div className="p-4 text-xs">
              <div className="text-12 line-clamp-14">
                By selecting the button below, I agree to the{" "}
                <span className="text-blue-600 underline font-semibold">
                  House Rules, Safety Disclosures, Cancellation Policy, Airbnb’s
                  social-distancing, and other COVID-19-related guidelines
                </span>
                , and the{" "}
                <span className="text-blue-600 underline font-semibold">
                  Guest Refund Policy
                </span>
                . I also agree to pay the total amount shown, which includes
                Occupancy Taxes and Service Fees. Airbnb now collects and remits
                government-imposed{" "}
                <span className="text-blue-600 underline font-semibold">
                  Occupancy Taxes
                </span>{" "}
                in this location.
              </div>
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-2 p-3 md:p-3 lg:p-3 mt-0">
            <div className="border rounded-lg p-4 shadow-md border-gray-300 sticky top-32 overflow-auto mt-0">
              <div className="flex items-start pb-6 border-b border-gray-300">
                <img
                  className="rounded-xl w-36 h-36 object-cover flex-shrink-0"
                  src={place.imageSrc[0]}
                  alt="Place Image"
                />
                <div className="ml-4 flex-grow text-xs">
                  <p className="text-gray-500">
                    {place?.category} in {place?.address}
                  </p>
                  <h4 className="text-sm font-semibold">{place?.title}</h4>
                  <div className="flex items-center text-red-500">
                    <span>
                      <Star className="text-16 text-red-500" />
                    </span>
                    <span className="ml-2 font-medium">5.0</span>
                    <span className="ml-2">・</span>
                    <span>(9 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="text-22 py-6">
                <h2>Price details</h2>
              </div>
              <div className="flex flex-col flex-wrap pb-6 border-b border-gray-300">
                <div className="flex justify-between">
                  <div>
                    ${place.price} x {reservation.nightCount} nights{" "}
                  </div>
                  <div className="font-medium">$ {totalPrice}</div>
                </div>
                <div className="flex justify-between">
                  <div>Service fee</div>
                  <div className="font-medium">$ {serviceFee}</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-medium">
                    Total <span className="text-underline">(USD)</span>
                  </div>
                  <div className="font-medium">${total}</div>
                </div>
              </div>
              <div className="py-6">
                <p>
                  <span>Free cancellation for 48 hours. </span>After that,
                  cancel before 3:00 PM on {startDate} and get a 50% refund,
                  minus the service fee.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:order-1 p-4 text-center">
          <button
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default ReservationProcess;
