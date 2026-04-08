import { AnimatePresence, motion } from 'framer-motion';
import styles from './HeroImage.module.css';

export default function HeroImage({ imageUrl, label, year, direction }) {
  return (
    <div className={styles.hero}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={imageUrl}
          className={styles.imageWrap}
          initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <img src={imageUrl} alt={label} className={styles.img} />
          {/* Blue geometric overlay like the reference */}
          <div className={styles.overlay} />
          <div className={styles.monthLabel}>
            <span className={styles.year}>{year}</span>
            <span className={styles.month}>{label.toUpperCase()}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
