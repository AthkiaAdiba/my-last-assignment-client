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
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Dashboard/Users/Users";
import AllPets from "../pages/Dashboard/AllPets/AllPets";
import AdminRoute from "./AdminRoute";
import UpdatePet from "../pages/Dashboard/UpdatePet/UpdatePet";
import UnadoptedPetDetails from "../components/UnadoptedPetDetails/UnadoptedPetDetails";
import AddDonations from "../pages/Dashboard/AddDonations/AddDonations";
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest/AdoptionRequest";
import CampaignCardDetails from "../components/CampaignCardDetails/CampaignCardDetails";
import MyDonationCampaigns from "../pages/Dashboard/MyDonationCampaigns/MyDonationCampaigns";
import UpdateDonationCampaign from "../pages/Dashboard/UpdateDonationCampaign/UpdateDonationCampaign";
import MyDonations from "../pages/Dashboard/MyDonations/MyDonations";
import AllDonations from "../pages/Dashboard/AllDonations/AllDonations";



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
                path: '/unadoptedPetDetails/:id',
                element: <PrivateRoute><UnadoptedPetDetails></UnadoptedPetDetails></PrivateRoute>
            },
            {
                path: '/donationCampaigns',
                element: <DonationCampaigns></DonationCampaigns>
            },
            {
                path: '/campaignCardDetails/:id',
                element: <PrivateRoute><CampaignCardDetails></CampaignCardDetails></PrivateRoute>
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
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // users routes
            {
                path: 'addPet',
                element: <PrivateRoute><AddPet></AddPet></PrivateRoute>
            },
            {
                path: 'addedPets',
                element: <PrivateRoute><AddedPets></AddedPets></PrivateRoute>
            },
            {
                path: 'updatePet/:id',
                element: <PrivateRoute><UpdatePet></UpdatePet></PrivateRoute>
            },
            {
                path: 'addDonations',
                element: <PrivateRoute><AddDonations></AddDonations></PrivateRoute>
            },
            {
                path: 'adoptionRequest',
                element: <PrivateRoute><AdoptionRequest></AdoptionRequest></PrivateRoute>
            },
            {
                path: 'myDonationCampaigns',
                element: <PrivateRoute><MyDonationCampaigns></MyDonationCampaigns></PrivateRoute>
            },
            {
                path: 'updateDonationCampaign/:id',
                element: <PrivateRoute><UpdateDonationCampaign></UpdateDonationCampaign></PrivateRoute>
            },
            {
                path: 'myDonations',
                element: <PrivateRoute><MyDonations></MyDonations></PrivateRoute>
            },
            

            // admin routes
            {
                path: 'users',
                element: <AdminRoute><PrivateRoute><Users></Users></PrivateRoute></AdminRoute>
            },
            {
                path: 'allPets',
                element: <AdminRoute><PrivateRoute><AllPets></AllPets></PrivateRoute></AdminRoute>
            },
            {
                path: 'allDonations',
                element: <AdminRoute><PrivateRoute><AllDonations></AllDonations></PrivateRoute></AdminRoute>
            }
        ]
        
    }
]);

export default router;