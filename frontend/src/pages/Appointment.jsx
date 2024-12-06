import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdInfo } from 'react-icons/md';
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import verifIcon from '../assets/assets/assets_frontend/verified_icon.svg';

const Appointment = () => {

    const { docId } = useParams();
    const { doctors } = useContext(AppContext);
    const { currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

    const [doctor, setDoctor] = useState(null);
    const [relatedDoctors, setRelatedDoctors] = useState([]);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchDocInfo = () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDoctor(docInfo);
    };

    const fetchRelatedDoctors = () => {
        if (doctor) {
            const relatedDocs = doctors.filter((doc) => doc.speciality === doctor.speciality && doc._id !== doctor._id);
            setRelatedDoctors(relatedDocs);
        }
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);

        /* getting current date */
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            // getting date with index
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            /* setting end time of the date with index */
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            // setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "-" + month + "-" + year;
                const slotTime = formattedTime;

                const isSlotAvailable = doctor.slotsBooked[slotDate] && doctor.slotsBooked[slotDate].includes(slotTime) ? false : true;

                if (isSlotAvailable) {
                    // add slot to array
                    timeSlots.push({
                        dateTime: new Date(currentDate),
                        time: formattedTime
                    });
                }

                // increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]));
        }
    };

    const bookAppointment = async () => {
        setLoading(true);
        try {

            const date = docSlots[slotIndex][0].dateTime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + "-" + month + "-" + year;

            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                setLoading(false);
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Medizone | Book Appointment";
    }, []);

    useEffect(() => {
        fetchDocInfo();
    }, [docId, doctors]);

    useEffect(() => {
        getAvailableSlots();
    }, [doctor]);

    useEffect(() => {
        fetchRelatedDoctors();
    }, [doctor]);

    if (loading) {
        return <Loader text="Booking Appointment..." />
    }

    return doctor && (
        <div>

            <center className="mb-5">
                <h1 className="text-gray-800 text-2xl">Appointment Booking</h1>
            </center>

            {/* Doctor Details */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div>
                    <img src={doctor.image} className="w-[200px] object-cover bg-primary sm:max-w-72 rounded-lg" alt="" />
                </div>

                <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-3 sm:mx-0 mt-[-80px] sm:mt-0">
                    {/* Doctor information */}
                    <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{doctor.name}
                        <img src={verifIcon} alt="" />
                    </p>

                    <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                        <p>{doctor.degree} - {doctor.speciality}</p>
                        <button className="py-0.5 px-2 border text-xs rounded-full">{doctor.experience}</button>
                    </div>

                    {/* Doctor About */}
                    <div className="">
                        <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About <MdInfo /> </p>
                        <p className="text-sm text-gray-500 max-w-[700px] mt-1">{doctor.about}</p>
                    </div>

                    <p className="text-gray-500 font-medium mt-4">Appointment fee: <span className="text-gray-700">{currencySymbol}{doctor.fees}</span></p>
                </div>
            </div>

            {/* Booking slots */}
            <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                <p className="font-semibold">Booking Slots</p>

                <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <div key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-300'}`} onClick={() => setSlotIndex(index)}>
                                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                <p>{item[0] && item[0].dateTime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>

                <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'} `} onClick={() => setSlotTime(item.time)}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6" onClick={bookAppointment}>Book an Appointment</button>
            </div>

            {/* Related Doctors */}
            {/* Display related doctors if available */}

            {relatedDoctors && (
                <section className="py-5 px-8 bg-gray-100">
                    {relatedDoctors.length > 0 && (
                        <div>
                            <p className="font-semibold text-gray-700 mt-10">Related Doctors</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {relatedDoctors.map((item, index) => (
                                    <Link to={`/appointment/${item._id}`} key={index} onClick={scrollTo(0, 0)} >
                                        <div className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                                            <img src={item.image} alt={`${item.name}'s picture`} className="bg-blue-50 " />
                                            <div className="p-4">
                                                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                                    <p>Available</p>
                                                </div>
                                                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                                                <p className="text-gray-600 text-sm">{item.speciality}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

        </div>
    )
}

export default Appointment;