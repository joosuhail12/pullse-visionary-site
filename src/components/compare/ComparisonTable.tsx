'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Info, Wrench, Clock, Sparkles } from 'lucide-react';
import { comparisonFeatures, type ComparisonFeature } from '@/data/comparisonData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ComparisonTable = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(comparisonFeatures.map((f) => f.category)));

  const filteredFeatures =
    selectedCategory === 'all'
      ? comparisonFeatures
      : comparisonFeatures.filter((f) => f.category === selectedCategory);

  const getMaturityInfo = (value: string) => {
    const lower = value.toLowerCase();

    // Coming soon / In development
    if (lower.includes('coming soon') || lower.includes('roadmap')) {
      return {
        icon: <Clock className="w-4 h-4 text-orange-500" />,
        tooltip: 'Coming soon - in development',
        className: 'bg-orange-100 text-orange-700'
      };
    }

    // Full execution / Native features
    if (lower.includes('full') || lower.includes('unlimited') || lower.includes('included')) {
      return {
        icon: <Sparkles className="w-4 h-4 text-green-600" />,
        tooltip: 'Full feature - native support',
        className: 'bg-green-100 text-green-700 font-semibold'
      };
    }

    // Limited / Basic / Partial
    if (lower.includes('limited') || lower.includes('basic') || lower.includes('manual') ||
        lower.includes('suggestions') || lower.includes('answer-only') || lower.includes('deflection')) {
      return {
        icon: <Info className="w-4 h-4 text-gray-500" />,
        tooltip: 'Limited or basic functionality',
        className: 'bg-gray-100 text-gray-600'
      };
    }

    // Via integration / Third-party
    if (lower.includes('via') || lower.includes('integration') || lower.includes('add-on')) {
      return {
        icon: <Wrench className="w-4 h-4 text-blue-500" />,
        tooltip: 'Available via integration or add-on',
        className: 'bg-blue-100 text-blue-700'
      };
    }

    // Default
    return {
      icon: null,
      tooltip: value,
      className: 'bg-gray-100 text-gray-600'
    };
  };

  const renderValue = (value: boolean | string | undefined, isPullse = false) => {
    if (value === undefined) return <X className="w-5 h-5 text-gray-400 mx-auto" />;
    if (value === true)
      return (
        <Check
          className={`w-5 h-5 mx-auto ${
            isPullse ? 'text-green-600' : 'text-green-500'
          }`}
        />
      );
    if (value === false) return <X className="w-5 h-5 text-gray-400 mx-auto" />;

    // String value with maturity indicator
    const maturityInfo = getMaturityInfo(value as string);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-center">
              <span
                className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  isPullse
                    ? 'bg-purple-100 text-purple-700 font-semibold'
                    : maturityInfo.className
                }`}
              >
                {maturityInfo.icon && <span className="flex-shrink-0">{maturityInfo.icon}</span>}
                <span>{value}</span>
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{maturityInfo.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card/80 text-foreground border-border/60 hover:border-primary/40'
          }`}
        >
          All Features
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card/80 text-foreground border-border/60 hover:border-primary/40'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border/60 bg-card/80 shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border/70 bg-muted/40">
              <th className="text-left p-4 font-semibold text-foreground min-w-[200px]">Feature</th>
              {['Pullse', 'Zendesk', 'Intercom', 'Freshdesk', 'Dixa'].map((name, idx) => (
                <th key={name} className="p-4 text-center min-w-[120px] text-sm font-semibold text-muted-foreground">
                  {idx === 0 ? <span className="text-primary font-bold">{name}</span> : name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map((feature, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="p-4 font-medium text-foreground">{feature.feature}</td>
                <td className="p-4 bg-primary/5">
                  {renderValue(feature.pullse, true)}
                </td>
                <td className="p-4">{renderValue(feature.zendesk)}</td>
                <td className="p-4">{renderValue(feature.intercom)}</td>
                <td className="p-4">{renderValue(feature.freshdesk)}</td>
                <td className="p-4">{renderValue(feature.dixa)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {filteredFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-strong p-6 rounded-2xl border border-border/60 bg-card/80"
          >
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              {feature.feature}
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                {feature.category}
              </span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl">
                <span className="font-medium text-primary">Pullse</span>
                {renderValue(feature.pullse, true)}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                  <span className="text-gray-600">Zendesk</span>
                  {renderValue(feature.zendesk)}
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                  <span className="text-gray-600">Intercom</span>
                  {renderValue(feature.intercom)}
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                  <span className="text-gray-600">Freshdesk</span>
                  {renderValue(feature.freshdesk)}
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                  <span className="text-gray-600">Dixa</span>
                  {renderValue(feature.dixa)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-green-600" />
          <span>Full feature</span>
        </div>
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-gray-500" />
          <span>Limited/Basic</span>
        </div>
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-500" />
          <span>Via integration</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-500" />
          <span>Coming soon</span>
        </div>
        <div className="flex items-center gap-2">
          <X className="w-4 h-4 text-gray-400" />
          <span>Not available</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
