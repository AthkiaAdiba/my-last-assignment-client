import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddDonations = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());


    const handleAddDonations = async (e) => {
        e.preventDefault();

        const form = e.target;

        
        // image upload to imgbb and then get an url
        const imageFile = { image: form.image.files[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // console.log('with image url', res.data.data.display_url)
        if (res.data.success) {
            // now send the campaign to the server with the image
            const campaign = {
                pet_name: form.petName.value,
                maximumAmount: form.maximumAmount.value,
                pet_image: res.data.data.display_url,
                create_date: startDate,
                last_date: startDate2,
                short_description: form.shortDescription.value,
                long_description: form.longDescription.value,
                user_name: user.displayName,
                email: user.email
            }
            console.log(campaign)
            // post a campaign
            const campaignRes = await axiosSecure.post('/campaign', campaign)
            console.log(res.data)
            if (campaignRes.data.insertedId) {
                // show success popup
                form.reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${form.petName.value} is added to the campaigns.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log('with image url', res.data)

    }
    return (
        <div className="font-barlow mb-10 lg:mb-24 py-16 px-3 lg:px-24 mt-0 lg:mt-20">
            <h2 className="text-4xl font-extrabold text-center mb-5 text-black">Add A Campaign</h2>
            <form onSubmit={handleAddDonations}>
                {/* pet Name and maximum account row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium">Pet Name</span>
                        </label>
                        <label className="input-group text-black">
                            <input type="text" name="petName" placeholder="Pet Name" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium">Maximum Amount</span>
                        </label>
                        <label className="input-group">
                            <input type="number" name="maximumAmount" placeholder="Maximum Amount" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* donation create and last date row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium">Donation Create Date</span>
                        </label>
                        <DatePicker className="w-full ml-1 p-2 border-2 rounded-md text-black text-xl"
                            selected={startDate} onChange={(date) => setStartDate(date)} required />
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium">Donation Last Date</span>
                        </label>
                        <DatePicker className="w-full ml-1 p-2 border-2 rounded-md text-black text-xl"
                            selected={startDate2} onChange={(date) => setStartDate2(date)} required />
                    </div>
                </div>
                {/* user name and email row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium">User Email</span>
                        </label>
                        <label className="input-group">
                            <input type="email" name="email" defaultValue={user?.email} disabled placeholder="User Email" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium">User Name</span>
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
                            <span className="label-text text-black text-xl font-medium">Short Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="shortDescription" placeholder="Short Description" className="textarea textarea-bordered textarea-sm w-full" required ></textarea>
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium">Long Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="longDescription" placeholder="Long Description" className="textarea textarea-bordered textarea-sm w-full" required ></textarea>
                        </label>
                    </div>
                </div>
                <div className="form-control w-full lg:w-1/3 mb-4 lg:mb-8">
                    <label className="label">
                        <span className="label-text text-xl font-medium">Pet Image</span>
                    </label>
                    <label className="input-group">
                        <input type="file" name="image" className="file-input file-input-bordered w-full" required />
                    </label>
                </div>
                <input type="submit" value="Add A Capaign" className="btn bg-[#FF720F] text-white text-xl font-medium border-none w-full" />

            </form>
        </div>
    );
};

export default AddDonations;