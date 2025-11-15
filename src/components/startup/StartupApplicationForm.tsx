'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Loader2, Send, ArrowRight, ArrowLeft } from 'lucide-react';

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

interface StepErrors {
  [key: string]: string;
}

const StartupApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const [errors, setErrors] = useState<StepErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const totalSteps = 3;

  // Memoized validation function
  const validateStep = useCallback((step: number, data: FormData): StepErrors => {
    const newErrors: StepErrors = {};

    if (step === 1) {
      if (!data.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!data.website.trim()) {
        newErrors.website = 'Website is required';
      } else if (!/^https?:\/\/.+/.test(data.website)) {
        newErrors.website = 'Please enter a valid URL (include http:// or https://)';
      }
      if (!data.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!data.foundingDate) newErrors.foundingDate = 'Founding date is required';
    } else if (step === 2) {
      if (!data.annualRevenue) newErrors.annualRevenue = 'Annual revenue is required';
      if (!data.totalFunding) newErrors.totalFunding = 'Total funding is required';
      if (!data.seatsNeeded.trim()) {
        newErrors.seatsNeeded = 'Number of seats is required';
      } else if (parseInt(data.seatsNeeded) < 1 || parseInt(data.seatsNeeded) > 15) {
        newErrors.seatsNeeded = 'Seats must be between 1 and 15';
      }
    }
    // Step 3 fields are optional

    return newErrors;
  }, []);

  // Memoized handlers
  const nextStep = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  }, [currentStep, formData, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  }, []);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    setErrors(prev => {
      if (prev[name]) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
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

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error?.message || 'Failed to submit application';
        const errorCode = result.error?.code;

        if (errorCode === 'DUPLICATE_SUBMISSION') {
          throw new Error('You have already submitted an application. Please check your email or wait 24 hours before submitting again.');
        } else if (errorCode === 'RATE_LIMIT_EXCEEDED') {
          throw new Error('Too many submission attempts. Please wait a minute and try again.');
        } else if (errorCode === 'VALIDATION_ERROR') {
          throw new Error('Please check your form data and try again.');
        } else {
          throw new Error(errorMessage);
        }
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
  }, [currentStep, formData, validateStep]);

  // Memoized step component
  const StepContent = useMemo(() => {
    const stepConfigs = [
      {
        title: "Tell us about your company",
        subtitle: "Basic information to get started with your startup program application.",
        fields: [
          { name: "companyName", label: "Company Name", type: "text", placeholder: "Acme Inc.", required: true },
          { name: "website", label: "Website", type: "url", placeholder: "https://acme.com", required: true },
          { name: "email", label: "Work Email", type: "email", placeholder: "founder@acme.com", required: true },
          { name: "foundingDate", label: "Founding Date", type: "date", placeholder: "", required: true },
        ]
      },
      {
        title: "Verify your eligibility",
        subtitle: "Confirm you meet the startup program requirements to qualify for discounts.",
        fields: [
          {
            name: "annualRevenue",
            label: "Annual Recurring Revenue (ARR)",
            type: "select",
            required: true,
            options: [
              { value: "", label: "Select revenue range" },
              { value: "<500k", label: "Less than $500k" },
              { value: "500k-1m", label: "$500k - $1M" },
              { value: "1m-2m", label: "$1M - $2M" },
              { value: ">2m", label: "Greater than $2M" },
            ]
          },
          {
            name: "totalFunding",
            label: "Total Funding Raised",
            type: "select",
            required: true,
            options: [
              { value: "", label: "Select funding range" },
              { value: "<1m", label: "Less than $1M" },
              { value: "1m-3m", label: "$1M - $3M" },
              { value: "3m-5m", label: "$3M - $5M" },
              { value: ">5m", label: "Greater than $5M" },
            ]
          },
          { name: "seatsNeeded", label: "Number of Seats Needed", type: "number", placeholder: "5", required: true, min: "1", max: "15" },
          {
            name: "customerStatus",
            label: "Current Customer Status",
            type: "select",
            required: true,
            options: [
              { value: "new", label: "New customer" },
              { value: "trial", label: "Existing trial user" },
            ]
          },
        ]
      },
      {
        title: "Help us understand your needs",
        subtitle: "Optional details to help us provide better support and tailor your onboarding.",
        fields: [
          { name: "currentTools", label: "Current Support Tools", type: "textarea", placeholder: "e.g., Zendesk, Intercom, custom solution", required: false },
          { name: "useCase", label: "Primary Use Case", type: "textarea", placeholder: "Tell us about your support needs and how you plan to use Pullse", required: false },
        ]
      }
    ];

    const config = stepConfigs[currentStep - 1];

    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 md:space-y-5 lg:space-y-6"
      >
        <div className="glass p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl border-2 border-primary/10">
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1 mb-2">
            {config.title}
          </h3>
          <p className="text-gray-600 text-xs md:text-sm">{config.subtitle}</p>
        </div>

        <div className="space-y-4 md:space-y-5">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="text-xs md:text-sm font-bold text-gray-800 mb-2 md:mb-2.5 block flex items-center gap-2">
                {field.required && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                {!field.required && <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                {field.label} {field.required && <span className="text-red-500">*</span>}
                {!field.required && <span className="text-gray-400 text-xs font-normal ml-1">(Optional)</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleChange}
                  className={`glass-elevated w-full px-4 md:px-5 h-12 md:h-14 rounded-lg md:rounded-xl text-sm md:text-base font-medium focus:outline-none transition-all duration-300 hover:shadow-lg ${
                    errors[field.name]
                      ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30'
                      : 'border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40'
                  }`}
                >
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <Textarea
                  name={field.name}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="glass-elevated min-h-28 md:min-h-36 text-sm md:text-base border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300 hover:shadow-lg resize-none"
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  max={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                  min={field.min}
                  className={`glass-elevated h-12 md:h-14 text-sm md:text-base transition-all duration-300 hover:shadow-lg ${
                    errors[field.name]
                      ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30'
                      : 'border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40'
                  }`}
                />
              )}

              {errors[field.name] && (
                <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600" />
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }, [currentStep, formData, errors, handleChange]);

  // Success state
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
        className="glass-gradient p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[2rem] text-center shadow-2xl border-2 border-primary/20"
      >
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-5 md:mb-6 shadow-lg shadow-green-500/30">
          <Check className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={3} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1 mb-3 md:mb-4">
          Application Submitted!
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 font-medium">
          Thank you for applying to the Pullse Startup Program. Our team will review your application and get back to you within 2 business days.
        </p>

        <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
          <Button
            onClick={() => window.location.href = '/pricing'}
            variant="outline"
            size="lg"
            className="min-w-[140px] md:min-w-[160px]"
          >
            View Pricing
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="lg"
            className="min-w-[140px] md:min-w-[160px]"
          >
            Submit Another
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-gradient p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[2rem] shadow-2xl border-2 border-primary/20 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-tr from-pink-500/10 to-primary/10 rounded-full blur-3xl -z-10" />

      {/* Progress Indicator */}
      <div className="mb-8 md:mb-10">
        <div className="flex justify-between items-center mb-2 md:mb-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1 text-center">
              <span className={`text-xs md:text-sm font-semibold transition-all duration-300 ${
                currentStep === step ? 'text-primary' : currentStep > step ? 'text-green-600' : 'text-gray-400'
              }`}>
                Step {step}
              </span>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="h-2.5 md:h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-purple-600 to-pink-500"
              initial={false}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        <AnimatePresence mode="wait">
          {StepContent}
        </AnimatePresence>

        {/* Error Message */}
        {apiError && (
          <div className="glass-elevated p-4 md:p-5 rounded-xl md:rounded-2xl border-2 border-red-300 bg-red-50/50 shadow-lg">
            <p className="text-xs md:text-sm text-red-700 text-center font-semibold">{apiError}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 md:gap-4 pt-5 md:pt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              size="lg"
              className="flex-1 h-14 md:h-16 text-sm md:text-base font-bold glass-elevated border-2 border-gray-300 hover:border-gray-400 hover:shadow-xl transition-all duration-300"
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" strokeWidth={2.5} />
              Back
            </Button>
          )}

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              size="lg"
              className="flex-1 h-14 md:h-16 text-sm md:text-base font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-500/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/30"
            >
              Next Step
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" strokeWidth={2.5} />
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              className="flex-1 h-14 md:h-16 text-sm md:text-base font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-500/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/30"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" strokeWidth={2.5} />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" strokeWidth={2.5} />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>

        <p className="text-xs text-center text-gray-500 pt-2 font-medium">
          By submitting this form, you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default StartupApplicationForm;
