import styles from '../creator/[id]/page.module.css';

export default function ItemList({ items, money, onPurchase }) {
  return (
    <ul className={styles.itemList}>
      {items.map(item => (
        <li key={item.id} className={styles.item}>
          <span>{item.name}</span>
          <span>{item.price}</span>
          <button 
            onClick={() => onPurchase(item.price)} 
            disabled={money < item.price}
            className={styles.purchaseButton}
          >
            Purchase
          </button>
        </li>
      ))}
    </ul>
  );
}
