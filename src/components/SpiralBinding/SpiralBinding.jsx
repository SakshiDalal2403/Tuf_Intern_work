import styles from './SpiralBinding.module.css';

export default function SpiralBinding() {
  const rings = Array.from({ length: 18 });
  return (
    <div className={styles.spiralRow}>
      {rings.map((_, i) => (
        <div key={i} className={styles.ring}>
          <div className={styles.ringOuter} />
          <div className={styles.ringInner} />
        </div>
      ))}
    </div>
  );
}
