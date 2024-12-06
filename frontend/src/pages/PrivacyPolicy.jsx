import { useEffect } from "react";

const PrivacyPolicy = () => {

    const today = new Date();
    const now = new Date(today).toLocaleDateString();

    useEffect(() => {
        document.title = "Privacy Policy - Medizone";
    }, []);

    return (
        <div className="privacy-policy p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p>Last Updated: {now}</p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p>
                    Welcome to Medizone. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines our practices for collecting, using, and safeguarding your information.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
                <p>We may collect personal information from you when you register, book appointments, or contact us. This information may include:</p>
                <ul className="list-disc pl-6">
                    <li>Name, email address, and phone number</li>
                    <li>Appointment history and preferences</li>
                    <li>Payment information (for billing purposes)</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul className="list-disc pl-6">
                    <li>Facilitate doctor appointments and communicate with you</li>
                    <li>Personalize your experience on our platform</li>
                    <li>Process payments and billing</li>
                    <li>Improve our site and services</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Information Sharing and Disclosure</h2>
                <p>We do not share your personal information with third parties except in the following cases:</p>
                <ul className="list-disc pl-6">
                    <li>With your consent</li>
                    <li>For processing payments via secure payment providers</li>
                    <li>To comply with legal obligations or protect our rights</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
                <p>
                    We implement industry-standard security measures to protect your personal data. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
                <p>
                    You have the right to access, update, or delete your personal information. If you have any questions or need assistance, please <a href="/contact" className="underline text-primary">contact us</a>
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy periodically. We encourage you to review this policy regularly to stay informed about how we protect your data.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy, please <a href="/contact" className="underline text-primary">contact us</a>.</p>
            </section>
        </div>
    )
};

export default PrivacyPolicy;