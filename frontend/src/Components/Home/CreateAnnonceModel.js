import React from 'react'
import { Button, Label, FileInput, Modal, TextInput, Select, Textarea, Spinner } from 'flowbite-react';
import { useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import { API_BASE_URL } from '../../constant/constant';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


function CreateAnnonceModel({ openModal, setOpenModal }) {
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { data: category } = useFetch(asyncList);
    const [value, setValue] = useState('');



    const [formData, setFormData] = useState({
        title: '',
        category: '',
        location: '',
        description: '',
        price: '',
        images: []

    })


    const handelChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    function asyncList() {
        return axios.get(API_BASE_URL + '/category', { withCredentials: true });
    }


    const handelImagesUpload = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldImages) => [...oldImages, reader.result]);
                    setImages((oldImages) => [...oldImages, reader.result]);
                    setFormData({ ...formData, images: [...images, reader.result] })
                }
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, images: images })
        });
    };


    const deleteImagePreview = (index) => {
        setImagesPreview(imagesPreview.filter((h, i) => i !== index));
        setImages(images.filter((h, i) => i !== index));
        setFormData({ ...formData, images: images.filter((h, i) => i !== index) })

    };


    const handleSubmit = async (e) => {
e.preventDefault();
        setFormData({ ...formData, images: images })
        setFormData({ ...formData, description: value })
        setIsLoading(true);

        try {
            await axios.post(API_BASE_URL + '/annonce', formData, { withCredentials: true }).then((res) => {
                setSuccess(res.data);
                setError("")
                setIsLoading(false);
                setOpenModal(false)
                window.location.reload();
            }).catch((err) => {
                setError(err.response.data.message);
                setSuccess("")
                setIsLoading(false);
            
            });

        } catch (err) {
            setError(err.response.data.message);
            setSuccess("")
            setIsLoading(false);
        }
    }

    const hadelQuillChange = (e) => {
        setValue(e)
        setFormData({ ...formData, description: e })
    }



    return (
        <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter une Annonce</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Annonce Title" />
                        </div>
                        <TextInput onChange={handelChange} id="title" name='title' type='text' required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Price" />
                        </div>
                        <TextInput onChange={handelChange} id="price" name='price' type="number" required />
                    </div>

                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="location" value="Select your Location" />
                        </div>
                        <Select onChange={handelChange} id="location" name='location' required>
                            <option>Select your Location</option>
                            <option value="Tunis">Tunis</option>
                            <option value="Sfax">Sfax</option>
                            <option value="Sousse">Sousse</option>
                            <option value="Kairouan">Kairouan</option>
                            <option value="Bizerte">Bizerte</option>
                            <option value="Gabes">Gabes</option>
                            <option value="Ariana">Ariana</option>
                            <option value="Mannouba">La Mannouba</option>
                            <option value="Nabeul">Nabeul</option>
                            <option value="Zaghouan">Zaghouan</option>
                            <option value="Beja">Béja</option>
                            <option value="Jendouba">Jendouba</option>
                            <option value="Kebili">Kebili</option>
                            <option value="Siliana">Siliana</option>
                            <option value="Gafsa">Gafsa</option>
                            <option value="Tozeur">Tozeur</option>
                            <option value="Kasserine">Kasserine</option>
                            <option value="Kef">Le Kef</option>
                            <option value="Mahdia">Mahdia</option>
                            <option value="Medenine">Medenine</option>
                            <option value="Monastir">Monastir</option>
                            <option value="Tataouine">Tataouine</option>

                        </Select>
                    </div>



                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="countries" value="Select your category" />
                        </div>
                        <Select onChange={handelChange} id="category" name='category' required>
                            <option>Select your Category</option>
                            {category?.map((item) => (
                                <option key={item._id} value={item._id}>{item.categoryName}</option>
                            ))}
                        </Select>
                    </div>



                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <ReactQuill theme="snow" value={value} onChange={hadelQuillChange} />

                        {/* <Textarea onChange={handelChange}  value={value} id="description" name='description' placeholder="Leave a description..." required rows={4} /> */}
                    </div>

                    <div className="flex w-full items-center justify-center">

                        <Label
                            htmlFor="dropzone-file"
                            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <svg
                                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLineJoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <FileInput onChange={handelImagesUpload}  multiple id="dropzone-file" className="hidden" />
                        </Label>
                        

                    </div>
                    {imagesPreview.map((image, i) => (
                        <>
                            <img
                                width="150px"
                                height="150px"
                                draggable="false"
                                src={image}
                                name="images"
                                alt="Product"
                                key={i}
                                className="w-full m-2 h-full object-contain"
                            />

                            <div onClick={() => deleteImagePreview(i)} className="btn btn-sm btn-outline-danger">
                                <HighlightOffIcon/>
                            </div>

                        </>

                    ))}
                    <div className='m-4'>
                    {isLoading && <div className='text-center'> <Spinner/> </div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                    <div className="w-full flex justify-center items-center ">
                        
                        <Button onClick={handleSubmit}>Add your Annonce</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CreateAnnonceModel