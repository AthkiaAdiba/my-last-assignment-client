import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllPets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allPets = [], refetch } = useQuery({
        queryKey: ['allpets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allPets')
            return res.data
        }
    })
    console.log(allPets)
    return (
        <div className="mt-28">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
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
                        {/* row 1 */}
                        <tr>
                            <th>
                                
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div className="font-bold">Hart Hagerty</div>
                                </div>
                            </td>
                            <td>
                                
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPets;