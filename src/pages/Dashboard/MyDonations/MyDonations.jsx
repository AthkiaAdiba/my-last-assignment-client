import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { RiRefundLine } from "react-icons/ri";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Helmet } from "react-helmet-async";


const MyDonations = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: myDonations = [], refetch, isLoading } = useQuery({
        queryKey: ['myDonations', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mtDonations/${user?.email}`)
            return res.data
        }
    })
    console.log(myDonations)

    const handleRefund = async(id) => {
        const res = await axiosSecure.patch(`/refund/${id}`)
        refetch();
        console.log(res.data)

    }

    if (isLoading) return <div className="mt-28"><Skeleton count={5} /></div>

    return (
        <div className="pt-8 lg:pt-32 px-[2%] pb-20">
            <Helmet>
                <title>My Donations | Pets</title>
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
                            <th>Donated Amount</th>
                            <th>Ask For Refund</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myDonations.map((donation, index) => <tr key={donation._id} className="text-lg text-black dark:text-white">
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={donation.pet_image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {donation.pet_name}
                                </td>
                                <td>{donation.donationAmount}</td>
                                <th> 
                                    <button onClick={() => handleRefund(donation._id)} className="btn bg-[#FF720F] text-white"><RiRefundLine className="text-lg"></RiRefundLine></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonations;