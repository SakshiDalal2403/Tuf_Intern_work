import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CalendarHeader.module.css';

export default function CalendarHeader({ label, year, onPrev, onNext, direction }) {
  return (
    <div className={styles.header}>
      <button className={styles.navBtn} onClick={onPrev} aria-label="Previous month">
        <ChevronLeft size={20} />
      </button>

      <div className={styles.titleWrap}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${label}-${year}`}
            className={styles.title}
            initial={{ opacity: 0, y: direction > 0 ? 14 : -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -14 : 14 }}
            transition={{ duration: 0.28 }}
          >
            <span className={styles.monthText}>{label}</span>
            <span className={styles.yearText}>{year}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <button className={styles.navBtn} onClick={onNext} aria-label="Next month">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
