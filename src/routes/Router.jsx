import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PetListing from "../pages/PetListing/PetListing";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children : [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/petListing',
                element: <PetListing></PetListing>
            },
            {
                path: '/donationCampaigns',
                element: <DonationCampaigns></DonationCampaigns>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
]);

export default router;