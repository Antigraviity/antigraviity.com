import React from 'react';
import LegalLayout from '../../components/LegalLayout';

const AcceptableUsePolicy = () => {
    return (
        <LegalLayout title="Acceptable Use Policy" lastUpdated="November 29, 2025">
            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">1. Purpose</h2>
                <p>
                    This Acceptable Use Policy ("AUP") outlines the acceptable use of AntiGraviity Technologies' services and products.
                    This policy is designed to protect our services, our customers, and the internet community from irresponsible or illegal activity.
                </p>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">2. Prohibited Activities</h2>
                <p>
                    You agree not to use our services for any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li><strong>Illegal Activities:</strong> Transmitting, distributing, or storing any material in violation of any applicable law or regulation.</li>
                    <li><strong>Harmful Content:</strong> Distributing content that is defamatory, obscene, abusive, invasive of privacy, or otherwise objectionable.</li>
                    <li><strong>Security Violations:</strong> Attempting to interfere with or compromise the system integrity or security of our services or any other computer system.</li>
                    <li><strong>Spam:</strong> Sending unsolicited bulk email or other messages (spam).</li>
                    <li><strong>Malware:</strong> Distributing viruses, worms, trojan horses, or other malicious code.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">3. AI Product Usage</h2>
                <p>
                    For our AI products (AntiAI, AntiChat), you additionally agree not to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Use the AI to generate content that promotes hate speech, violence, or discrimination.</li>
                    <li>Use the AI to provide medical, legal, or financial advice without proper disclaimers and professional oversight.</li>
                    <li>Attempt to bypass safety filters or restrictions placed on the AI models.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl text-gray-900 font-semibold mb-4">4. Enforcement</h2>
                <p>
                    We reserve the right to investigate any violation of this policy. If we determine that you have violated this AUP, we may remove the offending content,
                    suspend or terminate your access to the services, and/or report the violation to law enforcement authorities.
                </p>
            </section>
        </LegalLayout>
    );
};

export default AcceptableUsePolicy;
