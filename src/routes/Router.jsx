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
            

            // admin routes
            {
                path: 'users',
                element: <AdminRoute><PrivateRoute><Users></Users></PrivateRoute></AdminRoute>
            },
            {
                path: 'allPets',
                element: <AdminRoute><PrivateRoute><AllPets></AllPets></PrivateRoute></AdminRoute>
            }
        ]
        
    }
]);

export default router;