import React from 'react';
import ProductPage from '../components/ProductPage';

const AntiSec = () => {
  const data = {
    title: "AntiSec",
    subtitle: "Enterprise Security Solutions",
    description: "Advanced cybersecurity platform providing comprehensive protection against threats, vulnerability management, and real-time security monitoring for businesses.",
    icon: "⬡",
    gradient: "from-red-500/30 to-orange-500/20",
    comingSoonDate: "Q3 2025",
    features: [
      { icon: "◈", title: "Threat Detection", description: "AI-powered threat detection and real-time alerts for suspicious activities." },
      { icon: "◇", title: "Vulnerability Scanning", description: "Automated scanning of networks, applications, and infrastructure for vulnerabilities." },
      { icon: "○", title: "Firewall Management", description: "Next-generation firewall with deep packet inspection and intrusion prevention." },
      { icon: "△", title: "Endpoint Protection", description: "Comprehensive endpoint security with EDR capabilities and device management." },
      { icon: "□", title: "Security Analytics", description: "Advanced analytics dashboard with threat intelligence and compliance reporting." },
      { icon: "◎", title: "Incident Response", description: "Automated incident response workflows and forensic analysis tools." }
    ]
  };

  return <ProductPage {...data} />;
};

export default AntiSec;
