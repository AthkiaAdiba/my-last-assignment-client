import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import Navbar from "../pages/Shared/Navbar/Navbar";


const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col lg:flex-row dark:bg-black">
                <div className="">
                    <Sidebar></Sidebar>
                </div>
                <div className="flex-1 p-2 lg:p-4">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;