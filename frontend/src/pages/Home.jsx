import { useEffect } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";

const Home = () => {

    useEffect(() => {
        /* Set the pages name to Medizone | Home */
        document.title = "Medizone | Home";
    },[]);

    return (
        <div>
            <Header />
            <SpecialityMenu />
            <TopDoctors />
            <Banner />
        </div>
    );
};

export default Home