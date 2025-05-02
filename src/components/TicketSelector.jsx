import { useState } from 'react';

function TicketSelector({ ticketCounts, updateTicketCounts, selectedSeats }) {
    const TICKET_PRICES = {
        adult: 2500,
        student: 2000,
        senior: 1800
    };
    
    const totalTickets = ticketCounts.adult + ticketCounts.student + ticketCounts.senior;
    
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Felnőtt</p>
                    <p className="text-sm text-neutral-500">{TICKET_PRICES.adult.toLocaleString()}Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => updateTicketCounts('adult', ticketCounts.adult > 0 ? ticketCounts.adult - 1 : 0)}
                        disabled={selectedSeats.length > totalTickets - 1 && ticketCounts.adult > 0}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{ticketCounts.adult}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => updateTicketCounts('adult', ticketCounts.adult + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Diák</p>
                    <p className="text-sm text-neutral-500">{TICKET_PRICES.student.toLocaleString()}Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => updateTicketCounts('student', ticketCounts.student > 0 ? ticketCounts.student - 1 : 0)}
                        disabled={selectedSeats.length > totalTickets - 1 && ticketCounts.student > 0}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{ticketCounts.student}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => updateTicketCounts('student', ticketCounts.student + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Nyugdíjas</p>
                    <p className="text-sm text-neutral-500">{TICKET_PRICES.senior.toLocaleString()}Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => updateTicketCounts('senior', ticketCounts.senior > 0 ? ticketCounts.senior - 1 : 0)}
                        disabled={selectedSeats.length > totalTickets - 1 && ticketCounts.senior > 0}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{ticketCounts.senior}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => updateTicketCounts('senior', ticketCounts.senior + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            
            <hr className="text-neutral-700"></hr>
            <div className="flex justify-between">
                <p>Összesen:</p>
                <p>
                    {ticketCounts.adult * TICKET_PRICES.adult +
                     ticketCounts.student * TICKET_PRICES.student +
                     ticketCounts.senior * TICKET_PRICES.senior} Ft
                </p>
            </div>
            {totalTickets > 0 ? (
                <div className="flex justify-center gap-1">
                    <p>Ülőhelyek:</p>
                    <p> {selectedSeats.length}/{totalTickets}</p>
                </div>    
            ) : null}
        </div>
    )
}

export default TicketSelector