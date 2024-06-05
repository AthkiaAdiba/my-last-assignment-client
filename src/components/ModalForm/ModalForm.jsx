import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ModalForm = ({ pet }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { _id, pet_name, pet_image, user_name, email } = pet;

    const handleAddAdoption = e => {
        e.preventDefault();

        const form = e.target;

        const added_pet_id = _id;
        const added_pet_name = pet_name;
        const added_pet_image = pet_image;
        const adopter_phone = form.phone.value;
        const adopter_address = form.address.value;
        const status = "pending";
        const adopter_name = user.displayName;
        const adopter_email = user.email;
        const owner_name = user_name;
        const owner_email = email;


        const adopted_pet = { added_pet_id, added_pet_name, added_pet_image, adopter_phone, adopter_address, status, adopter_name, adopter_email, owner_name, owner_email }
        console.log(adopted_pet);

        axiosSecure.post('/addAdoption', adopted_pet)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    form.reset();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your adopted pet added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }
    return (
        <div>
            <div className="card shrink-0 w-full max-w-sm bg-base-100">
                <form onSubmit={handleAddAdoption} className="card-body">
                    {/* name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} placeholder="Name" className="input input-bordered" required disabled />
                    </div>
                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" required disabled />
                    </div>
                    {/* phone number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" name="phone" placeholder="Phone Number" className="input input-bordered" required />
                    </div>
                    {/* address */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input type="text" name="address" placeholder="Address" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="Submit" className="btn bg-[#FF720F] text-white" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;