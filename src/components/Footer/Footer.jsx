import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 shadow-sm mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Nextify</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Nextify is a modern social media platform designed to connect you with friends, communities, and trending topics worldwide. Share, interact, and discover new content every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
          <ul className="space-y-2 text-slate-600">
            <li>
              <a href="#" className="hover:text-[#1877f2] transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1877f2] transition-colors">Profile</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1877f2] transition-colors">Messages</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1877f2] transition-colors">Settings</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Follow Us</h3>
          <div className="flex items-center gap-4 text-2xl text-slate-600">
            <a href="#" className="hover:text-[#1877f2] transition-colors"><AiFillFacebook /></a>
            <a href="#" className="hover:text-[#1DA1F2] transition-colors"><AiFillTwitterCircle /></a>
            <a href="#" className="hover:text-[#E1306C] transition-colors"><AiFillInstagram /></a>
            <a href="#" className="hover:text-[#0077B5] transition-colors"><AiFillLinkedin /></a>
            <a href="#" className="hover:text-slate-900 transition-colors"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 mt-6 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Nextify. All rights reserved.
      </div>
    </footer>
  );
}
