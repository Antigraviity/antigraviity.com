import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    options,
    placeholder,
    activeField,
    fieldName,
    isLightTheme = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const selected = options.find(opt => opt.value === value);
        setSelectedLabel(selected ? selected.label : '');
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                if (onBlur) onBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onBlur]);

    const handleToggle = () => {
        if (!isOpen && onFocus) onFocus();
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onChange({ target: { name, value: option.value } });
        setIsOpen(false);
        if (onBlur) onBlur();
    };

    const isActive = activeField === fieldName;
    const hasValue = value && value !== '';

    return (
        <div ref={dropdownRef} className="relative group rounded-xl">
            {/* Select Button */}
            <button
                type="button"
                onClick={handleToggle}
                className={`w-full px-6 py-4 rounded-xl text-left text-sm focus:outline-none transition-all duration-300 flex items-center justify-between ${isLightTheme
                    ? `bg-gray-50/50 border border-gray-100 ${isOpen ? 'bg-white border-black ring-1 ring-black/5 shadow-sm' : ''} ${!hasValue ? 'text-gray-400' : 'text-gray-900 font-medium'}`
                    : `bg-white/[0.03] border border-white/[0.08] ${isActive || isOpen ? 'border-violet-500/50 bg-white/[0.05]' : ''} ${!hasValue ? 'text-white/30' : 'text-white'}`
                    }`}
            >
                <span>{selectedLabel || placeholder}</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke={isLightTheme ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)"}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={`absolute top-full left-0 right-0 mt-3 rounded-lg border overflow-hidden z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${isLightTheme ? 'bg-white border-gray-100' : 'bg-[#0a0a0a] border-white/10 backdrop-blur-xl'
                    }`}>
                    <div className="max-h-60 overflow-y-auto">
                        {options.map((option, index) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`w-full px-7 py-4 text-left text-sm transition-all duration-150 ${option.value === value
                                    ? (isLightTheme ? 'bg-gray-50 text-black font-bold' : 'bg-gradient-to-r from-violet-500/20 to-violet-500/10 text-white')
                                    : (isLightTheme
                                        ? 'text-gray-400 hover:bg-gray-50 hover:text-black'
                                        : 'text-white/70 hover:bg-white/5 hover:text-white')
                                    } ${index !== options.length - 1 ? (isLightTheme ? 'border-b border-gray-50' : 'border-b border-white/5') : ''}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Focus line effect for light theme */}
            {isLightTheme && (
                <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-black transition-transform duration-500 pointer-events-none ${isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            )}

            {!isLightTheme && (isActive || isOpen) && (
                <div className="absolute inset-0 rounded-xl bg-violet-500/5 pointer-events-none" />
            )}
        </div>
    );
};

export default CustomSelect;
