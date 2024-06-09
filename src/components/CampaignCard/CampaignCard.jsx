import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CampaignCard = ({campaignCard}) => {
    const {pet_name, pet_image, maximumAmount, donated_amount, _id} = campaignCard;
    return (
        <div>
            <div className="card bg-base-100 dark:bg-black shadow-xl">
                <figure><img className="w-full h-[300px]" src={pet_image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="dark:text-white card-title text-2xl font-medium">Name: {pet_name}</h2>
                    <p className="text-xl font-medium dark:text-white">Maximum Donation Amount: ${maximumAmount}</p>
                    <p className="text-xl font-medium dark:text-white">Donated Amount: ${donated_amount}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/campaignCardDetails/${_id}`}><button className="btn bg-[#FF720F] text-white">View Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

CampaignCard.propTypes = {
    campaignCard: PropTypes.object
}

export default CampaignCard;