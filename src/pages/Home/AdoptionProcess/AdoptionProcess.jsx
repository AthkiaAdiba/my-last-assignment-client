import { useEffect, useState } from "react";


const AdoptionProcess = () => {
    const [process, setProcess] = useState([])

    useEffect(() => {
        fetch('process.json')
            .then(res => res.json())
            .then(data => setProcess(data))
    }, []);
    console.log(process)

    return (
        <div className="px-[5%] pt-28 lg:pt-40">
            <h2 className="mb-16 text-5xl font-bold text-[#FF720F] text-center">Pet Adoption Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    process.map((pros, index) => <div key={index} className="card bg-base-100">
                        <figure className="px-10 pt-10">
                            <img src={pros.image} alt="Shoes" className="rounded-full" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-3xl mb-5">{pros.step}</h2>
                            <p className="text-lg">{pros.description}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AdoptionProcess;