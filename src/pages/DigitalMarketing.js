import React from 'react';
import ServicePage from '../components/ServicePage';

const DigitalMarketing = () => {
  const data = {
    title: "Digital Marketing",
    subtitle: "Amplify your digital presence",
    description: "We create data-driven marketing strategies that connect your brand with the right audience. From SEO to social media, we help you grow your online visibility and drive conversions.",
    icon: "○",
    gradient: "from-orange-500/20 to-amber-500/10",
    gradientColors: {
      primary: "rgba(249, 115, 22, 0.18)",
      primaryLight: "rgba(249, 115, 22, 0.08)",
      secondary: "rgba(245, 158, 11, 0.04)",
      secondaryLight: "rgba(245, 158, 11, 0.15)",
      glow: "rgba(251, 191, 36, 0.25)",
      glowLight: "rgba(245, 158, 11, 0.12)"
    },
    features: [
      { icon: "◈", title: "SEO Optimization", description: "Improve your search rankings and drive organic traffic to your website." },
      { icon: "◇", title: "Social Media Marketing", description: "Build brand awareness and engagement across social platforms." },
      { icon: "○", title: "PPC Campaigns", description: "Targeted advertising campaigns that deliver measurable ROI." },
      { icon: "△", title: "Content Marketing", description: "Compelling content that attracts, engages, and converts your audience." },
      { icon: "□", title: "Email Marketing", description: "Personalized email campaigns that nurture leads and drive sales." },
      { icon: "◎", title: "Analytics & Reporting", description: "Data-driven insights to optimize your marketing performance." }
    ],
    process: [
      { title: "Audit", description: "Analyzing your current digital presence and competitive landscape." },
      { title: "Strategy", description: "Developing a customized marketing plan aligned with your goals." },
      { title: "Execute", description: "Implementing campaigns across channels with precision." },
      { title: "Optimize", description: "Continuous monitoring and optimization for maximum impact." }
    ],
    technologies: ["Google Analytics", "Google Ads", "Meta Ads", "SEMrush", "Ahrefs", "HubSpot", "Mailchimp", "Hootsuite", "Canva", "Buffer", "Hotjar", "Search Console"]
  };

  return <ServicePage {...data} />;
};

export default DigitalMarketing;
