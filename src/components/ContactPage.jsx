import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // GANTI INI DENGAN KREDENSIAL EMAILJS KAMU
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setSubmitStatus('success');
          setIsSubmitting(false);
          e.target.reset();
      }, (error) => {
          console.log(error.text);
          setSubmitStatus('error');
          setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 pointer-events-auto">

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

        {/* Left Side - Text */}
        <div className="w-full md:w-1/2 glass-strong p-8 md:p-12 rounded-[32px] flex flex-col justify-center">
          <div className="section-line mb-6"></div>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-indigo-400 mb-4">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let's build something <span className="gradient-text">together.</span>
          </h1>
          <p className="font-body text-base text-white/60 leading-relaxed mb-10">
            Have a project in mind, a freelance opportunity, or just want to say hi?
            I'm currently open for new opportunities and would love to hear from you.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <p className="text-xs text-white/40 font-body uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:iqbalfahrozi42@gmail.com" className="text-white hover:text-indigo-400 transition-colors font-medium">
                  iqbalfahrozi42@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <p className="text-xs text-white/40 font-body uppercase tracking-wider mb-1">Location</p>
                <p className="text-white font-medium">Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form/Socials */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">

          {/* Social Links Card */}
          <div className="glass-strong p-8 rounded-[32px]">
            <h3 className="font-display text-xl font-bold text-white mb-6">Connect with me</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://github.com/iqbalfhrzii" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                <svg className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                <span className="font-body text-sm text-white/80 group-hover:text-white">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/iqbalfhrzi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                <svg className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                <span className="font-body text-sm text-white/80 group-hover:text-white">LinkedIn</span>
              </a>
              <a href="https://instagram.com/iqbalfhrzii" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group col-span-2">
                <svg className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                <span className="font-body text-sm text-white/80 group-hover:text-white">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="glass-strong p-8 rounded-[32px] flex-1 flex flex-col">
            <h3 className="font-display text-xl font-bold text-white mb-6">Drop a message</h3>
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 flex-1">
              <input type="text" name="user_name" placeholder="Your Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-indigo-500/50 transition-colors" />
              <input type="email" name="user_email" placeholder="Your Email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-indigo-500/50 transition-colors" />
              <textarea name="message" placeholder="Your Message" rows="4" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none flex-1"></textarea>
              
              <button type="submit" disabled={isSubmitting} className="cta-btn mt-2 !w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Message ✨'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm font-body mt-2 text-center">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm font-body mt-2 text-center">Failed to send message. Please check your credentials.</p>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
