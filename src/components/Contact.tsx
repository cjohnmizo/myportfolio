"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { config } from "@/data/config";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 4000);
    };

    return (
        <section id="contact" className="py-24 md:py-32 relative bg-[var(--bg-secondary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-subtitle mb-4 block">Contact</span>
                        <h2 className="section-heading mb-6">
                            Let&apos;s <span className="accent">Talk</span>
                        </h2>

                        <p className="text-[var(--fg-secondary)] mb-10 max-w-lg leading-relaxed">
                            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring your ideas to life.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <a
                                href={`mailto:${config.contact.email}`}
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--fg-muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-all">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-widest mb-0.5">
                                        Email
                                    </div>
                                    <div className="text-[var(--fg)] font-medium">
                                        {config.contact.email}
                                    </div>
                                </div>
                            </a>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--fg-muted)]">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-widest mb-0.5">
                                        Location
                                    </div>
                                    <div className="text-[var(--fg)] font-medium">
                                        {config.contact.address}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="mt-12 pt-6 border-t border-[var(--divider)] flex gap-3">
                            {config.profile.socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--fg-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="glass-card p-8 md:p-10">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-4">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--fg)] mb-2">Message Sent!</h3>
                                    <p className="text-[var(--fg-secondary)]">I&apos;ll get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[var(--fg-muted)] uppercase tracking-widest mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[var(--fg-muted)] uppercase tracking-widest mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[var(--fg-muted)] uppercase tracking-widest mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="form-input resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            <>
                                                Send Message
                                                <ArrowRight size={16} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
