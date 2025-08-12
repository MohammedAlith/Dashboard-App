'use client';
import { API_URLS } from '@/components/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUsers } from "react-icons/fa6";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";


interface User {
  gender: 'male' | 'female' | string;
  university:string;
  Id:string;
  company:{
  department: string,

  
  },
  count:string
  role:string
  bloodGroup:string


}

interface UsersResponse {
  users: User[];
}

export  function Dashboard() {
  const { accessToken } = useAuth();
  const [data, setData] = useState<UsersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    setError(null);

    fetch(API_URLS.userUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        console.log(json);
        
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [accessToken]);

if(!data){
  return <div className='flex items-center justify-center h-screen w-screen'>
  <h1 className='text-2xl'>Loading</h1>
  </div>
}
  const maleCount = data?.users.filter((user) => user.gender === 'male').length ?? 0;
  const femaleCount = data?.users.filter((user) => user.gender === 'female').length ?? 0;
  
const universityCountArray: { university: string; count: number }[] = [];
  data?.users.forEach((user) => {
  const university = user.university;
  const existing = universityCountArray.find(item => item.university === university);
  if (existing) {
    existing.count++;
  } else {
    universityCountArray.push({ university: university, count: 1 });
  }
});

console.log('Users per University:', universityCountArray);

  const role = data?.users.map((user: User) => user.role);
  console.log('role:', role);

const bloodGroup = data?.users.map((user: User) => user.bloodGroup);
  console.log('bloodGroup:', bloodGroup);  

  const departmentArray:{department:string, count:number}[]= []
  data?.users.forEach((user)=>{
    const department=user.company.department;
    const existing = departmentArray.find(item => item.department === department);
      if (existing) {
    existing.count++;
  } else {
    departmentArray.push({ department: department, count: 1 });
  }
  })
console.log('department:', departmentArray);

 const roleArray:{role:string, count:number}[]= []
  data?.users.forEach((user)=>{
    const role=user.role;
    const existing = roleArray.find(item => item.role === role);
      if (existing) {
    existing.count++;
  } else {
    roleArray.push({ role: role, count: 1 });
  }
  })
console.log('role:', roleArray);

 const bloodGroupArray:{bloodGroup:string, count:number}[]= []
  data?.users.forEach((user)=>{
    const bloodGroup=user.bloodGroup;
    const existing = bloodGroupArray.find(item => item.bloodGroup === bloodGroup);
      if (existing) {
    existing.count++;
  } else {
    bloodGroupArray.push({ bloodGroup: bloodGroup, count: 1 });
  }
  })
console.log('bloodGroup:', bloodGroupArray);



  return (
    <div className="flex flex-col  bg-blue-100 ">
  <div className="flex flex-col justify-center w-full items-center">
    {error && <p className="text-red-500">Error: {error}</p>}
    <h1 className="text-3xl font-bold mb-4 mt-4">Users</h1>

    {data && !error && (
      <div className="flex gap-8 justify-center mb-6">
        <div className="bg-amber-500 flex flex-col justify-center items-center p-4 w-40 rounded">
          <p className="text-6xl">
            <FaUsers />
          </p>
          <p>Total users</p>
          <p>{data.users.length}</p>
        </div>
        <div className="bg-blue-500 flex flex-col justify-center items-center p-4 w-40 rounded">
          <p className="text-6xl">
            <FaMale />
          </p>
          <p>Male</p>
          <p>{maleCount}</p>
        </div>
        <div className="bg-rose-500 flex flex-col justify-center items-center p-4 w-40 rounded">
          <p className="text-6xl">
            <FaFemale />
          </p>
          <p>Female</p>
          <p>{femaleCount}</p>
        </div>
      </div>
    )}
  </div>

  <div className="flex  justify-center m-8 ">
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl text-center  font-bold">University</h1>
      <div className="flex justify-center ">
        <table className="border-3 border-gray-300  text-left ">
  <thead className="bg-gray-100">
    <tr>
      <th className="border-2 border-gray-300 p-2">University</th>
      <th className="border-2 border-gray-300 p-2">Users</th>
    </tr>
  </thead>
  <tbody>
    {universityCountArray.map(({ university, count }) => (
      <tr key={university} >
        <td className="border-2 border-gray-300 p-3">{university}</td>
        <td className="border-2 border-gray-300 p-3">{count}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>

    <div className='flex flex-col gap-5 '>

    <div className=' flex flex-col gap-3 '>
      <h1 className="text-3xl text-center font-bold">Departments</h1>
      <div className="flex flex-wrap gap-4 justify-start">
        {departmentArray.map(({ department, count }) => (
          <div
            key={department}
            className="border-3 border-gray-300 rounded-lg p-4 shadow-md w-40 flex flex-col gap-1 items-center "
          >
            <h3 className="text-lg font-semibold mb-2">{department}</h3>
            <p className="text-gray-700">Users: {count}</p>
          </div>
        ))}
      </div>
    </div>



<div className=' flex flex-col gap-3'>
      <h1 className="text-3xl text-center font-bold">Desgination</h1>
      <div className="flex flex-wrap gap-4 justify-start">
        {roleArray.map(({ role, count }) => (
          <div
            key={role}
            className="border-3 border-gray-300 rounded-lg p-4 shadow-md w-40  flex flex-col gap-1 items-center"
          >
            <h3 className="text-lg font-semibold mb-2">{role}</h3>
            <p className="text-gray-700">Users: {count}</p>
          </div>
        ))}
      </div>
    </div>

    <div className=' flex flex-col gap-3'>
      <h1 className="text-3xl text-center font-bold">Blood Group</h1>
      <div className="flex flex-wrap gap-4 justify-start">
        {bloodGroupArray.map(({ bloodGroup, count }) => (
          <div
            key={bloodGroup}
            className="border-3 border-gray-300 rounded-lg p-4 shadow-md w-40  flex flex-col gap-1 items-center"
          >
            <h3 className="text-lg font-semibold ">{bloodGroup}</h3>
            
            <p className="text-gray-700">Users: {count}</p>
          </div>
        ))}
      </div>
    </div>

    </div>

    

  </div>
</div>

      );
}
