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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-strong rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          // Placeholder avatar with initials
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
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
