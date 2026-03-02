import React, { useState } from 'react';
import { Card, Input, Avatar, Button, Badge } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUsers, 
  FiSearch, 
  FiUserPlus,
  FiMessageCircle,
  FiStar 
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineUserGroup } from "react-icons/hi";
import { BsFillPersonCheckFill } from "react-icons/bs";

export default function RightSideBar() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const suggestions = [
    {
      id: 1,
      name: "Ahmed Bahnasy",
      username: "@bahnasy20222",
      avatar: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771018057253-2285ec56-8e3c-4ea3-9ee4-c235037ffffe-Screenshot-2026-02-13-at-11.27.15---PM.png",
      followers: "75",
      mutual: 12
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      username: "@sarah.ahmed",
      avatar: "https://i.pravatar.cc/150?img=1",
      followers: "1.2k",
      mutual: 8
    },
    {
      id: 3,
      name: "Mohamed Ali",
      username: "@m.ali",
      avatar: "https://i.pravatar.cc/150?img=3",
      followers: "450",
      mutual: 5
    }
  ];

  return (
    <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <HiOutlineSparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-lg">Suggestions</h3>
          </div>
          <Badge color="primary" variant="flat" className="text-xs">
            5 new
          </Badge>
        </div>

        {/* Search */}
        <Input
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<FiSearch className="text-slate-400 w-4 h-4" />}
          classNames={{
            input: "text-sm",
            inputWrapper: "bg-slate-100 dark:bg-slate-800 border-0"
          }}
        />
      </div>

      {/* Suggestions List */}
      <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin">
        <AnimatePresence>
          {suggestions.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all">
                
                {/* User Info */}
                <div className="flex items-start gap-3">
                  <Avatar 
                    src={user.avatar} 
                    className="w-12 h-12 ring-2 ring-white dark:ring-slate-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-900 transition-all"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-sm truncate">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.username}</p>
                      </div>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiMessageCircle className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <FiUsers className="w-3 h-3" />
                        <span>{user.followers} followers</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <FiStar className="w-3 h-3" />
                        <span>{user.mutual} mutual</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        color="primary"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 text-xs"
                        startContent={<FiUserPlus className="w-3 h-3" />}
                      >
                        Follow
                      </Button>
                      <Button
                        size="sm"
                        variant="bordered"
                        className="flex-1 border-slate-300 dark:border-slate-700 text-xs"
                      >
                        Ignore
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View More */}
      <div className="p-4 pt-0">
        <Button
          variant="light"
          className="w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-700 dark:hover:to-slate-800 text-sm font-medium"
          endContent={<HiOutlineUserGroup />}
        >
          View all suggestions
        </Button>
      </div>
    </Card>
  );
}