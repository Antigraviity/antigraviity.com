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
    fieldName
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
        <div ref={dropdownRef} className="relative">
            {/* Select Button */}
            <button
                type="button"
                onClick={handleToggle}
                className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-left text-sm focus:outline-none transition-all duration-200 flex items-center justify-between ${isActive || isOpen ? 'border-violet-500/50 bg-white/[0.05]' : 'border-white/[0.08]'
                    } ${!hasValue ? 'text-white/30' : 'text-white'}`}
            >
                <span>{selectedLabel || placeholder}</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 backdrop-blur-xl overflow-hidden z-50 shadow-2xl">
                    <div
                        className="max-h-60 overflow-y-auto"
                        style={{
                            background: 'rgba(10, 10, 10, 0.95)',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                    >
                        {options.map((option, index) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`w-full px-4 py-3 text-left text-sm transition-all duration-150 ${option.value === value
                                        ? 'bg-gradient-to-r from-violet-500/20 to-violet-500/10 text-white'
                                        : option.value === ''
                                            ? 'text-white/40 hover:bg-white/5 hover:text-white/60'
                                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                                    } ${index !== options.length - 1 ? 'border-b border-white/5' : ''}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Focus glow effect */}
            {(isActive || isOpen) && (
                <div className="absolute inset-0 rounded-xl bg-violet-500/5 pointer-events-none" />
            )}
        </div>
    );
};

export default CustomSelect;
