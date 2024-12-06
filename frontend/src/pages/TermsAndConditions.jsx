import { useEffect } from "react";

const TermsAndConditions = () => {

    const today = new Date();
    const now = new Date(today).toLocaleDateString();

    useEffect(() => {
        document.title = "Terms and Conditions - Medizone";
    }, []);

    return (
        <div className="terms-conditions p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
            <p>Last Updated: {now}</p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p>
                    By using Medizone, you agree to these Terms and Conditions. Please read them carefully, and do not use our site if you do not agree to these terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. Services Provided</h2>
                <p>
                    Medizone offers an online platform to book appointments with doctors. We are not responsible for any medical outcomes, as these are provided by independent medical professionals.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
                <p>
                    You agree to provide accurate information when registering and booking appointments. You are responsible for safeguarding your account and must notify us if there is unauthorized use.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Payment and Refund Policy</h2>
                <p>
                    Payments are processed securely. Refunds are subject to our discretion and depend on individual cases. Please contact us if you have questions regarding payments or refunds.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
                <p>
                    All content, trademarks, and logos on this site are the property of Medizone. You may not reproduce or use them without permission.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
                <p>
                    Medizone is not liable for any damages or losses resulting from your use of our site, including interactions with healthcare providers.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
                <p>
                    We reserve the right to terminate or restrict access to our services for any user violating these terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
                <p>
                    We may update these Terms and Conditions at any time. Continued use of our site indicates acceptance of the revised terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, please <a href="/contact" className="underline text-primary">contact us</a>.</p>
            </section>
        </div>
    );
};

export default TermsAndConditions;