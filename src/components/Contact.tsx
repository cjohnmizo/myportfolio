"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
        setError("Unable to send right now. Please try again.");
      }
    } catch {
      setError("Network error. Please use direct email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative pb-12">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-eyebrow">Contact</span>
            <h2 className="section-title">Let us build something focused and useful.</h2>
            <p className="section-copy">
              Share your scope, timeline, and goals. I will reply with a practical plan and clear next steps.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${config.contact.email}`}
                className="surface surface-hover flex items-center gap-3 p-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-soft)] text-[var(--accent)]">
                  <Mail size={16} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.08em] text-[var(--muted)]">Email</span>
                  <span className="text-sm font-semibold text-[var(--fg)]">{config.contact.email}</span>
                </span>
              </a>

              <div className="surface flex items-center gap-3 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-soft)] text-[var(--accent)]">
                  <MapPin size={16} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.08em] text-[var(--muted)]">Location</span>
                  <span className="text-sm font-semibold text-[var(--fg)]">{config.contact.address}</span>
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {config.contact.statusOptions.map((status) => (
                <span key={status} className="chip">
                  {status}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="surface p-6 sm:p-7"
          >
            {isSubmitted ? (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-8 text-center">
                <p className="text-sm font-semibold text-[var(--fg)]">Message sent.</p>
                <p className="mt-2 text-sm text-[var(--fg-soft)]">Thanks for reaching out. I will respond soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-control"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-control"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="input-control resize-none"
                    placeholder="Goals, timeline, and current stage"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Sending" : "Send Message"}
                  {!isSubmitting && <ArrowRight size={15} />}
                </button>

                {error && (
                  <p className="rounded-xl border border-red-400/30 bg-red-500/5 px-3 py-2 text-sm text-red-500">{error}</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
