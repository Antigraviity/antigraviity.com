import React from 'react';
import ProductPage from '../components/ProductPage';

const AntiHRMS = () => {
  const data = {
    title: "AntiHRMS",
    subtitle: "Human Resource Management System",
    description: "Complete HR management platform for employee management, payroll processing, attendance tracking, leave management, and performance analytics.",
    icon: "◇",
    gradient: "from-purple-500/30 to-pink-500/20",
    comingSoonDate: "Q2 2025",
    features: [
      { icon: "◈", title: "Employee Management", description: "Comprehensive employee profiles with documents, skills, and career history." },
      { icon: "◇", title: "Payroll Processing", description: "Automated payroll calculations with tax compliance and multi-currency support." },
      { icon: "○", title: "Attendance & Time", description: "Biometric integration, geo-fencing, and flexible shift management." },
      { icon: "△", title: "Leave Management", description: "Customizable leave policies with approval workflows and balance tracking." },
      { icon: "□", title: "Performance Reviews", description: "360-degree feedback, goal tracking, and performance improvement plans." },
      { icon: "◎", title: "Recruitment", description: "End-to-end hiring with job postings, applicant tracking, and onboarding." }
    ]
  };

  return <ProductPage {...data} />;
};

export default AntiHRMS;
