import React, { useState } from 'react';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

const PlaceReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  guestCount
}) => {
  console.log(guestCount);
  const [localNumGuest, setLocalNumGuest] = useState(1); 

  const handleNumGuestChange = (event) => {
    const newNumGuest = parseInt(event.target.value, 10);
    
    if (newNumGuest <= guestCount) {
      setLocalNumGuest(newNumGuest);
    }
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <label htmlFor="numGuest" className="font-semibold text-lg">
          Guests
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            id="numGuest"
            name="numGuest"
            value={localNumGuest}
            onChange={handleNumGuestChange}
            min={1}
            max={guestCount}
          />
          <Button disabled={disabled} label="Reserve" onClick={() => onSubmit(localNumGuest)} />
        </div>
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default PlaceReservation;
