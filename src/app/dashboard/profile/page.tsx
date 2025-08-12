
import { cookies } from "next/headers";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  phone: string;
  image: string;
  bloodGroup: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
  };
  role: string;
}

export default async function DataPage() {
  const cookie=await cookies();
  const token=cookie.get("accessToken")?.value;

  if (!token) {
    throw new Error("No access token found in cookies");
  }

  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const user: UserData = await res.json();

  return (
    <div className="flex flex-col items-center justify-center  h-screen pt-10">
      <h1 className="text-2xl font-bold mt-4 mb-4">User Profile</h1>
      <div className="flex flex-col m-auto mt-2 bg-blue-300 p-5 rounded-lg gap-2 font-normal">
        <div>
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            width={128}
            height={128}
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="font-bold">
          Name: <span className="font-normal">{user.firstName} {user.lastName}</span>
        </h1>
        <p className="font-bold">Email: <span className="font-normal">{user.email}</span></p>
        <p className="font-bold">Phone: <span className="font-normal">{user.phone}</span></p>
        <p className="font-bold">Age: <span className="font-normal">{user.age}</span></p>
        <p className="font-bold">Blood Group: <span className="font-normal">{user.bloodGroup}</span></p>
        <p className="font-bold">Role: <span className="font-normal">{user.role}</span></p>
        <p className="font-bold">
          Address: <span className="font-normal">
            {user.address.address}, {user.address.city}, {user.address.state} {user.address.stateCode}, {user.address.postalCode}
          </span>
        </p>
      </div>
    </div>
  );
}
