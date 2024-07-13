import { useState } from 'react';
import { useRouter } from 'next/router';
import ItemList from '../../components/ItemList';
import MoneyCounter from '../../components/MoneyCounter';
import styles from './page.module.css';

export default function CreatorPage({ items }) {
  const router = useRouter();
  const { id } = router.query;
  const [money, setMoney] = useState(0);

  const handleStake = () => {
    setMoney(money + 1000);
  };

  const handlePurchase = (price) => {
    if (money >= price) {
      setMoney(money - 1000);
      console.log('purchased');
    }
  };

  return (
    <div className={styles.creatorContainer}>
      <MoneyCounter money={money} />
      <button onClick={handleStake} className={styles.stakeButton}>Stake</button>
      <ItemList items={items} money={money} onPurchase={handlePurchase} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const items = await fetchItemsForCreator(id); // Fetch the items based on the creator ID
  return { props: { items } };
}
