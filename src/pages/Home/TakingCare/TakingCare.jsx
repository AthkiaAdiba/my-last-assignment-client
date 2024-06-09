import './TakingCare.css';
import diagram from '../../../assets/diagram.png'

const TakingCare = () => {
    return (
        <div className='mt-32 bg-image pb-28 h-[450px] md:h-[600px] lg:h-[800px]'>
            <h2 className="py-16 text-5xl font-bold text-[#FF720F] text-center">Taking Care of Pets</h2>
            <img className='mx-auto px-3 lg:px-0' src={diagram} alt="" />
        </div>
    );
};

export default TakingCare;