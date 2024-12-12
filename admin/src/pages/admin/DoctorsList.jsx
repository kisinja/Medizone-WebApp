import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import DoctorsCard from "../admin/DoctorsCard";
import Loader from '../../components/Loader';

const DoctorsList = () => {

    const { doctors, getAllDoctors, aToken, loading } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    if (loading) {
        return <Loader text="Fetching doctors" />
    }

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className="text-lg font-medium">All Doctors</h1>

            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {doctors && doctors.map((item, index) => (
                    <DoctorsCard key={index} doctor={item} />
                ))}
            </div>
        </div>
    );
};

export default DoctorsList