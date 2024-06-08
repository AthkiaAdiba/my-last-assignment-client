import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Categories from "../Categories/Categories";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Categories></Categories>
           <CallToAction></CallToAction>
           <AboutUs></AboutUs>
        </div>
    );
};

export default Home;