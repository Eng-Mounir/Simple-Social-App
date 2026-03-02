import React from 'react';
import { Avatar } from "@heroui/react";
import { motion } from "framer-motion";

export default function TopComment({ post }) {
  const { topComment } = post || {};

  if (!topComment) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 border border-blue-100 dark:border-blue-900"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          🔥 Top Comment
        </span>
      </div>

      <div className="flex items-start gap-2">
        <Avatar 
          src={topComment.commentCreator?.photo} 
          className="w-8 h-8"
        />
        
        <div className="flex-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl px-3 py-2 shadow-sm">
            <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
              {topComment.commentCreator?.name || "Unknown"}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {topComment.content || ""}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-1 ml-2">
            <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Like
            </button>
            <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Reply
            </button>
            <span className="text-xs text-slate-500">2h</span>
          </div>
        </div>
      </div>

      <button className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline ml-10">
        View all {post.commentsCount || 0} comments
      </button>
    </motion.div>
  );
}