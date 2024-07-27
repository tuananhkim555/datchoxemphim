// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Seat from './Seat.jsx';
import '../styles/SeatSelection.css';

const SeatSelection = () => {
  const [name, setName] = useState('');
  const [numSeats, setNumSeats] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);

  // Tải dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const savedName = localStorage.getItem('name') || '';
    const savedNumSeats = localStorage.getItem('numSeats') || '';
    const savedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const savedReservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    const savedConfirmMessage = localStorage.getItem('confirmMessage') || '';
    const savedIsSelecting = localStorage.getItem('isSelecting') === 'true';

    setName(savedName);
    setNumSeats(savedNumSeats);
    setSelectedSeats(savedSelectedSeats);
    setReservedSeats(savedReservedSeats);
    setConfirmMessage(savedConfirmMessage);
    setIsSelecting(savedIsSelecting);
  }, []);

  // Lưu dữ liệu vào localStorage khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('numSeats', numSeats);
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('reservedSeats', JSON.stringify(reservedSeats));
    localStorage.setItem('confirmMessage', confirmMessage);
    localStorage.setItem('isSelecting', isSelecting);
  }, [name, numSeats, selectedSeats, reservedSeats, confirmMessage, isSelecting]);

  const handleSeatClick = (seatNumber) => {
    if (!isSelecting) {
      alert('Mời bạn nhấn "Start Selecting" để chọn ghế.');
      return;
    }

    if (reservedSeats.includes(seatNumber)) return;

    let newSelectedSeats = [...selectedSeats];
    if (newSelectedSeats.includes(seatNumber)) {
      newSelectedSeats = newSelectedSeats.filter(seat => seat !== seatNumber);
    } else if (newSelectedSeats.length < numSeats) {
      newSelectedSeats.push(seatNumber);
    }

    setSelectedSeats(newSelectedSeats);
  };

  const handleStartSelecting = () => {
    if (numSeats && name) {
      setIsSelecting(true);
      alert('Mời bạn chọn ghế');
    } else {
      alert('Vui lòng nhập tên và số lượng ghế.');
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === parseInt(numSeats, 10)) {
      setReservedSeats([...reservedSeats, ...selectedSeats]);
      setConfirmMessage(`Tên: ${name}, Số lượng ghế: ${numSeats}, Vị trí ghế: ${selectedSeats.join(', ')}`);
      setIsSelecting(false); // Khi đã xác nhận, tắt chế độ chọn ghế
    } else {
      alert('Chọn đủ số lượng ghế mong muốn.');
    }
  };

  const handleReset = () => {
    setName('');
    setNumSeats('');
    setSelectedSeats([]);
    setConfirmMessage('');
    setIsSelecting(false); // Đặt lại trạng thái chọn ghế
    localStorage.clear(); // Xóa tất cả dữ liệu localStorage
  };

  return (
    <div className="seat-selection">
      <div className="step1">
        <input
          type="text"
          placeholder="Tên người mua"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Số lượng ghế"
          value={numSeats}
          onChange={(e) => setNumSeats(e.target.value)}
        />
        <button onClick={handleStartSelecting}>Start Selecting</button>
      </div>
      <div className="info-messages">
        <p className="info-message">B1 Nhập tên và số lượng ghế.</p>
        <p className="info-message">B2 Nhấn Start Selecting chọn ghế</p>
      </div>
      <div className="legend">
        <span className="selected">Selected Seat</span>
        <span className="reserved">Reserved Seat</span>
        <span className="empty">Empty Seat</span>
      </div>
      <div className="step2">
        <div className="seat-map">
          {Array.from({ length: 10 }).map((_, row) => (
            <div key={row} className="row">
              <div className="row-label">{String.fromCharCode(65 + row)}</div>
              {Array.from({ length: 12 }).map((_, col) => {
                const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;
                return (
                  <Seat
                    key={seatNumber}
                    seatNumber={seatNumber}
                    isSelected={selectedSeats.includes(seatNumber)}
                    isReserved={reservedSeats.includes(seatNumber)}
                    onClick={() => handleSeatClick(seatNumber)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <button onClick={handleConfirm}>Confirm Selection</button>
      </div>
      {confirmMessage && (
        <div className="step3">
          <h3>Thông tin đặt ghế</h3>
          <p>{confirmMessage}</p>
          <button onClick={handleReset}>Đặt lại</button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
