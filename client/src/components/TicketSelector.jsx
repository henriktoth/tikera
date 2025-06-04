function TicketSelector(props) {
    
    const TICKET_PRICES = {
        adult: 2500,
        student: 2000,
        senior: 1800
    };
    
    const totalTickets = props.ticketCounts.adult + props.ticketCounts.student + props.ticketCounts.senior;
    
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Adult</p>
                    <p className="text-sm text-neutral-500">{TICKET_PRICES.adult.toLocaleString()}Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => props.updateTicketCounts('adult', props.ticketCounts.adult > 0 ? props.ticketCounts.adult - 1 : 0)}
                        disabled={props.selectedSeats.length > totalTickets - 1 && props.ticketCounts.adult > 0}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{props.ticketCounts.adult}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => props.updateTicketCounts('adult', props.ticketCounts.adult + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Student</p>
                    <p className="text-sm text-neutral-500">{TICKET_PRICES.student.toLocaleString()}Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => props.updateTicketCounts('student', props.ticketCounts.student > 0 ? props.ticketCounts.student - 1 : 0)}
                        disabled={props.selectedSeats.length > totalTickets - 1 && props.ticketCounts.student > 0}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{props.ticketCounts.student}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => props.updateTicketCounts('student', props.ticketCounts.student + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Senior</p>
                    <p className="text-sm text-neutral-500">{TICKET_PRICES.senior.toLocaleString()}Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => props.updateTicketCounts('senior', props.ticketCounts.senior > 0 ? props.ticketCounts.senior - 1 : 0)}
                        disabled={props.selectedSeats.length > totalTickets - 1 && props.ticketCounts.senior > 0}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{props.ticketCounts.senior}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => props.updateTicketCounts('senior', props.ticketCounts.senior + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            
            <hr className="text-neutral-700"></hr>
            <div className="flex justify-between">
                <p>Total:</p>
                <p>
                    {props.ticketCounts.adult * TICKET_PRICES.adult +
                     props.ticketCounts.student * TICKET_PRICES.student +
                     props.ticketCounts.senior * TICKET_PRICES.senior} Ft
                </p>
            </div>
            {totalTickets > 0 ? (
                <div className="flex justify-center gap-1">
                    <p>Seats:</p>
                    <p> {props.selectedSeats.length}/{totalTickets}</p>
                </div>    
            ) : null}
        </div>
    )
}

export default TicketSelector