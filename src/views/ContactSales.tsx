'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import { Calendar, Mail, MessageSquare, Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";

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

const ContactSales = () => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  const benefits = [
    "30-minute personalized demo",
    "Discover how Pullse fits your workflow",
    "Get answers to all your questions",
    "No commitment required",
  ];

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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong p-12 rounded-3xl text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Demo Request Received!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you, {formData.name}! We've received your demo request and our team will contact you within 24 hours.
                </p>

                {/* Cal.com Integration Section */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Book Your Demo Now
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Skip the wait! Choose a time that works for you:
                  </p>

                  {/* Cal.com Embed Placeholder */}
                  <div className="glass p-6 rounded-2xl min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
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
                      {/*
                        TODO: Replace with actual Cal.com embed

                        <Cal
                          calLink="yourcompany/demo-call"
                          config={{
                            name: formData.name,
                            email: formData.email,
                          }}
                        />

                        Or use iframe:
                        <iframe
                          src="https://cal.com/yourcompany/demo-call?embed=true"
                          width="100%"
                          height="600"
                          frameBorder="0"
                        />
                      */}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4 justify-center">
                    <Button
                      onClick={() => window.location.href = '/pricing'}
                      variant="outline"
                      size="lg"
                    >
                      View Pricing
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/'}
                      variant="outline"
                      size="lg"
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
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Info */}
              <div>
                <h1 className="text-5xl font-bold mb-6">
                  Book a Demo
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  See Pullse in action and discover how we can transform your customer support operations.
                </p>

                <div className="space-y-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-lg pt-1">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-strong p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-muted-foreground">sales@pullse.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">Available 9am-6pm EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Enhanced Form */}
              <div className="glass-strong p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Schedule Your Demo</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Section 1: Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Contact Information
                    </h3>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="glass"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Work Email *</label>
                      <Input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="glass"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="glass"
                      />
                    </div>
                  </div>

                  {/* Section 2: Company Details */}
                  <div className="space-y-4 pt-6 border-t border-gray-200/50">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Company Details
                    </h3>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Company *</label>
                      <Input
                        required
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="glass"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Company Size *</label>
                      <select
                        required
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-white"
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Industry *</label>
                      <select
                        required
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-white"
                      >
                        <option value="">Select industry</option>
                        <option value="B2B SaaS">B2B SaaS</option>
                        <option value="Ecommerce">Ecommerce</option>
                        <option value="Fintech">Fintech</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Section 3: Project Details */}
                  <div className="space-y-4 pt-6 border-t border-gray-200/50">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Project Details
                    </h3>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Timeline *</label>
                      <select
                        required
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-white"
                      >
                        <option value="">When are you looking to implement?</option>
                        <option value="Immediate">Immediate (Within 1 month)</option>
                        <option value="Near-term">Near-term (1-3 months)</option>
                        <option value="Exploring">Exploring (3-6 months)</option>
                        <option value="Planning">Planning (6+ months)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Current Solution</label>
                      <Input
                        name="currentSolution"
                        value={formData.currentSolution}
                        onChange={handleChange}
                        placeholder="e.g., Zendesk, Intercom"
                        className="glass"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Tell us about your needs
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="What are you looking to solve with Pullse?"
                        className="glass min-h-32"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {apiError && (
                    <div className="glass-strong p-4 rounded-2xl border border-red-200 bg-red-50/50">
                      <p className="text-sm text-red-600 text-center">{apiError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
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

                  <p className="text-xs text-center text-muted-foreground">
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
