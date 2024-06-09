import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Categories = () => {
    const axiosPublic = useAxiosPublic()

    const { data: Categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories')
            return res.data
        }
    })
    // console.log(Categories)
    return (
        <div className="px-[5%] pt-28 lg:pt-44">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    Categories.map(category => <div key={category._id} className="card card-compact bg-base-100 dark:bg-black shadow-xl">
                        <figure><img className="h-[400px]" src={category.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-4xl text-[#FF720F]">{category.name}</h2>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Categories;