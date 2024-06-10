import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { LuPencil } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Helmet } from "react-helmet-async";


const AllPets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allPets = [], refetch, isLoading } = useQuery({
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

    const handleSetNotAdopted = id => {
        console.log('Handle not Adopted', id)
        axiosSecure.patch(`/notAdopted/${id}`, { adopted: false })
            .then(res => {
                refetch()
                console.log(res.data)
            })
    }

    if (isLoading) return <div className="mt-28"><Skeleton count={5} /></div>
    return (
        <div className="mt-7 lg:mt-28 pb-16">
            <Helmet>
                <title>All Pets | Pets</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-black dark:text-white">
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Adopted</th>
                            <th>Not <br /> Adopted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPets.map((pet, index) => <tr key={pet._id} className="text-base dark:text-white">
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
                                <th>
                                    <button onClick={() => handleSetNotAdopted(pet._id)} className="btn bg-[#FF720F] text-white"><TbStatusChange className="text-xl"></TbStatusChange></button>
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