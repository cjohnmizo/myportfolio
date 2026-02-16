"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Code2 } from "lucide-react";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "SENT">("IDLE");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("SENDING");
        // Simulate form submission
        setTimeout(() => {
            console.log("Form submitted:", formData);
            setStatus("SENT");
            setTimeout(() => setStatus("IDLE"), 3000);
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden font-mono">
            {/* Background Matrix Rain Effect Placeholder (Static Grid for now) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block border border-[var(--primary)] px-4 py-1 mb-4 text-[var(--primary)] text-sm tracking-widest bg-[var(--primary)]/10">
                        SYSTEM_STATUS: LISTENING
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        ESTABLISH_<span className="text-[var(--primary)]">UPLINK</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        // INITIATE_ENCRYPTED_TRANSMISSION<br />
                        // AWAITING_PACKET_DATA...
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-black border border-[var(--primary)]/50 p-6 md:p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary)]/50" />
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-[var(--primary)]" />
                            Target_Coordinates
                        </h3>

                        <div className="space-y-8">
                            <div className="group">
                                <h4 className="text-[var(--secondary)] text-xs mb-1 uppercase tracking-wider">Communication_Channel_01</h4>
                                <div className="flex items-center gap-4 text-gray-300 group-hover:text-[var(--primary)] transition-colors">
                                    <Mail className="w-5 h-5" />
                                    <a href="mailto:johnchangsan39@gmail.com" className="hover:underline decoration-[var(--primary)]">johnchangsan39@gmail.com</a>
                                </div>
                            </div>

                            <div className="group">
                                <h4 className="text-[var(--secondary)] text-xs mb-1 uppercase tracking-wider">Social_Feeds</h4>
                                <div className="flex flex-col gap-3 ml-1 border-l border-[var(--primary)]/30 pl-4 py-1">
                                    <a href="https://www.instagram.com/c.john_mizo/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] flex items-center gap-2 text-sm transition-colors">
                                        &gt; Instagram_Feed
                                    </a>
                                    <a href="https://www.facebook.com/john.changsan.9" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] flex items-center gap-2 text-sm transition-colors">
                                        &gt; Facebook_Stream
                                    </a>
                                </div>
                            </div>

                            <div className="group">
                                <h4 className="text-[var(--secondary)] text-xs mb-1 uppercase tracking-wider">Physical_Location</h4>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <MapPin className="w-5 h-5 text-[var(--secondary)]" />
                                    <span>Khawlian, Saitual Mizoram, 796261</span>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-[var(--primary)]/5 border border-[var(--primary)]/20 text-xs text-[var(--primary)] leading-relaxed">
                                <span className="animate-blink">_</span> STATUS: OPEN_TO_OPPORTUNITIES<br />
                                CAPABILITY: FREELANCE / FULL_TIME<br />
                                LATENCY: LOW
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 relative">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold text-[var(--primary)] mb-2 uppercase tracking-wider">
                                    &gt; Enter_Identity_String
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border-b-2 border-[var(--primary)]/50 focus:border-[var(--primary)] px-4 py-3 text-white placeholder-gray-700 outline-none transition-colors"
                                    placeholder="USER_NAME"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-[var(--primary)] mb-2 uppercase tracking-wider">
                                    &gt; Return_Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border-b-2 border-[var(--primary)]/50 focus:border-[var(--primary)] px-4 py-3 text-white placeholder-gray-700 outline-none transition-colors"
                                    placeholder="EMAIL@DOMAIN.COM"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-bold text-[var(--primary)] mb-2 uppercase tracking-wider">
                                    &gt; Payload_Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full bg-black border border-[var(--primary)]/30 focus:border-[var(--primary)] px-4 py-3 text-white placeholder-gray-700 outline-none transition-colors resize-none"
                                    placeholder="ENTER_DATA..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status !== "IDLE"}
                                className="w-full py-4 border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {status === "IDLE" && <>TRANSMIT_DATA <Send className="w-4 h-4" /></>}
                                    {status === "SENDING" && <>TRANSMITTING...</>}
                                    {status === "SENT" && <>TRANSMISSION_COMPLETE</>}
                                </span>
                                {status === "SENDING" && (
                                    <div className="absolute inset-0 bg-[var(--primary)]/20 animate-pulse" />
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
