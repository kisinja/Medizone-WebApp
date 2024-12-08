import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const Dashboard = () => {

    const { dashData, dashDataLoading, getDashData, cancelAppointment, aToken } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    if (dashDataLoading) {
        return <Loader text="Loading dashdoard data..." />
    }

    return (
        <section>

        </section>
    )
}

export default Dashboard
