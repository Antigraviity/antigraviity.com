import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import CustomSelect from '../components/CustomSelect';

const ContactUs = () => {
  usePageTitle('Contact Us | AntiGraviity');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    service: '',
    message: ''
  });
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Track mouse for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const services = [
    { value: '', label: 'Select a service' },
    { value: 'web', label: 'Web Development' },
    { value: 'app', label: 'App Development' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'design', label: 'Graphic Designing' },
    { value: '3d', label: '3D Services' },
    { value: 'enterprise', label: 'Enterprise Solutions' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: '', label: 'Select budget range' },
    { value: '20k-50k', label: '₹20,000 - ₹50,000' },
    { value: '50k-1L', label: '₹50,000 - ₹1,00,000' },
    { value: '1L-5L', label: '₹1,00,000 - ₹5,00,000' },
    { value: '5L-10L', label: '₹5,00,000 - ₹10,00,000' },
    { value: '10L+', label: '₹10,00,000+' },
    { value: 'discuss', label: "Let's Discuss" }
  ];

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      value: "info@antigraviity.com",
      subtext: "General inquiries",
      gradient: "from-blue-500/20 to-cyan-500/10",
      href: "mailto:info@antigraviity.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Sales Inquiries",
      value: "sales@antigraviity.com",
      subtext: "For business & partnerships",
      gradient: "from-emerald-500/20 to-teal-500/10",
      href: "mailto:sales@antigraviity.com"
    },
    // {
    //   icon: (
    //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    //     </svg>
    //   ),
    //   title: "Direct Contact",
    //   value: "gokul.s@antigraviity.com",
    //   subtext: "Reach out to our founder",
    //   gradient: "from-purple-500/20 to-pink-500/10",
    //   href: "mailto:gokul.s@antigraviity.com"
    // },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      value: "+91 63793 88462",
      subtext: "Mon-Fri, 9am-6pm IST",
      gradient: "from-orange-500/20 to-amber-500/10",
      href: "tel:+916379388462"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Visit Us",
      value: "Chennai, India",
      subtext: "Schedule a meeting",
      gradient: "from-purple-500/20 to-violet-500/10",
      href: "mailto:info@antigraviity.com" // Defaulting to email for visit us for now
    }
  ];

  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on scope and complexity. A typical website takes 4-8 weeks, while complex applications may take 3-6 months."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes! We provide maintenance packages and dedicated support to ensure your digital products stay up-to-date and perform optimally."
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely. We often collaborate with in-house teams, providing expertise where needed while integrating seamlessly with your workflow."
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/20">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-4">Message Sent!</h2>
          <p className="text-white/50 mb-8">
            Thank you for reaching out. We've received your message and will get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', company: '', budget: '', service: '', message: '' });
              }}
              className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors"
            >
              Send Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section with Interactive Gradient */}
      <section ref={heroRef} className="relative py-20 px-6 overflow-hidden">
        {/* Mouse-following gradient */}
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-sm mb-12">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Contact</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div>
              <p className="text-white/30 text-sm mb-4 tracking-wide">— GET IN TOUCH —</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal mb-6 leading-tight">
                Let's build
                <span className="block text-white/40">something amazing</span>
              </h1>
              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg">
                Have a project in mind? We'd love to hear about it. Drop us a message and let's
                turn your vision into reality.
              </p>

              {/* Contact Methods */}
              <div className="space-y-4 mb-10">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center text-white/60 group-hover:text-white/80 transition-colors`}>
                      {method.icon}
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">{method.title}</p>
                      <p className="text-white group-hover:text-white/90 transition-colors">{method.value}</p>
                      <p className="text-white/30 text-xs">{method.subtext}</p>
                    </div>
                    <svg className="w-5 h-5 text-white/20 group-hover:text-white/50 ml-auto transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <p className="text-white/30 text-sm mb-4">Follow us</p>
                <div className="flex gap-3">
                  {[
                    {
                      name: 'LinkedIn',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                      href: '#'
                    },
                    {
                      name: 'Instagram',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      ),
                      href: '#'
                    },
                    {
                      name: 'Facebook',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.657-2.797 2.895v1.085h3.988l-.85 3.667h-3.138v7.98h-5.017z" />
                        </svg>
                      ),
                      href: '#'
                    },
                    {
                      name: 'Twitter',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                      href: '#'
                    }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all hover:scale-110 hover:bg-white/5"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="relative">
              {/* Form glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 rounded-3xl blur-xl opacity-50" />

              <form
                onSubmit={handleSubmit}
                className="relative p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-xl"
              >
                <h3 className="text-2xl text-white mb-2">Start a project</h3>
                <p className="text-white/40 text-sm mb-8">Fill out the form and we'll be in touch soon.</p>

                <div className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                        placeholder="Your name"
                        required
                        className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] ${activeField === 'name' ? 'border-violet-500/50 bg-white/[0.05]' : 'border-white/[0.08]'
                          }`}
                      />
                      {activeField === 'name' && (
                        <div className="absolute inset-0 rounded-xl bg-violet-500/5 pointer-events-none" />
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        placeholder="Email address"
                        required
                        className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] ${activeField === 'email' ? 'border-violet-500/50 bg-white/[0.05]' : 'border-white/[0.08]'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setActiveField('company')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Company name (optional)"
                    className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] ${activeField === 'company' ? 'border-violet-500/50 bg-white/[0.05]' : 'border-white/[0.08]'
                      }`}
                  />

                  {/* Service & Budget Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <CustomSelect
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setActiveField('service')}
                      onBlur={() => setActiveField(null)}
                      options={services}
                      placeholder="Select a service"
                      activeField={activeField}
                      fieldName="service"
                    />
                    <CustomSelect
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      onFocus={() => setActiveField('budget')}
                      onBlur={() => setActiveField(null)}
                      options={budgetRanges}
                      placeholder="Select budget range"
                      activeField={activeField}
                      fieldName="budget"
                    />
                  </div>

                  {/* Message */}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] resize-none ${activeField === 'message' ? 'border-violet-500/50 bg-white/[0.05]' : 'border-white/[0.08]'
                      }`}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className={`transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                      Send Message
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>

                  <p className="text-white/30 text-xs text-center">
                    By submitting, you agree to our{' '}
                    <Link to="/privacy" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Response Section */}
      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-white/30 text-sm mb-4 tracking-wide">— QUICK RESPONSES —</p>
            <h2 className="text-3xl md:text-4xl text-white font-normal">Common Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="text-2xl text-white/10 mb-4 font-bold">0{index + 1}</div>
                <h3 className="text-white mb-3 group-hover:text-white/90 transition-colors">{faq.question}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours / Availability */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Availability Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl blur-xl" />
              <div className="relative p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-black/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-sm font-medium">Currently Available</span>
                </div>

                <h3 className="text-2xl md:text-3xl text-white mb-4">Ready to start your project</h3>
                <p className="text-white/50 mb-8">
                  We're currently accepting new projects. Book a free consultation to discuss your needs.
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.05]">
                    <span className="text-white/50">Response Time</span>
                    <span className="text-white">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.05]">
                    <span className="text-white/50">Project Kickoff</span>
                    <span className="text-white">1-2 weeks</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-white/50">Time Zone</span>
                    <span className="text-white">IST (UTC+5:30)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Call CTA */}
            <div className="text-center lg:text-left">
              <p className="text-white/30 text-sm mb-4 tracking-wide">— PREFER A CALL? —</p>
              <h2 className="text-3xl md:text-4xl text-white font-normal mb-6">
                Schedule a free<br />discovery call
              </h2>
              <p className="text-white/50 mb-8 max-w-md">
                Not sure where to start? Book a 30-minute call with our team to explore how we can help bring your vision to life.
              </p>
              <button
                onClick={() => { }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Call
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white font-normal mb-6">
            Ready to elevate your digital presence?
          </h2>
          <p className="text-white/40 mb-10 max-w-xl mx-auto">
            Join the growing list of businesses that trust AntiGraviity to bring their digital visions to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/916379388462?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Start a Conversation
            </a>
            <Link
              to="/services"
              className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm rounded-full transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
