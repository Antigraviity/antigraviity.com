import React from 'react';
import ServicePage from '../components/ServicePage';
import usePageTitle from '../hooks/usePageTitle';

const AppDevelopment = () => {
  usePageTitle('App Development | AntiGraviity');
  const data = {
    title: "App Development",
    subtitle: "Native & cross-platform mobile solutions",
    description: "We build powerful mobile applications for iOS and Android that engage users and drive business growth. Our apps combine beautiful design with robust functionality.",
    icon: "◇",
    gradient: "from-green-500/20 to-emerald-500/10",
    gradientColors: {
      primary: "rgba(34, 197, 94, 0.18)",
      primaryLight: "rgba(34, 197, 94, 0.08)",
      secondary: "rgba(16, 185, 129, 0.04)",
      secondaryLight: "rgba(16, 185, 129, 0.15)",
      glow: "rgba(52, 211, 153, 0.25)",
      glowLight: "rgba(16, 185, 129, 0.12)"
    },
    features: [
      { icon: "◈", title: "iOS Development", description: "Native iOS apps built with Swift for optimal performance on Apple devices." },
      { icon: "◇", title: "Android Development", description: "Native Android apps using Kotlin for the best Android experience." },
      { icon: "○", title: "Cross-Platform Apps", description: "React Native and Flutter apps that work seamlessly on both platforms." },
      { icon: "△", title: "App UI/UX Design", description: "Intuitive and engaging mobile interfaces that users love." },
      { icon: "□", title: "Backend Integration", description: "Robust server-side solutions to power your mobile applications." },
      { icon: "◎", title: "App Maintenance", description: "Continuous updates, bug fixes, and feature enhancements." }
    ],
    process: [
      { title: "Strategy", description: "Defining your app's core features, target users, and success metrics." },
      { title: "Prototype", description: "Creating interactive prototypes to validate the user experience." },
      { title: "Build", description: "Developing your app with clean architecture and best practices." },
      { title: "Deploy", description: "App store submission, launch support, and ongoing maintenance." }
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS Amplify", "Node.js", "GraphQL", "REST APIs", "Push Notifications", "In-App Purchases", "Analytics"]
  };

  return <ServicePage {...data} />;
};

export default AppDevelopment;
