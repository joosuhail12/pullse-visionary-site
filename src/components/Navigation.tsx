'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navigation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Smooth interpolation from 0 to 1 between 0px and 100px scroll
          const progress = Math.min(scrollY / 100, 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);
  
  const isScrolled = scrollProgress > 0.5;
  const productLinks = [{
    name: "Overview",
    path: "/product"
  }, {
    name: "Inbox & Channels",
    path: "/product/inbox-channels"
  }, {
    name: "Workflows & Routing",
    path: "/product/workflows-routing"
  }, {
    name: "AI Suite",
    path: "/product/ai-suite"
  }, {
    name: "AI Engine",
    path: "/product/ai-engine"
  }, {
    name: "Analytics",
    path: "/product/analytics"
  }, {
    name: "Auto-QA",
    path: "/product/auto-qa"
  }, {
    name: "Knowledge Bases",
    path: "/product/knowledge-bases"
  }];
  const solutionsLinks = [{
    name: "Solutions Hub",
    path: "/solutions"
  }, {
    name: "For B2B SaaS",
    path: "/solutions/b2b-saas"
  }, {
    name: "For Ecommerce",
    path: "/solutions/ecommerce"
  }];
  const resourcesLinks = [{
    name: "Resources Hub",
    path: "/resources"
  }, {
    name: "Documentation",
    path: "/docs"
  }, {
    name: "Product Tour",
    path: "/product-tour"
  }, {
    name: "Changelog",
    path: "/changelog"
  }, {
    name: "Roadmap",
    path: "/roadmap"
  }, {
    name: "Blog",
    path: "/blog"
  }, {
    name: "Webinars",
    path: "/webinars"
  }, {
    name: "Status",
    path: "/status"
  }];
  const NavDropdown = ({
    title,
    links
  }: {
    title: string;
    links: {
      name: string;
      path: string;
    }[];
  }) => {
    const isOpen = openDropdown === title;
    return <div className="relative group" onMouseEnter={() => setOpenDropdown(title)} onMouseLeave={() => setOpenDropdown(null)}>
        <button className="flex items-center gap-1 text-xs font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1.5 px-2 rounded-lg hover:bg-primary/5">
          {title}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          {isOpen && <span className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></span>}
        </button>
        
        {isOpen && <div className="absolute top-full left-0 mt-2 w-56 backdrop-blur-2xl bg-background/95 border border-white/10 rounded-xl p-2 animate-fade-in z-50 shadow-2xl shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl pointer-events-none"></div>
            {links.map((link, index) => <Link key={link.path} href={link.path} className="relative block px-3.5 py-2.5 text-xs text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:translate-x-0.5" style={{
          animationDelay: `${index * 30}ms`
        }}>
                {link.name}
              </Link>)}
          </div>}
      </div>;
  };
  // Calculate smooth scale values based on scroll progress
  const navScale = 1 - (scrollProgress * 0.25); // 1 to 0.75
  const logoScale = 1 - (scrollProgress * 0.22); // Slightly less aggressive
  const textOpacity = 1 - scrollProgress;
  const gapValue = 6 - (scrollProgress * 3); // 6 to 3 (in units)
  const bgOpacity = 0.5 + scrollProgress * 0.2; // 0.5 to 0.7
  const borderOpacity = 0.05 + scrollProgress * 0.05; // 0.05 to 0.1
  const fontSize = 0.75 + (scrollProgress * 0.125); // 0.75rem to 0.875rem (12px to 14px)
  const navItemFontSize = 0.75 + (scrollProgress * 0.1875); // 0.75rem to 0.9375rem (12px to 15px)
  
  return <nav className="fixed top-0 left-0 right-0 z-50" style={{ paddingTop: `${16 - scrollProgress * 8}px`, paddingLeft: '1rem', paddingRight: '1rem' }}>
      <div 
        className="max-w-7xl mx-auto rounded-[1.25rem] px-4 backdrop-blur-xl border"
        style={{ 
          transform: `scale(${navScale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s, border-color 0.3s, box-shadow 0.3s, font-size 0.3s',
          backgroundColor: `hsl(var(--background) / ${bgOpacity})`,
          borderColor: `hsl(var(--border) / ${borderOpacity})`,
          boxShadow: scrollProgress > 0.5 ? '0 25px 50px -12px hsl(var(--primary) / 0.1)' : 'none',
          paddingTop: `${10 + (1 - scrollProgress) * 4}px`,
          paddingBottom: `${6 + (1 - scrollProgress) * 4}px`,
          fontSize: `${fontSize}rem`,
          willChange: 'transform'
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" style={{ gap: `${10 * (1 - scrollProgress * 0.2)}px` }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg group-hover:bg-primary/30 transition-all duration-300"></div>
              <div
                className="relative transform group-hover:scale-110 font-bold text-primary flex items-center justify-center"
                style={{
                  width: `${36 - scrollProgress * 8}px`,
                  height: `${36 - scrollProgress * 8}px`,
                  fontSize: `${20 - scrollProgress * 4}px`,
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'width, height, font-size'
                }}
              >
                P
              </div>
            </div>
            <div
              className="transform group-hover:scale-105 font-bold text-primary"
              style={{
                fontSize: '18px',
                opacity: textOpacity,
                transform: `scaleX(${textOpacity})`,
                transformOrigin: 'left center',
                transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: textOpacity < 0.1 ? 'none' : 'auto',
                willChange: 'opacity, transform'
              }}
            >
              Pullse
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div 
            className="hidden lg:flex items-center relative"
            style={{ 
              gap: `${gapValue * 4}px`,
              fontSize: `${navItemFontSize}rem`,
              transition: 'gap 0.3s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'gap, font-size'
            }}
          >
            <NavDropdown title="Product" links={productLinks} />
            <Link href="/integrations" className="text-xs font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1.5 px-2 rounded-lg hover:bg-primary/5">
              Integrations
            </Link>
            <NavDropdown title="Solutions" links={solutionsLinks} />
            <Link href="/pricing" className="text-xs font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1.5 px-2 rounded-lg hover:bg-primary/5">
              Pricing
            </Link>
            <NavDropdown title="Resources" links={resourcesLinks} />
            <Link href="/compare" className="text-xs font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1.5 px-2 rounded-lg hover:bg-primary/5">
              Compare
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Button 
              asChild 
              className="text-xs bg-primary hover:bg-primary/90 relative overflow-hidden group/btn hover:scale-[1.02] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40"
              style={{ 
                height: `${32 - scrollProgress * 4}px`,
                paddingLeft: `${16 - scrollProgress * 4}px`,
                paddingRight: `${16 - scrollProgress * 4}px`,
                transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'height, padding'
              }}
            >
              <Link href="/contact-sales">
                <span className="relative z-10">Book a Demo</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden relative group/menu p-1.5 hover:bg-primary/10 rounded-lg transition-all duration-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5 transition-transform duration-300 rotate-90" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="lg:hidden mt-3 backdrop-blur-2xl bg-background/95 border border-white/10 rounded-xl p-3 animate-fade-in shadow-2xl shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl pointer-events-none"></div>
            <div className="relative flex flex-col gap-1">
              <Link href="/product" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Product
              </Link>
              <Link href="/integrations" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Integrations
              </Link>
              <Link href="/solutions" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Solutions
              </Link>
              <Link href="/pricing" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Pricing
              </Link>
              <Link href="/resources" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Resources
              </Link>
              <div className="border-t border-white/10 my-2"></div>
              <Button asChild className="w-full h-8 text-xs shadow-lg shadow-primary/25">
                <Link href="/contact-sales">Book a Demo</Link>
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;
