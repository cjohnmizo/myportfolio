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
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    from_name: "Portfolio Contact Form",
                    subject: `New message from ${formData.name}`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch {
            setError("Failed to send. Please email me directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-16 sm:py-24 md:py-32 relative">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[180px] opacity-[0.05]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent-secondary)] rounded-full blur-[150px] opacity-[0.06]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
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

                        <p className="text-[var(--fg-secondary)] mb-10 max-w-lg leading-relaxed text-lg font-medium">
                            Have a project in mind, or just want to say hi? I&apos;d love to hear about it. Let&apos;s build something amazing together!
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <a
                                href={`mailto:${config.contact.email}`}
                                className="clay-card p-4 flex items-center gap-4 group hover:border-[var(--accent)] transition-colors"
                            >
                                <div className="w-12 h-12 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wide mb-0.5">
                                        Email
                                    </div>
                                    <div className="text-[var(--fg)] font-medium text-sm">
                                        {config.contact.email}
                                    </div>
                                </div>
                            </a>

                            <div className="clay-card p-4 flex items-center gap-4">
                                <div className="w-12 h-12 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wide mb-0.5">
                                        Location
                                    </div>
                                    <div className="text-[var(--fg)] font-medium text-sm">
                                        {config.contact.address}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="mt-8 pt-6 border-t border-[var(--card-border)] flex gap-3">
                            {config.profile.socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 border border-[var(--card-border)] flex items-center justify-center text-[var(--fg-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
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
                        <div className="clay-card p-6 sm:p-10">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 border border-emerald-500 flex items-center justify-center text-emerald-500 mx-auto mb-4">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--fg)] mb-2">Message Sent!</h3>
                                    <p className="text-[var(--fg-secondary)] text-sm">I&apos;ll get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wide mb-2">
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
                                        <label className="block text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wide mb-2">
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
                                        <label className="block text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wide mb-2">
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
                                        className="clay-btn w-full justify-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>

                                    {error && (
                                        <p className="text-xs text-red-500 text-center mt-3 font-medium border border-red-500/50 bg-red-500/5 p-2">
                                            {error}
                                        </p>
                                    )}
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
