import { Helmet } from "react-helmet-async";
import AboutUs from "../AboutUs/AboutUs";
import AdoptionProcess from "../AdoptionProcess/AdoptionProcess";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Categories from "../Categories/Categories";
import TakingCare from "../TakingCare/TakingCare";


const Home = () => {
    return (
        <div className="dark:bg-black">
            <Helmet>
                <title>Home | pets</title>
            </Helmet>
            <Banner></Banner>
            <Categories></Categories>
            <CallToAction></CallToAction>
            <AdoptionProcess></AdoptionProcess>
            <TakingCare></TakingCare>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;