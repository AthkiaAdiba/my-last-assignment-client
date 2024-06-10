import { useState } from 'react';
import Select from 'react-select';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';


const options = [
    { value: 'dog', label: 'dog' },
    { value: 'cat', label: 'cat' },
    { value: 'rabbit', label: 'rabbit' },
    { value: 'bird', label: 'bird' },
    { value: 'fish', label: 'fish' },
    { value: 'horse', label: 'horse' },
];

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPet = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionError, setSelectedOptionError] = useState('');
    const [editorError, setEditorError] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    // console.log(selectedOption.value)

    // hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    // tiptap
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
    });

    // submit function
    const onSubmit = async (data) => {
        const content = editor.getText();

        if (content === '') {
            return setEditorError('Long Description is requird')
        }
        if (selectedOption === '') {
            return setSelectedOptionError('Category is requird')
        }

        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the pet to the server with the image
            const pet = {
                pet_name: data.petName,
                pet_category: selectedOption.value,
                pet_image: res.data.data.display_url,
                pet_age: data.age,
                pet_location: data.location,
                short_description: data.shortDescription,
                long_description: content,
                date: startDate,
                adopted: false,
                user_name: user?.displayName,
                email: user?.email
            }
            console.log(pet)
            // post a pet
            const petRes = await axiosSecure.post('/pets', pet)
            console.log(petRes.data)
            if (petRes.data.insertedId) {
                // show success popup
                reset();
                editor.commands.clearContent(true)
                setSelectedOptionError('')
                setEditorError('')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.petName} is added to the pets.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data)
    }

    return (
        <div>
            <Helmet>
                <title>Add a Pet | Pets</title>
            </Helmet>
            <div className="bg-base-100 dark:bg-black shadow-2xl font-barlow mb-16 py-16 px-3 lg:px-24 lg:mt-16">
                <h2 className="text-4xl font-extrabold text-center mb-5 dark:text-white">Add a Pet</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* name and category row */}
                    <div className="md:flex mb-3 lg:mb-8">
                        <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                            <label className="label">
                                <span className="label-text text-xl font-medium dark:text-white">Pet Category</span>
                            </label>
                            <label className="input-group text-black">
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                />
                                <p className="text-red-700">{selectedOptionError}</p>
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                            <label className="label">
                                <span className="label-text text-xl font-medium dark:text-white">Pet Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="Pet Name" className="input input-bordered w-full" {...register("petName", { required: true })} />
                                {errors.petName && <span className="text-red-700">Pet Name is required</span>}
                            </label>
                        </div>
                    </div>
                    {/* location and age row */}
                    <div className="md:flex mb-3 lg:mb-8">
                        <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                            <label className="label">
                                <span className="label-text text-xl font-medium dark:text-white">Pet Location</span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="Pet Location" className="input input-bordered w-full" {...register("location", { required: true })} />
                                {errors.location && <span className="text-red-700">Location is required</span>}
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                            <label className="label">
                                <span className="label-text text-xl font-medium dark:text-white">Pet age</span>
                            </label>
                            <label className="input-group">
                                <input type="number" name="age" placeholder="Pet age" className="input input-bordered w-full" {...register("age", { required: true })} />
                                {errors.age && <span className="text-red-700">Age is required</span>}
                            </label>
                        </div>
                    </div>
                    {/* short description and image row */}
                    <div className="md:flex mb-3 lg:mb-8">
                        <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                            <label className="label">
                                <span className="label-text text-xl font-medium dark:text-white">Short Description</span>
                            </label>
                            <label className="input-group">
                                <textarea placeholder="Short Description" className="textarea textarea-bordered textarea-sm w-full" {...register("shortDescription", { required: true })} ></textarea>
                                {errors.shortDescription && <span className="text-red-700">Short Description is required</span>}
                            </label>
                        </div>
                        <br />
                        {/* for date */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium text-xl text-black dark:text-white">Pick a Date:</span>
                            </label>
                            <DatePicker className=" ml-1 p-2 border-2 rounded-md text-black text-xl"
                                selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                            <label className="label">
                                <span className="label-text text-xl font-medium dark:text-white">Pet Image</span>
                            </label>
                            <label className="input-group">
                                <input type="file" className="file-input file-input-bordered w-full" {...register('image', { required: true })} />
                                {errors.image && <span className="text-red-700">Image is required</span>}
                            </label>
                        </div>
                    </div>
                    <div className='mb-8 border rounded-lg border-gray-300'>
                        <label className="label">
                            <span className="label-text text-xl font-medium dark:text-white">Long Description:</span>
                        </label>
                        <EditorContent editor={editor} className='overflow-y-scroll max-h-60 dark:text-white' />
                        <p className="text-red-700">{editorError}</p>
                    </div>

                    <input type="submit" value="Add Pet" className="btn bg-[#FF720F] text-white text-xl font-medium border-none w-full" />
                </form>
            </div>
        </div>
    );
};

export default AddPet;