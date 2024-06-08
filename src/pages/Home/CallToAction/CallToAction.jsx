import callToAction from '../../../assets/call_to_action.jpg'

const CallToAction = () => {
    return (
        <div className="px-3 lg:px-[5%] pt-28 lg:pt-36">
            <h2 className="text-5xl font-bold">Make a Difference Today!</h2>
            <h2 className="text-2xl mt-3 text-[#FF720F]">Adopt, donate, and support animals in need.</h2>
            <div className='flex flex-col lg:flex-row gap-7 mt-14 items-center'>
                <div className=''>
                    <img src={callToAction} alt="" />
                </div>
                <div className=' w-full lg:w-[70%]'>
                    <h2 className='text-3xl font-extrabold'>Find Your New Best Friend and Support Our Cause: Adopt or Donate Today!</h2>
                    <p className='text-2xl font-normal mt-4'>Join us in making a difference today! Whether you are ready to welcome a new furry friend into your home or support our mission through a donation, your involvement makes a tremendous impact. Explore our listings of adorable, adoptable pets and start the simple adoption process to give a pet a loving forever home. Not ready to adopt? Consider making a donation to help us provide care and shelter for animals in need.</p>
                    <div className='mt-9 text-center'>
                        <button className="btn bg-[#FF720F] border-none text-white mr-10">Adopt a Pet</button>
                        <button className="btn bg-[#FF720F] border-none text-white">Donate Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;