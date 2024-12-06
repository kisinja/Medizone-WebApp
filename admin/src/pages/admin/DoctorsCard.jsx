import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import Loader from '../../components/Loader';

const DoctorsCard = ({ doctor }) => {

    const { changeAvailability } = useContext(AdminContext);

    const { name, image, speciality, available, _id } = doctor;

    return (
        <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
            <img
                src={image || <Loader text="" />}
                alt={`${name}'s profile picture`}
                className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'
            />

            <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{name}</p>
                <p className='text-zinc-600 text-sm'>{speciality}</p>
                <div className='flex items-center gap-2 mt-2 text-sm'>
                    <input type="checkbox" name="" id="" checked={available} onChange={() => changeAvailability(_id)} />
                    <p>Available</p>
                </div>
            </div>
        </div>
    )
}

export default DoctorsCard
