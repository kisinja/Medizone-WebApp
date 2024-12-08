import { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

    const [state, setState] = useState('Admin');

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

                if (data.success) {

                    // store token in local storage
                    localStorage.setItem('aToken', data.token);

                    setAToken(data.token);
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });

                if (data.success) {

                    // store token in local storage
                    localStorage.setItem('dToken', data.token);

                    // store doctor data in local storage
                    localStorage.setItem('currentDoctor', JSON.stringify(data.doctor));

                    setDToken(data.token);
                    toast.success(data.message);
                    console.log(data);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader text="Signing in please wait..." />
    }

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>

                <div className='w-full'>
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className='border border-[#DADADA] rounded p-2 mt-1 w-full'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className='border border-[#DADADA] rounded p-2 mt-1 w-full'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>

                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span onClick={() => setState("Doctor")} className='cursor-pointer text-primary underline'>Click here</span> </p>
                        : <p>Admin Login? <span onClick={() => setState("Admin")} className='cursor-pointer text-primary underline'>Click here</span> </p>
                }
            </div>
        </form>
    );
};

export default Login;