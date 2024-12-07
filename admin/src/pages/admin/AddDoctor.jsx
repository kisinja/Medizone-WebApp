import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../components/Loader";
import { useDropzone } from 'react-dropzone';
import { useCallback } from "react";

const AddDoctor = () => {

    const { backendUrl, aToken } = useContext(AdminContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 year');
    const [fee, setFee] = useState('');
    const [speciality, setSpeciality] = useState('General Physician');
    const [degree, setDegree] = useState('');
    const [about, setAbout] = useState('');
    const [docImg, setDocImg] = useState(false);
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setDocImg(Object.assign(file, { preview: URL.createObjectURL(file) }));
    }, []);

    // Setup the dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*', // Accept only images
        maxFiles: 1,
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!docImg) {
                return toast.error('Image not selected !');
            }

            const formData = new FormData();

            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fee));
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('about', about);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
            formData.append('image', docImg);

            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: {
                    'Authorization': `Bearer ${aToken}`
                }
            });

            if (data.success) {
                toast.success(data.message);
                setLoading(false);

                /* Clear the fields */
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1 year');
                setFee('');
                setSpeciality('General Physician');
                setDegree('');
                setAbout('');
                setDocImg('');
                setAddress1('');
                setAddress2('');
            } else {
                toast.error(data.message);
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <Loader text="Adding Doctor..." />
    }

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">

            <p className="mb-3 text-lg font-medium">Add Doctor</p>

            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-2 w-64 h-32 flex flex-col items-center justify-center mb-8 cursor-pointer ${isDragActive ? 'border-primary bg-blue-50' : 'border-gray-400'
                        }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-blue-400">Drop the image here...</p>
                    ) : docImg ? (
                        <img
                            src={docImg.preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <p className="text-gray-500 text-center">Drag & drop a doctor&apos;s image here, or click to select</p>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex-col gap-1">
                            <p>Doctor{"'"}s Name</p>
                            <input type="text" placeholder="Name" id="" required className="border rounded px-3 py-2 w-full" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        <div className="flex-1 flex-col gap-1">
                            <p>Doctor&apos;s Email</p>
                            <input type="email" placeholder="Email" id="" required className="border rounded px-3 py-2 w-full" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <div className="flex-1 flex-col gap-1">
                            <p>Doctor&apos; Password</p>
                            <input type="password" placeholder="Password" id="" required className="border rounded px-3 py-2 w-full" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        <div className="flex-1 flex-col gap-1">
                            <p>Experience</p>
                            <select name="" id="" className="border rounded px-3 py-2 w-full" onChange={(e) => setExperience(e.target.value)} value={experience}>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="7 Years">7 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                            </select>
                        </div>

                        <div className="flex-1 flex-col gap-1">
                            <p>Fee</p>
                            <input type="Number" placeholder="Fee" min={0} id="" required className="border rounded px-3 py-2 w-full" onChange={(e) => setFee(e.target.value)} value={fee} />
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-2">
                        <div className="flex-1 flex-col gap-1">
                            <p>Speciality</p>
                            <select name="" id="" className="border rounded px-3 py-2 w-full" onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                                <option value="Dentist">Dentist</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Orthopedic">Orthopedic</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                                <option value="Radiologist">Radiologist</option>
                                <option value="Surgeon">Surgeon</option>
                                <option value="Urologist">Urologist</option>
                                <option value="Gynecologist">Gynecologist</option>
                            </select>
                        </div>

                        <div className="flex-1 flex-col gap-1">
                            <p>Education</p>
                            <input type="text" placeholder="Degree" className="border rounded px-3 py-2 w-full" id="" required onChange={(e) => setDegree(e.target.value)} value={degree} />
                        </div>

                        <div className="flex-1 flex-col gap-1">
                            <p>Address</p>
                            <input type="text" placeholder="Address 1" id="" required className="border rounded px-3 py-2 w-full" onChange={(e) => setAddress1(e.target.value)} value={address1} />
                            <input type="text" placeholder="Address 2" id="" required className="border rounded px-3 py-2 mt-2 w-full" onChange={(e) => setAddress2(e.target.value)} value={address2} />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mt-4 mb-2">About Doctor</p>
                    <textarea name="" className="w-full px-4 pt-2 border rounded resize-none text-gray-600" id="" placeholder="Write about doctor..." rows="5" required onChange={(e) => setAbout(e.target.value)} value={about}></textarea>
                </div>

                <button type="submit" className="bg-primary text-white rounded-full px-10 py-3 mt-4">Add Doctor</button>

            </div>
        </form>
    );
};

export default AddDoctor;