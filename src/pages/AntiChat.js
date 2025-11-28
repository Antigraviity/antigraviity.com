import React from 'react';
import ProductPage from '../components/ProductPage';

const AntiChat = () => {
  const data = {
    title: "AntiChat",
    subtitle: "Enterprise Communication Platform",
    description: "Secure, feature-rich communication platform for teams. Real-time messaging, video conferencing, file sharing, and seamless collaboration tools.",
    icon: "▣",
    gradient: "from-indigo-500/30 to-blue-500/20",
    comingSoonDate: "Q4 2025",
    features: [
      { icon: "◈", title: "Real-time Messaging", description: "Instant messaging with threads, reactions, and rich media support." },
      { icon: "◇", title: "Video Conferencing", description: "HD video calls with screen sharing, virtual backgrounds, and recording." },
      { icon: "○", title: "File Sharing", description: "Secure file sharing with version control and collaborative editing." },
      { icon: "△", title: "Channels & Groups", description: "Organized channels for teams, projects, and topics with access controls." },
      { icon: "□", title: "Integration Hub", description: "Connect with 100+ business tools including CRM, project management, and more." },
      { icon: "◎", title: "Enterprise Security", description: "End-to-end encryption, SSO, compliance, and admin controls." }
    ]
  };

  return <ProductPage {...data} />;
};

export default AntiChat;
