import { useState, useEffect } from 'react';
import { NotebookPen, CalendarRange, Save, Trash2 } from 'lucide-react';
import styles from './NotesPanel.module.css';

const MAX_CHARS = 500;

export default function NotesPanel({
  monthNote,
  rangeNote,
  startDate,
  endDate,
  onSaveMonthNote,
  onSaveRangeNote,
  onClearRange,
}) {
  const [activeTab, setActiveTab] = useState('month');
  const [monthDraft, setMonthDraft] = useState(monthNote);
  const [rangeDraft, setRangeDraft] = useState(rangeNote);

  // Sync drafts when external notes change (month switch, range change)
  useEffect(() => setMonthDraft(monthNote), [monthNote]);
  useEffect(() => setRangeDraft(rangeNote), [rangeNote]);

  const hasRange = !!(startDate && endDate);

  const formatRange = () => {
    if (!startDate) return '';
    if (!endDate) return startDate;
    return `${startDate} → ${endDate}`;
  };

  return (
    <div className={styles.panel}>
      {/* Tab bar */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'month' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('month')}
        >
          <NotebookPen size={14} />
          Month Note
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'range' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('range')}
        >
          <CalendarRange size={14} />
          Range Note
          {hasRange && <span className={styles.rangeBadge} />}
        </button>
      </div>

      {/* Month Note */}
      {activeTab === 'month' && (
        <div className={styles.noteContent}>
          <p className={styles.noteLabel}>General notes for this month</p>
          <textarea
            className={styles.textarea}
            value={monthDraft}
            onChange={(e) => e.target.value.length <= MAX_CHARS && setMonthDraft(e.target.value)}
            placeholder="Jot down anything for this month…"
            rows={5}
          />
          <div className={styles.footer}>
            <span className={styles.counter}>{monthDraft.length}/{MAX_CHARS}</span>
            <button className={styles.saveBtn} onClick={() => onSaveMonthNote(monthDraft)}>
              <Save size={13} /> Save
            </button>
          </div>
        </div>
      )}

      {/* Range Note */}
      {activeTab === 'range' && (
        <div className={styles.noteContent}>
          {hasRange ? (
            <>
              <div className={styles.rangeHeader}>
                <span className={styles.rangeLabel}>{formatRange()}</span>
                <button className={styles.clearBtn} onClick={onClearRange} title="Clear range">
                  <Trash2 size={13} />
                </button>
              </div>
              <textarea
                className={styles.textarea}
                value={rangeDraft}
                onChange={(e) => e.target.value.length <= MAX_CHARS && setRangeDraft(e.target.value)}
                placeholder="Notes for this date range…"
                rows={5}
              />
              <div className={styles.footer}>
                <span className={styles.counter}>{rangeDraft.length}/{MAX_CHARS}</span>
                <button className={styles.saveBtn} onClick={() => onSaveRangeNote(rangeDraft)}>
                  <Save size={13} /> Save
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyRange}>
              <CalendarRange size={32} opacity={0.3} />
              <p>Select a start and end date on the calendar to add a range note.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
