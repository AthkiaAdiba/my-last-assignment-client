import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PaymentModal from "../PaymentModal/PaymentModal";


const CampaignCardDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: details = {} } = useQuery({
        queryKey: ['details'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaignCards/${id}`)
            return res.data;
        }
    })
    console.log(details)

    const handleOpenModal = () => {
        document.getElementById('my_modal_1').showModal()
    }

    return (
        <div className="px-[3%] lg:px-[25%] pt-28 lg:pt-36 pb-24">
            <div className="card bg-base-100 shadow-xl">
                <figure><img className="w-full h-[300px] lg:h-[450px]" src={details.pet_image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-4xl">Name: {details.pet_name}</h2>
                    <p className="text-2xl">{details.short_description}</p>
                    <p className="text-xl">{details.long_description}</p>
                    <p className="text-2xl">Donation Maximum Amount: ${details.maximumAmount}</p>
                    <p className="text-2xl">Donated Amount: ${details.donated_amount}</p>
                    <p className="text-2xl">Donation Start Date: {new Date(details.create_date).toLocaleDateString()}</p>
                    <p className="text-2xl">Donation Last Date: {new Date(details.last_date).toLocaleDateString()}</p>
                    <div className="card-actions justify-end">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button onClick={handleOpenModal} className="btn bg-[#FF720F] text-white">Donate Now</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h2 className="mb-3 text-center text-4xl font-bold text-[#FF720F]"></h2>
                                <PaymentModal></PaymentModal>
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

export default CampaignCardDetails;