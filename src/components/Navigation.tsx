"use client";

import { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Menu, X, ChevronDown, ArrowRight,
  Brain, Workflow, Inbox, BookOpen, CheckCircle2, Wand2,
  BarChart3, Building2, Banknote, ShoppingCart,
  Activity, Users, Phone,
  Newspaper, LayoutGrid
} from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import logoIcon from "@/assets/pullse-logomark.svg";
import logoText from "@/assets/Pullse-wordmark.svg";

// Navigation structure with icons - mapped to actual pages
const navigationData = {
  platform: [
    {
      category: "Overview",
      isOverview: true,
      links: [
        { href: "/product", label: "Platform Overview", description: "Explore all features", icon: LayoutGrid },
      ],
    },
    {
      category: "Core Features",
      links: [
        { href: "/product/inbox-channels", label: "Inbox & Channels", description: "Unified communication hub", icon: Inbox },
        { href: "/product/workflows-routing", label: "Workflows & Routing", description: "Intelligent automation", icon: Workflow },
        { href: "/product/analytics", label: "Analytics & Reporting", description: "Data-driven insights", icon: BarChart3 },
        { href: "/product/appo", label: "Help Center", description: "Self-service knowledge base", icon: BookOpen },
      ],
    },
    {
      category: "AI Capabilities",
      links: [
        { href: "/product/ai-engine", label: "AI Engine", description: "Autonomous support agent", icon: Brain },
        { href: "/product/ai-suite", label: "AI Suite", description: "Complete AI toolkit", icon: Wand2 },
        { href: "/product/auto-qa", label: "Auto QA", description: "Quality assurance automation", icon: CheckCircle2 },
      ],
    },
    {
      category: "Explore",
      links: [
        { href: "/compare", label: "Compare", description: "Pullse vs competitors", icon: Activity },
      ],
    },
  ],
  solutions: [
    { href: "/solutions", label: "All Solutions", description: "View all use cases", icon: LayoutGrid },
    { href: "/solutions/b2b-saas", label: "B2B SaaS", description: "Scale support efficiently", icon: Building2 },
    { href: "/solutions/ecommerce", label: "E-commerce", description: "Boost sales & retention", icon: ShoppingCart },
    { href: "/solutions/fintech", label: "Fintech", description: "Secure & compliant", icon: Banknote },
  ],
  resources: [
    {
      category: "Learn",
      links: [
        { href: "/blog", label: "Blog", description: "Latest insights & updates", icon: Newspaper },
        { href: "/compare", label: "Comparisons", description: "How we compare", icon: Activity },
      ],
    },
  ],
  company: [
    {
      category: "About",
      links: [
        { href: "/company", label: "About Pullse", description: "Our story & mission", icon: Users },
        { href: "/contact-sales", label: "Contact Sales", description: "Get in touch", icon: Phone },
      ],
    },
  ],
};

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Smooth spring animations for scroll-based transforms
  const scrollProgress = useTransform(scrollY, [0, 100], [0, 1]);
  const smoothProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30 });

  // Transform properties based on scroll
  const navPadding = useTransform(smoothProgress, [0, 1], [24, 12]);
  const navScale = useTransform(smoothProgress, [0, 1], [1, 0.98]);
  const borderRadius = useTransform(smoothProgress, [0, 1], [24, 16]);
  const navOpacity = useTransform(smoothProgress, [0, 1], [0.85, 0.90]); // More translucent, slightly increases on scroll
  const blur = useTransform(smoothProgress, [0, 1], [40, 40]); // Match dropdown: backdrop-blur-2xl
  const logoScale = useTransform(smoothProgress, [0, 1], [1, 0.85]);

  // Magnetic logo effect
  const handleLogoMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;

    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 80) {
      const strength = (80 - distance) / 80;
      setLogoPosition({
        x: deltaX * strength * 0.15,
        y: deltaY * strength * 0.15,
      });
    }
  };

  const handleLogoMouseLeave = () => {
    setLogoPosition({ x: 0, y: 0 });
  };

  return (
    <>
      {/* Floating Navigation Container */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-[env(safe-area-inset-top)]"
        style={{
          paddingTop: navPadding,
        }}
      >
        <motion.header
          className="max-w-7xl mx-auto relative"
          style={{
            scale: navScale,
            borderRadius: borderRadius,
          }}
        >
          {/* Glassmorphism background - matches dropdown menus exactly */}
          <motion.div
            className="absolute inset-0 border overflow-hidden"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${navOpacity.get()})`,
              backdropFilter: `blur(${blur.get()}px)`,
              borderRadius: borderRadius,
              borderColor: `rgba(224, 231, 255, 0.5)`, // border-purple-100/50 (matches dropdown)
              boxShadow: `0 25px 50px -12px rgba(124, 58, 237, 0.1)`, // shadow-2xl shadow-purple-500/10 (matches dropdown)
            }}
          >
            {/* Noise texture overlay for subtle depth */}
            <div
              className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'noise\' x=\'0\' y=\'0\'%3E%3CfeTurbulence baseFrequency=\'.75\' stitchTiles=\'stitch\' type=\'fractalNoise\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Cpath d=\'M0 0h300v300H0z\' filter=\'url(%23noise)\' opacity=\'.05\'/%3E%3C/svg%3E")',
              }}
            />

            {/* Clean frosted glass highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          </motion.div>

          <nav className="relative px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo with magnetic effect */}
              <motion.div
                ref={logoRef}
                onMouseMove={handleLogoMouseMove}
                onMouseLeave={handleLogoMouseLeave}
                style={{
                  x: logoPosition.x,
                  y: logoPosition.y,
                  scale: logoScale,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                <Link href="/" className="flex items-center space-x-2 group relative">
                  {/* Enhanced pulsing glow effect */}
                  <motion.div
                    className="absolute inset-0 -m-4 rounded-full blur-2xl"
                    style={{
                      background: "radial-gradient(circle, rgba(139, 92, 246, 0.25), rgba(236, 72, 153, 0.18), transparent)",
                    }}
                    animate={{
                      opacity: [0.2, 0.55, 0.2],
                      scale: [0.9, 1.15, 0.9],
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.03, rotate: 1.5 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  >
                    <Image
                      src={logoIcon}
                      alt="Pullse"
                      width={40}
                      height={40}
                      sizes="40px"
                      priority
                      className="w-10 h-10 relative z-10"
                    />
                  </motion.div>

                  <Image
                    src={logoText}
                    alt="Pullse"
                    width={100}
                    height={24}
                    sizes="100px"
                    priority
                    className="h-6 w-auto hidden sm:block relative z-10"
                  />
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <NavigationMenu.Root className="hidden lg:flex" suppressHydrationWarning>
                <NavigationMenu.List className="flex items-center space-x-1">
                  {/* Platform Dropdown */}
                  <NavigationMenu.Item className="relative">
                    <NavigationMenu.Trigger className="group flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50/60 transition-all duration-300 relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/15 via-pink-500/10 to-purple-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <span className="relative z-10">Platform</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180 relative z-10" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-full left-0 w-max max-w-lg p-5 mt-3 origin-top overflow-hidden rounded-2xl border border-purple-100/50 bg-white/98 backdrop-blur-2xl shadow-2xl shadow-purple-500/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                        {/* Featured Overview Card */}
                        {navigationData.platform[0].isOverview && (
                          <div className="mb-4">
                            <NavigationMenu.Link asChild>
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Link
                                  href={navigationData.platform[0].links[0].href}
                                  className="group/featured relative flex items-center gap-3 p-3 rounded-xl border border-purple-200/60 hover:border-purple-300 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/30 hover:from-purple-100/60 hover:via-pink-100/40 hover:to-blue-100/40 transition-all duration-300 overflow-hidden"
                                >
                                  {/* Animated gradient background */}
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover/featured:opacity-100 transition-opacity duration-300"
                                  />

                                  {/* Shimmer effect */}
                                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover/featured:translate-x-[200%] transition-transform duration-1000" />

                                  {/* Icon */}
                                  <motion.div
                                    className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-white flex-shrink-0 shadow-lg shadow-purple-500/30"
                                    whileHover={{ scale: 1.05, rotate: 3 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                  >
                                    <LayoutGrid className="w-6 h-6 relative z-10" />
                                    <motion.div
                                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 blur-lg opacity-50"
                                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                  </motion.div>

                                  {/* Content */}
                                  <div className="flex-1 relative z-10">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-sm font-bold text-gray-900 group-hover/featured:text-purple-600 transition-colors">
                                        {navigationData.platform[0].links[0].label}
                                      </h3>
                                      <motion.div
                                        initial={{ x: 0, opacity: 0 }}
                                        whileHover={{ x: 4, opacity: 1 }}
                                        className="text-purple-600"
                                      >
                                        <ArrowRight className="w-4 h-4" />
                                      </motion.div>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-0.5">
                                      {navigationData.platform[0].links[0].description}
                                    </p>
                                  </div>
                                </Link>
                              </motion.div>
                            </NavigationMenu.Link>

                            {/* Divider */}
                            <div className="mt-4 mb-3 relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-purple-100"></div>
                              </div>
                              <div className="relative flex justify-center">
                                <span className="px-2.5 text-xs font-semibold text-purple-600 bg-white rounded-full">Features</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Platform Categories Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          {navigationData.platform.slice(1).map((category, categoryIndex) => (
                            <div key={category.category}>
                              <h3 className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                                <span className="w-3 h-0.5 bg-gradient-to-r from-purple-600 to-transparent rounded-full" />
                                {category.category}
                              </h3>
                              <div className="space-y-1">
                                {category.links.map((link, linkIndex) => {
                                  const Icon = link.icon;
                                  return (
                                    <NavigationMenu.Link key={link.href} asChild>
                                      <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: ((categoryIndex + 1) * 3 + linkIndex) * 0.03 }}
                                      >
                                        <Link
                                          href={link.href}
                                          className="group/item flex items-start gap-2.5 px-2.5 py-2 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:via-pink-50/30 hover:to-purple-50/50 transition-all duration-300 relative overflow-hidden"
                                        >
                                          {/* Enhanced hover glow effect */}
                                          <span className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/8 via-pink-500/6 to-blue-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                                          {/* Icon container with vibrant gradient */}
                                          <motion.div
                                            className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 text-purple-600 flex-shrink-0"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                          >
                                            <Icon className="w-4.5 h-4.5 relative z-10" />
                                            <motion.div
                                              className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/15 blur-md"
                                              animate={{ opacity: [0, 0.7, 0] }}
                                              transition={{ duration: 2, repeat: Infinity }}
                                            />
                                          </motion.div>

                                          {/* Content */}
                                          <div className="relative z-10 flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-gray-900 group-hover/item:text-purple-600 transition-colors">
                                              {link.label}
                                            </div>
                                            <div className="text-xs text-gray-600 mt-0.5">
                                              {link.description}
                                            </div>
                                          </div>

                                          {/* Arrow icon that appears on hover */}
                                          <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            whileHover={{ opacity: 1, x: 0 }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                          >
                                            <ArrowRight className="w-4 h-4 text-purple-600" />
                                          </motion.div>
                                        </Link>
                                      </motion.div>
                                    </NavigationMenu.Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>

                  {/* Solutions Dropdown */}
                  <NavigationMenu.Item className="relative">
                    <NavigationMenu.Trigger className="group flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50/60 transition-all duration-300 relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/15 via-purple-500/10 to-blue-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <span className="relative z-10">Solutions</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180 relative z-10" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-full left-0 w-max max-w-xs p-5 mt-3 origin-top overflow-hidden rounded-2xl border border-purple-100/50 bg-white/98 backdrop-blur-2xl shadow-2xl shadow-purple-500/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                        {/* Featured "All Solutions" Item */}
                        {navigationData.solutions[0] && (
                          <>
                            <NavigationMenu.Link asChild>
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Link
                                  href={navigationData.solutions[0].href}
                                  className="group/featured relative flex items-center gap-2.5 p-3 mb-3 rounded-xl border border-blue-200/60 hover:border-blue-300 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-teal-50/30 hover:from-blue-100/60 hover:via-purple-100/40 hover:to-teal-100/40 transition-all duration-300 overflow-hidden"
                                >
                                  {/* Hover glow */}
                                  <span className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 opacity-0 group-hover/featured:opacity-100 transition-opacity duration-300" />

                                  {/* Icon */}
                                  <motion.div
                                    className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 text-white flex-shrink-0"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                  >
                                    <LayoutGrid className="w-5 h-5 relative z-10" />
                                  </motion.div>

                                  {/* Content */}
                                  <div className="flex-1 relative z-10">
                                    <div className="text-sm font-bold text-gray-900 group-hover/featured:text-blue-600 transition-colors">
                                      {navigationData.solutions[0].label}
                                    </div>
                                    <div className="text-xs text-gray-600 mt-0.5">
                                      {navigationData.solutions[0].description}
                                    </div>
                                  </div>

                                  <ArrowRight className="w-4 h-4 text-blue-600 opacity-0 group-hover/featured:opacity-100 transition-opacity relative z-10" />
                                </Link>
                              </motion.div>
                            </NavigationMenu.Link>

                            {/* Subtle divider */}
                            <div className="border-t border-blue-100/50 mb-3" />
                          </>
                        )}

                        {/* Regular Solutions Items */}
                        <div className="space-y-2">
                          {navigationData.solutions.slice(1).map((link, index) => {
                            const Icon = link.icon;
                            return (
                              <NavigationMenu.Link key={link.href} asChild>
                                <motion.div
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: (index + 1) * 0.03 }}
                                >
                                  <Link
                                    href={link.href}
                                    className="group/item flex items-center gap-2.5 px-3 py-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:via-purple-50/40 hover:to-teal-50/50 transition-all duration-300 relative overflow-hidden"
                                  >
                                    {/* Enhanced hover glow for solutions */}
                                    <span className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/8 via-purple-500/6 to-teal-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                                    <motion.div
                                      className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100 via-purple-50 to-teal-50 text-blue-600 flex-shrink-0"
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                      <Icon className="w-4.5 h-4.5 relative z-10" />
                                      <motion.div
                                        className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/15 blur-md"
                                        animate={{ opacity: [0, 0.7, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      />
                                    </motion.div>
                                    <div className="flex-1 relative z-10">
                                      <div className="text-sm font-semibold text-gray-900 group-hover/item:text-blue-600 transition-colors">
                                        {link.label}
                                      </div>
                                      <div className="text-xs text-gray-600 mt-0.5">
                                        {link.description}
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                              </NavigationMenu.Link>
                            );
                          })}
                        </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>

                  {/* Resources Dropdown */}
                  <NavigationMenu.Item className="relative">
                    <NavigationMenu.Trigger className="group flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50/60 transition-all duration-300 relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-indigo-500/15 via-blue-500/10 to-purple-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <span className="relative z-10">Resources</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180 relative z-10" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-full left-0 w-max max-w-xs p-5 mt-3 origin-top overflow-hidden rounded-2xl border border-purple-100/50 bg-white/98 backdrop-blur-2xl shadow-2xl shadow-purple-500/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                        {navigationData.resources.map((category, categoryIndex) => (
                          <div key={category.category} className={categoryIndex > 0 ? "mt-4" : ""}>
                            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                              <span className="w-3 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent rounded-full" />
                              {category.category}
                            </h3>
                            <div className="space-y-1">
                              {category.links.map((link, linkIndex) => {
                                const Icon = link.icon;
                                return (
                                  <NavigationMenu.Link key={link.href} asChild>
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: (categoryIndex * 3 + linkIndex) * 0.03 }}
                                    >
                                      <Link
                                        href={link.href}
                                        className="group/item flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:via-purple-50/30 hover:to-indigo-50/50 transition-all duration-300 relative overflow-hidden"
                                      >
                                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/8 to-purple-500/6 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                                        <motion.div
                                          className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-50 text-indigo-600 flex-shrink-0"
                                          whileHover={{ scale: 1.1, rotate: 5 }}
                                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                          <Icon className="w-4.5 h-4.5 relative z-10" />
                                        </motion.div>

                                        <div className="flex-1 relative z-10">
                                          <div className="text-sm font-semibold text-gray-900 group-hover/item:text-indigo-600 transition-colors">
                                            {link.label}
                                          </div>
                                          <div className="text-xs text-gray-600 mt-0.5">
                                            {link.description}
                                          </div>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  </NavigationMenu.Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>

                  {/* Company Dropdown */}
                  <NavigationMenu.Item className="relative">
                    <NavigationMenu.Trigger className="group flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50/60 transition-all duration-300 relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/15 via-blue-500/10 to-teal-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <span className="relative z-10">Company</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180 relative z-10" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-full left-0 w-max max-w-xs p-5 mt-3 origin-top overflow-hidden rounded-2xl border border-purple-100/50 bg-white/98 backdrop-blur-2xl shadow-2xl shadow-purple-500/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                        {navigationData.company.map((category, categoryIndex) => (
                          <div key={category.category} className={categoryIndex > 0 ? "mt-4" : ""}>
                            <h3 className="text-xs font-bold text-teal-600 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                              <span className="w-3 h-0.5 bg-gradient-to-r from-teal-600 to-transparent rounded-full" />
                              {category.category}
                            </h3>
                            <div className="space-y-1">
                              {category.links.map((link, linkIndex) => {
                                const Icon = link.icon;
                                return (
                                  <NavigationMenu.Link key={link.href} asChild>
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: (categoryIndex * 3 + linkIndex) * 0.03 }}
                                    >
                                      <Link
                                        href={link.href}
                                        className="group/item flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-gradient-to-br hover:from-teal-50 hover:via-blue-50/30 hover:to-teal-50/50 transition-all duration-300 relative overflow-hidden"
                                      >
                                        <span className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/8 to-blue-500/6 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                                        <motion.div
                                          className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-teal-100 via-blue-50 to-teal-50 text-teal-600 flex-shrink-0"
                                          whileHover={{ scale: 1.1, rotate: 5 }}
                                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                          <Icon className="w-4.5 h-4.5 relative z-10" />
                                        </motion.div>

                                        <div className="flex-1 relative z-10">
                                          <div className="text-sm font-semibold text-gray-900 group-hover/item:text-teal-600 transition-colors">
                                            {link.label}
                                          </div>
                                          <div className="text-xs text-gray-600 mt-0.5">
                                            {link.description}
                                          </div>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  </NavigationMenu.Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>

                  {/* Pricing Link */}
                  <NavigationMenu.Item>
                    <Link
                      href="/pricing"
                      className="group flex items-center px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50/60 transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/15 via-purple-500/10 to-pink-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <span className="relative z-10">Pricing</span>
                    </Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu.Root>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-3">
                {/* Login Button - Enhanced */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block"
                >
                  <Link
                    href="https://app.pullse.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 border-2 border-gray-200 hover:border-purple-400 overflow-hidden transition-all duration-300"
                  >
                    {/* Animated gradient background fill */}
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50/50 to-purple-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 group-hover:text-purple-600 transition-colors font-semibold">Login</span>
                  </Link>
                </motion.div>

                {/* Contact Sales Button - Premium Animated with Rainbow Gradient */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative hidden lg:block"
                >
                  {/* Enhanced ambient pulsing glow with multiple colors */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.5), rgba(59, 130, 246, 0.4))",
                    }}
                    animate={{
                      opacity: [0.6, 0.9, 0.6],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <Link
                    href="/contact-sales"
                    className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(236, 72, 153) 50%, rgb(59, 130, 246) 100%)",
                      backgroundSize: "200% 200%",
                      boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4), 0 4px 12px rgba(236, 72, 153, 0.3)",
                    }}
                  >
                    {/* Animated gradient shift */}
                    <motion.span
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(236, 72, 153) 50%, rgb(59, 130, 246) 100%)",
                        backgroundSize: "200% 200%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Enhanced shimmer effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                    <span className="relative z-10">Contact Sales</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="relative z-10"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Mobile Menu Button - Enhanced */}
                <motion.button
                  onClick={() => setMobileMenuOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="lg:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-700 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </nav>
        </motion.header>
      </motion.div>

      {/* Mobile Menu Dialog - Enhanced */}
      <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white/95 backdrop-blur-2xl shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=closed]:duration-300 data-[state=open]:duration-500">
            <VisuallyHidden.Root>
              <Dialog.Title>Mobile Navigation Menu</Dialog.Title>
            </VisuallyHidden.Root>
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Image src={logoIcon} alt="Pullse" width={32} height={32} sizes="32px" className="w-8 h-8" />
                  <Image src={logoText} alt="Pullse" width={100} height={24} sizes="100px" className="h-6 w-auto" />
                </div>
                <Dialog.Close className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close menu">
                  <X className="w-6 h-6" />
                </Dialog.Close>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <Accordion.Root type="single" collapsible className="space-y-2">
                  {/* Platform Accordion */}
                  <Accordion.Item value="platform" className="border border-gray-100 rounded-lg overflow-hidden">
                    <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors group">
                      Platform
                      <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-4 pb-4 pt-2 space-y-4">
                        {navigationData.platform.map((category) => (
                          <div key={category.category}>
                            {!category.isOverview && (
                              <h3 className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
                                {category.category}
                              </h3>
                            )}
                            <div className="space-y-1">
                              {category.links.map((link) => {
                                const Icon = link.icon;
                                return (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 transition-colors min-h-[44px]"
                                  >
                                    <Icon className="w-5 h-5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{link.label}</div>
                                      <div className="text-xs text-gray-600 mt-0.5">{link.description}</div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>

                  {/* Solutions Accordion */}
                  <Accordion.Item value="solutions" className="border border-gray-100 rounded-lg overflow-hidden">
                    <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors group">
                      Solutions
                      <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-4 pb-4 pt-2 space-y-1">
                        {navigationData.solutions.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                            >
                              <Icon className="w-4 h-4 text-purple-600" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{link.label}</div>
                                <div className="text-xs text-gray-600 mt-0.5">{link.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>

                  {/* Resources Accordion */}
                  <Accordion.Item value="resources" className="border border-gray-100 rounded-lg overflow-hidden">
                    <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors group">
                      Resources
                      <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-4 pb-4 pt-2 space-y-4">
                        {navigationData.resources.map((category) => (
                          <div key={category.category}>
                            <h3 className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
                              {category.category}
                            </h3>
                            <div className="space-y-1">
                              {category.links.map((link) => {
                                const Icon = link.icon;
                                return (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 transition-colors min-h-[44px]"
                                  >
                                    <Icon className="w-5 h-5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{link.label}</div>
                                      <div className="text-xs text-gray-600 mt-0.5">{link.description}</div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>

                  {/* Company Accordion */}
                  <Accordion.Item value="company" className="border border-gray-100 rounded-lg overflow-hidden">
                    <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors group">
                      Company
                      <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-4 pb-4 pt-2 space-y-4">
                        {navigationData.company.map((category) => (
                          <div key={category.category}>
                            <h3 className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">
                              {category.category}
                            </h3>
                            <div className="space-y-1">
                              {category.links.map((link) => {
                                const Icon = link.icon;
                                return (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-teal-50 transition-colors min-h-[44px]"
                                  >
                                    <Icon className="w-5 h-5 sm:w-4 sm:h-4 text-teal-600 shrink-0" />
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{link.label}</div>
                                      <div className="text-xs text-gray-600 mt-0.5">{link.description}</div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>

                {/* Direct Link - Pricing */}
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 mt-2 px-4 py-3 rounded-lg border border-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  <BarChart3 className="w-5 h-5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                  Pricing
                </Link>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-gray-100 space-y-3">
                <Link
                  href="https://app.pullse.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-full text-center text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  Login
                </Link>
                <Link
                  href="/contact-sales"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-full text-center text-sm font-semibold text-white shadow-lg transition-all relative overflow-hidden min-h-[44px]"
                  style={{
                    background: "linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(236, 72, 153) 50%, rgb(59, 130, 246) 100%)",
                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3), 0 4px 12px rgba(236, 72, 153, 0.25)",
                  }}
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default Navigation;
