"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Trophy, MapPin } from 'lucide-react';

const stats = [
  { label: 'Success Stories', value: '12,000+', icon: Users, color: 'text-primary-green', bg: 'bg-primary-green/10' },
  { label: 'Expert Mentors', value: '50+', icon: UserCheck, color: 'text-primary-blue', bg: 'bg-primary-blue/10' },
  { label: 'Rank Ratio', value: '98%', icon: Trophy, color: 'text-accent-orange', bg: 'bg-accent-orange/10' },
  { label: 'Strategic Centers', value: '5+', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const Stats = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-secondary-blue/30 border border-slate-50 text-center hover-lift"
            >
              <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <stat.icon size={32} />
              </div>
              <h3 className="text-4xl font-extrabold text-dark mb-2">{stat.value}</h3>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
