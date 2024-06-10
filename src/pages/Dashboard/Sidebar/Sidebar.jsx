import { RiMenuFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import { FaUsers } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { FiGitPullRequest } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
    const [isAdmin] = useAdmin();
    const links = <>
        {isAdmin ? <>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/users'><p className="flex items-center gap-2"><FaUsers></FaUsers>Users</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/allPets'><p className="flex items-center gap-2"><MdPets></MdPets>All Pets</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/allDonations'><p className="flex items-center gap-2"><FaDonate></FaDonate>All Donations</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/addPet'><p className="flex items-center gap-2"><MdPets></MdPets>Add a Pet</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/addedPets'><p className="flex items-center gap-2"><MdPets></MdPets>My Added Pets</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/addDonations'><p className="flex items-center gap-2"><MdCampaign className="text-4xl"></MdCampaign>Create Donation Campaign</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/myDonationCampaigns'><p className="flex items-center gap-2"><FaDonate></FaDonate>My Donation Campaigns</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/myDonations'><p className="flex items-center gap-2"><FaDonate></FaDonate>My Donations</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/adoptionRequest'><p className="flex items-center gap-2"><FiGitPullRequest></FiGitPullRequest>Adoption Request</p></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/profile'><p className="flex items-center gap-2"><CgProfile></CgProfile>Profile</p></NavLink>        </> :
            <>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/addPet'><p className="flex items-center gap-2"><MdPets></MdPets>Add a Pet</p></NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/addedPets'><p className="flex items-center gap-2"><MdPets></MdPets>My Added Pets</p></NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/addDonations'><p className="flex items-center gap-2"><MdCampaign className="text-4xl"></MdCampaign>Create Donation Campaign</p></NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/myDonationCampaigns'><p className="flex items-center gap-2"><FaDonate></FaDonate>My Donation Campaigns</p></NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/myDonations'><p className="flex items-center gap-2"><FaDonate></FaDonate>My Donations</p></NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/adoptionRequest'><p className="flex items-center gap-2"><FiGitPullRequest></FiGitPullRequest>Adoption Request</p></NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white dark:text-white' : 'text-black dark:text-white'} to='/dashboard/profile'><p className="flex items-center gap-2"><CgProfile></CgProfile>Profile</p></NavLink>
            </>}
    </>
    return (
        <div>
            {/* for small screen */}
            <div className="drawer block lg:hidden mt-24 z-10 dark:bg-black">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex justify-end">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="drawer-button"><RiMenuFill className="text-3xl mr-6 dark:text-white"></RiMenuFill></label>
                </div>
                <div className="drawer-side mt-24">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-52 min-h-screen space-y-4 bg-base-200 text-black text-lg dark:bg-black">
                        {isAdmin && <p className="text-center text-[#FF720F] text-xl">Admin</p>}
                        {!isAdmin && <p className="text-center text-[#FF720F] text-xl">User</p>}
                        {/* Sidebar content here */}
                        {links}
                    </ul>
                </div>
            </div>
            {/* for large screen */}
            <div className="lg:drawer-open mt-24 hidden lg:block">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-52 space-y-4 bg-base-200 text-black dark:bg-black text-lg min-h-screen">
                        {isAdmin && <p className="text-center text-[#FF720F] text-xl">Admin</p>}
                        {!isAdmin && <p className="text-center text-[#FF720F] text-xl">User</p>}
                        {/* Sidebar content here */}
                        {links}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;