import styles from '../creator/[id]/page.module.css';

export default function MoneyCounter({ money }) {
  return (
    <div className={styles.moneyCounter}>
      <span>Money: {money}</span>
    </div>
  );
}
