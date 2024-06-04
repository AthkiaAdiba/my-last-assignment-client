

const Banner = () => {
    return (
        <div className="mt-20">
            <div className="hero h-[550px]" style={{ backgroundImage: 'url(https://res.cloudinary.com/dv6fgvj2c/image/upload/v1717178135/kmx9xnxsuugakjvprog2.webp)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-white">Best Friend for Your Best Time</h1>
                        <p className="mb-5 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn bg-[#FF720F] border-none text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;