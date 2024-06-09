import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import RecomendedCard from "../../../components/RecomendedCard/RecomendedCard";


const RecomendedCampaignCards = () => {
    const axiosSecure = useAxiosSecure();

    const {data: recomendedCards = []} = useQuery({
        queryKey: ['recomendedCards'],
        queryFn: async() => {
            const res = await axiosSecure.get('/recommended-campaigns')
            return res.data;
        }
    })

    console.log(recomendedCards)
    return (
        <div className="px-[5%] pt-14 lg:pt-16 pb-24 dark:bg-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    recomendedCards.map(card => <RecomendedCard card={card} key={card._id}></RecomendedCard>)
                }
            </div>
        </div>
    );
};

export default RecomendedCampaignCards;