import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { RiRefundLine } from "react-icons/ri";


const MyDonations = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: myDonations = [], refetch } = useQuery({
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

    return (
        <div className="pt-8 lg:pt-32 px-[2%] pb-20">
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
                            <th>Donated Amount</th>
                            <th>Ask For Refund</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myDonations.map((donation, index) => <tr key={donation._id} className="text-lg text-black">
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