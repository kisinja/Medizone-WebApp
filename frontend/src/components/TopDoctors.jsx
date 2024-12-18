import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "./Loader";

const TopDoctors = () => {

    const navigate = useNavigate();

    const { doctors, loading } = useContext(AppContext);

    if (loading) {
        return <Loader text="Loading Top Doctors..." />
    }

    return (
        <section className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
            <p className="sm:w-1/3 text-center text-sm text-gray-500">Simply browse through our extensive list of trusted doctors</p>

            {
                doctors.length === 0 ? (
                    <div className="text-center flex justify-center items-center text-lg text-gray-400 mt-3 bg-gray-100 rounded-lg shadow py-6 px-12">
                        Top Doctors not available at the moment!!
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                        {doctors && doctors.slice(0, 8).map((item, index) => (
                            <div key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" onClick={() => navigate(`/appointment/${item._id}`)}>
                                <img src={item.image} alt={`${item.name}'s picture`} className="bg-blue-50 " />
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-600'}`}></p>
                                        <p className={`${item.available ? 'text-green-500' : 'text-red-600'}`}>
                                            {item.available ? 'Available' : 'Not Available'}
                                        </p>
                                    </div>
                                    <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

            <button className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:shadow focus:scale-[.9] transition-transform duration-100" onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}>More</button>
        </section>
    );
};

export default TopDoctors;