import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { LuPencil } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const AllPets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allPets = [], refetch } = useQuery({
        queryKey: ['allpets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allPets')
            return res.data
        }
    })


    const handleDelete = id => {
        console.log('Delete', id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deletePet/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Pet has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleSetAdopted = id => {
        console.log('Handle Adopted', id)
        axiosSecure.patch(`/pets/${id}`, { adopted: true })
            .then(res => {
                refetch()
                console.log(res.data)
            })
    }


    return (
        <div className="mt-28">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-black">
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Adoption</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPets.map((pet, index) => <tr key={pet._id} className="text-base">
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
                                        <div className="font-bold">{pet.pet_name}</div>
                                    </div>
                                </td>
                                <td>{pet.pet_category}</td>
                                <td>
                                    {pet.adopted ? 'Adopted' : 'Not Adopted'}
                                </td>
                                <th>
                                    <Link to={`/dashboard/updatePet/${pet._id}`}>
                                        <button className="btn bg-[#FF720F] text-white"><LuPencil className="text-xl"></LuPencil></button>
                                    </Link>
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(pet._id)} className="btn bg-[#FF720F] text-white"><MdDelete className="text-xl"></MdDelete></button>
                                </th>
                                <th>
                                    <button onClick={() => handleSetAdopted(pet._id)} className="btn bg-[#FF720F] text-white"><TbStatusChange className="text-xl"></TbStatusChange></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPets;