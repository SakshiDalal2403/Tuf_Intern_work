import DayCell from '../DayCell/DayCell';
import styles from './CalendarGrid.module.css';

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function CalendarGrid({
  year,
  month,
  daysInMonth,
  firstDayOfWeek,
  daysInPrevMonth,
  today,
  holidays,
  notedDates,
  getDayState,
  onDayClick,
}) {
  const pad = (n) => String(n).padStart(2, '0');
  const toStr = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

  // Build cell array
  const cells = [];

  // Leading days from previous month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    cells.push({ day: d, dateStr: toStr(prevYear, prevMonth, d), isOtherMonth: true });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, dateStr: toStr(year, month, d), isOtherMonth: false });
  }

  // Trailing days to fill grid (always 6 rows = 42 cells)
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  let trailing = 1;
  while (cells.length < 42) {
    cells.push({ day: trailing, dateStr: toStr(nextYear, nextMonth, trailing), isOtherMonth: true });
    trailing++;
  }

  const todayStr = toStr(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className={styles.gridWrap}>
      {/* Weekday headers */}
      <div className={styles.weekdays}>
        {WEEKDAYS.map((d) => (
          <span key={d} className={`${styles.weekday} ${d === 'SAT' || d === 'SUN' ? styles.weekend : ''}`}>
            {d}
          </span>
        ))}
      </div>

      {/* Day cells */}
      <div className={styles.grid}>
        {cells.map((cell, idx) => (
          <DayCell
            key={idx}
            day={cell.day}
            dateStr={cell.dateStr}
            isOtherMonth={cell.isOtherMonth}
            isToday={cell.dateStr === todayStr}
            holidayName={holidays[cell.dateStr]}
            hasNote={notedDates.has(cell.dateStr)}
            dayState={getDayState(cell.dateStr)}
            onClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
}
