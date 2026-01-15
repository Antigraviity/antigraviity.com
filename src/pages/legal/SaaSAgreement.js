import React from 'react';
import LegalLayout from '../../components/LegalLayout';
import usePageTitle from '../../hooks/usePageTitle';

const SaaSAgreement = () => {
    usePageTitle('SaaS Agreement | AntiGraviity');
    return (
        <LegalLayout title="SaaS Agreement" lastUpdated="November 29, 2025">
            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">1. Subscription Grant</h2>
                <p>
                    This SaaS Agreement ("Agreement") is between AntiGraviity Technologies Pvt Ltd and the entity or person agreeing to these terms ("Customer").
                </p>
                <p>
                    Subject to the terms of this Agreement, AntiGraviity Technologies Pvt Ltd grants you a non-exclusive, non-transferable, non-sublicensable right to access and use our SaaS products
                    (including AntiMage CRM, AntiHRMS, AntiSec, AntiAI, and AntiChat) during the Subscription Term for your internal business purposes.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">2. Restrictions</h2>
                <p>
                    You shall not:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Reverse engineer, decompile, or disassemble the Software.</li>
                    <li>Copy, modify, or create derivative works based on the Software.</li>
                    <li>Rent, lease, lend, sell, or sublicense the Software to any third party.</li>
                    <li>Use the Software to build a competitive product or service.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">3. Fees and Payment</h2>
                <p>
                    You agree to pay all fees specified in the Order Form. Fees are non-refundable unless otherwise specifically provided for in this Agreement.
                    We reserve the right to change our fees upon 30 days' notice.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">4. Data Ownership</h2>
                <p>
                    You retain all right, title, and interest in and to your Data. We acquire no right, title, or interest from you under this Agreement in or to your Data,
                    except for the limited right to use such Data as necessary to provide the Services.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">5. Term and Termination</h2>
                <p>
                    This Agreement commences on the date you first accept it and continues until all subscriptions granted in accordance with this Agreement have expired or been terminated.
                </p>
            </section>
        </LegalLayout>
    );
};

export default SaaSAgreement;
