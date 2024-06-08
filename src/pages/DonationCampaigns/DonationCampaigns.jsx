import { useQuery } from "@tanstack/react-query";
import CampaignCard from "../../components/CampaignCard/CampaignCard";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { InView } from "react-intersection-observer";


const DonationCampaigns = () => {
  const [limit, setLimit] = useState(6);
  const axiosPublic = useAxiosPublic();


  const { data: campaignCards = [], refetch, isLoading } = useQuery({
    queryKey: ["unadoptedPets"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/campaignCards?start=0&limit=${limit}`)
      return res.data
    }

  })

  // const { data: campaignCards = [] } = useQuery({
  //   queryKey: ['campaignCards'],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get('/campaignCards')
  //     return res.data;
  //   }
  // });

  console.log(campaignCards)

  useEffect(() => {
    refetch()
  }, [limit])

  return (
    <div className="px-[5%] pt-28 lg:pt-36 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
          campaignCards.map(campaignCard => <CampaignCard key={campaignCard._id} campaignCard={campaignCard}></CampaignCard>)
        }
      </div>

      <InView
        threshold={0.9}
        onChange={(inView) => {
          if (inView & !isLoading) {
            setLimit(prev => prev + 6)
          }
        }}
      >
        <div className="py-10 text-center mb-5">Loading...</div>
      </InView>
    </div>
  );
};

export default DonationCampaigns;