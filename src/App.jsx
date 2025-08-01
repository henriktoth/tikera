import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx'
import ActiveDayBadge from './components/ActiveDayBadge.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetailsCard from './components/MovieDetailsCard.jsx'
import SeatingPlan from './components/SeatingPlan.jsx'
import TicketSelector from './components/TicketSelector.jsx'
import OrderSummary from './components/OrderSummary';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import movieData from './assets/movies.json';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';

function App() {
  const [activeDay, setActiveDay] = useState();
  const [activeMovie, setActiveMovie] = useState();
  const [activeScreening, setActiveScreening] = useState({});
  const [ticketCounts, setTicketCounts] = useState({ 
    adult: 0, 
    student: 0, 
    senior: 0 
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [storedMovieData, setStoredMovieData] = useLocalStorage('movieData', movieData);

  const updateTicketCounts = (type, newCount) => {
    const currentTotal = Object.values(ticketCounts).reduce((a, b) => a + b, 0);
    const newTotal = currentTotal - ticketCounts[type] + newCount;

    if (newTotal < selectedSeats.length) {
      return;
    }

    setTicketCounts({...ticketCounts, [type]: newCount});
  };

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

  const handleBookingRequest = () => {
    setIsModalOpen(true);
  };

  const handleConfirmBooking = () => {
    const newBookings = selectedSeats.map(seatId => {
      const [row, seat] = seatId.split('-').map(Number);
      return { row, seat };
    });

    const updatedMovieData = JSON.parse(JSON.stringify(storedMovieData));
    
    const movieIndex = updatedMovieData.findIndex(m => m.title === activeMovie.title);
    if (movieIndex !== -1) {
      const screeningIndex = updatedMovieData[movieIndex].screenings.findIndex(
        s => s.id === activeScreening.id
      );
      
      if (screeningIndex !== -1) {
        updatedMovieData[movieIndex].screenings[screeningIndex].bookings = [
          ...updatedMovieData[movieIndex].screenings[screeningIndex].bookings,
          ...newBookings
        ];
        
        setStoredMovieData(updatedMovieData);
        
        setActiveScreening({
          ...activeScreening,
          bookings: [...activeScreening.bookings, ...newBookings]
        });
        
        setIsModalOpen(false);
        
        setSelectedSeats([]);
        setTicketCounts({ adult: 0, student: 0, senior: 0 });

        window.location.reload();
      }
    }
  };

  useEffect(() => {
    setActiveScreening({}); 
  }, [activeMovie]);

  return (
    <>
      <Navbar activeDay={activeDay} setActiveDay={setActiveDay} />
      <div className='flex lg:justify-start justify-center'> 
        {activeDay ? 
          <ActiveDayBadge activeDay={activeDay}/>
        : null}
      </div>
      <div className='flex lg:flex-row flex-col gap-3'>
        <MovieList activeDay={activeDay} setActiveMovie={setActiveMovie} activeMovie={activeMovie}/>
        <div className='flex flex-col gap-5'>
          {activeMovie ?
            <MovieDetailsCard activeMovie={activeMovie} activeDay={activeDay} setActiveScreening={setActiveScreening} />
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
    </>
  )
}

export default App
