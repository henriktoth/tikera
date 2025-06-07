import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from './store/userSlice';
import Navbar from './components/Navbar.jsx'
import ActiveDayBadge from './components/ActiveDayBadge.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetailsCard from './components/MovieDetailsCard.jsx'
import SeatingPlan from './components/SeatingPlan.jsx'
import TicketSelector from './components/TicketSelector.jsx'
import OrderSummary from './components/OrderSummary';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import AddMovieModal from './components/AddMovieModal';
import AddScreeningModal from './components/AddScreeningModal';

function App() {
  const dispatch = useDispatch();
  const [activeDay, setActiveDay] = useState();
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeMovie, setActiveMovie] = useState();
  const [activeScreening, setActiveScreening] = useState({});
  const [ticketCounts, setTicketCounts] = useState({ 
    adult: 0, 
    student: 0, 
    senior: 0 
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [showAddScreeningModal, setShowAddScreeningModal] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [showReservationToast, setShowReservationToast] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [showMovieAddedToast, setShowMovieAddedToast] = useState(false);
  const [showScreeningAddedToast, setShowScreeningAddedToast] = useState(false);

  const user = useSelector(state => state.user);
  /**
  * updates the ticket counts object by adding the newCount to the specified type
  * @param type - The type of the ticket: [adult, student, senior]
  * @param newCount - the new count of the ticket.
  */
  const updateTicketCounts = (type, newCount) => {
    const currentTotal = Object.values(ticketCounts).reduce((a, b) => a + b, 0);
    const newTotal = currentTotal - ticketCounts[type] + newCount;

    if (newTotal < selectedSeats.length) {
      return;
    }

    setTicketCounts({...ticketCounts, [type]: newCount});
  };

  /**
  * Calculates total price based on the ticketCounts state.
  * @returns the calulated total price
  */
  const calculateTotalPrice = () => {
    const TICKET_PRICES = {
      adult: 2500,
      student: 2000,
      senior: 1800
    };
    
    return Object.entries(ticketCounts).reduce((total, [type, count]) => {
      return total + (count * TICKET_PRICES[type]);
    }, 0);
  };

  /**
  * Handles button click on booking, by opening a modal with a summary.
  */
  const handleBookingRequest = () => {
    setIsModalOpen(true);
  };

  /**
  * Finalizes the booking. Updates the bookings database and returns user to the movie selection part.
  */
  const handleConfirmBooking = () => {
    setIsModalOpen(false);  
    setSelectedSeats([]);
    setTicketCounts({ adult: 0, student: 0, senior: 0 });
    setShowReservationToast(true);
    setTimeout(() => setShowReservationToast(false), 3000);
  };

  /**
   * Handles user logout, showing a toast notification.
   */
  const handleLogout = () => {
    dispatch(clearUser());
    setShowLogoutToast(true);
    setTimeout(() => setShowLogoutToast(false), 3000);
  };

  const handleMovieAdded = () => {
    setShowMovieAddedToast(true);
    setTimeout(() => setShowMovieAddedToast(false), 3000);
  };

  const handleScreeningAdded = () => {
    setShowScreeningAddedToast(true);
    setTimeout(() => setShowScreeningAddedToast(false), 3000);
  };

  useEffect(() => {
    if (user?.isLoggedIn) {
      setShowLoginToast(true);
      const timer = setTimeout(() => setShowLoginToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user?.isLoggedIn]);

  useEffect(() => {
    setActiveScreening({}); 
  }, [activeMovie]);

  return (
    <>
      {showLoginToast && (
        <div className="toast toast-bottom toast-end z-50">
          <div className="alert alert-success">
            <span>Login Succesful!</span>
          </div>
        </div>
      )}
      {showLogoutToast && (
        <div className="toast toast-bottom toast-end z-50">
          <div className="alert alert-success">
            <span>Logout Succesful!</span>
          </div>
        </div>
      )}
      {showReservationToast && (
        <div className="toast toast-bottom toast-end z-50">
          <div className="alert alert-success">
            <span>Reservation Succesful!</span>
          </div>
        </div>
      )}
      {showMovieAddedToast && (
        <div className="toast toast-bottom toast-end z-50">
          <div className="alert alert-success">
            <span>Movie Added Succesfully!</span>
          </div>
        </div>
      )}
      {showScreeningAddedToast && (
        <div className="toast toast-bottom toast-end z-50">
          <div className="alert alert-success">
            <span>Screening Added Succesfully!</span>
          </div>
        </div>
      )}
      <Navbar
        activeDay={activeDay}
        setActiveDay={setActiveDay}
        setActiveDayIndex={setActiveDayIndex}
        activeDayIndex={activeDayIndex}
        onAddMovie={() => setShowAddMovieModal(true)}
        onAddScreening={() => setShowAddScreeningModal(true)}
        onLogout={handleLogout}
      />
      {/* <div className='flex lg:justify-start justify-center'> 
        {activeDay ? 
          <ActiveDayBadge activeDay={activeDay}/>
        : null}
      </div> */}
      <div className='flex lg:flex-row flex-col gap-3'>
        <MovieList activeDay={activeDay} activeDayIndex={activeDayIndex} setActiveMovie={setActiveMovie} activeMovie={activeMovie}/>
        <div className='flex flex-col gap-5'>
          {activeMovie ?
            <MovieDetailsCard activeMovie={activeMovie} activeDay={activeDay} activeDayIndex={activeDayIndex} setActiveScreening={setActiveScreening} />
          : null}
          {activeScreening.start_time ?
            <div className='bg-neutral-800/50 flex flex-col lg:flex-row p-3 max-w-200 rounded-xl h-fit self-start'>
              <TicketSelector 
                ticketCounts={ticketCounts}
                updateTicketCounts={updateTicketCounts}
                selectedSeats={selectedSeats}
              />
              <div className="border-b lg:border-b-0 lg:border-r border-neutral-700 my-4 lg:my-0 lg:mx-4"></div>
              <div className="flex flex-col lg:flex-row flex-1">
                <div className="flex-1">
                  <SeatingPlan 
                    activeScreening={activeScreening} 
                    ticketCounts={ticketCounts}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                  />
                </div>
              </div>
            </div>
          : null}
          {selectedSeats.length > 0 && (
            <div className="w-full lg:w-72 mt-6 lg:mt-0">
              <OrderSummary 
                activeMovie={activeMovie}
                activeDay={activeDay}
                activeScreening={activeScreening}
                ticketCounts={ticketCounts}
                selectedSeats={selectedSeats}
                onConfirmBooking={handleBookingRequest}
              />
            </div>
          )}
          
        </div>
      </div>
      <BookingConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
        movie={activeMovie}
        day={activeDay}
        screening={activeScreening}
        tickets={ticketCounts}
        seats={selectedSeats}
        totalPrice={calculateTotalPrice()}
      />
      {showAddMovieModal && (
        <AddMovieModal 
          onClose={() => setShowAddMovieModal(false)} 
          onMovieAdded={handleMovieAdded}
        />
      )}
      {showAddScreeningModal && (
        <AddScreeningModal 
          onClose={() => setShowAddScreeningModal(false)} 
          onScreeningAdded={handleScreeningAdded}
        />
      )}
    </>
  )
}

export default App
