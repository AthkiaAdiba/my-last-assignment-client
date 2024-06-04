import img from '../../../assets/aboutus.png'
import './AboutUs.css'

const AboutUs = () => {
    return (
        <div className="mx-[5%] mt-28 lg:mt-44 mb-28 h-[550px]">
            <div className='flex flex-col lg:flex-row gap-16 items-center justify-between'>
                <div>
                    <img className='h-[550px]' src={img} alt="" />
                </div>
                <div className='flex-1 space-y-7'>
                    <h2 className='text-[#FF720F] text-xl font-medium'>About Us</h2>
                    <h1 className='text-5xl font-extrabold'>Best Service to Breeds your Loved Pets</h1>
                    <p className='text-xl'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                    <p className='text-xl'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;