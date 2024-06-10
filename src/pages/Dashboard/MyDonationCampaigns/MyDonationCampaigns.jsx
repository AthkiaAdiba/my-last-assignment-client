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
import ViewDonatorsModal from "../../../components/ViewDonatorsModal/ViewDonatorsModal";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Helmet } from "react-helmet-async";


const MyDonationCampaigns = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myCampaigns = [], refetch, isLoading } = useQuery({
        queryKey: ['myCampaigns'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaignCards/${user?.email}`)
            return res.data;
        }
    });
    // console.log(myCampaigns)

    // open modal
    const handleOpenModal = (id) => {
        console.log(id)
        document.getElementById(id).showModal()
    }


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

    if (isLoading) return <div className="mt-28"><Skeleton count={5} /></div>

    return (
        <div className="pt-8 lg:pt-32 px-[2%] pb-20">
            <Helmet>
                <title>My Donation Campaigns | Pets</title>
            </Helmet>
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
                            <th>View Donators</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myCampaigns.map((pet, index) => <tr key={pet._id} className="text-lg text-black dark:text-white">
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
                                <th className="text-center">
                                    <button onClick={() => handleOpenModal(pet._id)} className="btn bg-[#FF720F] text-white"><FaEye className="text-lg"></FaEye></button>
                                    <dialog id={pet._id} className="modal">
                                        <div className="modal-box">
                                            <h2 className="mb-3 text-center text-4xl font-bold text-[#FF720F]"></h2>
                                            <ViewDonatorsModal petId={pet._id}></ViewDonatorsModal>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn bg-[#FF720F] text-white">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
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