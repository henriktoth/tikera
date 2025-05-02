import Icon from '@mdi/react';
import { mdiTicketConfirmation } from '@mdi/js';

function Navbar(props) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    return (
        <div className="bg-gradient-to-r from-indigo-900 to-purple-800 rounded-xl px-6 py-4 m-5">
            <div className='flex flex-col lg:flex-row justify-between items-center gap-5'>
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/20 hover:cursor-pointer">
                    <div className="bg-white p-2 rounded-full shadow-md">
                        <Icon path={mdiTicketConfirmation} size={1} className="text-purple-700" />
                    </div>
                    <h1 className="text-xl font-bold uppercase text-white tracking-wider">Tikera</h1>
                </div>
                
                <div className='bg-white/10 rounded-xl px-3 py-2 shadow-inner'>
                    <ul className="flex flex-wrap items-center gap-3">
                        {days.map( day => (
                            <li 
                                key={day}
                                onClick={() => props.setActiveDay(day)}
                                className={`px-5 py-2 w-35 rounded-lg transition-all duration-100 hover:cursor-pointer text-center
                                    ${props.activeDay === day 
                                        ? 'bg-white text-purple-900 shadow-md' 
                                        : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                {day}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
