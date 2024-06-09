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
            const res = await axiosSecure.get(`/campaignCard-details/${id}`)
            return res.data;
        }
    })
    console.log(details.pause)

    // date compare
    const isDonationAllowed = (details) => {
        const createDate = new Date(details.create_date);
        const lastDate = new Date(details.last_date);
        console.log('create date', createDate)
        console.log('last date', lastDate)

        return !details.pause && createDate < lastDate;
    };

    const handleOpenModal = () => {
        document.getElementById('my_modal_1').showModal()
    }

    return (
        <div className="px-[3%] lg:px-[25%] pt-28 lg:pt-36 pb-24 dark:bg-black">
            <div className="card bg-base-100 dark:bg-black shadow-xl">
                <figure><img className="w-full h-[300px] lg:h-[450px]" src={details.pet_image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-4xl dark:text-white">Name: {details.pet_name}</h2>
                    <p className="text-2xl dark:text-white">{details.short_description}</p>
                    <p className="text-xl dark:text-white">{details.long_description}</p>
                    <p className="text-2xl dark:text-white">Donation Maximum Amount: ${details.maximumAmount}</p>
                    <p className="text-2xl dark:text-white">Donated Amount: ${details.donated_amount}</p>
                    <p className="text-2xl dark:text-white">Donation Start Date: {new Date(details.create_date).toLocaleDateString()}</p>
                    <p className="text-2xl dark:text-white">Donation Last Date: {new Date(details.last_date).toLocaleDateString()}</p>
                    {details.pause ? <p className="text-red-500 text-xl">This Donation is now paused</p> :
                        <p></p>}
                    <div className="card-actions justify-end">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        {isDonationAllowed(details) ? <button disabled className="btn bg-[#FF720F] dark:bg-gray-600 dark:text-white text-white">Donate Now</button>
                            :
                            <button onClick={handleOpenModal} className="btn bg-[#FF720F] text-white">Donate Now</button>}
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h2 className="mb-3 text-center text-4xl font-bold text-[#FF720F]"></h2>
                                <PaymentModal details={details}></PaymentModal>
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