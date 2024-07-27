// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../styles/Seat.css';

// eslint-disable-next-line react/prop-types
const Seat = ({ seatNumber, isSelected, isReserved, onClick }) => {
  let className = 'seat';
  if (isSelected) className += ' selected';
  if (isReserved) className += ' reserved';

  return (
    <div className={className} onClick={onClick}>
      {seatNumber}
    </div>
  );
};

export default Seat;
