import { RiMenuFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";

const Sidebar = () => {
    const [isAdmin] = useAdmin();
    const links = <>
        {isAdmin ? <>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/users'>Users</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/allPets'>All Pets</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/allDonations'>All Donations</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/addPet'>Add a pet</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/addedPets'>My added pets</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/addDonations'>Create Donation Campaign</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/myDonationCampaigns'>My donation campaigns</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/myDonations'>My donations</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/adoptionRequest'>Adoption Request</NavLink>        </> :
            <>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/addPet'>Add a pet</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/addedPets'>My added pets</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/addDonations'>Create Donation Campaign</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/myDonationCampaigns'>My donation campaigns</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/myDonations'>My donations</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'p-2 bg-[#FF720F] text-white' : 'text-black'} to='/dashboard/adoptionRequest'>Adoption Request</NavLink>
            </>}
    </>
    return (
        <div>
            {/* for small screen */}
            <div className="drawer block lg:hidden mt-24 z-10">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex justify-end">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="drawer-button"><RiMenuFill className="text-3xl mr-6"></RiMenuFill></label>
                </div>
                <div className="drawer-side mt-24">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-52 min-h-screen space-y-4 bg-base-200 text-black text-lg">
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
                    <ul className="menu p-4 w-52 min-h-screen space-y-4 bg-base-200 text-black text-lg">
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