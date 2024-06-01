import { useState } from 'react';
import Select from 'react-select';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useForm } from 'react-hook-form';


const options = [
    { value: 'dog', label: 'dog' },
    { value: 'cat', label: 'cat' },
    { value: 'rabbit', label: 'rabbit' },
    { value: 'bird', label: 'bird' },
    { value: 'fish', label: 'fish' },
    { value: 'horse', label: 'horse' },
];
// {...register("category", { required: true })}
const AddPet = () => {
    const [selectedOption, setSelectedOption] = useState('');
    console.log(selectedOption.label)

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
    const onSubmit = data => {
        const content = editor.getText();
        console.log(content)
        console.log(data)
    }

    return (
        <div>
            <div className="bg-base-100 shadow-2xl font-barlow mb-16 py-16 px-3 lg:px-24 lg:mt-16">
                <h2 className="text-4xl font-extrabold text-center mb-5">Add a Pet</h2>
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
                                {/* {errors.category && <span className="text-red-700">Category is required</span>} */}
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Pet Name</span>
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
                                <span className="label-text text-xl font-medium">Pet Location</span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="Pet Location" className="input input-bordered w-full" {...register("location", { required: true })} />
                                {errors.location && <span className="text-red-700">Location is required</span>}
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 ml-0 md:ml-4 lg:ml-4">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Pet age</span>
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
                                <span className="label-text text-xl font-medium">Short Description</span>
                            </label>
                            <label className="input-group">
                                <textarea placeholder="Short Description" className="textarea textarea-bordered textarea-sm w-full" {...register("shortDescription", { required: true })} ></textarea>
                                {errors.shortDescription && <span className="text-red-700">Short Description is required</span>}
                            </label>
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
                    </div>
                    <div className='mb-8 border rounded-lg border-gray-300'>
                        <label className="label">
                            <span className="label-text text-xl font-medium">Long Description:</span>
                        </label>
                        <EditorContent editor={editor} className='overflow-y-scroll max-h-60' />
                    </div>
                    <input type="submit" value="Add Tourists Spot" className="btn bg-[#FF720F] text-white text-xl font-medium border-none w-full" />
                </form>
            </div>
        </div>
    );
};

export default AddPet;