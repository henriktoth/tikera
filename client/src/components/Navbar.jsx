import Icon from '@mdi/react';
import { mdiTicketConfirmation, mdiChevronLeft, mdiChevronRight, mdiAccountCircle, mdiLogout, mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseWeek, increaseWeek } from '../store/weekSlice';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dispatch = useDispatch();
    const activeWeek = useSelector(state => state.week.value);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    useEffect(() => {
        const todayIndex = new Date().getDay()
        const today = days[(todayIndex + 6) % 7]
        props.setActiveDay(today)
        
        const dayIndex = days.indexOf(today) + 1;
        props.setActiveDayIndex(dayIndex);
    }, []);
    
    const handleDayClick = (day) => {
        props.setActiveDay(day);
        const dayIndex = days.indexOf(day) + 1;
        props.setActiveDayIndex(dayIndex);
        console.log('Active day: ' + dayIndex + ' | Active week: ' + activeWeek);
        }
    
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
        document.documentElement.classList.toggle('dark');
    };

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
                <button
                    onClick={toggleDarkMode}
                    className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                    title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    <Icon path={darkMode ? mdiWhiteBalanceSunny : mdiWeatherNight} size={1} className="text-white" />
                </button>
                {user?.isLoggedIn ? (
                    <>
                        <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                            {user.email === "admin@example.com" ? (
                                <>
                                    <a
                                      href="#"
                                      onClick={e => { e.preventDefault(); props.onAddMovie(); }}
                                      className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200 border border-white/20 shadow-lg"
                                    >
                                      Add Movie
                                    </a>
                                    <a
                                      href="#"
                                      onClick={e => { e.preventDefault(); props.onAddScreening(); }}
                                      className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200 border border-white/20 shadow-lg"
                                    >
                                      Add Screening
                                    </a>
                                </>
                            ) : (
                                <a href="#" className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200 border border-white/20 shadow-lg">
                                    My Reservations
                                </a>
                            )}
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                            <Icon path={mdiAccountCircle} size={1.2} className="text-white" />
                            <span className="text-white font-medium">{user.email}</span>
                            <button
                              onClick={props.onLogout}
                              className="ml-2 p-1 rounded-full hover:bg-white/20 transition"
                              title="Logout"
                            >
                              <Icon path={mdiLogout} size={1} className="text-white" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200 border border-white/20 shadow-lg"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200 border border-white/20 shadow-lg"
                        >
                            Register
                        </button>
                    </div>
                )}
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
