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

  const productLinks = [
    { name: "Overview", path: "/product" },
    { name: "Inbox & Channels", path: "/product/inbox-channels" },
    { name: "Workflows & Routing", path: "/product/workflows-routing" },
    { name: "AI Suite", path: "/product/ai-suite" },
    { name: "AI Engine", path: "/product/ai-engine" },
    { name: "Analytics", path: "/product/analytics" },
    { name: "Auto-QA", path: "/product/auto-qa" },
    { name: "Knowledge Bases", path: "/product/knowledge-bases" },
  ];

  const solutionsLinks = [
    { name: "Solutions Hub", path: "/solutions" },
    { name: "For B2B SaaS", path: "/solutions/b2b-saas" },
    { name: "For Ecommerce", path: "/solutions/ecommerce" },
  ];

  const resourcesLinks = [
    { name: "Resources Hub", path: "/resources" },
    { name: "Documentation", path: "/docs" },
    { name: "Product Tour", path: "/product-tour" },
    { name: "Changelog", path: "/changelog" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "Blog", path: "/blog" },
    { name: "Webinars", path: "/webinars" },
    { name: "Status", path: "/status" },
  ];

  const NavDropdown = ({ 
    title, 
    links 
  }: { 
    title: string; 
    links: { name: string; path: string }[] 
  }) => {
    const isOpen = openDropdown === title;
    
    return (
      <div
        className="relative group"
        onMouseEnter={() => setOpenDropdown(title)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105 relative py-2">
          {title}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          {isOpen && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 animate-pulse"></span>
          )}
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-3 w-56 backdrop-blur-2xl bg-background/60 border border-primary/20 rounded-2xl p-3 animate-fade-in z-50 shadow-2xl shadow-primary/10">
            {links.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-xl transition-all duration-200 hover:translate-x-1 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "pt-4 px-4" : "pt-6 px-4"
      }`}
    >
      <div className={`container mx-auto transition-all duration-500 ${
        isScrolled 
          ? "backdrop-blur-xl bg-background/40 border border-primary/10 shadow-2xl shadow-primary/5" 
          : "backdrop-blur-md bg-background/20 border border-primary/5"
      } rounded-2xl px-6 py-4`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:bg-primary/30 transition-all duration-300"></div>
              <img src={logoIcon} alt="Pullse" className="h-10 w-10 relative transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <img src={logoText} alt="Pullse" className="h-8 transform group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-xl"></div>
            <NavDropdown title="Product" links={productLinks} />
            <Link
              to="/integrations"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105 relative py-2 group/link"
            >
              Integrations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/0 group-hover/link:w-full transition-all duration-300"></span>
            </Link>
            <NavDropdown title="Solutions" links={solutionsLinks} />
            <Link
              to="/pricing"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105 relative py-2 group/link"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/0 group-hover/link:w-full transition-all duration-300"></span>
            </Link>
            <NavDropdown title="Resources" links={resourcesLinks} />
            <Link
              to="/compare"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105 relative py-2 group/link"
            >
              Compare
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/0 group-hover/link:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild className="hover:scale-105 transition-transform duration-300">
              <Link to="/contact-sales">Contact Sales</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 relative overflow-hidden group/btn hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
              <Link to="/contact-sales">
                <span className="relative z-10">Book a Demo</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative group/menu p-2 hover:bg-primary/10 rounded-xl transition-all duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover/menu:opacity-100 transition-opacity duration-300 blur"></div>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 relative z-10 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 relative z-10" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 backdrop-blur-2xl bg-background/60 border border-primary/20 rounded-2xl p-4 animate-fade-in shadow-2xl shadow-primary/10">
            <div className="flex flex-col gap-2">
              <Link
                to="/product"
                className="px-4 py-3 text-sm hover:bg-primary/10 rounded-xl transition-all duration-200 hover:translate-x-1"
              >
                Product
              </Link>
              <Link
                to="/integrations"
                className="px-4 py-3 text-sm hover:bg-primary/10 rounded-xl transition-all duration-200 hover:translate-x-1"
              >
                Integrations
              </Link>
              <Link
                to="/solutions"
                className="px-4 py-3 text-sm hover:bg-primary/10 rounded-xl transition-all duration-200 hover:translate-x-1"
              >
                Solutions
              </Link>
              <Link
                to="/pricing"
                className="px-4 py-3 text-sm hover:bg-primary/10 rounded-xl transition-all duration-200 hover:translate-x-1"
              >
                Pricing
              </Link>
              <Link
                to="/resources"
                className="px-4 py-3 text-sm hover:bg-primary/10 rounded-xl transition-all duration-200 hover:translate-x-1"
              >
                Resources
              </Link>
              <div className="border-t border-primary/20 my-2"></div>
              <Button asChild className="w-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20">
                <Link to="/contact-sales">Book a Demo</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
