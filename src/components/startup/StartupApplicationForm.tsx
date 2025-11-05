'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Loader2, Send } from 'lucide-react';

interface FormData {
  companyName: string;
  website: string;
  email: string;
  foundingDate: string;
  annualRevenue: string;
  totalFunding: string;
  seatsNeeded: string;
  customerStatus: string;
  currentTools: string;
  useCase: string;
}

interface FormErrors {
  [key: string]: string;
}

const StartupApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    website: '',
    email: '',
    foundingDate: '',
    annualRevenue: '',
    totalFunding: '',
    seatsNeeded: '',
    customerStatus: 'new',
    currentTools: '',
    useCase: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL (include http:// or https://)';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.foundingDate) {
      newErrors.foundingDate = 'Founding date is required';
    }
    if (!formData.annualRevenue) {
      newErrors.annualRevenue = 'Annual revenue is required';
    }
    if (!formData.totalFunding) {
      newErrors.totalFunding = 'Total funding is required';
    }
    if (!formData.seatsNeeded.trim()) {
      newErrors.seatsNeeded = 'Number of seats is required';
    } else if (parseInt(formData.seatsNeeded) < 1 || parseInt(formData.seatsNeeded) > 15) {
      newErrors.seatsNeeded = 'Seats must be between 1 and 15';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await fetch('/api/startup-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setApiError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for applying to the Pullse Startup Program. Our team will review your application and get back to you within 2 business days.
        </p>
        <Button
          onClick={() => window.location.href = '/pricing'}
          variant="outline"
          size="lg"
        >
          Return to Pricing
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
      {/* Company Information */}
      <div className="glass-strong p-8 rounded-3xl space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
              placeholder="Acme Inc."
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
              Website <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.website ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
              placeholder="https://acme.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-500">{errors.website}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
              placeholder="founder@acme.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="foundingDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Founding Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="foundingDate"
              name="foundingDate"
              value={formData.foundingDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.foundingDate ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
            />
            {errors.foundingDate && (
              <p className="mt-1 text-sm text-red-500">{errors.foundingDate}</p>
            )}
          </div>
        </div>
      </div>

      {/* Eligibility Verification */}
      <div className="glass-strong p-8 rounded-3xl space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Verification</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="annualRevenue" className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Recurring Revenue (ARR) <span className="text-red-500">*</span>
            </label>
            <select
              id="annualRevenue"
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.annualRevenue ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-white`}
            >
              <option value="">Select revenue range</option>
              <option value="<500k">Less than $500k</option>
              <option value="500k-1m">$500k - $1M</option>
              <option value="1m-2m">$1M - $2M</option>
              <option value=">2m">Greater than $2M</option>
            </select>
            {errors.annualRevenue && (
              <p className="mt-1 text-sm text-red-500">{errors.annualRevenue}</p>
            )}
          </div>

          <div>
            <label htmlFor="totalFunding" className="block text-sm font-semibold text-gray-700 mb-2">
              Total Funding Raised <span className="text-red-500">*</span>
            </label>
            <select
              id="totalFunding"
              name="totalFunding"
              value={formData.totalFunding}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.totalFunding ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-white`}
            >
              <option value="">Select funding range</option>
              <option value="<1m">Less than $1M</option>
              <option value="1m-3m">$1M - $3M</option>
              <option value="3m-5m">$3M - $5M</option>
              <option value=">5m">Greater than $5M</option>
            </select>
            {errors.totalFunding && (
              <p className="mt-1 text-sm text-red-500">{errors.totalFunding}</p>
            )}
          </div>

          <div>
            <label htmlFor="seatsNeeded" className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Seats Needed <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="seatsNeeded"
              name="seatsNeeded"
              value={formData.seatsNeeded}
              onChange={handleChange}
              min="1"
              max="15"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.seatsNeeded ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
              placeholder="5"
            />
            <p className="mt-1 text-xs text-gray-500">Maximum 15 seats under startup discount</p>
            {errors.seatsNeeded && (
              <p className="mt-1 text-sm text-red-500">{errors.seatsNeeded}</p>
            )}
          </div>

          <div>
            <label htmlFor="customerStatus" className="block text-sm font-semibold text-gray-700 mb-2">
              Current Customer Status <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="customerStatus"
                  value="new"
                  checked={formData.customerStatus === 'new'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm font-medium text-gray-700">New customer</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="customerStatus"
                  value="trial"
                  checked={formData.customerStatus === 'trial'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm font-medium text-gray-700">Existing trial user</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Context (Optional) */}
      <div className="glass-strong p-8 rounded-3xl space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Context (Optional)</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="currentTools" className="block text-sm font-semibold text-gray-700 mb-2">
              Current Support Tools
            </label>
            <textarea
              id="currentTools"
              name="currentTools"
              value={formData.currentTools}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="e.g., Zendesk, Intercom, custom solution"
            />
          </div>

          <div>
            <label htmlFor="useCase" className="block text-sm font-semibold text-gray-700 mb-2">
              Primary Use Case
            </label>
            <textarea
              id="useCase"
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="Tell us about your support needs and how you plan to use Pullse"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {apiError && (
        <div className="glass-strong p-4 rounded-2xl border border-red-200 bg-red-50/50">
          <p className="text-sm text-red-600 text-center">{apiError}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="px-12 py-6 text-lg bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Application
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default StartupApplicationForm;
