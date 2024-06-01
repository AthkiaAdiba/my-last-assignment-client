import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";


const Register = () => {
    const { createUser, updateInformation, logOut } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const { name, email, image, password } = data;
        // console.log(data)

        // create user
        createUser(email, password)
            .then(result => {
                // console.log(result.user);
                const userInformation = result.user;
                toast.success('Account created successfully');
                reset();

                // update profile
                updateInformation(userInformation, name, image)
                    .then(() => {
                        // console.log('profile updated')
                    })
                    .catch()

                // log out
                logOut()
                    .then(() => {
                        // console.log('logged out successfully')
                    })
                    .catch()
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="mt-16 pt-10 pb-10">
            <div className="w-full font-forum shadow-lg mx-auto max-w-md p-8 space-y-3 rounded-none bg-base-100 text-gray-100">
                <h1 className="text-2xl font-bold text-center text-black">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-1 text-lg">
                        <label className="block text-black font-medium text-xl">Full Name</label>
                        <input type="text" name="name" placeholder="Enter Your Full Name" className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-100 text-black focus:border-violet-400" {...register("name", { required: true })} />
                        {errors.name && <span className="text-red-700">Name is required</span>}
                    </div>

                    <div className="space-y-1 text-lg">
                        <label className="block text-black font-medium text-xl">Email Address</label>
                        <input type="email" name="email" placeholder="Enter Your Email" className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-100 text-black focus:border-violet-400" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-700">Email is required</span>}
                    </div>

                    <div className="space-y-1 text-lg">
                        <label className="block text-black font-medium text-xl">Image URL</label>
                        <input type="text" name="image" placeholder="Enter Your Image URL" className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-100 text-black focus:border-violet-400" {...register("image")} />
                    </div>

                    <div className="relative space-y-1 text-lg">
                        <label className="block text-black font-medium text-xl">Password</label>
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Your Password" className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-100 text-black focus:border-violet-400" {...register("password", {
                            required: {
                                value: true,
                                message: 'Password is required'
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                message: 'You have to enter an Uppercase and an Lowercase letter in the password'
                            },
                            minLength: {
                                value: 6,
                                message: 'Length must be at least 6 character'
                            }
                        })} />
                        <span className='absolute top-12 right-5 text-gray-900 text-xl' onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                        {errors.password && <span className="text-red-700">{errors.password.message}</span>}
                    </div>

                    <button className="block w-full p-3 text-center rounded-sm bg-[#FF720F] text-white text-lg">Register</button>
                </form>
                <p className="text-lg font-normal text-center sm:px-6 text-black">Already have an account?
                    <Link to='/login' className="underline ml-2 font-semibold text-[#FF720F]">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;