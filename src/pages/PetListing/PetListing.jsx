import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const PetListing = () => {
    const axiosPublic = useAxiosPublic();

    const {data: unadoptedPets = []} = useQuery({
        queryKey: ['unadoptedPets'],
        queryFn: async() => {
            const res = await axiosPublic.get('/pets-unadopted')
            return res.data;
        }
    })

    console.log(unadoptedPets)
    return (
        <div>
           <h2>From Pet Listing</h2> 
        </div>
    );
};

export default PetListing;