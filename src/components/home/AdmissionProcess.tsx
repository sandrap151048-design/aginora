"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, UserCheck, GraduationCap, MapPin } from 'lucide-react';

const AdmissionProcess = () => {
  const steps = [
    {
      title: "Inquiry",
      description: "Submit an online inquiry or visit your nearest center for course details and counseling.",
      icon: ClipboardCheck,
      color: "bg-blue-500"
    },
    {
      title: "Consultation",
      description: "Meet our expert mentors for a free one-on-one session to identify the best path for you.",
      icon: UserCheck,
      color: "bg-primary-green"
    },
    {
      title: "Registration",
      description: "Complete the enrollment process and secure your seat in the desired batch.",
      icon: MapPin,
      color: "bg-accent-orange"
    },
    {
      title: "Success",
      description: "Begin your journey towards your dream career with our expert guidance and resources.",
      icon: GraduationCap,
      color: "bg-dark"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-dark">How to Get Started?</h2>
          <p className="text-xl text-slate-500 font-medium">Follow these simple steps to join the community of 12,000+ successful students.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className={`w-20 h-20 ${step.color} text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-slate-200 rotate-3 group-hover:rotate-0 transition-transform`}>
                  <step.icon size={36} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-dark">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed px-4">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcess;
