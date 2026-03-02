import React from 'react';
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { 
  HiHome, 
  HiUserGroup, 
  HiBookmark, 
  HiCalendar,
  HiCog,
  HiFlag,
  HiShoppingBag,
  HiNewspaper 
} from "react-icons/hi";
import { BsRocketTakeoff, BsStars } from "react-icons/bs";

export default function SideBar() {
  const menuItems = [
    { icon: HiHome, label: "Feed", active: true, badge: null },
    { icon: BsStars, label: "My Posts", active: false, badge: null },
    { icon: HiUserGroup, label: "Community", active: false, badge: "New" },
    { icon: HiBookmark, label: "Saved", active: false, badge: null },
    { icon: HiCalendar, label: "Events", active: false, badge: 3 },
    { icon: HiShoppingBag, label: "Marketplace", active: false, badge: null },
    { icon: HiFlag, label: "Pages", active: false, badge: null },
    { icon: BsRocketTakeoff, label: "Explore", active: false, badge: null },
  ];

  return (
    <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 p-2">
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
              item.active 
                ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400" 
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${item.active ? "text-blue-600 dark:text-blue-400" : ""}`} />
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
          </motion.button>
        ))}
      </nav>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <motion.button
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          <HiCog className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </motion.button>
      </div>
    </Card>
  );
}