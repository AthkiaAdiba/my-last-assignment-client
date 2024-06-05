import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const UnadoptedPetDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: pet = {} } = useQuery({
        queryKey: ['pet', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet/${id}`)
            return res.data
        }
    })
    console.log(pet)
    return (
        <div className="px-[3%] lg:px-[25%] pt-28 lg:pt-36 pb-24">
            <div className="card bg-base-100 shadow-xl">
                <figure><img className="w-full h-[300px] lg:h-[450px]" src={pet.pet_image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-4xl">Name: {pet.pet_name}</h2>
                    <p className="text-2xl">{pet.short_description}</p>
                    <p className="text-xl">{pet.long_description}</p>
                    <p className="text-2xl">Age: {pet.pet_age}</p>
                    <p className="text-2xl">Location: {pet.pet_location}</p>
                    <p className="text-2xl">Category: {pet.pet_category}</p>
                    <div className="card-actions justify-end">
                    <button className="btn bg-[#FF720F] text-white">Adopt</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnadoptedPetDetails;