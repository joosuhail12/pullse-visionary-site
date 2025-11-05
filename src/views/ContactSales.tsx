'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import { CalEmbed } from "@/components/CalEmbed";
import { Calendar, Mail, MessageSquare, Check, Loader2, Send, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  company: string;
  companySize: string;
  industry: string;
  timeline: string;
  phone: string;
  currentSolution: string;
  message: string;
}

interface StepErrors {
  [key: string]: string;
}

const ContactSales = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    companySize: "",
    industry: "",
    timeline: "",
    phone: "",
    currentSolution: "",
    message: "",
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
      if (!data.name.trim()) newErrors.name = 'Name is required';
      if (!data.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else if (step === 2) {
      if (!data.company.trim()) newErrors.company = 'Company name is required';
      if (!data.companySize) newErrors.companySize = 'Please select company size';
      if (!data.industry) newErrors.industry = 'Please select industry';
    } else if (step === 3) {
      if (!data.timeline) newErrors.timeline = 'Please select timeline';
    }

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
      const response = await fetch('/api/contact-sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error?.message || 'Failed to submit request';
        const errorCode = result.error?.code;

        if (errorCode === 'DUPLICATE_SUBMISSION') {
          throw new Error('You have already submitted a demo request. Please check your email or wait an hour before submitting again.');
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

  const benefits = [
    "30-minute personalized demo",
    "Discover how Pullse fits your workflow",
    "Get answers to all your questions",
    "No commitment required",
  ];

  // Memoized step component
  const StepContent = useMemo(() => {
    const stepConfigs = [
      {
        title: "Let's start with your contact information",
        subtitle: "We'll use this to get in touch with you about your personalized demo.",
        fields: [
          { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
          { name: "email", label: "Work Email", type: "email", placeholder: "john@company.com", required: true },
          { name: "phone", label: "Phone", type: "tel", placeholder: "+1 (555) 000-0000", required: false },
        ]
      },
      {
        title: "Tell us about your company",
        subtitle: "This helps us tailor the demo to your specific needs and industry.",
        fields: [
          { name: "company", label: "Company Name", type: "text", placeholder: "Acme Inc.", required: true },
          {
            name: "companySize",
            label: "Company Size",
            type: "select",
            required: true,
            options: [
              { value: "", label: "Select company size" },
              { value: "1-10", label: "1-10 employees" },
              { value: "11-50", label: "11-50 employees" },
              { value: "51-200", label: "51-200 employees" },
              { value: "201-500", label: "201-500 employees" },
              { value: "500+", label: "500+ employees" },
            ]
          },
          {
            name: "industry",
            label: "Industry",
            type: "select",
            required: true,
            options: [
              { value: "", label: "Select industry" },
              { value: "B2B SaaS", label: "B2B SaaS" },
              { value: "Ecommerce", label: "Ecommerce" },
              { value: "Fintech", label: "Fintech" },
              { value: "Healthcare", label: "Healthcare" },
              { value: "Other", label: "Other" },
            ]
          },
        ]
      },
      {
        title: "Almost done! Project details",
        subtitle: "Share your timeline and current setup to help us prepare the perfect demo.",
        fields: [
          {
            name: "timeline",
            label: "Implementation Timeline",
            type: "select",
            required: true,
            options: [
              { value: "", label: "When are you looking to implement?" },
              { value: "Immediate", label: "Immediate (Within 1 month)" },
              { value: "Near-term", label: "Near-term (1-3 months)" },
              { value: "Exploring", label: "Exploring (3-6 months)" },
              { value: "Planning", label: "Planning (6+ months)" },
            ]
          },
          { name: "currentSolution", label: "Current Solution", type: "text", placeholder: "e.g., Zendesk, Intercom, or None", required: false },
          { name: "message", label: "Additional Details", type: "textarea", placeholder: "Tell us about your specific needs, goals, or questions...", required: false },
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
        className="space-y-6"
      >
        <div className="glass p-6 rounded-2xl border-2 border-primary/10">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent mb-2">
            {config.title}
          </h3>
          <p className="text-gray-600 text-sm">{config.subtitle}</p>
        </div>

        <div className="space-y-5">
          {config.fields.map((field, index) => (
            <div key={field.name}>
              <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
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
                  className={`glass-elevated w-full px-5 h-14 rounded-xl text-base font-medium focus:outline-none transition-all duration-300 hover:shadow-lg ${
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
                  className="glass-elevated min-h-36 text-base border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300 hover:shadow-lg resize-none"
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`glass-elevated h-14 text-base transition-all duration-300 hover:shadow-lg ${
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

  // Success state with Cal.com integration
  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <PageLiquidBackground opacity={0.4} />
        <Navigation />

        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                className="glass-gradient p-10 rounded-[2rem] text-center shadow-2xl border-2 border-primary/20"
              >
                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                  <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </div>

                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent mb-4">
                  Demo Request Received!
                </h2>
                <p className="text-xl text-gray-600 mb-8 font-medium">
                  Thank you, {formData.name}! We've received your demo request and our team will contact you within 24 hours.
                </p>

                {/* Cal.com Integration Section */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Book a time
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Schedule a meeting with our team
                    </p>

                    {/* Calendar Embed */}
                    <CalEmbed
                      calLink="suhailjoo/pullse-demo"
                      className=""
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center flex-wrap mt-12">
                    <Button
                      onClick={() => window.location.href = '/pricing'}
                      variant="outline"
                      size="lg"
                      className="min-w-[160px]"
                    >
                      View Pricing
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/'}
                      variant="outline"
                      size="lg"
                      className="min-w-[160px]"
                    >
                      Back to Home
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.4} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Info */}
              <div className="lg:sticky lg:top-32">
                <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-tight">
                  Book a Demo
                </h1>
                <p className="text-2xl text-gray-600 mb-10 font-medium leading-relaxed">
                  See Pullse in action and discover how we can transform your customer support operations.
                </p>

                <div className="space-y-5 mb-10">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <Check className="h-6 w-6 text-primary" strokeWidth={2.5} />
                      </div>
                      <p className="text-lg pt-2 text-gray-700 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-gradient p-7 rounded-3xl space-y-5 border-2 border-primary/10 shadow-xl">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Mail className="h-6 w-6 text-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Email Us</p>
                      <p className="text-base text-primary font-medium">sales@pullse.com</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <MessageSquare className="h-6 w-6 text-green-600" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Live Chat</p>
                      <p className="text-base text-gray-600 font-medium">Available 9am-6pm EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Multi-Step Form */}
              <div className="glass-gradient p-10 rounded-[2rem] shadow-2xl border-2 border-primary/20 relative overflow-hidden">
                {/* Decorative gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-primary/10 rounded-full blur-3xl -z-10" />

                {/* Progress Indicator */}
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-3">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex-1 text-center">
                        <span className={`text-sm font-semibold transition-all duration-300 ${
                          currentStep === step ? 'text-primary' : currentStep > step ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          Step {step}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="relative">
                    <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary via-purple-600 to-pink-500"
                        initial={false}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <AnimatePresence mode="wait">
                    {StepContent}
                  </AnimatePresence>

                  {/* Error Message */}
                  {apiError && (
                    <div className="glass-elevated p-5 rounded-2xl border-2 border-red-300 bg-red-50/50 shadow-lg">
                      <p className="text-sm text-red-700 text-center font-semibold">{apiError}</p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-6">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        size="lg"
                        className="flex-1 h-16 text-base font-bold glass-elevated border-2 border-gray-300 hover:border-gray-400 hover:shadow-xl transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={2.5} />
                        Back
                      </Button>
                    )}

                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        size="lg"
                        className="flex-1 h-16 text-base font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-500/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/30"
                      >
                        Next Step
                        <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 h-16 text-base font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-500/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/30"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-6 h-6 mr-2 animate-spin" strokeWidth={2.5} />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" strokeWidth={2.5} />
                            Book Demo
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactSales;
