'use client';

import { Users, MessageCircle, Eye } from 'lucide-react';

const AppoCollaboration = () => {
  const collaborators = [
    { name: 'Sarah Johnson', color: '#FF6D33', initial: 'S', status: 'Editing' },
    { name: 'John Smith', color: '#10B981', initial: 'J', status: 'Viewing' },
    { name: 'Alex Chen', color: '#3B82F6', initial: 'A', status: 'Commenting' },
  ];

  const comments = [
    { author: 'Sarah', text: 'Should we add more examples here?', time: '2m ago' },
    { author: 'John', text: 'Looks good! Ready to publish.', time: '5m ago' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#F4E6D8] bg-gradient-to-br from-white via-[#FFF8EF] to-[#FFE8D0] p-6 shadow-sm">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-4 h-32 w-32 rounded-full bg-[#FFB443]/12 blur-3xl" />
        <div className="absolute right-0 top-8 h-28 w-28 rounded-full bg-[#FF6D33]/10 blur-3xl" />
      </div>
      {/* Header with Collaborators */}
      <div className="relative mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-[#FF6D33]" />
          <h3 className="text-lg font-bold text-[#1E120B]">Collaboration</h3>
        </div>

        {/* Avatars */}
        <div className="flex -space-x-2">
          {collaborators.map((user) => (
            <div
              key={user.name}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-sm"
              style={{ backgroundColor: user.color }}
              title={user.name}
            >
              {user.initial}
            </div>
          ))}
        </div>
      </div>

      {/* Active Users List */}
      <div className="relative mb-4 rounded-xl border border-[#F2E6D8] bg-white/95 p-4 shadow-[0_12px_28px_rgba(255,140,40,0.07)]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8A6A54]">Active Now (3)</p>
        <div className="space-y-2">
          {collaborators.map((user) => (
            <div key={user.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: user.color }}
                >
                  {user.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E120B]">{user.name}</p>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span className="text-xs text-[#7B614F]">{user.status}</span>
                  </div>
                </div>
              </div>

              {user.status === 'Editing' && (
                <span className="rounded-full bg-[#FF6D33]/10 px-2 py-0.5 text-xs font-medium text-[#FF6D33]">
                  Editing
                </span>
              )}
              {user.status === 'Viewing' && <Eye className="h-4 w-4 text-gray-400" />}
              {user.status === 'Commenting' && (
                <MessageCircle className="h-4 w-4 text-blue-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Document Preview with Comment */}
      <div className="relative rounded-xl border border-[#F2E6D8] bg-white/95 p-4 shadow-[0_16px_32px_rgba(255,140,40,0.08)]">
        <div className="mb-3 flex items-center gap-2 text-[#3D2A1F]">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#FFF0DE]">
            <svg className="h-4 w-4 text-[#7B614F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#1E120B]">Getting Started</p>
        </div>

        {/* Article Content with Inline Comment */}
        <div className="mb-3 space-y-2 text-sm text-[#3D2A1F]">
          <p>
            Appo is a robust, user-friendly platform engineered to host all your essential support
            documentation.
          </p>
          <div className="relative">
            <p className="rounded bg-yellow-50 p-2 leading-relaxed">
              Functioning as your central knowledge hub, it's a dynamic repository for FAQs,
              troubleshooting guides, and detailed how-to articles.
            </p>
            {/* Comment Indicator */}
            <div className="absolute -right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-white">
              2
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-2 border-t border-[#F2E6D8] pt-3">
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6D33] text-xs font-bold text-white">
                {comment.author[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-[#1E120B]">{comment.author}</p>
                  <span className="text-xs text-[#7B614F]">{comment.time}</span>
                </div>
                <p className="text-xs text-[#7B614F]">{comment.text}</p>
              </div>
            </div>
          ))}

          {/* Add Comment */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 rounded border border-[#F2E6D8] bg-[#FFF7ED] px-3 py-1.5 text-xs text-[#3D2A1F] placeholder-[#A08A77] focus:border-[#FF6D33] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6D33]/20"
            />
            <button className="rounded bg-[#FF6D33] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#FF5A1F]">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoCollaboration;
