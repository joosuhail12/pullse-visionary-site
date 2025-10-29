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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div className="h-full relative p-12 md:p-14 lg:p-16 rounded-3xl bg-white/70 backdrop-blur-md border border-gray-100/40 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] hover:border-gray-200/60 transition-all duration-300 hover:-translate-y-1">
        {/* Gradient Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-bl-full blur-2xl"></div>

        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          {/* Avatar with Gradient Ring */}
          {member.image ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-lg opacity-40"></div>
              <Image
                src={member.image}
                alt={member.name}
                width={140}
                height={140}
                className="rounded-full relative z-10"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-lg opacity-40"></div>
              <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl">
                <span className="text-4xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          )}

          {/* Name & Title */}
          <div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{member.name}</h3>
            <p className="text-base font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{member.title}</p>
          </div>

          {/* Credentials - New */}
          {member.credentials && member.credentials.length > 0 && (
            <div className="w-full space-y-2">
              {member.credentials.map((credential, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700 font-medium bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-full px-4 py-2 border border-primary/10"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{credential}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bio */}
          <p className="text-base leading-relaxed text-gray-700 font-medium">
            {member.bio}
          </p>

          {/* Personal Why - New */}
          {member.personalWhy && (
            <div className="w-full pt-6 border-t border-gray-200/50">
              <h4 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">Why Pullse?</h4>
              <p className="text-sm leading-relaxed text-gray-600 italic">
                "{member.personalWhy}"
              </p>
            </div>
          )}

          {/* Social Links */}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
