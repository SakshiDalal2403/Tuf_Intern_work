import { useState } from 'react';

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed

  const goToPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // 0=Sun, Monday-based grid: map Sun→6, Mon→0, …
  const rawFirst = new Date(year, month, 1).getDay();
  const firstDayOfWeek = rawFirst === 0 ? 6 : rawFirst - 1; // Mon-based offset

  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const toKey = (y, m) => `${y}-${String(m + 1).padStart(2, '0')}`;

  return {
    year,
    month,
    today,
    daysInMonth,
    firstDayOfWeek,
    daysInPrevMonth,
    goToPrevMonth,
    goToNextMonth,
    monthKey: toKey(year, month),
  };
}
