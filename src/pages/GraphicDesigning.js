import React from 'react';
import ServicePage from '../components/ServicePage';
import usePageTitle from '../hooks/usePageTitle';

const GraphicDesigning = () => {
  usePageTitle('Graphic Designing | AntiGraviity');
  const data = {
    title: "Graphic Designing",
    subtitle: "Visual solutions that communicate",
    description: "We create stunning visual designs that tell your brand story and captivate your audience. From logos to complete brand identities, we bring creativity and strategy together.",
    icon: "◎",
    gradient: "from-pink-500/20 to-rose-500/10",
    gradientColors: {
      primary: "rgba(236, 72, 153, 0.18)",
      primaryLight: "rgba(236, 72, 153, 0.08)",
      secondary: "rgba(244, 63, 94, 0.04)",
      secondaryLight: "rgba(244, 63, 94, 0.15)",
      glow: "rgba(251, 113, 133, 0.25)",
      glowLight: "rgba(244, 63, 94, 0.12)"
    },
    features: [
      { icon: "◈", title: "Brand Identity", description: "Complete brand systems including logos, colors, typography, and guidelines." },
      { icon: "◇", title: "UI/UX Design", description: "User-centered interface designs that are both beautiful and functional." },
      { icon: "○", title: "Print Design", description: "Brochures, business cards, packaging, and other print materials." },
      { icon: "△", title: "Social Media Graphics", description: "Eye-catching visuals optimized for social media platforms." },
      { icon: "□", title: "Illustration", description: "Custom illustrations that add personality to your brand." },
      { icon: "◎", title: "Motion Graphics", description: "Animated graphics and videos that bring your brand to life." }
    ],
    process: [
      { title: "Brief", description: "Understanding your brand, audience, and design objectives." },
      { title: "Concept", description: "Exploring creative directions and initial design concepts." },
      { title: "Refine", description: "Iterating on designs based on your feedback." },
      { title: "Deliver", description: "Providing final files in all required formats." }
    ],
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Sketch", "After Effects", "Premiere Pro", "Canva", "Procreate", "Blender", "Cinema 4D", "CorelDRAW"]
  };

  return <ServicePage {...data} />;
};

export default GraphicDesigning;
