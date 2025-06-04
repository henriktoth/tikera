import React from 'react';

function OrderSummary(props) {

  const TICKET_PRICES = {
    adult: 2500,
    student: 2000,
    senior: 1800
  };
  
  const formattedSeats = props.selectedSeats.map(seatId => {
    const [row, seat] = seatId.split('-');
    return `Row ${parseInt(row) + 1}, Seat ${parseInt(seat) + 1}`;
  });
  
  const totalPrice = 
    props.ticketCounts.adult * TICKET_PRICES.adult +
    props.ticketCounts.student * TICKET_PRICES.student +
    props.ticketCounts.senior * TICKET_PRICES.senior;
  
  return (
    <div className="p-4 bg-neutral-800/50 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Reservation summary:</h3>
      
      <div className="mb-4">
        <p className="font-medium">{props.activeMovie?.title}</p>
        <div className="text-sm text-neutral-400 flex gap-3">
          <span>{props.activeDay}</span>
          <span>{props.activeScreening?.start_time}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Tickets:</h4>
        <ul className="text-sm text-neutral-300">
          {props.ticketCounts.adult > 0 && (
            <li className="flex justify-between">
              <span>{props.ticketCounts.adult}x Adult</span>
              <span>{(props.ticketCounts.adult * TICKET_PRICES.adult).toLocaleString()} Ft</span>
            </li>
          )}
          {props.ticketCounts.student > 0 && (
            <li className="flex justify-between">
              <span>{props.ticketCounts.student}x Student</span>
              <span>{(props.ticketCounts.student * TICKET_PRICES.student).toLocaleString()} Ft</span>
            </li>
          )}
          {props.ticketCounts.senior > 0 && (
            <li className="flex justify-between">
              <span>{props.ticketCounts.senior}x Senior</span>
              <span>{(props.ticketCounts.senior * TICKET_PRICES.senior).toLocaleString()} Ft</span>
            </li>
          )}
        </ul>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Selected seats</h4>
        {formattedSeats.length > 0 ? (
          <ul className="text-sm text-neutral-300 grid grid-cols-2 gap-1">
            {formattedSeats.map((seat, index) => (
              <li key={index}>{seat}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-400">No selected seat</p>
        )}
      </div>
      
      <div className="border-t border-neutral-700 pt-3 mt-3">
        <div className="flex justify-between font-medium">
          <span>Final price:</span>
          <span>{totalPrice.toLocaleString()} Ft</span>
        </div>
      </div>
      
      <button
        className={`w-full mt-4 py-3 rounded-lg font-medium hover:cursor-pointer ${
          props.selectedSeats.length === (props.ticketCounts.adult + props.ticketCounts.student + props.ticketCounts.senior)
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-neutral-700 cursor-not-allowed opacity-50'
        }`}
        disabled={props.selectedSeats.length !== (props.ticketCounts.adult + props.ticketCounts.student + props.ticketCounts.senior)}
        onClick={props.onConfirmBooking}
      >
        Review Booking
      </button>
    </div>
  );
}

export default OrderSummary;