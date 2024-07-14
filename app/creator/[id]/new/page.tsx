import Image from 'next/image';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Image src="/images/Group 2111.png" alt="STAKES Logo" width={293} height={49} />
        </div>
        <div className={styles.sidebarBalance}>
          <p>My Balance</p>
          <span>1250</span>
        </div>
        <div className={styles.sidebarWallet}>
          <p>My wallet</p>
          <div className={styles.walletDetails}>
            <Image src="/images/ethereum_wallet.png" alt="Ethereum Wallet" width={24} height={24} />
            <span>0x0...DD6</span>
          </div>
        </div>
        <div className={styles.sidebarArtists}>
          <h2>My artists</h2>
          <ul>
            <li>
              <Image src="/images/thrill_pill.png" alt="THRILL PILL" width={40} height={40} /> THRILL PILL
            </li>
            <li>
              <Image src="/images/serebro.png" alt="SEREBRO" width={40} height={40} /> SEREBRO
            </li>
            <li>
              <Image src="/images/lil_nas_x.png" alt="LIL NAS X" width={40} height={40} /> LIL NAS X
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.artistSection}>
          <Image src="/images/keshi_gabriel.png" alt="Keshi Gabriel" layout="fill" objectFit="cover" />
          <div className={styles.artistDetails}>
            <h2>KESHI</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Autograph</td>
                  <td>1000</td>
                  <td><button>Purchase</button></td>
                </tr>
                <tr>
                  <td>Presale access</td>
                  <td>5600</td>
                  <td><button>Purchase</button></td>
                </tr>
                <tr>
                  <td>Selfie with creator</td>
                  <td>6700</td>
                  <td><button>Purchase</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
