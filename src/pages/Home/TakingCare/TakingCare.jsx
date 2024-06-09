import './TakingCare.css';
import diagram from '../../../assets/diagram.png'

const TakingCare = () => {
    return (
        <div className='mt-32 bg-image pb-28 h-[450px] md:h-[600px] lg:h-[800px]'>
            <h5 className='pt-7 text-[#FF720F] text-xl font-medium text-center'>Our Services</h5>
            <h2 className="pt-10 pb-5 text-5xl font-bold text-center">Taking Care of Pets</h2>
            <img className='mx-auto px-3 lg:px-0' src={diagram} alt="" />
        </div>
    );
};

export default TakingCare;