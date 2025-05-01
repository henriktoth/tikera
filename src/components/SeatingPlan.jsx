import { useState, useEffect } from "react"


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
                                className={`w-6 h-6 flex items-center justify-center border border-gray-300 rounded font-bold ${seat === 1 ? "bg-green-500 text-white" : "bg-gray-200"}`}
                            >
                                {seat}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SeatingPlan