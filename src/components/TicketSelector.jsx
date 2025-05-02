import { useState } from 'react';

function TicketSelector(){
    const [adultTicketCount, setadultTicketCount] = useState(0);
    const [studentTicketCount, setstudentTicketCount] = useState(0);
    const [seniorTicketCount, setseniorTicketCount] = useState(0);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Felnőtt</p>
                    <p className="text-sm text-neutral-500">2.500Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => setadultTicketCount(adultTicketCount > 0 ? adultTicketCount - 1 : 0)}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{adultTicketCount}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => setadultTicketCount(adultTicketCount + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Diák</p>
                    <p className="text-sm text-neutral-500">2.000Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => setstudentTicketCount(studentTicketCount > 0 ? studentTicketCount - 1 : 0)}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{studentTicketCount}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => setstudentTicketCount(studentTicketCount + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div className="w-24">
                    <p>Nyugdíjas</p>
                    <p className="text-sm text-neutral-500">1.800Ft</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => setseniorTicketCount(seniorTicketCount > 0 ? seniorTicketCount - 1 : 0)}
                    >
                        -
                    </button>
                    <p className="w-6 text-center">{seniorTicketCount}</p>
                    <button
                        className="w-8 px-0 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 hover:cursor-pointer"
                        onClick={() => setseniorTicketCount(seniorTicketCount + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
            <hr className="text-neutral-700"></hr>
            <div className="flex justify-between">
            <p>Összesen:</p>
            <p>{adultTicketCount * 2500 + studentTicketCount * 2000 + seniorTicketCount *1800} Ft</p>
            </div>
            {adultTicketCount + studentTicketCount + seniorTicketCount > 0 ? (
                <div className="flex justify-center gap-1">
                <p>Ülőhelyek:</p>
                <p> 0/{adultTicketCount+studentTicketCount+seniorTicketCount}</p>
            </div>    
            ) : null}
            
        </div>
    )
}

export default TicketSelector