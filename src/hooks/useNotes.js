import { useState, useEffect } from 'react';

export function useNotes(monthKey, rangeKey) {
  const monthStorageKey = `cal_note_month_${monthKey}`;
  const rangeStorageKey = rangeKey ? `cal_note_range_${rangeKey}` : null;

  const [monthNote, setMonthNote] = useState('');
  const [rangeNote, setRangeNote] = useState('');

  // Load month note when monthKey changes
  useEffect(() => {
    const saved = localStorage.getItem(monthStorageKey) || '';
    setMonthNote(saved);
  }, [monthStorageKey]);

  // Load range note when rangeKey changes
  useEffect(() => {
    if (!rangeStorageKey) {
      setRangeNote('');
      return;
    }
    const saved = localStorage.getItem(rangeStorageKey) || '';
    setRangeNote(saved);
  }, [rangeStorageKey]);

  const saveMonthNote = (text) => {
    setMonthNote(text);
    localStorage.setItem(monthStorageKey, text);
  };

  const saveRangeNote = (text) => {
    setRangeNote(text);
    if (rangeStorageKey) {
      localStorage.setItem(rangeStorageKey, text);
    }
  };

  // Returns all date strings that have a note stored for this month
  const getNotedDates = () => {
    const noted = new Set();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`cal_note_range_${monthKey}`)) {
        const val = localStorage.getItem(key);
        if (val && val.trim()) {
          // key format: cal_note_range_YYYY-MM_start:end
          const rangeStr = key.replace(`cal_note_range_${monthKey}_`, '');
          const [start, end] = rangeStr.split(':');
          if (start) noted.add(start);
          if (end) noted.add(end);
        }
      }
    }
    return noted;
  };

  return {
    monthNote,
    rangeNote,
    saveMonthNote,
    saveRangeNote,
    getNotedDates,
  };
}
