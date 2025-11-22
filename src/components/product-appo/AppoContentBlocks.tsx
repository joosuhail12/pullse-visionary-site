'use client';

import { Code2, Image as ImageIcon, Video, Table, Link } from 'lucide-react';
import { useState } from 'react';

type BlockType = 'code' | 'image' | 'video' | 'table' | 'embed';

const AppoContentBlocks = () => {
  const [activeBlock, setActiveBlock] = useState<BlockType>('code');

  const blocks = [
    { id: 'code' as BlockType, label: 'Code', icon: Code2 },
    { id: 'image' as BlockType, label: 'Image', icon: ImageIcon },
    { id: 'video' as BlockType, label: 'Video', icon: Video },
    { id: 'table' as BlockType, label: 'Table', icon: Table },
    { id: 'embed' as BlockType, label: 'Embed', icon: Link },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#F4E6D8] bg-gradient-to-br from-white via-[#FFF8EF] to-[#FFE8D0] p-6 shadow-sm">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-4 h-32 w-32 rounded-full bg-[#FFB443]/12 blur-3xl" />
        <div className="absolute right-0 top-8 h-28 w-28 rounded-full bg-[#FF6D33]/10 blur-3xl" />
      </div>
      {/* Header */}
      <div className="relative mb-6">
        <h3 className="text-lg font-bold text-[#1E120B]">Rich Content Blocks</h3>
        <p className="text-xs text-[#7B614F]">Embed code, media, tables, and embeds without breaking flow</p>
      </div>

      {/* Tab Navigation */}
      <div className="relative mb-4 flex gap-3 overflow-x-auto border-b border-[#F2E6D8] pb-1">
        {blocks.map((block) => {
          const Icon = block.icon;
          return (
            <button
              key={block.id}
              onClick={() => setActiveBlock(block.id)}
              className={`relative flex items-center gap-1.5 rounded-lg px-1 pb-2 text-sm font-semibold transition-colors ${
                activeBlock === block.id ? 'text-[#FF6D33]' : 'text-[#7B614F] hover:text-[#3D2A1F]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{block.label}</span>
              {activeBlock === block.id && (
                <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[#FF6D33] to-[#FFB443]"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="relative rounded-xl border border-[#F2E6D8] bg-white/95 p-4 shadow-[0_16px_36px_rgba(255,140,40,0.07)]">
        {activeBlock === 'code' && (
          <div className="space-y-2 text-[#1E120B]">
            <div className="flex items-center justify-between rounded-t-xl bg-[#1F1B16] px-3 py-2">
              <span className="text-xs font-semibold text-gray-200">example.ts</span>
              <button className="rounded bg-[#FF6D33]/20 px-2 py-1 text-xs font-semibold text-white transition hover:bg-[#FF6D33]/30">
                Copy snippet
              </button>
            </div>
            <div className="rounded-b-xl bg-[#0F0D0A] p-4 font-mono text-sm leading-6 text-gray-100">
              <div className="text-purple-400">interface</div>
              <div className="ml-2 text-blue-400">Article {'{'}</div>
              <div className="ml-4">
                <span className="text-green-400">id</span>
                <span className="text-gray-500">: </span>
                <span className="text-yellow-300">string</span>
                <span className="text-gray-500">;</span>
              </div>
              <div className="ml-4">
                <span className="text-green-400">title</span>
                <span className="text-gray-500">: </span>
                <span className="text-yellow-300">string</span>
                <span className="text-gray-500">;</span>
              </div>
              <div className="ml-4">
                <span className="text-green-400">content</span>
                <span className="text-gray-500">: </span>
                <span className="text-yellow-300">string</span>
                <span className="text-gray-500">;</span>
              </div>
              <div className="ml-2 text-blue-400">{'}'}</div>
            </div>
          </div>
        )}

        {activeBlock === 'image' && (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-[#F2E6D8]">
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#FF6D33]/10 to-[#FF6D33]/5">
                <ImageIcon className="h-12 w-12 text-[#FF6D33]/60" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#3D2A1F]">appo-screenshot.png</span>
              <span className="rounded bg-[#FFF0DE] px-2 py-0.5 font-semibold text-[#C55216]">
                1920x1080
              </span>
            </div>
          </div>
        )}

        {activeBlock === 'video' && (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-[#F2E6D8]">
              <div className="relative flex aspect-video items-center justify-center bg-[#0F0D0A]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6D33]/25 to-transparent"></div>
                <button className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl">
                  <svg className="ml-1 h-6 w-6 text-[#FF6D33]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#3D2A1F]">product-demo.mp4</span>
              <span className="rounded bg-[#FFF0DE] px-2 py-0.5 font-semibold text-[#C55216]">
                3:42
              </span>
            </div>
          </div>
        )}

        {activeBlock === 'table' && (
          <div className="overflow-x-auto text-[#3D2A1F]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F2E6D8] text-left text-xs uppercase tracking-wide text-[#8A6A54]">
                  <th className="pb-2">Plan</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Articles</th>
                  <th className="pb-2">Users</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#F2E6D8]">
                  <td className="py-2 font-semibold">Starter</td>
                  <td className="py-2 text-[#7B614F]">$29/mo</td>
                  <td className="py-2 text-[#7B614F]">50</td>
                  <td className="py-2 text-[#7B614F]">5</td>
                </tr>
                <tr className="border-b border-[#F2E6D8]">
                  <td className="py-2 font-semibold">Growth</td>
                  <td className="py-2 text-[#7B614F]">$99/mo</td>
                  <td className="py-2 text-[#7B614F]">500</td>
                  <td className="py-2 text-[#7B614F]">25</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Enterprise</td>
                  <td className="py-2 text-[#7B614F]">Custom</td>
                  <td className="py-2 text-[#7B614F]">Unlimited</td>
                  <td className="py-2 text-[#7B614F]">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeBlock === 'embed' && (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-[#F2E6D8] bg-[#FFF7ED] p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF6D33] text-white">
                  <span className="text-sm font-bold">Y</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E120B]">Getting Started with Appo</p>
                  <p className="text-xs text-[#7B614F]">YouTube</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded bg-white border border-[#F2E6D8]">
                <Video className="h-10 w-10 text-[#FF6D33]/70" />
              </div>
            </div>
            <p className="text-xs text-[#7B614F]">
              Embed content from YouTube, Loom, Figma, and more
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppoContentBlocks;
