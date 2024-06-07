import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";


const MyDonationCampaigns = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myCampaigns = [], refetch } = useQuery({
        queryKey: ['myCampaigns'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaignCards/${user?.email}`)
            return res.data;
        }
    });
    // console.log(myCampaigns)

    const handleDelete = () => {
        toast.error('You Can not delete donation campaign!')
    }

    const handleUnpause = id => {
        axiosSecure.patch(`/setUnpause/${id}`)
        .then(res => {
            console.log(res.data)
            refetch();
            toast.success('You have Unpaused this donation campaign!')
        })
    }

    const handlePause = id => {
        axiosSecure.patch(`/setPause/${id}`)
        .then(res => {
            console.log(res.data)
            refetch();
            toast.success('You have Paused this donation campaign!')
        })
    }

    return (
        <div className="pt-8 lg:pt-32 px-[5%] pb-20">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-xl text-black">
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Maximum Donation Amount</th>
                            <th>Progress</th>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>Pause | Unpause</th>
                            <th>View Donators</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myCampaigns.map((pet, index) => <tr key={pet._id} className="text-lg text-black">
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={pet.pet_image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {pet.pet_name}
                                </td>
                                <td className="text-center">{pet.maximumAmount}</td>
                                <th>
                                    <progress className="progress w-40" value={(pet.donated_amount/ pet.maximumAmount) * 100 } max="100"></progress>
                                </th>
                                <th>
                                    <button onClick={handleDelete} className="btn bg-[#FF720F] text-white"><MdDelete className="text-xl"></MdDelete></button>
                                </th>
                                <th>
                                    <Link to={`/dashboard/updateDonationCampaign/${pet._id}`}>
                                        <button className="btn bg-[#FF720F] text-white"><LuPencil className="text-lg"></LuPencil></button>
                                    </Link>
                                </th>
                                <th className="text-center">
                                    {pet.pause ? <Link>
                                        <button onClick={() => handleUnpause(pet._id)} className="btn bg-[#FF720F] text-white"><FaPlay className="text-lg"></FaPlay></button>
                                    </Link>
                                        :
                                        <Link>
                                            <button onClick={() => handlePause(pet._id)} className="btn bg-[#FF720F] text-white"><IoIosPause className="text-lg"></IoIosPause></button>
                                        </Link>
                                    }
                                </th>
                                <th className="text-center">
                                    <Link>
                                        <button className="btn bg-[#FF720F] text-white"><FaEye className="text-lg"></FaEye></button>
                                    </Link>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonationCampaigns;