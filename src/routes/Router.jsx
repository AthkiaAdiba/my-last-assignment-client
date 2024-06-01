import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PetListing from "../pages/PetListing/PetListing";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import Dashboard from "../layout/Dashboard";
import AddPet from "../pages/Dashboard/AddPet/AddPet";
import AddedPets from "../pages/Dashboard/AddedPets/AddedPets";



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
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'addPet',
                element: <AddPet></AddPet>
            },
            {
                path: 'addedPets',
                element: <AddedPets></AddedPets>
            }
        ]
        
    }
]);

export default router;