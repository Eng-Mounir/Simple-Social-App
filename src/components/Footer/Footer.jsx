import React from 'react';
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { useTheme } from '../../context/ThemeContext'; // Adjust path as needed

export default function Footer() {
  const { dark } = useTheme();

  return (
    <footer className={`border-t shadow-sm transition-colors duration-300 ${
      dark 
        ? 'bg-stone-900 border-stone-800' 
        : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* About Section */}
        <div>
          <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
            dark ? 'text-stone-100' : 'text-foreground'
          }`}>
            Nextify
          </h2>
          <p className={`text-sm leading-relaxed transition-colors duration-300 ${
            dark ? 'text-stone-400' : 'text-slate-600'
          }`}>
            Nextify is a modern social media platform designed to connect you with friends, communities, and trending topics worldwide. Share, interact, and discover new content every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
            dark ? 'text-stone-200' : 'text-foreground'
          }`}>
            Quick Links
          </h3>
          <ul className={`space-y-2 transition-colors duration-300 ${
            dark ? 'text-stone-400' : 'text-slate-600'
          }`}>
            <li>
              <a 
                href="#" 
                className="hover:text-[#1877f2] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:text-[#1877f2] transition-colors"
              >
                Profile
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:text-[#1877f2] transition-colors"
              >
                Messages
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:text-[#1877f2] transition-colors"
              >
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
            dark ? 'text-stone-200' : 'text-foreground'
          }`}>
            Follow Us
          </h3>
          <div className={`flex items-center gap-4 text-2xl transition-colors duration-300 ${
            dark ? 'text-stone-400' : 'text-slate-600'
          }`}>
            <a 
              href="#" 
              className="hover:text-[#1877f2] transition-colors"
              title="Facebook"
            >
              <AiFillFacebook />
            </a>
            <a 
              href="#" 
              className="hover:text-[#1DA1F2] transition-colors"
              title="Twitter"
            >
              <AiFillTwitterCircle />
            </a>
            <a 
              href="#" 
              className="hover:text-[#E1306C] transition-colors"
              title="Instagram"
            >
              <AiFillInstagram />
            </a>
            <a 
              href="#" 
              className="hover:text-[#0077B5] transition-colors"
              title="LinkedIn"
            >
              <AiFillLinkedin />
            </a>
            <a 
              href="#" 
              className={`transition-colors ${
                dark 
                  ? 'hover:text-stone-100' 
                  : 'hover:text-slate-900'
              }`}
              title="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t mt-6 py-4 text-center text-xs transition-colors duration-300 ${
        dark 
          ? 'border-stone-800 text-stone-500' 
          : 'border-slate-200 text-slate-500'
      }`}>
        © {new Date().getFullYear()} Nextify. All rights reserved.
      </div>
    </footer>
  );
}