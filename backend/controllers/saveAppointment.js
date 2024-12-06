import { google } from 'googleapis';

const saveToCalendar = async (req, res) => {
    const { appointment } = req.body; // Assuming appointment is passed in the request body.

    // Map the appointment fields to the event structure
    const event = {
        summary: `Appointment with Dr. ${appointment.docData.name}`, // Assuming `docData` contains the doctor's name.
        description: `Patient: ${appointment.userData.name}\nAmount: ${appointment.amount}\nPayment Status: ${appointment.payment ? "Paid" : "Pending"
            }`,
        start: {
            dateTime: new Date(`${appointment.slotDate}T${appointment.slotTime}`).toISOString(), // Combining date and time.
            timeZone: 'UTC',
        },
        end: {
            dateTime: new Date(
                new Date(`${appointment.slotDate}T${appointment.slotTime}`).getTime() + 30 * 60 * 1000 // Assuming the appointment duration is 30 minutes.
            ).toISOString(),
            timeZone: 'UTC',
        },
    };

    try {
        // Generate a Google Calendar URL
        const queryParams = new URLSearchParams({
            action: 'TEMPLATE',
            text: event.summary,
            dates: `${event.start.dateTime.replace(/-|:|\./g, '')}/${event.end.dateTime.replace(/-|:|\./g, '')}`,
            details: event.description,
            location: appointment.docData.address.line1 || '', // Assuming `docData` contains a `location` field.
        });

        const calendarLink = `https://calendar.google.com/calendar/render?${queryParams.toString()}`;
        res.json({ success: true, calendarLink });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default saveToCalendar;