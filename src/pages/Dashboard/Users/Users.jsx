import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiAdminFill } from "react-icons/ri";
import Swal from "sweetalert2";


// {new Date(oneRow.date).toLocaleDateString()}
const Users = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`, { role: 'admin' })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="pt-8 lg:pt-32 px-[5%] pb-20 dark:bg-black">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-2xl text-black dark:text-white">
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id} className="text-lg text-black dark:text-white">
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>{user.email}</td>
                                <th className="text-[#FF720F]">
                                    {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-ghost btn-md">
                                        <RiAdminFill className="text-3xl text-[#FF720F]"></RiAdminFill>
                                    </button>}
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;