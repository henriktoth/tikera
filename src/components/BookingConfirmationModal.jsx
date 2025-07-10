import React from 'react';

function BookingConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  movie, 
  day, 
  screening, 
  tickets, 
  seats, 
  totalPrice 
}) {
  if (!isOpen) return null;

  const formattedSeats = seats.map(seatId => {
    const [row, seat] = seatId.split('-');
    return `Row ${parseInt(row) + 1}, Seat ${parseInt(seat) + 1}`;
  });
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
      <div 
        className="relative bg-neutral-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
        
        <div className="mb-4">
          <h3 className="text-xl font-medium">{movie?.title}</h3>
          <div className="text-neutral-400 flex gap-3">
            <span>{day}</span>
            <span>{screening?.start_time}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Tickets:</h4>
          <ul className="text-sm text-neutral-300">
            {tickets.adult > 0 && (
              <li className="flex justify-between">
                <span>{tickets.adult}x Adult</span>
                <span>{(tickets.adult * 2500).toLocaleString()} Ft</span>
              </li>
            )}
            {tickets.student > 0 && (
              <li className="flex justify-between">
                <span>{tickets.student}x Student</span>
                <span>{(tickets.student * 2000).toLocaleString()} Ft</span>
              </li>
            )}
            {tickets.senior > 0 && (
              <li className="flex justify-between">
                <span>{tickets.senior}x Senior</span>
                <span>{(tickets.senior * 1800).toLocaleString()} Ft</span>
              </li>
            )}
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Selected seats:</h4>
          <div className="text-sm text-neutral-300 grid grid-cols-2 gap-1">
            {formattedSeats.map((seat, index) => (
              <div key={index}>{seat}</div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-4 mt-4">
          <div className="flex justify-between font-medium">
            <span>Total price:</span>
            <span>{totalPrice.toLocaleString()} Ft</span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 py-3 rounded-lg bg-neutral-700 hover:bg-neutral-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmationModal;