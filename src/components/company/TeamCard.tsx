'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { TeamMember } from '@/data/companyData';
import { CheckCircle2 } from 'lucide-react';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  // Determine gradient based on role
  const isFounder = member.role === 'Founder';
  const gradient = isFounder
    ? 'from-primary to-purple-600'
    : 'from-blue-500 to-cyan-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring' }}
      className="relative group h-full"
    >
      {/* Enhanced glassmorphic card with role-specific gradient accent */}
      <div className={`h-full relative p-10 md:p-12 rounded-3xl bg-white/75 backdrop-blur-xl border-2 border-transparent bg-gradient-to-br from-white/90 to-white/70 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2`}>
        {/* Gradient border accent */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`}></div>

        {/* Top corner gradient accent with role color */}
        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-[100px] blur-2xl`}></div>

        <div className="flex flex-col items-center text-center space-y-7 relative z-10">
          {/* Larger Avatar with enhanced gradient ring */}
          {member.image ? (
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              <Image
                src={member.image}
                alt={member.name}
                width={160}
                height={160}
                className="rounded-full relative z-10 ring-4 ring-white/50"
              />
            </div>
          ) : (
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              <div className={`relative z-10 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl ring-4 ring-white/30`}>
                <span className="text-5xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          )}

          {/* Name & Title - Larger and more prominent */}
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{member.name}</h3>
            <p className={`text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{member.title}</p>
          </div>

          {/* Compact Credentials */}
          {member.credentials && member.credentials.length > 0 && (
            <div className="w-full space-y-2.5">
              {member.credentials.map((credential, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center gap-2.5 text-sm text-gray-700 font-medium bg-gradient-to-r ${gradient} bg-opacity-5 rounded-full px-5 py-2.5 border border-gray-200/60`}
                >
                  <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${isFounder ? 'text-primary' : 'text-blue-500'}`} />
                  <span>{credential}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bio - Slightly smaller */}
          <p className="text-sm md:text-base leading-relaxed text-gray-600">
            {member.bio}
          </p>

          {/* Personal Why - MUCH more prominent */}
          {member.personalWhy && (
            <div className={`w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-5 border-2 ${isFounder ? 'border-primary/20' : 'border-blue-500/20'}`}>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10 border ${isFounder ? 'border-primary/30' : 'border-blue-500/30'} mb-4`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${isFounder ? 'text-primary' : 'text-blue-600'}`}>
                  Why This Matters
                </span>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-gray-700 italic text-left">
                "{member.personalWhy}"
              </p>
            </div>
          )}

          {/* Enhanced LinkedIn button */}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r ${gradient} text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105 mt-4`}
            >
              Connect on LinkedIn →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
