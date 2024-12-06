import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from 'axios';
import Loader from "../components/Loader";

const Login = () => {

    const [state, setState] = useState('Log In');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const { backendUrl, setToken } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

                if (data.success) {
                    toast.success(data.message);

                    // set token to local storage
                    localStorage.setItem('token', data.token);
                    setToken(data.token);

                    setLoading(false);
                } else {
                    toast.error(data.message);
                    setLoading(false);
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

                if (data.success) {
                    toast.success(data.message);
                    setToken(data.token);

                    // set token to local storage
                    localStorage.setItem('token', data.token);
                    setLoading(false);

                } else {
                    toast.error(data.message);
                    setLoading(false);
                }
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        /* Set the pages name to Medizone | Login */
        document.title = `Medizone | ${state}`;
    }, [state]);

    if (loading) {
        return <Loader text={`${state === 'Sign Up' ? 'Creating Account...' : 'Signing In...'}`} />
    }

    return (
        <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
                <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book appointment</p>

                {
                    state === 'Sign Up' &&
                    <div className="w-full">
                        <p>Full Name</p>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border border-zinc-300 rounded w-full p-2 mt-1" />
                    </div>
                }

                <div className="w-full">
                    <p>Email</p>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border border-zinc-300 rounded w-full p-2 mt-1" />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border border-zinc-300 rounded w-full p-2 mt-1" />
                </div>

                <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>

                {
                    state === 'Sign Up'
                        ? <p onClick={() => setState('login')}>Already have an account? <span className="text-primary underline cursor-pointer">Login here</span></p>
                        : <p onClick={() => setState('Sign Up')}>Don&apos;t have an account? <span className="text-primary underline cursor-pointer">Sign up here</span></p>
                }

            </div>
        </form>
    );
};

export default Login;