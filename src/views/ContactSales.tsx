'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import { Calendar, Mail, MessageSquare, Check, Loader2, Send, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
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

  // Validation for each step
  const validateStep = (step: number): boolean => {
    const newErrors: StepErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else if (step === 2) {
      if (!formData.company.trim()) {
        newErrors.company = 'Company name is required';
      }
      if (!formData.companySize) {
        newErrors.companySize = 'Please select company size';
      }
      if (!formData.industry) {
        newErrors.industry = 'Please select industry';
      }
    } else if (step === 3) {
      if (!formData.timeline) {
        newErrors.timeline = 'Please select timeline';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
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
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const benefits = [
    "30-minute personalized demo",
    "Discover how Pullse fits your workflow",
    "Get answers to all your questions",
    "No commitment required",
  ];

  // Enhanced Progress Indicator with Glass Design
  const ProgressIndicator = () => {
    const steps = [
      { number: 1, label: "Contact Info", icon: Mail },
      { number: 2, label: "Company", icon: Sparkles },
      { number: 3, label: "Project", icon: Calendar },
    ];

    return (
      <div className="mb-10">
        {/* Glowing Progress Bar */}
        <div className="relative mb-8">
          <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-purple-600 to-pink-500 relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Glass Step Indicators */}
        <div className="flex justify-between items-center gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isPending = currentStep < step.number;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    className={`relative w-14 h-14 rounded-2xl flex items-center justify-center font-bold mb-3 transition-all duration-500 cursor-pointer group ${
                      isCompleted
                        ? 'glass-elevated bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                        : isCurrent
                        ? 'glass-elevated bg-gradient-to-br from-primary to-purple-600 text-white shadow-xl shadow-primary/40 ring-4 ring-primary/20'
                        : 'glass bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 shadow-sm'
                    }`}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: isCurrent ? [1, 1.05, 1] : 1,
                      boxShadow: isCurrent
                        ? [
                            '0 12px 40px 0 rgba(124, 58, 237, 0.2)',
                            '0 16px 48px 0 rgba(124, 58, 237, 0.3)',
                            '0 12px 40px 0 rgba(124, 58, 237, 0.2)',
                          ]
                        : undefined,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isCurrent ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <CheckCircle2 className="w-7 h-7" />
                      </motion.div>
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}

                    {/* Glow effect */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 blur-xl -z-10"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>

                  <motion.span
                    className={`text-sm font-semibold transition-all duration-300 ${
                      isCurrent
                        ? 'text-primary'
                        : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                    animate={{
                      scale: isCurrent ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isCurrent ? Infinity : 0,
                    }}
                  >
                    {step.label}
                  </motion.span>
                </div>

                {index < steps.length - 1 && (
                  <div className="h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 flex-1 mx-4 relative overflow-hidden">
                    {currentStep > step.number && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Step 1: Contact Information
  const StepOne = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      <div className="glass p-6 rounded-2xl border-2 border-primary/10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent mb-2">
          Let's start with your contact information
        </h3>
        <p className="text-gray-600 text-sm">
          We'll use this to get in touch with you about your personalized demo.
        </p>
      </div>

      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`glass-elevated h-14 text-base transition-all duration-300 hover:shadow-lg ${
              errors.name
                ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30'
                : 'border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40'
            }`}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-red-600" />
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Work Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className={`glass-elevated h-14 text-base transition-all duration-300 hover:shadow-lg ${
              errors.email
                ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30'
                : 'border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40'
            }`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-red-600" />
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Phone <span className="text-gray-400 text-xs font-normal ml-1">(Optional)</span>
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="glass-elevated h-14 text-base border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300 hover:shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );

  // Step 2: Company Details
  const StepTwo = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      <div className="glass p-6 rounded-2xl border-2 border-primary/10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent mb-2">
          Tell us about your company
        </h3>
        <p className="text-gray-600 text-sm">
          This helps us tailor the demo to your specific needs and industry.
        </p>
      </div>

      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Company Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Inc."
            className={`glass-elevated h-14 text-base transition-all duration-300 hover:shadow-lg ${
              errors.company
                ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30'
                : 'border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40'
            }`}
          />
          {errors.company && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-red-600" />
              {errors.company}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Company Size <span className="text-red-500">*</span>
          </label>
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className={`glass-elevated w-full px-5 h-14 rounded-xl text-base font-medium focus:outline-none transition-all duration-300 hover:shadow-lg ${
              errors.companySize
                ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30'
                : 'border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40'
            }`}
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
          {errors.companySize && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-red-600" />
              {errors.companySize}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={`glass-elevated w-full px-5 h-14 rounded-xl text-base font-medium focus:outline-none transition-all duration-300 hover:shadow-lg ${
              errors.industry
                ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30'
                : 'border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40'
            }`}
          >
            <option value="">Select industry</option>
            <option value="B2B SaaS">B2B SaaS</option>
            <option value="Ecommerce">Ecommerce</option>
            <option value="Fintech">Fintech</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
          {errors.industry && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-red-600" />
              {errors.industry}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  // Step 3: Project Details
  const StepThree = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      <div className="glass p-6 rounded-2xl border-2 border-primary/10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent mb-2">
          Almost done! Project details
        </h3>
        <p className="text-gray-600 text-sm">
          Share your timeline and current setup to help us prepare the perfect demo.
        </p>
      </div>

      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Implementation Timeline <span className="text-red-500">*</span>
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={`glass-elevated w-full px-5 h-14 rounded-xl text-base font-medium focus:outline-none transition-all duration-300 hover:shadow-lg ${
              errors.timeline
                ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30'
                : 'border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40'
            }`}
          >
            <option value="">When are you looking to implement?</option>
            <option value="Immediate">Immediate (Within 1 month)</option>
            <option value="Near-term">Near-term (1-3 months)</option>
            <option value="Exploring">Exploring (3-6 months)</option>
            <option value="Planning">Planning (6+ months)</option>
          </select>
          {errors.timeline && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-red-600" />
              {errors.timeline}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Current Solution <span className="text-gray-400 text-xs font-normal ml-1">(Optional)</span>
          </label>
          <Input
            name="currentSolution"
            value={formData.currentSolution}
            onChange={handleChange}
            placeholder="e.g., Zendesk, Intercom, or None"
            className="glass-elevated h-14 text-base border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300 hover:shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-bold text-gray-800 mb-2.5 block flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Additional Details <span className="text-gray-400 text-xs font-normal ml-1">(Optional)</span>
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your specific needs, goals, or questions..."
            className="glass-elevated min-h-36 text-base border-primary/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300 hover:shadow-lg resize-none"
          />
        </motion.div>
      </div>
    </motion.div>
  );

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
                <motion.div
                  className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 15 }}
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-green-400/30 blur-2xl -z-10"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.h2
                  className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Demo Request Received!
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-600 mb-8 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Thank you, {formData.name}! We've received your demo request and our team will contact you within 24 hours.
                </motion.p>

                {/* Cal.com Integration Section */}
                <motion.div
                  className="border-t-2 border-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 pt-8 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent mb-4">
                    Book Your Demo Now
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Skip the wait! Choose a time that works for you:
                  </p>

                  {/* Cal.com Embed Placeholder */}
                  <div className="glass-elevated p-10 rounded-3xl min-h-[450px] flex items-center justify-center bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border-2 border-primary/10">
                    <div className="text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Calendar className="h-20 w-20 text-primary/60 mx-auto mb-6" strokeWidth={1.5} />
                      </motion.div>
                      <p className="text-gray-700 mb-4 text-lg">
                        <strong className="text-primary">Cal.com Integration Ready</strong>
                      </p>
                      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                        To enable calendar booking, add your Cal.com embed code below.
                        <br />
                        <span className="text-primary font-medium">Example: cal.com/yourcompany/demo-call</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4 justify-center flex-wrap">
                    <Button
                      onClick={() => window.location.href = '/pricing'}
                      variant="outline"
                      size="lg"
                      className="min-w-[180px] h-14 text-base font-semibold glass-elevated border-2 border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                    >
                      View Pricing
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/'}
                      variant="outline"
                      size="lg"
                      className="min-w-[180px] h-14 text-base font-semibold glass-elevated border-2 border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                    >
                      Back to Home
                    </Button>
                  </div>
                </motion.div>
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
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:sticky lg:top-32"
              >
                <motion.h1
                  className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Book a Demo
                </motion.h1>
                <motion.p
                  className="text-2xl text-gray-600 mb-10 font-medium leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  See Pullse in action and discover how we can transform your customer support operations.
                </motion.p>

                <div className="space-y-5 mb-10">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <Check className="h-6 w-6 text-primary" strokeWidth={2.5} />
                      </div>
                      <p className="text-lg pt-2 text-gray-700 font-medium">{benefit}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="glass-gradient p-7 rounded-3xl space-y-5 border-2 border-primary/10 shadow-xl"
                >
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
                </motion.div>
              </motion.div>

              {/* Right Column - Multi-Step Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-gradient p-10 rounded-[2rem] shadow-2xl border-2 border-primary/20 relative overflow-hidden"
              >
                {/* Decorative gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-primary/10 rounded-full blur-3xl -z-10" />

                <ProgressIndicator />

                <form onSubmit={handleSubmit} className="space-y-8">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && <StepOne />}
                    {currentStep === 2 && <StepTwo />}
                    {currentStep === 3 && <StepThree />}
                  </AnimatePresence>

                  {/* Error Message */}
                  <AnimatePresence>
                    {apiError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="glass-elevated p-5 rounded-2xl border-2 border-red-300 bg-red-50/50 shadow-lg"
                      >
                        <p className="text-sm text-red-700 text-center font-semibold">{apiError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-6">
                    {currentStep > 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          size="lg"
                          className="w-full h-16 text-base font-bold glass-elevated border-2 border-gray-300 hover:border-gray-400 hover:shadow-xl transition-all duration-300"
                          disabled={isSubmitting}
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={2.5} />
                          Back
                        </Button>
                      </motion.div>
                    )}

                    {currentStep < totalSteps ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          onClick={nextStep}
                          size="lg"
                          className="relative w-full h-16 text-base font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-500/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/30 overflow-hidden group"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            Next Step
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1"
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="relative w-full h-16 text-base font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-500/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/30 overflow-hidden group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <Loader2 className="w-6 h-6 mr-2 animate-spin" strokeWidth={2.5} />
                              Submitting...
                            </span>
                          ) : (
                            <span className="relative z-10 flex items-center justify-center">
                              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                              Book Demo
                            </span>
                          )}
                          {!isSubmitting && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  <p className="text-xs text-center text-gray-500 pt-2 font-medium">
                    By submitting this form, you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactSales;
