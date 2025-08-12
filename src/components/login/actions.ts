'use server';

import { API_URLS } from '../api';
import { cookies } from 'next/headers';


export type LoginResult =
  | { success: true; accessToken: string }
  | { success: false; error: string };

export async function LoginApi(formData: FormData): Promise<LoginResult> {
  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  const response = await fetch(API_URLS.loginUrl, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (data.accessToken) {
    const cookie = await cookies();
    cookie.set({
      name: 'accessToken',
      value: data.accessToken,
      path: '/',
      httpOnly: true,
      maxAge: 60 * 2,
    });


    return { success: true, accessToken: data.accessToken }; 
  }

  return { success: false, error: 'Invalid username or password' };
}
