import img from '../../../assets/aboutus.png'
import './AboutUs.css'

const AboutUs = () => {
    return (
        <div className="mx-[5%] mt-28 lg:mt-44 mb-28">
            <div className='flex flex-col lg:flex-row gap-16 items-center justify-between'>
                <div>
                    <img className='h-[300px] lg:h-[400px]' src={img} alt="" />
                </div>
                <div className='flex-1 space-y-7'>
                    <h2 className='text-[#FF720F] text-xl font-medium'>About Us</h2>
                    <h1 className='text-5xl font-extrabold'>Best Service to Breeds your Loved Pets</h1>
                    <p className='text-xl'>Welcome to our pet adoption website, created with a passion for helping animals find loving homes. Our mission is to connect caring families with pets in need, making the adoption process as smooth and accessible as possible. Explore our comprehensive listings of adoptable pets, each with detailed profiles and photos to help you find the perfect match. Additionally, we provide valuable resources and ongoing support to help you and your new pet transition smoothly into your new life together.</p>
                    <p className='text-xl'>Our website was born out of a deep love for animals and a desire to reduce the number of pets in shelters. By facilitating adoptions and encouraging donations, we aim to give every pet a chance at a happy, healthy life. We believe that every animal deserves a loving home, and we are committed to making that happen. Join us in making a difference—adopt, donate, and help us ensure every pet gets the love and care they deserve.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;