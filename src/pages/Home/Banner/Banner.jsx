

const Banner = () => {
    return (
        <div className="mt-20">
            <div className="hero h-[550px]" style={{ backgroundImage: 'url(https://res.cloudinary.com/dv6fgvj2c/image/upload/v1717178135/kmx9xnxsuugakjvprog2.webp)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-white">Best Friend for Your Best Time</h1>
                        <p className="mb-5 text-white">Welcome to our pet adoption website, where finding your perfect furry friend is just a click away! We connect loving homes with pets in need, offering a wide range of cats, dogs, and other animals looking for a forever family.</p>
                        <button className="btn bg-[#FF720F] border-none text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;