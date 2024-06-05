import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import UnadoptedPet from "../../components/UnadoptedPet/UnadoptedPet";
import { IoIosArrowDown } from "react-icons/io";



const PetListing = () => {
    const axiosPublic = useAxiosPublic();

    const { data: unadoptedPets = [] } = useQuery({
        queryKey: ['unadoptedPets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/pets-unadopted')
            return res.data;
        }
    })

    console.log(unadoptedPets)
    return (
        <div className="px-[5%] pt-28 lg:pt-36 pb-24">
            {/* dropdown and search field */}
            <div className="flex flex-col lg:flex-row justify-center items-center mb-10">
                <div className="join">
                    <input className="input input-bordered join-item" placeholder="Search" />
                    <button className="btn join-item bg-[#FF720F] text-white">Search</button>
                </div>
                <div className="text-center">
                    <details className="dropdown">
                        <summary className="m-1 btn bg-[#FF720F] text-white">Select Category <IoIosArrowDown></IoIosArrowDown></summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52">
                            <li className="hover:bg-[#FF720F] hover:text-white rounded-lg"><a>Dogs</a></li>
                            <li className="hover:bg-[#FF720F] hover:text-white rounded-lg"><a>Cats</a></li>
                            <li className="hover:bg-[#FF720F] hover:text-white rounded-lg"><a>Rabbits</a></li>
                            <li className="hover:bg-[#FF720F] hover:text-white rounded-lg"><a>Birds</a></li>
                            <li className="hover:bg-[#FF720F] hover:text-white rounded-lg"><a>Fishs</a></li>
                            <li className="hover:bg-[#FF720F] hover:text-white rounded-lg"><a>Horses</a></li>
                        </ul>
                    </details>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    unadoptedPets.map(unadoptedPet => <UnadoptedPet key={unadoptedPet._id} unadoptedPet={unadoptedPet}></UnadoptedPet>)
                }
            </div>
        </div>
    );
};

export default PetListing;