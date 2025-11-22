'use client';

import Image from 'next/image';
import { CheckCircle2, ChevronLeft, Clock4, Folder, Save } from 'lucide-react';
import { useState } from 'react';
import appoArticleEditorScreenshot from '@/assets/appo/appo-article-editor.webp';

const AppoArticleEditor = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const meta = [
    { label: 'Collection', value: 'Getting Started', icon: Folder },
    { label: 'Language', value: 'English (US)', icon: CheckCircle2 },
    { label: 'Visibility', value: 'Public', icon: CheckCircle2 },
    { label: 'Status', value: 'Draft', icon: Clock4 },
  ];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#F4E6D8] bg-gradient-to-br from-white via-[#FFF8EF] to-[#FFE7CC] p-5 shadow-sm">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-6 h-40 w-40 rounded-full bg-[#FFB443]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#FF6D33]/12 blur-3xl" />
      </div>

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs font-semibold text-[#3D2A1F]">
          <button className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#3D2A1F] shadow-sm">
            <ChevronLeft className="h-4 w-4" />
            Articles
          </button>
          <span className="h-1 w-1 rounded-full bg-[#D7B9A1]" />
          <span className="rounded-full bg-[#FFE6CC] px-3 py-1 text-[11px] uppercase tracking-wide text-[#C55216]">
            draft
          </span>
          <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] text-[#7B614F]">Getting Started</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#0F9E4A] sm:flex">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Auto-save on
          </span>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
              isSaved
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-[#F2E6D8] bg-white text-[#3D2A1F] hover:border-[#FFB443]/60 hover:text-[#FF6D33]'
            }`}
          >
            <Save className="h-4 w-4" />
            {isSaved ? 'Saved' : 'Save draft'}
          </button>
          <button className="hidden rounded-xl bg-[#FF6D33] px-3 py-2 text-xs font-semibold text-white shadow hover:bg-[#FF854D] sm:inline-flex">
            Publish
          </button>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        {meta.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg border border-[#F2E6D8] bg-white/90 px-3 py-2 text-[#6B5848] shadow-[0_10px_24px_rgba(255,140,40,0.05)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6D33]/10 text-[#FF6D33]">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A6A54]">{item.label}</p>
                <p className="text-[12px] font-semibold text-[#3D2A1F]">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative mt-5 flex-1 overflow-hidden rounded-2xl border border-[#F2E6D8] bg-white shadow-[0_18px_40px_rgba(255,140,40,0.08)]">
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between rounded-full border border-[#F2E6D8] bg-white/95 px-3 py-2 text-[11px] font-semibold text-[#3D2A1F] shadow-sm backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6D33]/10 text-[#FF6D33]">
              H1
            </span>
            <span className="rounded-full bg-[#FFE6CC] px-3 py-1 text-[11px] font-semibold text-[#C55216]">
              Outline ready
            </span>
            <span className="rounded-full bg-[#F7F0E9] px-3 py-1 text-[11px] font-semibold text-[#6B5848]">
              AI draft enabled
            </span>
          </div>
          <div className="hidden items-center gap-1 text-[#7B614F] sm:flex">
            <Clock4 className="h-3.5 w-3.5" />
            Auto preview
          </div>
        </div>
        <div className="relative h-full min-h-[230px]">
          <Image
            src={appoArticleEditorScreenshot}
            alt="Appo article editor preview"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-1 gap-3 text-xs text-[#6B5848] sm:grid-cols-2">
        <div className="rounded-xl border border-[#F2E6D8] bg-white/90 p-3 shadow-[0_10px_24px_rgba(255,140,40,0.05)]">
          <p className="text-sm font-semibold text-[#1E120B]">Live preview</p>
          <p className="mt-1 text-[12px] text-[#7B614F]">How your article renders to customers</p>
          <div className="mt-2 space-y-2">
            <div className="h-2 rounded-full bg-[#FFE3C5]" />
            <div className="h-2 rounded-full bg-[#FFE3C5]" />
            <div className="h-2 rounded-full bg-[#F7F0E9]" />
          </div>
        </div>
        <div className="rounded-xl border border-[#F2E6D8] bg-white/90 p-3 shadow-[0_10px_24px_rgba(255,140,40,0.05)]">
          <p className="text-sm font-semibold text-[#1E120B]">QA checklist</p>
          <div className="mt-2 space-y-2">
            {['Broken links check', 'SEO meta filled', 'Reading time ready'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#FF6D33]" />
                <span className="text-[12px] font-semibold text-[#3D2A1F]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoArticleEditor;
