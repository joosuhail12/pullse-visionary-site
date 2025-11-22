'use client';

import { Search, Eye, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface Version {
  id: string;
  version: string;
  badge: string;
  badgeColor: string;
  title: string;
  author: string;
  timestamp: string;
  fullDate: string;
}

const AppoVersionHistory = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'annotated'>('all');

  const versions: Version[] = [
    {
      id: 'v3',
      version: 'v3',
      badge: 'Latest',
      badgeColor: 'bg-green-500',
      title: 'Getting Started',
      author: 'Suhail Joo',
      timestamp: 'about 2 months ago',
      fullDate: 'Oct 2, 2025 at 1:10 AM',
    },
    {
      id: 'v2',
      version: 'v2',
      badge: '',
      badgeColor: 'bg-yellow-500',
      title: 'Getting Started',
      author: 'Suhail Joo',
      timestamp: 'about 2 months ago',
      fullDate: 'Oct 2, 2025 at 1:09 AM',
    },
    {
      id: 'v1',
      version: 'v1',
      badge: '',
      badgeColor: 'bg-gray-400',
      title: 'Getting Started',
      author: 'Suhail Joo',
      timestamp: 'about 2 months ago',
      fullDate: 'Oct 1, 2025 at 10:37 PM',
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#F4E6D8] bg-gradient-to-br from-white via-[#FFF8EF] to-[#FFE8D0] p-6 shadow-sm">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-4 h-32 w-32 rounded-full bg-[#FFB443]/12 blur-3xl" />
        <div className="absolute right-0 top-8 h-28 w-28 rounded-full bg-[#FF6D33]/10 blur-3xl" />
      </div>
      {/* Header */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[#FF6D33]/10">
            <svg className="h-3 w-3 text-[#FF6D33]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V1.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293l-1-1-1.293-1.293a1 1 0 0 0-1.414 0L2.5 5.793V1.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V13.5A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5V9.293l-3-3z"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[#1E120B]">Version History</h3>
        </div>
      </div>

      <p className="relative mb-4 text-xs text-[#7B614F]">
        Track, compare, and restore previous versions of this article.
      </p>

      {/* Tabs */}
      <div className="relative mb-4 flex items-center gap-6 border-b border-[#F2E6D8]">
        <button
          onClick={() => setActiveTab('all')}
          className={`relative pb-2 text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'text-[#FF6D33]'
              : 'text-[#7B614F] hover:text-[#3D2A1F]'
          }`}
        >
          <svg className="mr-1.5 inline-block h-3 w-3" fill="none" viewBox="0 0 16 16">
            <path
              d="M2 4h12M2 8h12M2 12h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          All (3)
          {activeTab === 'all' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6D33]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('recent')}
          className={`relative pb-2 text-sm font-medium transition-colors ${
            activeTab === 'recent'
              ? 'text-[#FF6D33]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <svg className="mr-1.5 inline-block h-3 w-3" fill="none" viewBox="0 0 16 16">
            <path
              d="M8 3v5l3 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Recent (0)
          {activeTab === 'recent' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6D33]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('annotated')}
          className={`relative pb-2 text-sm font-medium transition-colors ${
            activeTab === 'annotated'
              ? 'text-[#FF6D33]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <svg className="mr-1.5 inline-block h-3 w-3" fill="none" viewBox="0 0 16 16">
            <path
              d="M3 8h10M8 3v10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Annotated (0)
          {activeTab === 'annotated' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6D33]"></div>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C7B49F]" />
        <input
          type="text"
          placeholder="Search by title, notes, or author..."
          className="w-full rounded-lg border border-[#F2E6D8] bg-white/95 py-2 pl-10 pr-4 text-sm text-[#1E120B] placeholder-[#A08A77] transition-all focus:border-[#FF6D33] focus:outline-none focus:ring-2 focus:ring-[#FF6D33]/20"
        />
      </div>

      {/* Version List */}
      <div className="space-y-3">
        {versions.map((version, index) => (
          <div
            key={version.id}
            className="group rounded-xl border border-[#F2E6D8] bg-white/95 p-3 shadow-[0_12px_28px_rgba(255,140,40,0.07)] transition-all hover:shadow-[0_14px_34px_rgba(255,140,40,0.12)]"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: `all 0.2s ease ${index * 0.05}s`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              {/* Left: Version Badge + Info */}
              <div className="flex items-start gap-3">
                {/* Version Badge Circle */}
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${version.badgeColor} text-white`}
                >
                  <span className="text-xs font-bold">{version.version}</span>
                </div>

                {/* Version Info */}
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[#1E120B]">{version.title}</h4>
                    {version.badge && (
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-600">
                        {version.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#7B614F]">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 16 16">
                      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M3 14a5 5 0 0110 0"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-medium">{version.author}</span>
                    <span>•</span>
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>{version.timestamp}</span>
                    <span>•</span>
                    <span>{version.fullDate}</span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <button
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded hover:bg-[#FFF0DE]"
                  title="Preview version"
                >
                  <Eye className="h-4 w-4 text-[#7B614F]" />
                </button>
                {version.badge !== 'Latest' && (
                  <button
                    className="flex h-7 items-center gap-1.5 rounded border border-[#F2E6D8] bg-white px-2.5 text-xs font-semibold text-[#3D2A1F] transition-all hover:border-[#FF6D33] hover:bg-[#FF6D33]/5 hover:text-[#FF6D33]"
                    title="Restore this version"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Restore</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppoVersionHistory;
