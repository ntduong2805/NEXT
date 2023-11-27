import Container from "../../components/Container";
import PlaceHead from "../../components/places/PlaceHead";
import PlaceInfo from "../../components/places/PlaceInfo";
import PlaceReservation from "../../components/places/PlaceReservation";
import { categories } from "../../components/navbars/Categories";
import useLoginModal from "../../hooks/useLoginModal";
import {
  addDays,
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  format,
} from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReservationByPlaceId } from "../../hooks/useReservation";
import PlaceReview from "../../components/places/PlaceReview";
import { useGetReviewByPlace } from "../../hooks/useReview";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const PlaceClient = ({ place, currentUser }) => {
  const [reservations, setReservations] = useState([]);
  const [totalPrice, setTotalPrice] = useState(place?.price);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  const { data: dataReviews, isLoading: isLoadingReview } = useGetReviewByPlace(place.placeId);
  const {
    data: reservationData,
    isLoading,
    isSuccess: reservationIsSuccess,
  } = useGetReservationByPlaceId(place?.placeId);
  const isCurrentUserOwner = currentUser?.userId === place?.userId;
  useEffect(() => {
    if (reservationIsSuccess && reservationData) {
      setReservations(reservationData);
    }
  }, [reservationData, reservationIsSuccess]);

  const disabledDates = useMemo(() => {
    let dates = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(
    async (numGuests) => {
      if (!currentUser) {
        return loginModal.onOpen();
      }

      const reservation = {
        totalPrice,
        startDate: format(dateRange.startDate, "yyyy-MM-dd"),
        endDate: format(dateRange.endDate, "yyyy-MM-dd"),
        currentUser: currentUser,
        placeId: place?.placeId,
        place: place,
        owner: place?.owner,
        avatar: place?.avatar,
        numGuests,
        avgRating: dataReviews?.avgRating,
        totalReview: dataReviews?.totalData,
        nightCount:
          differenceInCalendarDays(
            addDays(dateRange.endDate, 1),
            addDays(dateRange.startDate, 1)
          ) + 1,
      };
      navigate("/reservation-process", { state: { reservation: reservation } });
    },
    [currentUser, totalPrice, dateRange, place?.placeId, loginModal, navigate]
  );

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount =
        differenceInCalendarDays(
          addDays(dateRange.endDate, 1),
          addDays(dateRange.startDate, 1)
        ) + 1;

      if (dayCount && place?.price) {
        setTotalPrice(dayCount * place?.price);
      } else {
        setTotalPrice(place?.price);
      }
    }
  }, [dateRange, place?.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === place?.category);
  }, [place?.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <PlaceHead
            title={place?.title}
            imageSrc={place?.imageSrc}
            location={place?.location}
            address={place?.address}
            placeId={place?.placed}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <PlaceInfo
              ownerId={place?.userId}
              placeId={place?.placeId}
              category={category}
              description={place?.description}
              roomCount={place?.roomCount}
              guestCount={place?.guestCount}
              bathroomCount={place?.bathroomCount}
              locationValue={place?.location}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <PlaceReservation
                price={place?.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading || isCurrentUserOwner}
                disabledDates={disabledDates}
                guestCount={place?.guestCount}
                isButtonDisabled={isCurrentUserOwner}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <PlaceReview data={dataReviews} isLoading={isLoadingReview}/>
        </div>
      </div>
    </Container>
  );
};

export default PlaceClient;
