'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Check, Copy, Globe, Shield } from 'lucide-react';
import { useState } from 'react';

interface DNSRecord {
  type: string;
  name: string;
  value: string;
}

const CustomDomainSetupFlow = () => {
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    { id: 1, label: 'Enter Domain', status: 'completed' },
    { id: 2, label: 'DNS Setup', status: 'current' },
    { id: 3, label: 'Verify', status: 'pending' },
    { id: 4, label: 'SSL', status: 'pending' },
  ];

  const dnsRecords: DNSRecord[] = [
    { type: 'CNAME', name: '@', value: 'appo-custom.pullse.com' },
    { type: 'TXT', name: '_appo-verify', value: 'appo-verify=abc123xyz' },
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
          <h3 className="text-sm font-bold text-foreground">Custom Domain</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Step {currentStep}/4
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-4 flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  step.status === 'completed'
                    ? 'border-green-500 bg-green-500'
                    : step.status === 'current'
                    ? 'border-primary bg-primary'
                    : 'border-border bg-muted'
                }`}
              >
                {step.status === 'completed' ? (
                  <Check className="h-4 w-4 text-white" />
                ) : step.status === 'current' ? (
                  <span className="text-xs font-bold text-white">{step.id}</span>
                ) : (
                  <span className="text-xs font-bold text-muted-foreground">{step.id}</span>
                )}
              </motion.div>

              {/* Step Label */}
              <span
                className={`mt-1 text-xs font-semibold ${
                  step.status === 'current'
                    ? 'text-foreground'
                    : step.status === 'completed'
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/60'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="mx-1 h-0.5 flex-1">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step.status === 'completed' ? 1 : 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="h-full bg-green-500"
                  style={{ transformOrigin: 'left' }}
                />
                {step.status !== 'completed' && (
                  <div className="h-full bg-border" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DNS Records Panel */}
      <AnimatePresence mode="wait">
        {currentStep === 2 && (
          <motion.div
            key="dns-records"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg border border-border/30 bg-muted/20 p-3 transition-all hover:border-primary/30"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="inline-flex rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{
                        backgroundColor: '#F28D1B20',
                        color: '#F28D1B',
                      }}
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
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-mono font-semibold text-foreground">{record.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Value</p>
                      <p className="break-all font-mono text-xs font-semibold text-foreground">
                        {record.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Cards */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-muted/20 p-2">
          <Globe className="h-4 w-4 text-primary" />
          <div>
            <p className="text-xs font-semibold text-foreground">help.yourco.com</p>
            <p className="text-xs text-muted-foreground">Domain</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-muted/20 p-2">
          <Shield className="h-4 w-4 text-green-500" />
          <div>
            <p className="text-xs font-semibold text-green-600 dark:text-green-400">Auto SSL</p>
            <p className="text-xs text-muted-foreground">Certificate</p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center"
      >
        <p className="text-xs text-muted-foreground">
          DNS propagation: 24-48 hours • Auto SSL provisioning
        </p>
      </motion.div>
    </div>
  );
};

export default CustomDomainSetupFlow;
