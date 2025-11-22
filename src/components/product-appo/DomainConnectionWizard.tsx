'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Check, Copy, AlertCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

const DomainConnectionWizard = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [copied, setCopied] = useState(false);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Enter Domain',
      description: 'help.yourcompany.com',
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending',
    },
    {
      id: 2,
      title: 'Add DNS Records',
      description: 'Configure CNAME records',
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending',
    },
    {
      id: 3,
      title: 'Verify Domain',
      description: 'Checking DNS propagation...',
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending',
    },
    {
      id: 4,
      title: 'SSL Certificate',
      description: 'Auto-provision HTTPS',
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'pending',
    },
  ];

  const dnsRecords = [
    { type: 'CNAME', name: '@', value: 'appo-custom.pullse.com', ttl: '3600' },
    { type: 'TXT', name: '_appo-verify', value: 'appo-verify=abc123xyz', ttl: '3600' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Custom Domain Setup</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Step {currentStep}/4
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-6 space-y-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center gap-3"
          >
            {/* Step Indicator */}
            <div className="relative flex-shrink-0">
              <AnimatePresence mode="wait">
                {step.status === 'completed' ? (
                  <motion.div
                    key="completed"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 shadow-lg"
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                ) : step.status === 'current' ? (
                  <motion.div
                    key="current"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg"
                  >
                    <span className="text-xs font-bold text-white">{step.id}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pending"
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-muted"
                  >
                    <span className="text-xs font-bold text-muted-foreground">{step.id}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-full h-4 w-0.5 -translate-x-1/2 bg-border" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <p
                className={`text-xs font-semibold ${
                  step.status === 'current'
                    ? 'text-foreground'
                    : step.status === 'completed'
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/60'
                }`}
              >
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>

            {/* Status Badge */}
            {step.status === 'current' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
              >
                In Progress
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* DNS Records Panel */}
      <AnimatePresence mode="wait">
        {currentStep === 2 && (
          <motion.div
            key="dns-records"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg"
          >
            <div className="border-b border-border/50 bg-muted/30 px-3 py-2">
              <p className="text-xs font-semibold text-foreground">DNS Configuration</p>
            </div>

            <div className="space-y-2 p-3">
              {dnsRecords.map((record, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group rounded-lg border border-border/30 bg-muted/20 p-2 transition-all hover:border-primary/30 hover:bg-muted/40"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary"
                    >
                      {record.type}
                    </span>
                    <button
                      onClick={() => handleCopy(record.value)}
                      className="flex items-center gap-1 rounded px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-mono font-semibold text-foreground">{record.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">TTL</p>
                      <p className="font-mono font-semibold text-foreground">{record.ttl}</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-muted-foreground">Value</p>
                    <p className="break-all font-mono text-xs font-semibold text-foreground">
                      {record.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex-1 rounded-lg border border-border/50 bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground disabled:opacity-50 disabled:hover:border-border/50 disabled:hover:text-muted-foreground"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
          disabled={currentStep === 4}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-md"
        >
          {currentStep === 4 ? 'Complete' : 'Continue'}
          {currentStep < 4 && <ArrowRight className="h-3 w-3" />}
        </motion.button>
      </div>

      {/* Info Alert */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 flex items-start gap-2 rounded-lg border border-border/30 bg-muted/20 px-3 py-2"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          DNS changes can take up to 48 hours to propagate. We'll notify you when ready.
        </p>
      </motion.div>
    </div>
  );
};

export default DomainConnectionWizard;
