import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpiralBinding from '../SpiralBinding/SpiralBinding';
import HeroImage from '../HeroImage/HeroImage';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import NotesPanel from '../NotesPanel/NotesPanel';
import { useCalendar } from '../../hooks/useCalendar';
import { useRangeSelector } from '../../hooks/useRangeSelector';
import { useNotes } from '../../hooks/useNotes';
import monthImages from '../../data/monthImages';
import holidays from '../../data/holidays';
import styles from './CalendarWrapper.module.css';

export default function CalendarWrapper() {
  const { year, month, today, daysInMonth, firstDayOfWeek, daysInPrevMonth, goToPrevMonth, goToNextMonth, monthKey } = useCalendar();
  const { startDate, endDate, selectDay, clearRange, getDayState } = useRangeSelector();

  const rangeKey = startDate && endDate
    ? `${monthKey}_${startDate}:${endDate}`
    : null;

  const { monthNote, rangeNote, saveMonthNote, saveRangeNote, getNotedDates } = useNotes(monthKey, rangeKey);

  const directionRef = useRef(0);
  const prevMonth = useRef(month);

  const handlePrev = () => { directionRef.current = -1; prevMonth.current = month; goToPrevMonth(); clearRange(); };
  const handleNext = () => { directionRef.current = 1; prevMonth.current = month; goToNextMonth(); clearRange(); };

  const theme = monthImages[month];
  const notedDates = getNotedDates();

  // Update CSS variables on month change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-accent-dark', theme.accentDark);
    root.style.setProperty('--color-range-bg', theme.rangeBg);
  }, [month, theme]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Spiral binding at top */}
        <SpiralBinding />

        {/* Main content area */}
        <div className={styles.body}>
          {/* Left: Hero Image */}
          <div className={styles.heroPanel}>
            <HeroImage
              imageUrl={theme.image}
              label={theme.label}
              year={year}
              direction={directionRef.current}
            />
          </div>

          {/* Right: Calendar + Notes */}
          <div className={styles.rightPanel}>
            {/* Header */}
            <CalendarHeader
              label={theme.label}
              year={year}
              onPrev={handlePrev}
              onNext={handleNext}
              direction={directionRef.current}
            />

            {/* Grid */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${year}-${month}`}
                initial={{ opacity: 0, y: directionRef.current > 0 ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: directionRef.current > 0 ? -20 : 20 }}
                transition={{ duration: 0.3 }}
              >
                <CalendarGrid
                  year={year}
                  month={month}
                  daysInMonth={daysInMonth}
                  firstDayOfWeek={firstDayOfWeek}
                  daysInPrevMonth={daysInPrevMonth}
                  today={today}
                  holidays={holidays}
                  notedDates={notedDates}
                  getDayState={getDayState}
                  onDayClick={selectDay}
                />
              </motion.div>
            </AnimatePresence>

            {/* Notes */}
            <NotesPanel
              monthNote={monthNote}
              rangeNote={rangeNote}
              startDate={startDate}
              endDate={endDate}
              onSaveMonthNote={saveMonthNote}
              onSaveRangeNote={saveRangeNote}
              onClearRange={clearRange}
            />
          </div>
        </div>
      </div>

      {/* Range info toast */}
      <AnimatePresence>
        {startDate && !endDate && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.22 }}
          >
            📅 Now click an end date to complete the range
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
