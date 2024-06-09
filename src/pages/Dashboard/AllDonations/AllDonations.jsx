import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { toast } from "react-toastify";
import { FaPlay } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";


const AllDonations = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allDonationsCampaigns = [], refetch } = useQuery({
        queryKey: ['allDonationsCampaigns'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminPage')
            return res.data
        }
    })

    console.log(allDonationsCampaigns)

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
                toast.error('You have Paused this donation campaign!')
            })
    }

    return (

        <div className="pt-8 lg:pt-32 px-[2%] pb-20">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-xl text-black dark:text-white">
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Maximum Donation <br /> Amount</th>
                            <th>Progress</th>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>Pause | Unpause</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDonationsCampaigns.map((pet, index) => <tr key={pet._id} className="text-lg text-black dark:text-white">
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
                                    <progress className="progress w-40 dark:bg-white" value={(pet.donated_amount / pet.maximumAmount) * 100} max="100"></progress>
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
                                    {pet.pause ? <button onClick={() => handleUnpause(pet._id)} className="btn bg-[#FF720F] text-white"><FaPlay className="text-lg"></FaPlay></button>
                                        :
                                        <button onClick={() => handlePause(pet._id)} className="btn bg-[#FF720F] text-white"><IoIosPause className="text-lg"></IoIosPause></button>
                                    }
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDonations;