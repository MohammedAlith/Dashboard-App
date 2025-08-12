
'use client';

import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
    searchValue: string;
  setSearchValue: (value: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
    searchValue: '',
  setSearchValue: () => {},
});

export function AuthProvider({
  children,
  initialToken,
}: {
  children: React.ReactNode;
  initialToken: string | null;
}) {
  const [accessToken, setAccessToken] = useState(initialToken);
    const [searchValue, setSearchValue] = useState('');

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, searchValue, setSearchValue }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
