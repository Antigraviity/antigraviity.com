import React from 'react';

const ThreeGlobe = () => {
  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000">
      <style>{`
        .globe-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotateGlobe 20s linear infinite;
        }

        .globe-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
        }

        /* Vertical rings */
        .ring-v-1 { width: 100%; height: 100%; transform: translate(-50%, -50%) rotateY(0deg); }
        .ring-v-2 { width: 100%; height: 100%; transform: translate(-50%, -50%) rotateY(30deg); }
        .ring-v-3 { width: 100%; height: 100%; transform: translate(-50%, -50%) rotateY(60deg); }
        .ring-v-4 { width: 100%; height: 100%; transform: translate(-50%, -50%) rotateY(90deg); }
        .ring-v-5 { width: 100%; height: 100%; transform: translate(-50%, -50%) rotateY(120deg); }
        .ring-v-6 { width: 100%; height: 100%; transform: translate(-50%, -50%) rotateY(150deg); }

        /* Horizontal rings */
        .ring-h-1 { width: 100%; height: 100%; transform: translate(-50%, -50%) rotateX(90deg); }
        .ring-h-2 { width: 86%; height: 86%; transform: translate(-50%, -50%) rotateX(90deg) translateZ(25px); }
        .ring-h-3 { width: 86%; height: 86%; transform: translate(-50%, -50%) rotateX(90deg) translateZ(-25px); }
        .ring-h-4 { width: 50%; height: 50%; transform: translate(-50%, -50%) rotateX(90deg) translateZ(43px); }
        .ring-h-5 { width: 50%; height: 50%; transform: translate(-50%, -50%) rotateX(90deg) translateZ(-43px); }

        /* Diamond/Diagonal accents */
        .diamond-accent {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70%;
          height: 70%;
          border: 1px solid rgba(255, 255, 255, 0.25);
          transform: translate(-50%, -50%) rotate(45deg);
        }

        @keyframes rotateGlobe {
          0% { transform: rotateY(0deg) rotateX(20deg); }
          100% { transform: rotateY(360deg) rotateX(20deg); }
        }
      `}</style>

      <div className="globe-container">
        {/* Vertical Longitude Rings */}
        <div className="globe-ring ring-v-1"></div>
        <div className="globe-ring ring-v-2"></div>
        <div className="globe-ring ring-v-3"></div>
        <div className="globe-ring ring-v-4"></div>
        <div className="globe-ring ring-v-5"></div>
        <div className="globe-ring ring-v-6"></div>

        {/* Horizontal Latitude Rings */}
        <div className="globe-ring ring-h-1"></div>

        {/* Diamond Accents to give it that "sketch" feel */}
        <div className="diamond-accent"></div>
        <div className="diamond-accent" style={{ transform: 'translate(-50%, -50%) rotate(45deg) rotateY(90deg)' }}></div>
      </div>
    </div>
  );
};

export default ThreeGlobe;
