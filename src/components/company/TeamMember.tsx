'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Twitter } from 'lucide-react';
import { type TeamMember as TeamMemberType } from '@/data/companyData';

interface TeamMemberProps {
  member: TeamMemberType;
  index: number;
}

const TeamMember = ({ member, index }: TeamMemberProps) => {
  // Define unique gradients for each team member
  const gradients = [
    {
      bg: 'from-purple-600 to-pink-600',
      light: 'from-purple-100 to-pink-100',
      shadow: 'hover:shadow-purple-500/10',
    },
    {
      bg: 'from-blue-600 to-indigo-600',
      light: 'from-blue-100 to-indigo-100',
      shadow: 'hover:shadow-blue-500/10',
    },
    {
      bg: 'from-teal-600 to-cyan-600',
      light: 'from-teal-100 to-cyan-100',
      shadow: 'hover:shadow-teal-500/10',
    },
    {
      bg: 'from-orange-600 to-amber-600',
      light: 'from-orange-100 to-amber-100',
      shadow: 'hover:shadow-orange-500/10',
    },
    {
      bg: 'from-pink-600 to-rose-600',
      light: 'from-pink-100 to-rose-100',
      shadow: 'hover:shadow-pink-500/10',
    },
    {
      bg: 'from-green-600 to-emerald-600',
      light: 'from-green-100 to-emerald-100',
      shadow: 'hover:shadow-green-500/10',
    },
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`glass-strong rounded-3xl overflow-hidden hover:shadow-xl ${gradient.shadow} transition-all duration-300`}
    >
      {/* Image Section */}
      <div className={`relative h-64 bg-gradient-to-br ${gradient.light}`}>
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          // Placeholder avatar with initials
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient.bg}`}>
            <span className="text-6xl font-bold text-white">
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Name & Role */}
        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
        <p className="text-purple-600 font-medium mb-4">{member.role}</p>

        {/* Bio */}
        <p className="text-muted-foreground leading-relaxed mb-6">{member.bio}</p>

        {/* Social Links */}
        {(member.linkedin || member.twitter) && (
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center transition-colors group"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center transition-colors group"
                aria-label={`${member.name} on Twitter`}
              >
                <Twitter className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamMember;
