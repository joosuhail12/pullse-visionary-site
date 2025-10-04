import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon-purple.png";
import logoText from "@/assets/logo-text-navy.png";
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
            {links.map((link, index) => <Link key={link.path} to={link.path} className="relative block px-3.5 py-2.5 text-xs text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 hover:translate-x-0.5" style={{
          animationDelay: `${index * 30}ms`
        }}>
                {link.name}
              </Link>)}
          </div>}
      </div>;
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isScrolled ? "pt-2 px-4" : "pt-4 px-4"}`}>
      <div className={`mx-auto transition-all duration-700 ease-in-out ${isScrolled ? "w-[75%] max-w-[960px] backdrop-blur-2xl bg-background/70 border border-white/10 shadow-2xl shadow-primary/10 py-1.5" : "max-w-7xl backdrop-blur-xl bg-background/50 border border-white/5 py-2.5"} rounded-[1.25rem] px-4`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg group-hover:bg-primary/30 transition-all duration-300"></div>
              <img 
                src={logoIcon} 
                alt="Pullse" 
                className={`relative transform group-hover:scale-110 transition-all duration-700 ease-in-out ${
                  isScrolled ? 'h-7 w-7' : 'h-9 w-9'
                }`} 
              />
            </div>
            <img 
              src={logoText} 
              alt="Pullse" 
              className={`transform group-hover:scale-105 transition-all duration-700 ease-in-out ${
                isScrolled ? 'h-0 w-0 opacity-0' : 'h-5 opacity-100'
              }`} 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 relative">
            <NavDropdown title="Product" links={productLinks} />
            <Link to="/integrations" className="text-xs font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1.5 px-2 rounded-lg hover:bg-primary/5">
              Integrations
            </Link>
            <NavDropdown title="Solutions" links={solutionsLinks} />
            <Link to="/pricing" className="text-xs font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1.5 px-2 rounded-lg hover:bg-primary/5">
              Pricing
            </Link>
            <NavDropdown title="Resources" links={resourcesLinks} />
            <Link to="/compare" className="text-xs font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1.5 px-2 rounded-lg hover:bg-primary/5">
              Compare
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Button asChild className={`text-xs bg-primary hover:bg-primary/90 relative overflow-hidden group/btn hover:scale-[1.02] transition-all duration-700 ease-in-out shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 ${
              isScrolled ? 'h-7 px-3' : 'h-8 px-4'
            }`}>
              <Link to="/contact-sales">
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
              <Link to="/product" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Product
              </Link>
              <Link to="/integrations" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Integrations
              </Link>
              <Link to="/solutions" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Solutions
              </Link>
              <Link to="/pricing" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Pricing
              </Link>
              <Link to="/resources" className="px-3.5 py-2.5 text-xs hover:bg-primary/10 rounded-lg transition-all duration-200">
                Resources
              </Link>
              <div className="border-t border-white/10 my-2"></div>
              <Button asChild className="w-full h-8 text-xs shadow-lg shadow-primary/25">
                <Link to="/contact-sales">Book a Demo</Link>
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;