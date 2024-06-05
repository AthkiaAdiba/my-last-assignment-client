import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const AddDonations = () => {
    const { user } = useAuth();


    const handleAddDonations = e => {
        e.preventDefault();

        const form = e.target;

        const countryName = form.countryName.value;
        const spotName = form.touristsSpotName.value;
        const location = form.location.value;
        const cost = form.cost.value;
        const season = form.season.value;
        const photo = form.photo.value;
        const visitors = form.visitors.value;
        const travelTime = form.travelTime.value;
        const description = form.description.value;

        const addSpot = { countryName, spotName, location, cost, season, photo, travelTime, visitors, description, userEmail: user.email, userName: user.displayName }
        // console.log(addSpot);

        fetch('https://my-tenth-project-server.vercel.app/addSpot', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addSpot)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Tourists Spot Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
                form.reset();
            })
    }
    return (
        <div className="font-barlow mb-24 py-16 px-3 lg:px-24 mt-0 lg:mt-20">
            <h2 className="text-4xl font-extrabold text-center mb-5 text-black">Add A Campaign</h2>
            <form onSubmit={handleAddDonations}>
                {/* pet Name and maximum account row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-black text-xl font-medium">Pet Name</span>
                        </label>
                        <label className="input-group text-black">
                            <input type="text" name="petName" placeholder="Pet Name" className="input input-bordered w-full" />
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
                {/* location and average cost row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">Location</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="location" placeholder="Location" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">Average Cost</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="cost" placeholder="Average Cost" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* season and travel time row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">Season</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="season" placeholder="Season" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">Travel Time</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="travelTime" placeholder="Travel Time" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* image URL and totalVisitorsPerYear row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">Total Visitors Per Year</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="visitors" placeholder="Total Visitors Per Year" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* user name and email row */}
                <div className="md:flex mb-3 lg:mb-8">
                    <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">User Email</span>
                        </label>
                        <label className="input-group">
                            <input type="email" name="email" defaultValue={user?.email} disabled placeholder="User Email" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">User Name</span>
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
                            <span className="label-text text-white text-xl font-medium">Short Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="description" placeholder="Short Description" className="textarea textarea-bordered textarea-sm w-full" required ></textarea>
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                        <label className="label">
                            <span className="label-text text-white text-xl font-medium">Short Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="description" placeholder="Short Description" className="textarea textarea-bordered textarea-sm w-full" required ></textarea>
                        </label>
                    </div>
                </div>
                <input type="submit" value="Add Tourists Spot" className="btn bg-[#0f2454] text-white text-xl font-medium border-none w-full" />

            </form>
        </div>
    );
};

export default AddDonations;