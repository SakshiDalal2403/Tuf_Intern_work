import { useState } from 'react';

export function useRangeSelector() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const selectDay = (dateStr) => {
    if (!startDate || (startDate && endDate)) {
      // Start new range
      setStartDate(dateStr);
      setEndDate(null);
    } else {
      // Second click
      if (dateStr === startDate) {
        setStartDate(null);
        return;
      }
      if (dateStr < startDate) {
        setEndDate(startDate);
        setStartDate(dateStr);
      } else {
        setEndDate(dateStr);
      }
    }
  };

  const clearRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const getDayState = (dateStr) => {
    if (!startDate) return 'none';
    if (dateStr === startDate && !endDate) return 'start-only';
    if (dateStr === startDate) return 'start';
    if (dateStr === endDate) return 'end';
    if (endDate && dateStr > startDate && dateStr < endDate) return 'in-range';
    return 'none';
  };

  return { startDate, endDate, selectDay, clearRange, getDayState };
}
