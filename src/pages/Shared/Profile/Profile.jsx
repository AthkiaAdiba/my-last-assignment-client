import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import wallpepar from '../../../assets/profile_wallpepar.jpg'
import { Helmet } from "react-helmet-async";


const Profile = () => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    if (loading || isAdminLoading) return <div className="mt-28"><Skeleton count={5} /></div>

    return (
        <div className='mt-0 lg:mt-0 flex justify-center items-center h-screen'>
            <Helmet>
                <title>Profile | Pets</title>
            </Helmet>
            <div className='bg-white dark:bg-black shadow-lg rounded-2xl lg:w-3/5'>
                <img
                    alt='profile'
                    src={wallpepar}
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='p-2 uppercase px-4 text-xs text-white bg-[#FF720F] rounded-full'>
                        {isAdmin ? <p>Admin</p> : <p>User</p>}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-white'>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black dark:text-white'>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col dark:text-white'>
                                Email
                                <span className='font-bold text-black dark:text-white'>{user?.email}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;