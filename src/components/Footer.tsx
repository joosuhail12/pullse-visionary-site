import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";
import logoIcon from "@/assets/logo-icon-purple.png";
import logoText from "@/assets/logo-text-navy.png";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Overview", path: "/product" },
        { name: "Inbox & Channels", path: "/product/inbox-channels" },
        { name: "AI Suite", path: "/product/ai-suite" },
        { name: "Analytics", path: "/product/analytics" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "B2B SaaS", path: "/solutions/b2b-saas" },
        { name: "Ecommerce", path: "/solutions/ecommerce" },
        { name: "Fintech", path: "/solutions/fintech" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", path: "/company" },
        { name: "Careers", path: "/company#careers" },
        { name: "Contact", path: "/contact-sales" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/50 glass mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Logo & Social */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src={logoIcon} alt="Pullse" width={40} height={40} priority />
              <Image src={logoText} alt="Pullse" width={120} height={32} priority />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered customer support platform for modern teams.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Pullse. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/legal"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/legal"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/legal"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
