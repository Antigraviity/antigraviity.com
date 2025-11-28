import React from 'react';
import ServicePage from '../components/ServicePage';

const WebDevelopment = () => {
  const data = {
    title: "Web Development",
    subtitle: "Building the future of the web",
    description: "We create modern, responsive, and high-performance websites that deliver exceptional user experiences. From simple landing pages to complex web applications, we bring your digital vision to life.",
    icon: "◈",
    gradient: "from-blue-500/20 to-indigo-500/10",
    gradientColors: {
      primary: "rgba(59, 130, 246, 0.18)",
      primaryLight: "rgba(59, 130, 246, 0.08)",
      secondary: "rgba(99, 102, 241, 0.04)",
      secondaryLight: "rgba(99, 102, 241, 0.15)",
      glow: "rgba(129, 140, 248, 0.25)",
      glowLight: "rgba(99, 102, 241, 0.12)"
    },
    features: [
      { icon: "◈", title: "Custom Web Applications", description: "Tailored solutions built from scratch to meet your unique business requirements." },
      { icon: "◇", title: "E-commerce Solutions", description: "Powerful online stores with seamless payment integration and inventory management." },
      { icon: "○", title: "Progressive Web Apps", description: "Fast, reliable, and engaging apps that work across all devices and platforms." },
      { icon: "△", title: "CMS Development", description: "Custom content management systems for easy website updates and management." },
      { icon: "□", title: "API Development", description: "Robust and scalable APIs to power your applications and integrations." },
      { icon: "◎", title: "Website Maintenance", description: "Ongoing support, updates, and optimization to keep your site running smoothly." }
    ],
    process: [
      { title: "Discovery", description: "We analyze your requirements, target audience, and business goals." },
      { title: "Design", description: "Creating wireframes and visual designs that align with your brand." },
      { title: "Development", description: "Building your website with clean, efficient, and scalable code." },
      { title: "Launch", description: "Testing, optimization, and deployment of your finished website." }
    ],
    technologies: ["React", "Next.js", "Vue.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "MongoDB", "AWS", "Vercel", "GraphQL", "REST APIs"]
  };

  return <ServicePage {...data} />;
};

export default WebDevelopment;
