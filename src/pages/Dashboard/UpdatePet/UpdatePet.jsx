import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { EditorContent, useEditor } from '@tiptap/react'
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// startDate

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

const UpdatePet = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionError, setSelectedOptionError] = useState('');
    const [editorError, setEditorError] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    // fetch data
    const { data: pet = {} } = useQuery({
        queryKey: ['pet', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet/${id}`)
            return res.data
        }
    })
    console.log(pet)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // tiptap
    const editor = useEditor({
        extensions: [StarterKit],
        content: `${pet.long_description}`,
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
        // console.log('with image url', res.data)
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
                date: startDate
            }
            console.log(pet)
            // update a pet
            const petRes = await axiosSecure.patch(`/updatePet/${id}`, pet)
            console.log(petRes.data)
            if (petRes.data.modifiedCount > 0) {
                // show success popup
                setSelectedOptionError('')
                setEditorError('')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.petName} is Updated.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data)
    }

    return (
        <div>
            <div className="bg-base-100 shadow-2xl font-barlow mb-16 py-16 px-3 lg:px-24 lg:mt-16">
                <h2 className="text-4xl font-extrabold text-center mb-5">Update The Pet</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* name and category row */}
                    <div className="md:flex mb-3 lg:mb-8">
                        <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Pet Category</span>
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
                                <span className="label-text text-xl font-medium">Pet Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={pet.pet_name} placeholder="Pet Name" className="input input-bordered w-full" {...register("petName", { required: true })} />
                                {errors.petName && <span className="text-red-700">Pet Name is required</span>}
                            </label>
                        </div>
                    </div>
                    {/* location and age row */}
                    <div className="md:flex mb-3 lg:mb-8">
                        <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Pet Location</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={pet.pet_location} placeholder="Pet Location" className="input input-bordered w-full" {...register("location", { required: true })} />
                                {errors.location && <span className="text-red-700">Location is required</span>}
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Pet age</span>
                            </label>
                            <label className="input-group">
                                <input type="number" defaultValue={pet.pet_age} placeholder="Pet age" className="input input-bordered w-full" {...register("age", { required: true })} />
                                {errors.age && <span className="text-red-700">Age is required</span>}
                            </label>
                        </div>
                    </div>
                    {/* short description and image row */}
                    <div className="md:flex mb-3 lg:mb-8 items-center">
                        <div className="form-control md:w-1/2 mb-3 lg:mb-0">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Short Description</span>
                            </label>
                            <label className="input-group">
                                <textarea defaultValue={pet.short_description} placeholder="Short Description" className="textarea textarea-bordered textarea-sm w-full" {...register("shortDescription", { required: true })} ></textarea>
                                {errors.shortDescription && <span className="text-red-700">Short Description is required</span>}
                            </label>
                        </div>
                        <br />
                        {/* for date */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium text-xl text-black">Pick a Date:</span>
                            </label>
                            <DatePicker className=" ml-1 p-2 border-2 rounded-md text-black text-xl"
                                selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Pet Image</span>
                            </label>
                            <label className="input-group">
                                <input type="file" className="file-input file-input-bordered w-full" {...register('image', { required: true })} />
                                {errors.image && <span className="text-red-700">Image is required</span>}
                            </label>
                        </div>
                        <img className="h-16 w-16" src={pet.pet_image} alt="" />
                    </div>
                    <div className='mb-8 border rounded-lg border-gray-300'>
                        <label className="label">
                            <span className="label-text text-xl font-medium">Long Description:</span>
                        </label>
                        <EditorContent editor={editor} className='overflow-y-scroll max-h-60' />
                        <p className="text-red-700">{editorError}</p>
                    </div>

                    <input type="submit" value="Update" className="btn bg-[#FF720F] text-white text-xl font-medium border-none w-full" />
                </form>
            </div>
        </div>
    );
};

export default UpdatePet;