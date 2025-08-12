'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../app/context/AuthContext';
import Logout from './logout/page';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchValue, setSearchValue } = useAuth();

  const search = pathname === '/dashboard/userList';

  const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const navItems = [
    { label: 'Profile', path: '/dashboard/profile' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Users', path: '/dashboard/userList' },
  ];

  return (
    <div className="bg-blue-600 p-3 pe-5 flex justify-between">
      <div className="flex gap-3">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`px-3 py-1 rounded font-bold cursor-pointer 
              ${pathname === item.path ? 'bg-amber-500 text-white' : 'text-white hover:bg-amber-500'}`}
            onClick={() => router.push(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex gap-5">
        {search && (
          <input
            className="border-2 rounded-full text-white text-lg outline-none border-black pl-3 bg-transparent placeholder-white"
            onChange={searchUser}
            value={searchValue}
            placeholder="search"
          />
        )}

        <Logout />
      </div>
    </div>
  );
}
