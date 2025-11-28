import React from 'react';
import ProductPage from '../components/ProductPage';

const AntiAI = () => {
  const data = {
    title: "AntiAI",
    subtitle: "Enterprise AI Platform",
    description: "Powerful AI platform enabling businesses to build, deploy, and manage custom AI models. From natural language processing to computer vision solutions.",
    icon: "◎",
    gradient: "from-emerald-500/30 to-teal-500/20",
    comingSoonDate: "Q3 2025",
    features: [
      { icon: "◈", title: "Custom AI Models", description: "Build and train custom AI models tailored to your specific business needs." },
      { icon: "◇", title: "NLP Solutions", description: "Natural language processing for chatbots, sentiment analysis, and text extraction." },
      { icon: "○", title: "Computer Vision", description: "Image recognition, object detection, and visual inspection solutions." },
      { icon: "△", title: "Predictive Analytics", description: "Machine learning models for forecasting, recommendations, and optimization." },
      { icon: "□", title: "Model Management", description: "MLOps platform for model versioning, deployment, and monitoring." },
      { icon: "◎", title: "API Integration", description: "Easy-to-use APIs and SDKs for seamless integration with existing systems." }
    ]
  };

  return <ProductPage {...data} />;
};

export default AntiAI;
