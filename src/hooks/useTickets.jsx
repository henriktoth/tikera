import { useState, useMemo } from 'react';

export function useTickets() {
  const [tickets, setTickets] = useState({
    adult: 0,
    student: 0,
    senior: 0
  });

  const TICKET_PRICES = {
    adult: 2500,
    student: 2000,
    senior: 1800
  };

  const updateTicket = (type, increment) => {
    setTickets(prev => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const totalPrice = useMemo(() => {
    return Object.entries(tickets).reduce((sum, [type, count]) => {
      return sum + (count * TICKET_PRICES[type]);
    }, 0);
  }, [tickets]);

  const totalTickets = useMemo(() => {
    return Object.values(tickets).reduce((sum, count) => sum + count, 0);
  }, [tickets]);

  return {
    tickets,
    updateTicket,
    TICKET_PRICES,
    totalPrice,
    totalTickets
  };
}