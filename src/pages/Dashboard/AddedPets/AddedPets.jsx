import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddedPets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: pets = [] } = useQuery({
        queryKey: ['pets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets/${user.email}`)
            return res.data
        }
    })

    console.log(pets)
    return (
        <div className="mt-28">
            <h2>From added pets page</h2>
        </div>
    );
};

export default AddedPets;