import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ModalForm from "../ModalForm/ModalForm";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Helmet } from "react-helmet-async";



const UnadoptedPetDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: pet = {} } = useQuery({
        queryKey: ['pet', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet/${id}`)
            return res.data
        }
    })
    console.log(pet)

    const handleOpenModal = () => {
        document.getElementById('my_modal_1').showModal()
    }
    return (
        <div className="px-[3%] lg:px-[25%] pt-28 lg:pt-36 pb-24 dark:bg-black">
            <Helmet>
                <title>Pet Listing Details | Pets</title>
            </Helmet>
            <div className="card bg-base-100 dark:bg-black shadow-xl">
                <figure><img className="w-full h-[300px] lg:h-[450px]" src={pet.pet_image || <Skeleton />} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-4xl dark:text-white">Name: {pet.pet_name || <Skeleton />}</h2>
                    <p className="text-2xl dark:text-white">{pet.short_description || <Skeleton />}</p>
                    <p className="text-xl dark:text-white">{pet.long_description || <Skeleton />}</p>
                    <p className="text-2xl dark:text-white">Age: {pet.pet_age || <Skeleton />}</p>
                    <p className="text-2xl dark:text-white">Location: {pet.pet_location || <Skeleton />}</p>
                    <p className="text-2xl dark:text-white">Category: {pet.pet_category || <Skeleton />}</p>
                    <div className="card-actions justify-end">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button onClick={handleOpenModal} className="btn bg-[#FF720F] text-white">Adopt</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box dark:bg-black">
                                <h2 className="mb-3 text-center text-4xl font-bold text-[#FF720F]">{pet.pet_name}</h2>
                                <ModalForm pet={pet}></ModalForm>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn bg-[#FF720F] text-white">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnadoptedPetDetails;