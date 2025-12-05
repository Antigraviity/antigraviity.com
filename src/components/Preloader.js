import React, { useEffect, useState } from 'react';
import LogoAnimation from './LogoAnimation';

const Preloader = ({ isLoading }) => {
    const [show, setShow] = useState(true);
    const [fullyHidden, setFullyHidden] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setFullyHidden(false);
            setShow(true);
        } else {
            // Fade out
            setShow(false);
            const timer = setTimeout(() => {
                setFullyHidden(true);
            }, 800); // Wait for transition to finish
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (fullyHidden) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="transform scale-75 md:scale-100">
                {/* Simple pulse animation for preloader specifically if not using full animation, but user asked for nice one so let's reuse LogoAnimation or a simpler version */}
                <LogoAnimation size="medium" />
            </div>
        </div>
    );
};

export default Preloader;
