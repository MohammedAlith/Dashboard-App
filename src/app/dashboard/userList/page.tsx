'use client';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { API_URLS } from '@/components/api';


interface User {
  gender: 'male' | 'female' | string;

  firstName: string;
  lastName: string;

  id: string ;
  email: string;
  phone: string;
}

interface UsersResponse {
  users: User[];
}

export default function UserList() {
    const { searchValue } = useAuth();
  const [data, setData] = useState<UsersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const router = useRouter();

  const getData = async () => {
  try {
    const res = await fetch(API_URLS.userUrl);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const json = await res.json();
    setData(json);
    setError(null);
  } catch (err: any) {
    setError(err.message);
    setData(null);
  }
};

useEffect(() => {
  if (!data) {
    getData();
  }

}, [data]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
 if(!data){
  return <div className='flex items-center justify-center h-screen w-screen'>
  <h1 className='text-2xl'>Loading</h1>
  </div>
}
   
 

   const filteredUsers = data.users.filter(user =>
    
    `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalUsers = filteredUsers.length;
  const totalPages = (totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const usersTable = filteredUsers.slice(startIndex, endIndex);

  const prev = () => setCurrentPage((page) =>page - 1);
  const next = () => setCurrentPage((page) =>page + 1,);

  return (
    <div className="flex flex-col justify-center items-center  bg-blue-100 pb-5">
      <h1 className="text-2xl font-bold mb-4 mt-4">All Users</h1>
      <table className="border-collapse border-3 border-gray-300">
        <thead>
          <tr>
            <th className="border-3 border-gray-300 p-2 text-left">ID</th>
            <th className="border-3 border-gray-300 p-2 text-left">Name</th>
            <th className="border-3 border-gray-300 p-2 text-left">Gender</th>
            <th className="border-3 border-gray-300 p-2 text-left">Email</th>
            <th className="border-3 border-gray-300 p-2 text-left">Phone</th>
            <th className="border-3 border-gray-300 p-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {usersTable.map((user) => (
            <tr key={user.id}>
              <td className="border-3 border-gray-300 p-2">{user.id}</td>
              <td className="border-3 border-gray-300 p-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border-3 border-gray-300 p-2">{user.gender}</td>
              <td className="border-3 border-gray-300 p-2">{user.email}</td>
              <td className="border-3 border-gray-300 p-2">{user.phone}</td>
              <td className="border-3 border-gray-300 p-2 text-blue-600 cursor-pointer" 
              onClick={() => router.push(`/dashboard/userList/${user.id}`)}
              >view more</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={prev}
          hidden={currentPage === 1}
          className="p-2 bg-amber-600 text-white rounded "
        >
          <FaAnglesLeft />
        </button>
        <span>
          Page {currentPage} 
        </span>
        <button
          onClick={next}
          hidden={currentPage === totalPages}
          className="p-2 bg-amber-600 text-white rounded "
        >
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
}
