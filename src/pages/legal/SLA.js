import React from 'react';
import LegalLayout from '../../components/LegalLayout';
import usePageTitle from '../../hooks/usePageTitle';

const SLA = () => {
    usePageTitle('Service Level Agreement | AntiGraviity');
    return (
        <LegalLayout title="Service Level Agreement" lastUpdated="November 29, 2025">
            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">1. Service Commitment</h2>
                <p>
                    AntiGraviity Technologies Pvt Ltd is committed to providing a reliable, high-quality service. We guarantee a Monthly Uptime Percentage of at least 99.9% for our SaaS products.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">2. Definitions</h2>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li><strong>"Downtime"</strong> means a period of time where the Service is not available to you.</li>
                    <li><strong>"Monthly Uptime Percentage"</strong> is calculated by subtracting from 100% the percentage of minutes during the month in which the Service was in a state of Downtime.</li>
                    <li><strong>"Service Credit"</strong> means a credit, calculated as set forth below, that we may credit back to an eligible account.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">3. Service Credits</h2>
                <p>
                    If we fail to meet the Service Commitment, you will be eligible to receive a Service Credit as follows:
                </p>
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="py-3 pr-4 text-gray-900 font-semibold">Monthly Uptime Percentage</th>
                                <th className="py-3 text-gray-900 font-semibold">Service Credit Percentage</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr className="border-b border-gray-200">
                                <td className="py-3 pr-4">Less than 99.9% but equal to or greater than 99.0%</td>
                                <td className="py-3">10%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 pr-4">Less than 99.0% but equal to or greater than 95.0%</td>
                                <td className="py-3">25%</td>
                            </tr>
                            <tr>
                                <td className="py-3 pr-4">Less than 95.0%</td>
                                <td className="py-3">50%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl text-white mb-4 mt-8">4. Exclusions</h2>
                <p>
                    The Service Commitment does not apply to any unavailability, suspension or termination of the Service:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Caused by factors outside of our reasonable control (e.g., natural disaster, war, acts of terrorism, riots, government action).</li>
                    <li>That results from any actions or inactions of you or any third party.</li>
                    <li>That results from your equipment, software or other technology.</li>
                    <li>Arising from our suspension and termination of your right to use the Service in accordance with the Agreement.</li>
                </ul>
            </section>
        </LegalLayout>
    );
};

export default SLA;
