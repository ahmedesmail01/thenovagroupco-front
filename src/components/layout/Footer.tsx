import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-brand-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <span className="text-white font-bold tracking-widest text-lg">
                NOVA GROUP
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Nova Group empowers growth and transformation worldwide through
              innovative education and community engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li>
                <Link
                  to="/"
                  className="hover:text-brand-blue-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-brand-blue-light transition-colors"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-brand-blue-light transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <button className="hover:text-brand-blue-light transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li>
                <button className="hover:text-brand-blue-light transition-colors">
                  Help Center
                </button>
              </li>
              <li>
                <button className="hover:text-brand-blue-light transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-brand-blue-light transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="hover:text-brand-blue-light transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Stay Connected</h3>
            <p className="text-text-secondary text-sm mb-4">
              Join our community for regular updates.
            </p>
            <div className="flex gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-brand-navy bg-brand-surface flex items-center justify-center text-[10px] text-text-muted"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted font-medium">
          <p>
            © {new Date().getFullYear()} Nova Group CO. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Powered by Innovation</span>
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
