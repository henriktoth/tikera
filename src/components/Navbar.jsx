import Icon from '@mdi/react';
import { mdiTicketConfirmation } from '@mdi/js';

function Navbar() {
    return (
        <>
            <div className='flex justify-between m-5 gap-5'>
                <div className="w-40 outline-2 rounded-xl flex justify-center items-center gap-2 text-center ">
                    <Icon path={mdiTicketConfirmation} size={1} />
                    <h1 className="relative bottom-0.25 text-lg font-bold uppercase">Tikera</h1>
                </div>
                <div className='bg-neutral-800 rounded-xl flex flex-col justify-center'>
                    <ul className="px-10 h-15 uppercase rounded-lg flex items-center gap-5">
                        <li className='hover:cursor-pointer hover:font-bold hover:bg-neutral-700 rounded-xl p-3 w-35 text-center'>
                            Hétfő
                        </li>
                        <li className='hover:cursor-pointer hover:font-bold hover:bg-neutral-700 rounded-xl p-3 w-35 text-center'>
                            Kedd
                        </li>
                        <li className='hover:cursor-pointer hover:font-bold hover:bg-neutral-700 rounded-xl p-3 w-35 text-center'>
                            Szerda
                        </li>
                        <li className='hover:cursor-pointer hover:font-bold hover:bg-neutral-700 rounded-xl p-3 w-35 text-center'>
                            Csütörtök
                        </li>
                        <li className='hover:cursor-pointer hover:font-bold hover:bg-neutral-700 rounded-xl p-3 w-35 text-center'>
                            Péntek
                        </li>
                        <li className='hover:cursor-pointer hover:font-bold hover:bg-neutral-700 rounded-xl p-3 w-35 text-center'>
                            Szombat
                        </li>
                        <li className='hover:cursor-pointer hover:font-bold hover:bg-neutral-700 rounded-xl p-3 w-35 text-center'>
                            Vasárnap
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar;