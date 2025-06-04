import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      console.error("Reading from localStorage failed");
      return initialValue;
    }
  });


  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.error("Writing to localStorage failed");
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}