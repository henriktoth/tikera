import { useState, useEffect } from "react"
import Icon from '@mdi/react';
import { mdiSeat } from '@mdi/js';

function SeatingPlan({ activeScreening, ticketCounts, selectedSeats, setSelectedSeats }){
    const [seats, setSeats] = useState([[]])
    
    useEffect(() => { 
        if (!activeScreening) return
        const rows = activeScreening.room.rows
        const seatsPerRow = activeScreening.room.seatsPerRow

        const initialSeats = Array.from({ length: rows }, () => Array(seatsPerRow).fill(0));

        activeScreening.bookings.forEach(booking => {
            const { row, seat } = booking;
            if (initialSeats[row] && typeof initialSeats[row][seat] !== "undefined") {
                initialSeats[row][seat] = 1;
            }
        });
        setSeats(initialSeats);
        setSelectedSeats([]);
    }, [activeScreening, setSelectedSeats])

    const totalTickets = ticketCounts.adult + ticketCounts.student + ticketCounts.senior;

    const handleSeatClick = (rowIndex, seatIndex) => {
        const seatId = `${rowIndex}-${seatIndex}`;
        const isReserved = seats[rowIndex][seatIndex] === 1;
        const isSelected = selectedSeats.includes(seatId);
        
        if (isReserved) return;
        
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            if (selectedSeats.length < totalTickets) {
                setSelectedSeats([...selectedSeats, seatId]);
            }
        }
    };

    return (
        <div>
            <p className="text-center mb-4">Choose {totalTickets - selectedSeats.length} seats</p>
            <div className="mb-10 flex justify-center">
                <div className="w-full max-w-xs h-2 bg-neutral-600 rounded-lg mb-6"></div>
            </div>
            <div className="flex flex-col gap-1">
                {seats.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                        <div className="w-5 flex items-center justify-center text-xs text-neutral-400">
                            {rowIndex + 1}
                        </div>
                        {row.map((seat, seatIndex) => {
                            const seatId = `${rowIndex}-${seatIndex}`;
                            const isReserved = seat === 1;
                            const isSelected = selectedSeats.includes(seatId);
                            
                            return (
                                <div
                                    key={seatIndex}
                                    className={`w-7 h-7 flex justify-center items-center
                                              ${!isReserved ? 'cursor-pointer' : 'cursor-not-allowed'}
                                              ${isSelected ? 'bg-indigo-500/20 rounded' : ''}`}
                                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                                >
                                    <Icon 
                                        path={mdiSeat} 
                                        size={1} 
                                        className={`
                                            ${isReserved ? "text-indigo-500/20" : 
                                              isSelected ? "text-indigo-400" : "text-indigo-500"}
                                        `} 
                                    />
                                </div>
                            );
                        })}
                        <div className="w-5 flex items-center justify-center text-xs text-neutral-400">
                            {rowIndex + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SeatingPlan