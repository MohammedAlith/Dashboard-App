'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginApi, LoginResult } from './action';
import { useAuth } from '../../app/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { accessToken, setAccessToken } = useAuth();
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    if (accessToken) {
      router.replace('/dashboard');
    }
  }, [accessToken, router]);

  const handleLogin = async (formData: FormData) => {
    setError(null);
  
    try {
      const result: LoginResult = await LoginApi(formData);

      if (result.success) {
        localStorage.setItem('accessToken', result.accessToken);
        setAccessToken(result.accessToken);                      
        router.push('/dashboard');                               
      } else {
        setError(result.error);
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleLogin(formData);
  };

  

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-15 bg-white">
        <div className="flex flex-col gap-2">
          <label className="self-start">Username:</label>
          <input
            name="username"
            type="text"
            className="border-2 rounded-lg p-2 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="self-start">Password:</label>
          <input
            name="password"
            type="password"
            className="border-2 rounded-lg p-2 focus:outline-none"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-2 pl-3 pr-3 w-fit self-center"
        >
          Login
        </button>
      </form>
    </div>
  );
}
