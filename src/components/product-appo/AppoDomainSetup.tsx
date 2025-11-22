'use client';

import { Link2, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const AppoDomainSetup = () => {
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);
  const currentStep = 2;

  const steps = [
    { id: 1, label: 'Enter Domain' },
    { id: 2, label: 'DNS Setup' },
    { id: 3, label: 'Verify' },
    { id: 4, label: 'SSL Certificate' },
  ];

  const dnsRecords = [
    { type: 'CNAME', name: 'help', value: 'appo.example.com' },
    { type: 'TXT', name: '_verification', value: 'appo-verify-abc123xyz' },
  ];

  const handleCopy = (text: string, recordType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRecord(recordType);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#FAFAFA] p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <Link2 className="h-5 w-5 text-[#FF6D33]" />
        <div>
          <h3 className="text-base font-bold text-gray-900">Custom Domain</h3>
          <p className="text-xs text-gray-500">Connect your domain to Appo</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-6 flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : step.id === currentStep
                      ? 'bg-[#FF6D33] text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {/* Step Label */}
              <span
                className={`mt-1 text-xs font-medium ${
                  step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Domain Input */}
      <div className="mb-4 rounded-lg border border-[#E5E5E5] bg-white p-4">
        <label className="mb-2 block text-xs font-semibold text-gray-700">Your Domain</label>
        <div className="flex items-center gap-2 rounded border border-[#E5E5E5] bg-gray-50 px-3 py-2">
          <input
            type="text"
            value="help.example.com"
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-900 outline-none"
          />
          <button className="rounded bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200">
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* DNS Records */}
      <div className="mb-4">
        <p className="mb-3 text-xs font-semibold text-gray-700">
          Add these DNS records to your domain
        </p>
        <div className="space-y-2">
          {dnsRecords.map((record) => (
            <div
              key={record.type}
              className="rounded-lg border border-[#E5E5E5] bg-white p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-[#FF6D33] px-2 py-0.5 text-xs font-bold text-white">
                  {record.type}
                </span>
                <button
                  onClick={() => handleCopy(`${record.name} ${record.value}`, record.type)}
                  className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                >
                  {copiedRecord === record.type ? (
                    <>
                      <Check className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex">
                  <span className="w-16 font-medium text-gray-500">Name:</span>
                  <span className="flex-1 font-mono text-gray-900">{record.name}</span>
                </div>
                <div className="flex">
                  <span className="w-16 font-medium text-gray-500">Value:</span>
                  <span className="flex-1 truncate font-mono text-gray-900">{record.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-[#E5E5E5] bg-white p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <p className="text-xs font-semibold text-gray-900">DNS Status</p>
          </div>
          <p className="text-xs text-gray-500">Propagating...</p>
        </div>
        <div className="rounded-lg border border-[#E5E5E5] bg-white p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
            <p className="text-xs font-semibold text-gray-900">SSL Certificate</p>
          </div>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
        <p className="text-xs text-blue-900">
          <span className="font-semibold">Need help?</span> DNS changes can take up to 48 hours
          to propagate. We'll verify automatically and send you an email when ready.
        </p>
      </div>
    </div>
  );
};

export default AppoDomainSetup;
