import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
    const { token, backendUrl, getDoctorsData } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const navigate = useNavigate();

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("-");
        return dateArray[0] + "th " + months[Number(dateArray[1])] + " " + dateArray[2];
    };

    const fetchMyAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/my-appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message?.error);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Medizone | My Appointments";
        fetchMyAppointments();
    }, []);

    const cancelAppointment = async (appointmentId) => {
        setCancelLoading(true);

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) {
                toast.success(data.message);
                fetchMyAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setCancelLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!phoneNumber) {
            toast.error("Please enter a valid phone number.");
            return;
        }
        setPaymentLoading(true);

        try {
            const { data } = await axios.post(`${backendUrl}/api/mpesa/stk-push`, { phone: phoneNumber, amount: selectedAppointment.amount });
            if (data.success) {
                toast.success("Payment Initiated. Please follow the instructions sent to your phone.");
                fetchMyAppointments();
                console.log(data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setPaymentLoading(false);
            setShowModal(false);
        }
    };

    if (loading) {
        return <Loader text="Loading Appointments..." />;
    } else if (cancelLoading) {
        return <Loader text="Cancelling Appointment..." />;
    } else if (paymentLoading) {
        return <Loader text="Processing Payment..." />;
    }

    return (
        <div>
            <div className="flex w-full justify-between items-center mt-12 border-b font-medium text-zinc-700 pb-3">
                <h1>My Appointments</h1>
                <span className="text-sm bg-blue-500 text-white p-1 rounded">
                    {appointments.length > 1 ? `${appointments.length} appointments due` : `${appointments.length} appointment due`}
                </span>
            </div>

            {appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 bg-gray-100 shadow rounded-lg mt-5 space-y-2">
                    <img src="https://i.pinimg.com/236x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg" alt="Empty" className="w-[200px] h-[150px] object-cover" />
                    <p className="text-zinc-700 text-center text-lg">You have no Booked appointments!!</p>
                    <button
                        className="text-sm hover:text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-primary text-white transition-all duration-300 hover:bg-transparent hover:shadow-lg"
                        onClick={() => navigate("/doctors")}
                    >
                        Book Appointment
                    </button>
                </div>
            ) : (
                <div>
                    {appointments.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b hover:shadow-lg transition-all duration-100 px-2 rounded-lg">
                            <div>
                                <img src={item.docData.image} alt="" className="w-32 h-full object-cover bg-indigo-50" />
                            </div>
                            <div className="flex-1 text-lg text-zinc-600">
                                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                                <p>{item.docData.speciality}</p>
                                <p className="text-zinc-700 font-medium mt-1">Address: </p>
                                <ul className="pl-3 list-disc">
                                    <li className="text-sm">{item.docData.address.line1}</li>
                                    <li className="text-sm">{item.docData.address.line2}</li>
                                </ul>
                                <p className="text-xs mt-1"><span className="text-lg text-neutral-700 font-medium">Date & Time: </span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                            </div>

                            <div className="flex flex-col gap-2 justify-end">
                                {!item.cancelled && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300" onClick={() => cancelAppointment(item._id)}>Cancel Appointment</button>}
                                {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment cancelled</button>}
                                {!item.cancelled && (
                                    <button
                                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all duration-300"
                                        onClick={() => {
                                            setSelectedAppointment(item);
                                            setShowModal(true);
                                        }}
                                    >
                                        Pay with MPESA
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Phone Number */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-semibold">Enter Your Phone Number</h3>
                        <input
                            type="text"
                            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-md"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-md"
                                onClick={handlePayment}
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAppointments;