import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPurple from "@/assets/logo-purple.png";

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
        <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
          {title}
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 glass-strong rounded-lg p-2 animate-fade-in z-50">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-md transition-colors"
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-3" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoPurple} alt="Pullse" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pullse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavDropdown title="Product" links={productLinks} />
            <Link
              to="/integrations"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Integrations
            </Link>
            <NavDropdown title="Solutions" links={solutionsLinks} />
            <Link
              to="/pricing"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <NavDropdown title="Resources" links={resourcesLinks} />
            <Link
              to="/compare"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Compare
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/contact-sales">Contact Sales</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/contact-sales">Book a Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 glass-strong rounded-lg p-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                to="/product"
                className="px-4 py-2 text-sm hover:bg-primary/10 rounded-md"
              >
                Product
              </Link>
              <Link
                to="/integrations"
                className="px-4 py-2 text-sm hover:bg-primary/10 rounded-md"
              >
                Integrations
              </Link>
              <Link
                to="/solutions"
                className="px-4 py-2 text-sm hover:bg-primary/10 rounded-md"
              >
                Solutions
              </Link>
              <Link
                to="/pricing"
                className="px-4 py-2 text-sm hover:bg-primary/10 rounded-md"
              >
                Pricing
              </Link>
              <Link
                to="/resources"
                className="px-4 py-2 text-sm hover:bg-primary/10 rounded-md"
              >
                Resources
              </Link>
              <div className="border-t border-border my-2"></div>
              <Button asChild className="w-full">
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
