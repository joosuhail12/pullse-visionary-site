'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import { Calendar, Mail, MessageSquare, Check, Loader2, Send, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
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

  // Progress Indicator Component
  const ProgressIndicator = () => {
    const steps = [
      { number: 1, label: "Contact Info" },
      { number: 2, label: "Company" },
      { number: 3, label: "Project" },
    ];

    return (
      <div className="mb-8">
        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-purple-600"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-all duration-300 ${
                    currentStep > step.number
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : currentStep === step.number
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white ring-4 ring-primary/20'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  animate={{ scale: currentStep === step.number ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep > step.number ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    step.number
                  )}
                </motion.div>
                <span
                  className={`text-xs font-medium transition-colors duration-300 ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="h-px bg-gray-200 flex-1 mx-2" />
              )}
            </div>
          ))}
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
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Let's start with your contact information
        </h3>
        <p className="text-gray-600 text-sm">
          We'll use this to get in touch with you about your demo.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`glass h-12 text-base transition-all duration-200 ${
              errors.name ? 'border-red-500 ring-2 ring-red-200' : 'focus:ring-2 focus:ring-primary/20'
            }`}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Work Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className={`glass h-12 text-base transition-all duration-200 ${
              errors.email ? 'border-red-500 ring-2 ring-red-200' : 'focus:ring-2 focus:ring-primary/20'
            }`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Phone <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="glass h-12 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
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
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about your company
        </h3>
        <p className="text-gray-600 text-sm">
          This helps us understand your needs better.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Company Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Inc."
            className={`glass h-12 text-base transition-all duration-200 ${
              errors.company ? 'border-red-500 ring-2 ring-red-200' : 'focus:ring-2 focus:ring-primary/20'
            }`}
          />
          {errors.company && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.company}
            </motion.p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Company Size <span className="text-red-500">*</span>
          </label>
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className={`w-full px-4 h-12 rounded-xl border text-base focus:outline-none transition-all duration-200 bg-white ${
              errors.companySize
                ? 'border-red-500 ring-2 ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-primary/20'
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
              className="mt-1 text-sm text-red-500"
            >
              {errors.companySize}
            </motion.p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={`w-full px-4 h-12 rounded-xl border text-base focus:outline-none transition-all duration-200 bg-white ${
              errors.industry
                ? 'border-red-500 ring-2 ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-primary/20'
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
              className="mt-1 text-sm text-red-500"
            >
              {errors.industry}
            </motion.p>
          )}
        </div>
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
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Almost done! Project details
        </h3>
        <p className="text-gray-600 text-sm">
          Tell us about your timeline and needs.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Implementation Timeline <span className="text-red-500">*</span>
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={`w-full px-4 h-12 rounded-xl border text-base focus:outline-none transition-all duration-200 bg-white ${
              errors.timeline
                ? 'border-red-500 ring-2 ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-primary/20'
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
              className="mt-1 text-sm text-red-500"
            >
              {errors.timeline}
            </motion.p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Current Solution <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <Input
            name="currentSolution"
            value={formData.currentSolution}
            onChange={handleChange}
            placeholder="e.g., Zendesk, Intercom"
            className="glass h-12 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Additional Details <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your specific needs or questions..."
            className="glass min-h-32 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
          />
        </div>
      </div>
    </motion.div>
  );

  // Success state with Cal.com integration
  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <PageLiquidBackground opacity={0.3} />
        <Navigation />

        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="glass-strong p-12 rounded-3xl text-center"
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Demo Request Received!
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you, {formData.name}! We've received your demo request and our team will contact you within 24 hours.
                </motion.p>

                {/* Cal.com Integration Section */}
                <motion.div
                  className="border-t border-gray-200 pt-8 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Book Your Demo Now
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Skip the wait! Choose a time that works for you:
                  </p>

                  {/* Cal.com Embed Placeholder */}
                  <div className="glass p-8 rounded-2xl min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="text-center">
                      <Calendar className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        <strong>Cal.com Integration Ready</strong>
                      </p>
                      <p className="text-sm text-gray-500 max-w-md">
                        To enable calendar booking, add your Cal.com embed code below.
                        <br />
                        Example: cal.com/yourcompany/demo-call
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4 justify-center flex-wrap">
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
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Book a Demo
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  See Pullse in action and discover how we can transform your customer support operations.
                </p>

                <div className="space-y-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="flex items-start gap-4"
                    >
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-lg pt-1.5 text-gray-700">{benefit}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-strong p-6 rounded-2xl space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email Us</p>
                      <p className="text-sm text-gray-600">sales@pullse.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 9am-6pm EST</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Multi-Step Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-strong p-8 rounded-3xl shadow-2xl"
              >
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass-strong p-4 rounded-2xl border border-red-200 bg-red-50/50"
                      >
                        <p className="text-sm text-red-600 text-center">{apiError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 pt-6">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        size="lg"
                        className="flex-1 h-14"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                      </Button>
                    )}

                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        size="lg"
                        className="flex-1 h-14 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-200"
                      >
                        Next Step
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 h-14 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-200"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Book Demo
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-center text-muted-foreground pt-2">
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
