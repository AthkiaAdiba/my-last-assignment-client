import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import UnadoptedPet from "../../components/UnadoptedPet/UnadoptedPet";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";



const PetListing = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(6);
    const [category, setCategory] = useState('');
    console.log(limit)


    const { data: unadoptedPets = [], refetch, isLoading } = useQuery({
        queryKey: ["unadoptedPets", search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pets-unadopted?search=${search}&start=0&limit=${limit}`)
            return res.data
        }

    })

    const filterCates = category === '' ? unadoptedPets : unadoptedPets.filter(pet => pet.pet_category === category)

    useEffect(() => {
        refetch()
    }, [limit])

    const categoryArray = ['dog', 'cat', 'rabbit', 'bird', 'fish', 'horse']
    
    console.log(unadoptedPets)

    // handle search
    const handleSearch = e => {
        e.preventDefault();

        const searchText = e.target.search.value;
        // console.log(searchText)
        setSearch(searchText)
        e.target.reset()
    }

    const handleCategorySelect = category => {
        console.log(category)
        setCategory(category);
        
    };


    return (
        <div className="px-[5%] pt-28 lg:pt-36 pb-24 dark:bg-black">
            {/* dropdown and search field */}
            <div className="flex flex-col lg:flex-row justify-center items-center mb-10">
                <form onSubmit={handleSearch} className="join">
                    <input type="text" name="search" className="input input-bordered join-item dark:bg-black dark:border-2" placeholder="Search" />
                    <button type="submit" className="btn join-item bg-[#FF720F] text-white">Search</button>
                </form>
                <div className="text-center">
                    <details className="dropdown">
                        <summary className="m-1 btn bg-[#FF720F] text-white">Select Category <IoIosArrowDown></IoIosArrowDown></summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52 dark:bg-black dark:text-white">
                            {
                                categoryArray.map((cate, index) => <li key={index}
                                onClick={() => handleCategorySelect(cate)}
                                 className="hover:bg-[#FF720F] hover:text-white rounded-lg"><a>{cate}</a></li>)
                            }
                        </ul>
                    </details>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    filterCates.map(unadoptedPet => <UnadoptedPet key={unadoptedPet._id} unadoptedPet={unadoptedPet}></UnadoptedPet>)
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

export default PetListing;