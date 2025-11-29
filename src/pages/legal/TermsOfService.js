import React from 'react';
import LegalLayout from '../../components/LegalLayout';

const TermsOfService = () => {
    return (
        <LegalLayout title="Terms of Service" lastUpdated="November 29, 2025">
            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using the website and services of AntiGraviity Technologies ("Company", "we", "us", or "our"), you agree to comply with and be bound by these Terms of Service.
                    If you do not agree to these terms, please do not use our services.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">2. Services</h2>
                <p>
                    AntiGraviity Technologies provides digital solutions including but not limited to web development, app development, digital marketing, and SaaS products (AntiMage CRM, AntiHRMS, etc.).
                    We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">3. User Accounts</h2>
                <p>
                    To access certain features of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and password.
                    You agree to accept responsibility for all activities that occur under your account.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">4. Intellectual Property</h2>
                <p>
                    The content, organization, graphics, design, compilation, and other matters related to our services are protected under applicable copyrights, trademarks, and other proprietary rights.
                    The copying, redistribution, use, or publication by you of any such matters or any part of the services is strictly prohibited.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">5. Limitation of Liability</h2>
                <p>
                    In no event shall AntiGraviity Technologies be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our services.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">6. Governing Law</h2>
                <p>
                    These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
            </section>
        </LegalLayout>
    );
};

export default TermsOfService;
