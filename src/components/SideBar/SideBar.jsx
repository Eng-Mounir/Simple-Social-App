import React from 'react';
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom"; // Add useNavigate
import { 
  HiHome, 
  HiUserGroup, 
  HiBookmark, 
  HiCalendar,
  HiCog,
  HiFlag,
  HiShoppingBag,
  HiNewspaper,
  HiShare // Add share icon for shared posts
} from "react-icons/hi";
import { BsRocketTakeoff, BsStars } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri"; // Alternative share icon

export default function SideBar() {
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: HiHome, 
      label: "Feed", 
      path: "/home", 
      badge: null,
      end: true // For exact matching
    },
    { 
      icon: BsStars, 
      label: "My Posts", 
      path: "/my-posts", 
      badge: null,
      end: true
    },
    { 
      icon: RiShareForwardLine, // Add share icon
      label: "Shared Posts", 
      path: "/shared", // or "/shared-feed" depending on your route
      badge: null,
      end: true
    },
    { 
      icon: HiUserGroup, 
      label: "Community", 
      path: "/community", 
      badge: "New",
      end: true
    },
    { 
      icon: HiBookmark, 
      label: "Saved", 
      path: "/saved", 
      badge: null,
      end: true
    },
    { 
      icon: HiCalendar, 
      label: "Events", 
      path: "/events", 
      badge: 3,
      end: true
    },
    { 
      icon: HiShoppingBag, 
      label: "Marketplace", 
      path: "/marketplace", 
      badge: null,
      end: true
    },
    { 
      icon: HiFlag, 
      label: "Pages", 
      path: "/pages", 
      badge: null,
      end: true
    },
    { 
      icon: BsRocketTakeoff, 
      label: "Explore", 
      path: "/explore", 
      badge: null,
      end: true
    },
  ];

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 p-2 sticky top-4">
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.end}
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    typeof item.badge === 'number' 
                      ? "bg-red-500 text-white" 
                      : "bg-green-500 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSettingsClick}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all"
        >
          <HiCog className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </motion.button>
      </div>
    </Card>
  );
}