import axios from 'axios';
import Appointment from '../models/Appointment.js';

const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;

export const generateAccessToken = async (req, res) => {

    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');

    try {
        const response = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`
                },
            }
        );

        res.json({
            access_token: response.data.access_token,
            success: true
        }).status(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const lipaNaMpesa = async (req, res) => {
    const { phone, amount } = req.body;

    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14);
    const password = Buffer.from(`174379bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919${timestamp}`).toString('base64');

    try {
        const tokenResponse = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );
        const accessToken = tokenResponse.data.access_token;

        const stkResponse = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
                BusinessShortCode: "174379",
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phone,
                PartyB: "174379",
                PhoneNumber: phone,
                CallBackURL: "https://mpesacallback-5xif.onrender.com",
                AccountReference: "Test",
                TransactionDesc: "Test"
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
        );

        res.status(200).json({ stkResponse: stkResponse.data, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const mpesaCallback = async (req, res) => {
    try {
        // Safaricom will send response here after payment process
        const { Body } = req.body; // Contains the payment response

        if (Body.stkCallback.ResultCode === 0) {
            // Payment was successful
            console.log('Payment Successful');
            // For example:
            const { MerchantRequestID, CheckoutRequestID, Amount, PhoneNumber } = Body.stkCallback;

            const appointment = await Appointment.findOne({ checkoutRequestId: CheckoutRequestID });
            if (appointment) {
                appointment.payment = true;
                appointment.mpesaReceiptNumber = Body.stkCallback.CallbackMetadata.Item[1].Value;
                appointment.paymentAmount = Amount;
                appointment.paymentPhoneNumber = PhoneNumber;
            }

            await appointment.save();

            console.log(`Appointment marked as paid: ${appointment._id}`);

            res.status(200).json({ success: true, message: "Payment successful" });
        } else {
            // Payment failed
            console.log('Payment Failed');
            res.status(400).json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};