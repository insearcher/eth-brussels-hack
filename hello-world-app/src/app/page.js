import { useRouter } from 'next/router';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  
  const handleLogin = () => {
    const { id } = router.query;
    router.push(`/creator/${id}`);
  };

  return (
    <div className={styles.loginContainer}>
      <button onClick={handleLogin} className={styles.loginButton}>Login</button>
    </div>
  );
}
