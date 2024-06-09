import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateDonationCampaign = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());


    // fetch data
    const { data: donation = {}, refetch } = useQuery({
        queryKey: ['donation', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaignCard-details/${id}`)
            return res.data
        }
    })
    // console.log(donation)


    // update form
    const handleUpdateDonations = async (e) => {
        e.preventDefault();

        const form = e.target;


        // image upload to imgbb and then get an url
        const imageFile = { image: form.image.files[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log('with image url', res.data.data.display_url)
        if (res.data.success) {
            // now update the campaign to the server with the image
            const campaign = {
                pet_name: form.petName.value,
                maximumAmount: form.maximumAmount.value,
                pet_image: res.data.data.display_url,
                create_date: startDate,
                last_date: startDate2,
                short_description: form.shortDescription.value,
                long_description: form.longDescription.value
            }
            console.log(campaign)
            // update a campaign
            const campaignRes = await axiosSecure.patch(`/updateDonationCampaign/${id}`, campaign)
            console.log(campaignRes.data)
            if (campaignRes.data.modifiedCount > 0) {
                // show success popup
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'This donation campaign is updated.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log('with image url', res.data)
    }

    return (
        <div className="font-barlow mb-10 lg:mb-24 py-16 px-3 mt-0 lg:mt-20">
            <h2 className="text-4xl font-extrabold text-center mb-5 text-black dark:text-white">Update Campaign</h2>
            <form onSubmit={handleUpdateDonations}>
                {/* pet Name and maximum account row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium dark:text-white">Pet Name</span>
                        </label>
                        <label className="input-group text-black">
                            <input type="text" name="petName" defaultValue={donation.pet_name} placeholder="Pet Name" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium dark:text-white">Maximum Amount</span>
                        </label>
                        <label className="input-group">
                            <input type="number" defaultValue={donation.maximumAmount} name="maximumAmount" placeholder="Maximum Amount" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* donation create and last date row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium dark:text-white">Donation Create Date</span>
                        </label>
                        <DatePicker className="w-full ml-1 p-2 border-2 rounded-md text-black text-xl"
                            selected={startDate} onChange={(date) => setStartDate(date)} required />
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium dark:text-white">Donation Last Date</span>
                        </label>
                        <DatePicker className="w-full ml-1 p-2 border-2 rounded-md text-black text-xl"
                            selected={startDate2} onChange={(date) => setStartDate2(date)} required />
                    </div>
                </div>
                {/* user name and email row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium dark:text-white">User Email</span>
                        </label>
                        <label className="input-group">
                            <input type="email" name="email" defaultValue={user?.email} disabled placeholder="User Email" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium dark:text-white">User Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="userName" defaultValue={user?.displayName} disabled placeholder="User Name" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* short description and long row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium dark:text-white">Short Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="shortDescription" defaultValue={donation.short_description} placeholder="Short Description" className="textarea textarea-bordered textarea-sm w-full" required ></textarea>
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium dark:text-white">Long Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="longDescription" defaultValue={donation.long_description} placeholder="Long Description" className="textarea textarea-bordered textarea-sm w-full" required ></textarea>
                        </label>
                    </div>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="form-control w-full lg:w-1/3 mb-4 lg:mb-8">
                        <label className="label">
                            <span className="label-text text-xl font-medium dark:text-white">Pet Image</span>
                        </label>
                        <label className="input-group">
                            <input type="file" name="image" className="file-input file-input-bordered w-full" required />
                        </label>
                    </div>
                    <img className="h-16 w-16" src={donation.pet_image} alt="" />
                </div>
                <input type="submit" value="Update Campaign" className="btn bg-[#FF720F] text-white text-xl font-medium border-none w-full" />

            </form>
        </div>
    );
};

export default UpdateDonationCampaign;