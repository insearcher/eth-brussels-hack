'use client'

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div className="centered-button">
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
