
const CalendarPopup = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-bold mb-4">Save to Google Calendar</h2>
                <p>Do you want to save this appointment to your Google Calendar?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarPopup;