import React from 'react';
import ServicePage from '../components/ServicePage';
import usePageTitle from '../hooks/usePageTitle';

const ThreeDServices = () => {
  usePageTitle('3D Services | AntiGraviity');
  const data = {
    title: "3D Services",
    subtitle: "Immersive visual experiences",
    description: "We create stunning 3D content that brings your ideas to life. From product visualization to interactive WebGL experiences, we push the boundaries of digital creativity.",
    icon: "△",
    gradient: "from-purple-500/20 to-violet-500/10",
    gradientColors: {
      primary: "rgba(168, 85, 247, 0.18)",
      primaryLight: "rgba(168, 85, 247, 0.08)",
      secondary: "rgba(139, 92, 246, 0.04)",
      secondaryLight: "rgba(139, 92, 246, 0.15)",
      glow: "rgba(167, 139, 250, 0.25)",
      glowLight: "rgba(139, 92, 246, 0.12)"
    },
    features: [
      { icon: "◈", title: "3D Modeling", description: "High-quality 3D models for products, characters, and environments." },
      { icon: "◇", title: "Product Visualization", description: "Photorealistic renders that showcase your products beautifully." },
      { icon: "○", title: "Architectural Rendering", description: "Stunning visualizations for real estate and architecture projects." },
      { icon: "△", title: "3D Animation", description: "Captivating animations that tell your story in motion." },
      { icon: "□", title: "WebGL Experiences", description: "Interactive 3D experiences that run directly in web browsers." },
      { icon: "◎", title: "AR/VR Content", description: "Immersive augmented and virtual reality experiences." }
    ],
    process: [
      { title: "Concept", description: "Understanding your vision and defining the 3D project scope." },
      { title: "Model", description: "Creating detailed 3D models with precision and accuracy." },
      { title: "Texture", description: "Applying realistic materials, textures, and lighting." },
      { title: "Render", description: "Producing final high-quality renders or interactive experiences." }
    ],
    technologies: ["Blender", "Cinema 4D", "Maya", "3ds Max", "ZBrush", "Substance Painter", "Three.js", "WebGL", "Unity", "Unreal Engine", "V-Ray", "Octane Render"]
  };

  return <ServicePage {...data} />;
};

export default ThreeDServices;
