import { API_URLS } from "@/components/api";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface User {
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
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      country: string;
    };
  };
  role: string;
}

const getUser = async (id: string): Promise<User | undefined> => {
  try {
    const res = await fetch(`${API_URLS.userUrl}/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return undefined;
  }
};

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);

  return (
    <div className="flex flex-col bg-blue-100 pb-5 pt-10">
      <div className="self-end m-5">
        <Link href="/dashboard/userList">
          <button className="bg-amber-500 rounded-lg p-2 cursor-pointer text-2xl font-bold ">
            <IoIosArrowBack />
          </button>
        </Link>
      </div>

      <div className="flex flex-col  m-auto rounded-lg p-10 gap-3  bg-blue-300">
        <h1 className="text-2xl font-bold ">User Details</h1>

        <div>
          <img
            src={user?.image}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <p className="font-medium">
            Name:{" "}
            <span className="font-normal">
              {user?.firstName} {user?.lastName}
            </span>
          </p>
          <p className="font-medium">
            Age: <span className="font-normal">{user?.age}</span>
          </p>
          <p className="font-medium">
            Email: <span className="font-normal">{user?.email}</span>
          </p>
          <p className="font-medium">
            Phone Number: <span className="font-normal">{user?.phone}</span>
          </p>
          <p className="font-medium">
            Address:{" "}
            <span className="font-normal">
              {user?.address.address}, {user?.address.city},{" "}
              {user?.address.state} {user?.address.stateCode},{" "}
              {user?.address.postalCode}
            </span>
          </p>
          <p className="font-medium">
            Designation: <span className="font-normal">{user?.role}</span>
          </p>
        </div>

        <div className="w-full max-w-lg">
          <h1 className="text-lg font-semibold mb-4">Company Details</h1>
          <table className="border-3 border-gray-300 w-full">
            <tbody>
              <tr>
                <td className="border-3 border-gray-300 p-2 font-medium">
                  Department
                </td>
                <td className="border-3 border-gray-300 p-2">
                  {user?.company.department}
                </td>
              </tr>
              <tr>
                <td className="border-3 border-gray-300 p-2 font-medium">
                  Company Name
                </td>
                <td className="border-3 border-gray-300 p-2">
                  {user?.company.name}
                </td>
              </tr>
              <tr>
                <td className="border-3 border-gray-300 p-2 font-medium">
                  Title
                </td>
                <td className="border-3 border-gray-300 p-2">
                  {user?.company.title}
                </td>
              </tr>
              <tr>
                <td className="border-3 border-gray-300 p-2 font-medium">
                  Company Address
                </td>
                <td className="border-3 border-gray-300 p-2">
                  {user?.company.address.address},{" "}
                  {user?.company.address.city}, {user?.company.address.state}{" "}
                  {user?.company.address.stateCode},{" "}
                  {user?.company.address.postalCode}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
