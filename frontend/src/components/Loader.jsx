
const Loader = ({ text }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-blue border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-primary"></div>
                <h1 className="text-xl font-semibold text-center mt-2">{text}</h1>
            </div>
        </div>
    )
}

export default Loader;