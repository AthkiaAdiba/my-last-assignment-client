import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AdoptionRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: adoptionRequests = [], refetch } = useQuery({
        queryKey: ['adoptionRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adoptionRequests/${user.email}`)
            return res.data;
        }
    })

    const handleAccept = id => {
        axiosSecure.patch(`/statusAccept/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Status is changed.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleReject = id => {
        axiosSecure.patch(`/statusReject/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Status is changed.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="mt-0 lg:mt-28">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-black">
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adoptionRequests.map((adoptionRequest, index) => <tr key={adoptionRequest._id} className="text-base">
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={adoptionRequest.added_pet_image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div className="font-bold">{adoptionRequest.added_pet_name}</div>
                                    </div>
                                </td>
                                <td>
                                    {adoptionRequest.adopter_name}
                                </td>
                                <td>{adoptionRequest.adopter_email}</td>
                                <td>{adoptionRequest.adopter_phone}</td>
                                <td>{adoptionRequest.adopter_address}</td>
                                <td>{adoptionRequest.status}</td>
                                <th>
                                    <button onClick={() => handleAccept(adoptionRequest._id)} className="btn btn-sm bg-[#FF720F] text-white">Accept</button>
                                    <button onClick={() => handleReject(adoptionRequest._id)} className="btn btn-sm bg-[#FF720F] text-white">Reject</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdoptionRequest;