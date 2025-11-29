import React from 'react';
import ProductPage from '../components/ProductPage';
import usePageTitle from '../hooks/usePageTitle';

const AntimageCRM = () => {
  usePageTitle('AntiMage CRM | AntiGraviity');
  const data = {
    title: "AntiMage CRM",
    subtitle: "Customer Relationship Management",
    description: "A powerful CRM solution designed to manage your customer relationships, sales pipeline, and business growth with AI-powered insights and automation.",
    icon: "◈",
    gradient: "from-yellow-500/30 to-amber-500/20",
    comingSoonDate: "Q2 2025",
    features: [
      { icon: "◈", title: "AI-Powered Insights", description: "Smart analytics and predictions to help you understand customer behavior and close more deals." },
      { icon: "◇", title: "Sales Pipeline", description: "Visual pipeline management with drag-and-drop functionality and automated follow-ups." },
      { icon: "○", title: "Contact Management", description: "Centralized customer database with complete interaction history and notes." },
      { icon: "△", title: "Email Integration", description: "Seamless email sync with templates, tracking, and automated sequences." },
      { icon: "□", title: "Reports & Analytics", description: "Comprehensive dashboards and reports to track team performance and revenue." },
      { icon: "◎", title: "Mobile App", description: "Full-featured mobile app for iOS and Android to manage CRM on the go." }
    ]
  };

  return <ProductPage {...data} />;
};

export default AntimageCRM;
