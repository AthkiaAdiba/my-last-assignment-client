import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from 'prop-types';

const ViewDonatorsModal = ({ petId }) => {
    const axiosSecure = useAxiosSecure();
    console.log(petId)

    const { data: donators = [] } = useQuery({
        queryKey: ['donators', petId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donators/${petId}`)
            return res.data
        }
    })
    console.log(donators)


    return (
        <div>
            <div>
                {
                    donators.map((donator, index) => <div key={donator._id}
                        className="flex justify-between">

                        <div className="flex gap-3">
                            <p>{index + 1}</p>
                            <p>{donator.user_name}</p>
                        </div>
                        <p>{donator.donationAmount}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

ViewDonatorsModal.propTypes = {
    petId: PropTypes.number
}

export default ViewDonatorsModal;