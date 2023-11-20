import React, { useCallback, useMemo, useState, useRef } from "react";
import Image from "../Image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { format } from "date-fns";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const PlaceCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
}) => {
  const navigate = useNavigate();

  const handleCancel = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId || "");
    },
    [onAction, actionId, disabled]
  );

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

  const carouselRef = useRef();

  const handleCarouselClick = (index) => {
    // index là chỉ số của card đã được click
    navigate(`/places/${data.placeId}`);
  };

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="col-span-1 cursor-pointer group">
          <div className="flex flex-col gap-2 w-full">
            <Carousel
              showThumbs={false}
              showStatus={false}
              onClickItem={handleCarouselClick}
              ref={carouselRef}
            >
              {data.imageSrc.map((imageSrc, index) => (
                <div
                  key={index}
                  className="aspect-square w-full relative overflow-hidden rounded-xl"
                >
                  <Image
                    alt="place"
                    src={imageSrc}
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <span onClick={handleCarouselClick}>
        <div className="font-semibold text-lg ellipsis">
          {data.address}, {data?.location}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        </span>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
