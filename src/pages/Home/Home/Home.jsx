import AboutUs from "../AboutUs/AboutUs";
import AdoptionProcess from "../AdoptionProcess/AdoptionProcess";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Categories from "../Categories/Categories";
import TakingCare from "../TakingCare/TakingCare";


const Home = () => {
    return (
        <div>
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