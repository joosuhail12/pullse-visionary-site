'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';
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

    // String value
    return (
      <div className="text-center">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isPullse
              ? 'bg-purple-100 text-purple-700 font-semibold'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {value}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-white/50 hover:bg-white/80 text-gray-700'
          }`}
        >
          All Features
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/50 hover:bg-white/80 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-700 min-w-[200px]">
                Feature
              </th>
              <th className="p-4 text-center min-w-[120px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Pullse
                  </span>
                </div>
              </th>
              <th className="p-4 text-center text-gray-600 font-semibold min-w-[120px]">
                Zendesk
              </th>
              <th className="p-4 text-center text-gray-600 font-semibold min-w-[120px]">
                Intercom
              </th>
              <th className="p-4 text-center text-gray-600 font-semibold min-w-[120px]">
                Freshdesk
              </th>
              <th className="p-4 text-center text-gray-600 font-semibold min-w-[120px]">
                Dixa
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map((feature, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="p-4 font-medium text-gray-700">{feature.feature}</td>
                <td className="p-4 bg-purple-50/30">
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
            className="glass-strong p-6 rounded-2xl"
          >
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              {feature.feature}
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                {feature.category}
              </span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-purple-50/50 rounded-xl">
                <span className="font-medium text-purple-700">Pullse</span>
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
      <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <X className="w-4 h-4 text-gray-400" />
          <span>Not available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            Text
          </span>
          <span>Partial/Limited support</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
