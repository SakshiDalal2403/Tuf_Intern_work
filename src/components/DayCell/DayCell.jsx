import styles from './DayCell.module.css';

export default function DayCell({
  day,
  dateStr,
  isOtherMonth,
  isToday,
  holidayName,
  hasNote,
  dayState, // 'start' | 'end' | 'start-only' | 'in-range' | 'none'
  onClick,
}) {
  const isHoliday = !!holidayName;
  const classNames = [
    styles.cell,
    isOtherMonth ? styles.otherMonth : '',
    isToday ? styles.today : '',
    isHoliday ? styles.holiday : '',
    dayState === 'start' || dayState === 'start-only' ? styles.rangeStart : '',
    dayState === 'end' ? styles.rangeEnd : '',
    dayState === 'in-range' ? styles.inRange : '',
    dayState === 'start-only' ? styles.startOnly : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      onClick={() => !isOtherMonth && onClick(dateStr)}
      tabIndex={isOtherMonth ? -1 : 0}
      aria-label={dateStr}
      aria-pressed={dayState !== 'none'}
      data-tooltip={holidayName || undefined}
    >
      <span className={styles.dayNumber}>{day}</span>

      {/* Indicators row */}
      <span className={styles.indicators}>
        {isHoliday && <span className={styles.holidayDot} />}
        {hasNote && <span className={styles.noteDot} title="Has note" />}
      </span>
    </button>
  );
}
