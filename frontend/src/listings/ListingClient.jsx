import toast from "react-hot-toast";
import reservationApi from "../apis/reservation";
import Container from "../components/Container";
import ListingHead from "../components/listings/ListingHead";
import ListingInfo from "../components/listings/ListingInfo";
import ListingReservation from "../components/listings/ListingReservation";
import { categories } from "../components/navbars/Categories";
import useLoginModal from "../hooks/useLoginMoal";
import { addDays, differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};


const ListingClient = ({
  listing,
  currentUser,
}) => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedReservation = await reservationApi.getReservationByListingId(listing.listingId);
        setReservations(fetchedReservation?.data.data);
      } catch (error) {
        console.error("Error fetching reservations", error);
      }
    };

    fetchData();
  }, [listing.listingId]);





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

  
  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
  
    const customData = {
      totalPrice,
      startDate: format(addDays(dateRange.startDate, 1), "yyyy-MM-dd HH:mm:ss.SSS"),
      endDate: format(addDays(dateRange.endDate, 1), "yyyy-MM-dd HH:mm:ss.SSS"),
      userId: currentUser?.id,
      listingId: listing?.listingId,
    };
    console.log(customData);
    setIsLoading(true);
  
    try {
      const response = await reservationApi.reservation(customData);
      if (response?.data.codeStatus === 200) {
        toast.success("Reservation created successfully");
        navigate('/trips'); // Sử dụng navigate để điều hướng
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, totalPrice, dateRange, listing?.listingId, loginModal, navigate]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        addDays(dateRange.endDate, 1),
        addDays(dateRange.startDate, 1)
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            location={listing.location}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={currentUser}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.location}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
