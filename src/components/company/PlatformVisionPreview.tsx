'use client';

import { motion } from 'framer-motion';
import { Brain, CheckCircle, Clock } from 'lucide-react';
import { platformVision } from '@/data/companyData';

const PlatformVisionPreview = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">{platformVision.headline}</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {platformVision.description}
        </p>
      </motion.div>

      {/* Desktop: Radial Layout with Central Brain */}
      <div className="hidden lg:block">
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Central AI Brain */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute z-20"
          >
            <div className="card-vision p-8 rounded-3xl shadow-2xl">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 animate-glow-pulse">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1">
                    {platformVision.companyBrain.title}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[200px]">
                    {platformVision.companyBrain.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Function Nodes in Circle */}
          {platformVision.functions.map((func, index) => {
            const Icon = func.icon;
            const isCurrent = func.status === 'building';
            const angle = (index / platformVision.functions.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 250;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div key={index}>
                {/* Connecting Line */}
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: isCurrent ? 0.6 : 0.2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: Math.abs(x) + 'px',
                    height: Math.abs(y) + 'px',
                    transform: `translate(${x > 0 ? 0 : x}px, ${y > 0 ? 0 : y}px)`,
                  }}
                >
                  <svg
                    className="absolute inset-0 w-full h-full"
                    style={{
                      overflow: 'visible',
                    }}
                  >
                    <motion.line
                      x1={x > 0 ? 0 : Math.abs(x)}
                      y1={y > 0 ? 0 : Math.abs(y)}
                      x2={x > 0 ? Math.abs(x) : 0}
                      y2={y > 0 ? Math.abs(y) : 0}
                      stroke={isCurrent ? 'url(#gradient-current)' : 'url(#gradient-future)'}
                      strokeWidth="2"
                      strokeDasharray={isCurrent ? '0' : '5,5'}
                    />
                    <defs>
                      <linearGradient id="gradient-current" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(124, 58, 237)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.6" />
                      </linearGradient>
                      <linearGradient id="gradient-future" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(148, 163, 184)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(203, 213, 225)" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Function Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                  className="absolute top-1/2 left-1/2 z-10"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div
                    className={`${
                      isCurrent ? 'card-current' : 'glass-outlined opacity-60'
                    } p-6 rounded-2xl w-56 hover:shadow-xl transition-all ${
                      isCurrent ? '' : 'hover:opacity-100'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      {/* Status Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          isCurrent
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Building Now</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            <span>Coming Soon</span>
                          </>
                        )}
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          isCurrent
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                            : 'bg-gray-200'
                        }`}
                      >
                        <Icon className={`w-7 h-7 ${isCurrent ? 'text-white' : 'text-gray-500'}`} />
                      </div>

                      {/* Name */}
                      <h4 className={`font-bold text-center ${isCurrent ? '' : 'text-gray-600'}`}>
                        {func.name}
                      </h4>

                      {/* Description */}
                      <p
                        className={`text-xs text-center ${
                          isCurrent ? 'text-muted-foreground' : 'text-gray-500'
                        }`}
                      >
                        {func.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Stack */}
      <div className="lg:hidden space-y-6">
        {/* Company Brain First */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card-vision p-6 rounded-3xl"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">
                {platformVision.companyBrain.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {platformVision.companyBrain.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Connecting Visual */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-px h-4 bg-gradient-to-b from-purple-400 to-pink-400"></div>
            ))}
          </div>
        </div>

        {/* Function Cards */}
        <div className="space-y-4">
          {platformVision.functions.map((func, index) => {
            const Icon = func.icon;
            const isCurrent = func.status === 'building';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  isCurrent ? 'card-current' : 'glass-outlined opacity-70'
                } p-6 rounded-2xl`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCurrent
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                        : 'bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${isCurrent ? 'text-white' : 'text-gray-500'}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`font-bold ${isCurrent ? '' : 'text-gray-600'}`}>
                        {func.name}
                      </h4>
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          isCurrent
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Building</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            <span>Soon</span>
                          </>
                        )}
                      </div>
                    </div>
                    <p
                      className={`text-sm ${
                        isCurrent ? 'text-muted-foreground' : 'text-gray-500'
                      }`}
                    >
                      {func.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="mt-12 p-6 glass-strong rounded-2xl text-center"
      >
        <p className="text-sm md:text-base text-muted-foreground">
          <span className="font-semibold text-foreground">
            We're starting with customer support,
          </span>{' '}
          but our architecture is designed for the long-term vision: a unified AI
          platform that understands your entire business, not just one function.
        </p>
      </motion.div>
    </div>
  );
};

export default PlatformVisionPreview;
