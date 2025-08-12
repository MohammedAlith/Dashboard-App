'use client';

import { useRouter } from 'next/navigation';
import { LuLogOut } from 'react-icons/lu';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/'); 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button
      className="bg-white rounded-lg p-2 cursor-pointer"
      onClick={handleLogout}
      aria-label="Logout"
    >
      <LuLogOut />
    </button>
  );
}
