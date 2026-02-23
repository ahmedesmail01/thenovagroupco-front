import { Link } from "@tanstack/react-router";
import logoImg from "../../../public/images/nova-logo.png";

export function Footer() {
  return (
    <footer className="bg-brand-navy pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Info */}
          <div className="space-y-6 max-w-md">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logoImg}
                alt="Nova Group"
                className="w-32.5 h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            N
          </div>
          <span className="text-white font-bold tracking-widest hidden sm:inline">
            NOVA GROUP
          </span> */}
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Nova Group E-Commerce: Empowering Dreams, Building Connections,
              and Creating Opportunities for Holistic Growth and Success
              Together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
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
                  Support
                </button>
              </li>
              <li>
                <button className="hover:text-brand-blue-light transition-colors">
                  Academy
                </button>
              </li>
              <li>
                <button className="hover:text-brand-blue-light transition-colors">
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button className="hover:text-brand-blue-light transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-text-secondary mb-6">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-blue-light">☎</span>
                <span>+971 582 323 368</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-blue-light">📍</span>
                <span>Silicon Oasis - Dubai - UAE</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-blue-light">✉</span>
                <span>info@thenovagroupco.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-4 text-text-secondary">
              <button
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-blue-light hover:text-brand-blue-light transition-colors text-xs"
              >
                f
              </button>
              <button
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-blue-light hover:text-brand-blue-light transition-colors text-xs"
              >
                ig
              </button>
              <button
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-blue-light hover:text-brand-blue-light transition-colors text-xs"
              >
                t
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full">
        <div className="bg-gradient-to-r from-[#245d8f] to-[#163b63] px-4 sm:px-6 lg:px-8 py-4 text-center text-[11px] text-text-secondary">
          <p>
            © {new Date().getFullYear()} The Nova Group CO. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
