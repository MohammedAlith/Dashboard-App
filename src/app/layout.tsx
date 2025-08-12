import './globals.css'
import { cookies } from 'next/headers';
import { AuthProvider } from './context/AuthContext';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
})
  

{

  const cookie= await cookies();
  const accessToken = cookie.get('accessToken')?.value || null;
  return (
    <html lang="en">
      <body className='bg-blue-100'>
    <AuthProvider initialToken={accessToken}>
          {children}
        </AuthProvider>

      </body>
    </html>
  )
}
