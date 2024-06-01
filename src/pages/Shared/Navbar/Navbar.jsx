import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { MdLogout } from "react-icons/md";
import logo from '../../../assets/logo.webp'
import { MdDashboard } from "react-icons/md";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // const { toggleTheme, theme } = useTheme();

    const navLinks = <>
        <NavLink className={({ isActive }) => isActive ? 'underline mr-4 text-[#FF720F]' : 'text-black mr-4'} to='/'>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'underline mr-4 text-[#FF720F]' : 'text-black dark:text-white mr-4'} to='/donationCampaigns'>Donation Campaigns</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'underline mr-4 text-[#FF720F]' : 'text-black dark:text-white mr-4'} to='/petListing'>Pet Listing</NavLink>
        
        {
            user && <>
                {/* <NavLink className={({ isActive }) => isActive ? 'underline mr-4 text-[#9B804E]' : 'mr-4 text-[#3D3931] dark:text-white'} to='/myBookings'>My Bookings</NavLink> */}
            </>
        }
    </>

    // Log out
    const handleLogOut = () => {
        logOut()
            .then(() => {
                // console.log('logged out successfully')
            })
            .catch()
    }
    return (
        <div>
            <div className="navbar dark:bg-zinc-900 fixed shadow-lg top-0 w-full right-0 left-0 z-20 bg-base-100 px-1 lg:px-9 lg:py-2">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost dark:text-white lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-white dark:bg-zinc-900 text-black text-base font-forum rounded-box w-52">
                            {navLinks}
                            {/* <button className="btn bg-[#9B804E]"><Link to='/login' className="mr-5 text-white border-none font-barlow text-xl">Login</Link></button>
                            <button className="btn bg-[#9B804E]"><Link to='/register' className="w-14 lg:w-20 text-white border-none font-barlow text-xl">Register</Link></button> */}
                            <Link to='/login' className="mr-5 text-black border-none font-barlow text-lg">Login</Link>
                            <Link to='/register' className="w-14 lg:w-20 text-black border-none font-barlow text-xl">Register</Link>
                        </ul>
                    </div>
                    <div className="hidden md:block lg:block">
                        <img className="w-14" src={logo} alt="" />
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="text-xl dark:bg-zinc-900 menu menu-horizontal px-1 bg-transparent text-white">
                        {navLinks}
                    </ul>
                </div>
                {
                    user ?
                        <div className="navbar-end flex gap-0 lg:gap-3 items-center">
                            <details className="dropdown mr-[150%] md:mr-[45%] lg:mr-0">
                                <summary className="btn w-10 lg:w-12 h-10 lg:h-12 rounded-full">
                                    <div className="avatar tooltip tooltip-right md:tooltip-left lg:tooltip-left" data-tip={user.displayName}>
                                        <div className="w-12 lg:w-12 h-12 lg:h-12 rounded-full">
                                            <img src={user.photoURL} />
                                        </div>
                                    </div>
                                </summary>
                                <ul className="shadow menu dropdown-content z-[1] rounded-full w-52">
                                    <div className="h-full p-1 space-y-2 bg-[#FF720F] text-white">
                                        {/* <div className="items-center p-2 space-x-4">
                                            <h2 className="text-lg font-semibold text-center">{user.displayName}</h2>
                                            <p>{user.email}</p>
                                        </div> */}
                                        <div>
                                            <ul className="pt-2 pb-4 space-y-1 text-sm">
                                                <li>
                                                    <Link onClick={handleLogOut} className="space-x-3 flex items-center">
                                                        <MdDashboard className="text-lg"></MdDashboard>
                                                        <p>Dashboard</p>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link onClick={handleLogOut} className="space-x-3 flex items-center">
                                                        <MdLogout className="text-lg"></MdLogout>
                                                        <p>Log out</p>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </ul>
                            </details>
                            <div className="block md:hidden lg:hidden -ml-[130%]">
                                <img className="w-14" src={logo} alt="" />
                            </div>
                            <button onClick={handleLogOut} className="hidden lg:block btn bg-[#FF720F] text-white border-none font-forum text-base lg:text-xl text-center">Log out</button>
                        </div> :
                        <div className="navbar-end flex gap-2 lg:gap-4">
                            <div className="block md:hidden lg:hidden">
                                <div className="flex items-center">
                                    <img className="w-12" src={logo} alt="" />
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <div className="flex items-center">
                                    <Link to='/login' className="btn mr-5 w-14 lg:w-20 bg-[#FF720F] text-white border-none text-xl">Login</Link>
                                    <Link to='/register' className="btn w-14 lg:w-20 bg-[#FF720F] text-white border-none text-xl">Register</Link>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;