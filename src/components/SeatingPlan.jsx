import { useState, useEffect } from "react"
import Icon from '@mdi/react';
import { mdiSeat } from '@mdi/js';

function SeatingPlan(props){
    const [seats, setSeats] = useState([[]])
    
    useEffect(() => { 
        if (!props.activeScreening) return
        const rows = props.activeScreening.room.rows
        const seatsPerRow = props.activeScreening.room.seatsPerRow

        const initialSeats = Array.from({ length: rows }, () => Array(seatsPerRow).fill(0));

        props.activeScreening.bookings.forEach(booking => {
            const { row, seat } = booking;
            if (initialSeats[row] && typeof initialSeats[row][seat] !== "undefined") {
                initialSeats[row][seat] = 1;
            }
        });
        setSeats(initialSeats);

    }, [props.activeScreening])

    useEffect(() => {
        console.log(seats)
    }, [seats])

    return (
        <div>
            <div className="flex flex-col gap-1">
                {seats.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                        {row.map((seat, seatIndex) => (
                            <div
                                key={seatIndex}
                                className={`w-7 h-7 flex justify-center items-center`}
                            >
                                <Icon path={mdiSeat} size={1} className={`${seat === 1 ? "text-indigo-500/20" : "text-indigo-500"}`} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SeatingPlan