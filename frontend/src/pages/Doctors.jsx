import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IoFilterSharp } from "react-icons/io5";

const Doctors = () => {

    const { speciality } = useParams();

    const { doctors } = useContext(AppContext);

    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (speciality) {
            setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
        } else {
            setFilterDoc(doctors);
        }

        /* Set the pages name to Medizone | Doctors */
        document.title = "Medizone | All Doctors";
    }, [doctors, speciality]);

    return (
        <div className="">
            <p className="text-gray-800 text-lg font-semibold">Browse through the doctors specialist.</p>

            <button className={`py-1 px-3 border rounded text-sm transition-all flex gap-2 items-center mt-3 ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(!showFilter)} title="Apply filters">
                <IoFilterSharp className="text-lg" />
                <span>Filters</span>
            </button>

            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

                {/* ------------Filter Menu ----------- */}
                {
                    showFilter && <div className="flex flex-col gap-4 text-sm text-gray-600">
                        <p onClick={() => speciality === "General Physician" ? navigate('/doctors') : navigate(`/doctors/General Physician`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? 'bg-indigo-100 text-black' : ''}`}>General Physician</p>
                        <p onClick={() => speciality === "Gynaecologist" ? navigate('/doctors') : navigate(`/doctors/Gynaecologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynaecologist" ? 'bg-indigo-100 text-black' : ''}`}>Gynaecologist</p>
                        <p onClick={() => speciality === "Dermatologist" ? navigate('/doctors') : navigate(`/doctors/Dermatologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? 'bg-indigo-100 text-black' : ''}`}>Dermatologist</p>
                        <p onClick={() => speciality === "Pediatrician" ? navigate('/doctors') : navigate(`/doctors/Pediatrician`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatrician" ? 'bg-indigo-100 text-black' : ''}`}>Pediatrician</p>
                        <p onClick={() => speciality === "Neurologist" ? navigate('/doctors') : navigate(`/doctors/Neurologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? 'bg-indigo-100 text-black' : ''}`}>Neurologist</p>
                        <p onClick={() => speciality === "Gastroenterologist" ? navigate('/doctors') : navigate(`/doctors/Gastroenterologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? 'bg-indigo-100 text-black' : ''}`}>Gastroenterologist</p>
                    </div>
                }

                <div className="w-full grid grid-cols-auto gap-4">

                    {filterDoc.length === 0 && <div className="text-gray-600 text-lg pt-8 flex justify-center items-center text-center m-auto">No {speciality}s found at the moment !!</div>}

                    {
                        filterDoc && filterDoc.map((item, index) => (
                            <div key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" onClick={() => navigate(`/appointment/${item._id}`)}>
                                <img src={item.image} alt={`${item.name}'s picture`} className="bg-blue-50 " />
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-center">
                                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-600'}`}></p>
                                        <p className={`${item.available ? 'text-green-500' : 'text-red-600'}`}>
                                            {item.available ? 'Available' : 'Not Available'}
                                        </p>
                                    </div>
                                    <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Doctors