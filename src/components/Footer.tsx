'use client';

import Link from "next/link";
import Image from "next/image";
import { X, Linkedin, ArrowRight, Mail } from "lucide-react";
import LightRays from "@/components/LightRays";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import NewsletterCTA from "@/components/NewsletterCTA";
import logoIcon from "@/assets/pullse-logomark.svg";
import logoText from "@/assets/Pullse-wordmark.svg";

const Footer = () => {
  const { openPreferences } = useCookieConsent();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Platform Overview", path: "/product" },
        { name: "Inbox & Channels", path: "/product/inbox-channels" },
        { name: "Workflows & Routing", path: "/product/workflows-routing" },
        { name: "Analytics & Reporting", path: "/product/analytics" },
        { name: "AI Engine", path: "/product/ai-engine" },
        { name: "AI Suite", path: "/product/ai-suite" },
        { name: "Auto QA", path: "/product/auto-qa" },
        { name: "Help Center", path: "/product/appo" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "All Solutions", path: "/solutions" },
        { name: "B2B SaaS", path: "/solutions/b2b-saas" },
        { name: "E-commerce", path: "/solutions/ecommerce" },
        { name: "Fintech", path: "/solutions/fintech" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
        { name: "Compare", path: "/compare" },
        { name: "Startup Program", path: "/apply/startup" },
        { name: "Pricing", path: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Pullse", path: "/company" },
        { name: "Contact Sales", path: "/contact-sales" },
        { name: "Legal Center", path: "/legal" },
      ],
    },
  ];

  return (
    <footer className="relative px-4 md:px-6 pb-4 md:pb-6 mt-16">
      {/* Main Footer Card */}
      <div className="relative rounded-3xl border border-border/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
        {/* Light Rays Background Effect */}
        <div className="absolute inset-0 opacity-40 rounded-3xl">
          <LightRays
            raysOrigin="top-center"
            raysColor="#d800f5"
            raysSpeed={1.5}
            lightSpread={0.9}
            rayLength={3}
            followMouse={true}
            fadeDistance={1.5}
            saturation={1.3}
            mouseInfluence={0.2}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
          />
        </div>

        {/* Decorative gradient accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10 rounded-t-3xl" />

        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] z-10 rounded-3xl" />

        <div className="container relative z-20 mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            {/* Brand & Newsletter - Takes up 2 columns on desktop */}
            <div className="col-span-1 md:col-span-2 space-y-5 md:space-y-6 lg:space-y-7">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src={logoIcon}
                    alt="Pullse"
                    width={40}
                    height={40}
                    sizes="40px"
                    className="relative transition-transform group-hover:scale-110 duration-300"
                  />
                </div>
                <Image
                  src={logoText}
                  alt="Pullse"
                  width={120}
                  height={32}
                  sizes="120px"
                />
              </Link>

              {/* Tagline */}
              <p className="text-sm leading-relaxed text-muted-foreground/90 max-w-xs">
                AI-powered customer support that scales with your business. Automate the repetitive, empower your team.
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
                    <div className="p-1 rounded-md bg-primary/10">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Stay Updated
                  </h3>
                  <p className="text-xs text-muted-foreground/90">
                    Product updates, tips, and insights.
                  </p>
                </div>

                <NewsletterCTA variant="compact" source="footer" />
              </div>

              {/* Social Links */}
              <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
                <a
                  href="https://x.com/pullse_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 md:hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="X (formerly Twitter)"
                >
                  <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                  <X className="h-5 w-5 sm:h-6 sm:w-6 relative" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 md:hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 relative" />
                </a>
              </div>
            </div>

            {/* Footer Link Sections - 4 columns */}
            {footerSections.map((section, idx) => (
              <div key={section.title} className="hidden md:block space-y-3 md:space-y-4">
                <h3 className="font-semibold text-foreground text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-primary to-primary/40 rounded-full" />
                  {section.title}
                </h3>
                <ul className="space-y-2 md:space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className="text-xs sm:text-sm text-muted-foreground/90 hover:text-primary transition-all duration-200 inline-flex items-center group py-1 min-h-[36px]"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Inside Card */}
        <div className="relative border-t border-border/50 z-20">
          {/* Decorative top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
              <p className="text-xs text-muted-foreground/80 font-medium">
                © 2025 Pullse. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-1 items-center">
                {[
                  { href: "/legal/terms", label: "Terms" },
                  { href: "/legal/privacy", label: "Privacy" },
                  { href: "/legal/cookies", label: "Cookies" },
                  { href: "/legal/data-processing", label: "DPA" },
                  { href: "/legal/acceptable-use", label: "Acceptable Use" }
                ].map((link, idx, arr) => (
                  <div key={link.href} className="flex items-center gap-1">
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted/50 min-h-[36px] inline-flex items-center"
                    >
                      {link.label}
                    </Link>
                    {idx < arr.length - 1 && (
                      <span className="text-muted-foreground/30">•</span>
                    )}
                  </div>
                ))}

                {/* Cookie Preferences Button */}
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground/30">•</span>
                  <button
                    onClick={openPreferences}
                    className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted/50 min-h-[36px] inline-flex items-center"
                  >
                    Cookie Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
