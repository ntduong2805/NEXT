import React, { useCallback, useMemo, useState } from "react";
import Image from "../Image";
import HeartButton from "../HeartButton";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import Button from "../Button";
const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}) => {
  const handleCancel = useCallback(
    (e) => {
      e.stopPropagation(); // Prevents the click from bubbling up to the parent

      if (disabled) {
        return;
      }

      onAction?.(actionId || "");
    },
    [onAction, actionId, disabled]
  );

  const [isHovered, setIsHovered] = useState(false);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const renderArrowPrev = (onClickHandler, hasPrev, label) => {
    if (!hasPrev) {
      return null;
    }
    return (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        className="carousel-arrow"
      >
        {/* Thay đổi nút điều hướng trước ở đây */}
        <span style={{ fontSize: '24px', color: '#333' }}>&lt;</span>
      </button>
    );
  };

  const renderArrowNext = (onClickHandler, hasNext, label) => {
    if (!hasNext) {
      return null;
    }
    return (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        className="carousel-arrow top-10"
      >
        {/* Thay đổi nút điều hướng tiếp theo ở đây */}
        <span style={{ fontSize: '24px', color: '#333' }}>&gt;</span>
      </button>
    );
  };

  const buttonStyle = {
    display: isHovered ? 'block' : 'none',
    position: 'absolute',
    top: '30%',
    right: '10px',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'background-color 0.3s ease',
  };

  return (
    <Link to={`/listings/${data.listingId}`}
			className="col-span-1 cursor-pointer group"
		> 
      <div className="flex flex-col gap-2 w-full">
        <div className="col-span-1 cursor-pointer group">
          <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
              <Carousel
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={renderArrowPrev}
                renderArrowNext={renderArrowNext}
              >
                {data.imageSrc.map((imageSrc, index) => (
                  <div key={index} className="object-cover h-96 w-45">
                    <Image
                      alt="listing"
                      src={imageSrc}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                      }}

                    />
                  </div>
                ))}
              </Carousel>
              <div className="absolute top-3 right-5">
                <HeartButton listingId={data.listingId} currentUser={currentUser} />
              </div>
              <button
                type="button"
                className="carousel-button"
                onClick={handleCancel}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={buttonStyle}
              >
                <span>&#10006;</span>
              </button>
            </div>

          </div>
        </div>
        <div className="font-semibold text-lg">
          {data.address}, {data?.location}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </Link>
  );
};

export default ListingCard;
