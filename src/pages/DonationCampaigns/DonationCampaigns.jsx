import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CampaignCard from "../../components/CampaignCard/CampaignCard";


const DonationCampaigns = () => {
  const axiosSecure = useAxiosSecure();

  const { data: campaignCards = [] } = useQuery({
    queryKey: ['campaignCards'],
    queryFn: async () => {
      const res = await axiosSecure.get('/campaignCards')
      return res.data;
    }
  });
  console.log(campaignCards)

  return (
    <div className="px-[5%] pt-28 lg:pt-36 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
          campaignCards.map(campaignCard => <CampaignCard key={campaignCard._id} campaignCard={campaignCard}></CampaignCard>)
        }
      </div>
    </div>
  );
};

export default DonationCampaigns;