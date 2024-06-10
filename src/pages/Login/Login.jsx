import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {
    const { login, loginWithGoogle, loginWithGithub } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const from = location.state?.from?.pathname || "/";
    // console.log('state in the location login page', location.state);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const { email, password } = data;

        // login user
        login(email, password)
            // eslint-disable-next-line no-unused-vars
            .then(result => {
                // console.log(result.user);
                toast.success('You have logged in successfully');
                reset();

                // navigate after login
                // navigate(location?.state ? location.state : '/')
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                toast.error('Password or Email does not match.');
                reset();
            })
    }


    // login with google
    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            // eslint-disable-next-line no-unused-vars
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true });
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image: result.user?.photoURL,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            toast.success('You have logged in successfully');
                            reset();
                            navigate(from, { replace: true });
                        }
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    // login with Github
    const handleLoginWithGithub = () => {
        loginWithGithub()
            .then(result => {
                console.log(result.user)
                // redirect
                navigate(from, { replace: true });
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image: result.user?.photoURL,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            toast.success('You have logged in successfully');
                            reset();
                            navigate(from, { replace: true });
                        }
                    })
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="pt-3 pb-16 dark:bg-black">
            <div className="bg-base-100 dark:bg-black shadow-lg w-full font-forum mx-auto max-w-md p-8 space-y-3 rounded-none text-black">
                <h1 className="text-4xl font-bold text-center text-black dark:text-white">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-1 text-lg">
                        <label className="block font-medium text-xl text-black dark:text-white">Email Address</label>
                        <input type="email" name="email" placeholder="Enter Your Email" className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-100 text-black focus:border-violet-400" {...register("email", { required: true })} />
                        {errors.password && <span className="text-red-700">This field is required</span>}
                    </div>

                    <div className="space-y-1 text-lg">
                        <label className="block font-medium text-xl dark:text-white">Password</label>
                        <input type="password" name="password" placeholder="Enter Your Password" className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-100 text-black focus:border-violet-400" {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-700">This field is required</span>}
                    </div>

                    <button className="block w-full p-3 text-center rounded-sm bg-[#FF720F] text-white text-lg">Login</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-[#3D3931]"></div>
                    <p className="px-3 text-lg font-medium dark:text-white">Or Login With</p>
                    <div className="flex-1 h-px sm:w-16 bg-[#3D3931]"></div>
                </div>
                <div className="space-y-5">
                    <div>
                        <button onClick={handleLoginWithGoogle} className="text-lg flex items-center justify-center w-full p-4 space-x-4 rounded-md focus:ring-2 focus:ring-offset-1 border-[#3D3931] bg-[#FF720F] border-2 text-white">
                            <FaGoogle></FaGoogle>
                            <p>Login with Google</p>
                        </button>
                    </div>
                    <div>
                        <button onClick={handleLoginWithGithub} className="text-lg flex items-center justify-center w-full p-4 space-x-4 rounded-md focus:ring-2 focus:ring-offset-1 border-[#3D3931] bg-[#FF720F] border-2 text-white">
                            <FaGithub></FaGithub>
                            <p>Login with GitHub</p>
                        </button>
                    </div>
                </div>
                <p className="text-lg font-normal text-center sm:px-6 dark:text-white">Do not have an account?
                    <Link to='/register' className="underline ml-2 font-semibold text-[#FF720F]">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;