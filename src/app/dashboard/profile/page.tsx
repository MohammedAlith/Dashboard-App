'use client';

import { useEffect, useState } from 'react';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  age:string;
  email:string;
  phone:string;
  image:string;
  bloodGroup:string;
  address: {
    address: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    country:string
}
role:string
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile|null>(null);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setError('No access token found');
      setLoading(false);
      return;
    }

    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
        
      })
      .then(data => {
        setProfile(data);
        console.log("profile", data)
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex flex-col items-center justify-center bg-blue-100 h-screen '>
      <h1 className='text-2xl font-bold mt-4 mb-4'> Profile Details</h1>
     {profile&&
     <div className='flex flex-col m-auto mt-2 bg-blue-300 p-5 rounded-lg gap-2 font-normal'>
       <div>
      <img
        src={profile.image}
        alt={`${profile.firstName} ${profile.lastName}`}
        
      />
    </div>
      <h1 className='font-bold'>Name:<span className='font-normal'> {profile.firstName} {profile.lastName}</span></h1>
      <p className='font-bold'>Email:<span className='font-normal'>{profile.email}</span></p>
      <p className='font-bold'>Phone Number:<span className='font-normal'>{profile.phone}</span></p>
      <p className='font-bold'>Age:<span className='font-normal'> {profile.age}</span></p>
      <p className='font-bold'>Blood Group:<span className='font-normal'>{profile.bloodGroup}</span></p>
      <p className='font-bold'>Designation:<span className='font-normal'>{profile.role}</span></p>
      <p className="font-bold">Address: <span className="font-normal">
      {profile.address.address}, {profile.address.city}, {profile.address.state}{" "}
      {profile.address.stateCode}, {profile.address.postalCode}
    </span>
  </p>
     </div>
     }
    </div>
  );
}
