'use client';

import Image from 'next/image';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Gauge,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import appoHomepageScreenshot from '@/assets/appo/Appo-homepage.webp';
import appoWordmark from '@/assets/appo/appo-wordmark.png';

const AppoWorkspaceSnapshot = () => {
  const stats = [
    { label: 'Total Users', value: '2,543', delta: '+12% vs last month', icon: Users },
    { label: 'Active Docs', value: '127', delta: '+8% vs last month', icon: BarChart3 },
    { label: 'Growth Rate', value: '23.5%', delta: '+2.1% vs last month', icon: Activity },
    { label: 'Activity Score', value: '89/100', delta: '-3% vs last month', icon: Gauge },
  ];

  const steps = [
    'Create your first collection',
    'Publish your first article',
    'Invite team members',
    'Customize help center',
  ];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#F4EBDC] bg-gradient-to-br from-white via-[#FFF8EF] to-[#FFE8D0] p-5 shadow-sm">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-16 h-52 w-52 rounded-full bg-[#FFB443]/10 blur-3xl" />
        <div className="absolute -right-8 top-10 h-40 w-40 rounded-full bg-[#FF6D33]/10 blur-3xl" />
      </div>

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 items-center gap-2 rounded-2xl border border-[#F5E4CE] bg-white/90 px-3 shadow-sm">
            <LayoutDashboard className="h-5 w-5 text-[#FF6D33]" />
            <Image src={appoWordmark} alt="Appo" width={96} height={28} className="h-4 w-auto" />
          </div>
          <span className="rounded-full bg-[#FFE6CC] px-3 py-1 text-xs font-semibold text-[#C55216]">
            Workspace snapshot
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#8A6A54]">
          <span className="flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 font-medium text-[#3D2A1F]">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Live
          </span>
          <span className="hidden rounded-full bg-white/70 px-2.5 py-1 font-medium sm:inline-flex">
            Updated 2 min ago
          </span>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col gap-1.5 rounded-xl border border-[#F2E6D8] bg-white/90 p-3 shadow-[0_10px_30px_rgba(255,140,40,0.05)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#7B614F]">{stat.label}</p>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6D33]/10 text-[#FF6D33]">
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#1E120B]">{stat.value}</p>
              <p className={`text-xs font-medium ${stat.delta.includes('-') ? 'text-[#B54716]' : 'text-[#0F9E4A]'}`}>
                {stat.delta}
              </p>
            </div>
          );
        })}
      </div>

      <div className="relative mt-4 space-y-3 rounded-2xl border border-[#F2E6D8] bg-white/90 p-4 shadow-[0_10px_30px_rgba(255,140,40,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#1E120B]">Getting started</p>
            <p className="text-xs text-[#7B614F]">Complete these steps to launch your help center</p>
          </div>
          <span className="rounded-full bg-[#FFE6CC] px-3 py-1 text-xs font-semibold text-[#C55216]">
            75% complete
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#FFE3C5]">
          <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-[#FF6D33] via-[#FF8C4A] to-[#FFC04B]" />
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {steps.map((step) => (
            <span
              key={step}
              className="flex items-center gap-1 rounded-full border border-[#F2E6D8] bg-[#FFF7ED] px-3 py-1 font-semibold text-[#6B5848]"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#FF6D33]" />
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-auto overflow-hidden rounded-2xl border border-[#F2E6D8] bg-gradient-to-br from-white via-white to-[#FFF1E1] shadow-[0_16px_40px_rgba(255,140,40,0.08)]">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-70% via-transparent to-transparent" />
        <div className="relative h-40 w-full">
          <Image
            src={appoHomepageScreenshot}
            alt="Appo workspace dashboard preview"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#3D2A1F]">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6D33]/10 text-[#FF6D33]">
              <LayoutDashboard className="h-4 w-4" />
            </span>
            Help center health is 89/100 this week
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-[#FF6D33] px-3 py-1 font-semibold text-white">Open dashboard</span>
            <span className="rounded-full bg-[#FFE6CC] px-3 py-1 font-semibold text-[#C55216]">View quick actions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoWorkspaceSnapshot;
