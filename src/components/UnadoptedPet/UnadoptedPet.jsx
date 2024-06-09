import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


const UnadoptedPet = ({ unadoptedPet }) => {
    const { pet_image, pet_location, pet_name, pet_age, _id} = unadoptedPet;
    return (
        <div>
            <div className="card bg-base-100 dark:bg-black shadow-xl">
                <figure><img className="w-full h-[300px]" src={pet_image || <Skeleton />} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl font-medium dark:text-white">Name: {pet_name || <Skeleton />}</h2>
                    <p className="text-xl font-medium dark:text-white">Age: {pet_age || <Skeleton />}</p>
                    <p className="text-xl font-medium dark:text-white">Location: {pet_location || <Skeleton />}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/unadoptedPetDetails/${_id}`}><button className="btn bg-[#FF720F] text-white">View Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

UnadoptedPet.propTypes = {
    unadoptedPet: PropTypes.object
}

export default UnadoptedPet;