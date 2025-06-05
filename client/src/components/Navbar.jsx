import Icon from '@mdi/react';
import { mdiTicketConfirmation, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { decreaseWeek, increaseWeek } from '../store/weekSlice';

function Navbar(props) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dispatch = useDispatch();
    const activeWeek = useSelector(state => state.week.value);
    
    useEffect(() => {
        const todayIndex = new Date().getDay()
        const today = days[(todayIndex + 6) % 7]
        props.setActiveDay(today)
    }, []);
    
    const handleDayClick = (day) => {
        props.setActiveDay(day);
        const dayIndex = days.indexOf(day);
        props.setActiveDayIndex(dayIndex + 1);
    }
    
    return (
        <>
        <div className="bg-gradient-to-r from-indigo-900 to-purple-800 rounded-xl px-6 py-4 m-5">
            <div className='flex flex-col lg:flex-row justify-between items-center gap-5'>
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/20 hover:cursor-pointer">
                    <div className="bg-white p-2 rounded-full shadow-md">
                        <Icon path={mdiTicketConfirmation} size={1} className="text-purple-700" />
                    </div>
                    <h1 className="text-xl font-bold uppercase text-white tracking-wider">Tikera</h1>
                </div>
            </div>
        </div>
        <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl m-5">
                    <button 
                        onClick={() => dispatch(decreaseWeek())} 
                        disabled={activeWeek <= 23}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            activeWeek <= 23 
                            ? 'bg-white/10 cursor-not-allowed opacity-50' 
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                    >
                        <Icon path={mdiChevronLeft} size={1} className="text-white" />
                    </button>
                    
                    <div className="text-white font-medium px-3">
                        {activeWeek}. week
                    </div>
                    
                    <button 
                        onClick={() => dispatch(increaseWeek())} 
                        disabled={activeWeek >= 32}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            activeWeek >= 32 
                            ? 'bg-white/10 cursor-not-allowed opacity-50' 
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                    >
                        <Icon path={mdiChevronRight} size={1} className="text-white" />
                    </button>
        </div>
        <div className='bg-white/10 rounded-xl px-3 py-2 shadow-inner mx-5 inline-block'>
                    <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                        {days.map( day => (
                            <li 
                                key={day}
                                onClick={() => handleDayClick(day)}
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
        </>
    );
}

export default Navbar;
