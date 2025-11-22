'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Globe, Check } from 'lucide-react';
import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  articleCount: number;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', articleCount: 248 },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', articleCount: 201 },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', articleCount: 189 },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', articleCount: 156 },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', articleCount: 134 },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', articleCount: 142 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', articleCount: 98 },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', articleCount: 87 },
];

const LanguageSwitcherDemo = () => {
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sampleArticle = {
    en: { title: 'How to Get Started', content: 'Welcome to our help center...' },
    es: { title: 'Cómo Empezar', content: 'Bienvenido a nuestro centro de ayuda...' },
    fr: { title: 'Comment Commencer', content: 'Bienvenue dans notre centre d\'aide...' },
    de: { title: 'Erste Schritte', content: 'Willkommen in unserem Hilfezentrum...' },
    ja: { title: '始め方', content: 'ヘルプセンターへようこそ...' },
    zh: { title: '如何开始', content: '欢迎来到我们的帮助中心...' },
    pt: { title: 'Como Começar', content: 'Bem-vindo ao nosso centro de ajuda...' },
    ko: { title: '시작하는 방법', content: '헬프센터에 오신 것을 환영합니다...' },
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Multi-Language Support</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Globe className="h-3 w-3" />
          <span>{languages.length} Languages</span>
        </div>
      </div>

      {/* Language Switcher Preview */}
      <div className="mb-4 overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
        {/* Preview Header with Language Selector */}
        <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary/40" />
            <span className="text-xs font-semibold text-foreground">Help Center</span>
          </div>

          {/* Language Dropdown Trigger */}
          <div className="relative">
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-1.5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <span className="text-base">{selectedLang.flag}</span>
              <span className="text-xs font-semibold text-foreground">
                {selectedLang.nativeName}
              </span>
              <motion.svg
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="h-3 w-3 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-lg border border-border/50 bg-card shadow-xl"
                >
                  <div className="max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang);
                          setIsDropdownOpen(false);
                        }}
                        whileHover={{ backgroundColor: 'hsl(var(--primary) / 0.05)' }}
                        className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <div>
                            <p className="text-xs font-semibold text-foreground">
                              {lang.nativeName}
                            </p>
                            <p className="text-xs text-muted-foreground">{lang.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {lang.articleCount}
                          </span>
                          {selectedLang.code === lang.code && (
                            <Check className="h-3 w-3 text-primary" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Preview Content with Translation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLang.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 p-4"
          >
            {/* Article Title */}
            <div className="rounded-lg bg-primary/10 px-3 py-2">
              <p className="text-xs font-bold text-primary">
                {sampleArticle[selectedLang.code as keyof typeof sampleArticle].title}
              </p>
            </div>

            {/* Article Content */}
            <p className="text-xs leading-relaxed text-muted-foreground">
              {sampleArticle[selectedLang.code as keyof typeof sampleArticle].content}
            </p>

            {/* Mock Content Lines */}
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-muted/60" />
              <div className="h-2 w-5/6 rounded bg-muted/60" />
              <div className="h-2 w-4/6 rounded bg-muted/60" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Language Coverage Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center">
          <p className="text-lg font-bold text-foreground">{selectedLang.articleCount}</p>
          <p className="text-xs text-muted-foreground">Articles</p>
        </div>
        <div className="rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center">
          <p className="text-lg font-bold text-primary">
            {Math.round((selectedLang.articleCount / 248) * 100)}%
          </p>
          <p className="text-xs text-muted-foreground">Coverage</p>
        </div>
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Auto-detect visitor language + manual switching
        </p>
      </motion.div>
    </div>
  );
};

export default LanguageSwitcherDemo;
