// src/components/SharedPost/SharedPostCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '@heroui/react';
import { RiShareForwardLine, RiChat1Line, RiHeart3Line } from 'react-icons/ri';
import { formatDistanceToNow } from 'date-fns';

export default function SharedPostCard({ share }) {
  const originalPost = share?.originalPost || share?.post;
  const sharedBy = share?.user || share?.sharedBy;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[rgba(18,18,24,0.95)] border border-white/10 rounded-xl p-4 mb-4"
    >
      {/* Share info - who shared and note */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar
          src={sharedBy?.photo}
          name={sharedBy?.name}
          className="w-8 h-8"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{sharedBy?.name}</span>
            <span className="text-xs text-slate-400">shared a post</span>
            <span className="text-xs text-slate-500">
              {formatDistanceToNow(new Date(share?.createdAt), { addSuffix: true })}
            </span>
          </div>
          {share?.note && (
            <p className="text-sm text-slate-300 mt-1">{share.note}</p>
          )}
        </div>
      </div>

      {/* Original post preview */}
      <div className="ml-11 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="flex gap-2 mb-2">
          <Avatar
            src={originalPost?.user?.photo || originalPost?.creator?.photo}
            name={originalPost?.user?.name || originalPost?.creator?.name}
            className="w-6 h-6"
          />
          <div>
            <span className="text-sm font-medium text-white">
              {originalPost?.user?.name || originalPost?.creator?.name}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-slate-300 mb-3">
          {originalPost?.content}
        </p>

        {/* Original post actions - disabled since it's a share */}
        <div className="flex items-center gap-4 text-slate-500">
          <button className="flex items-center gap-1 text-xs">
            <RiHeart3Line /> {originalPost?.likesCount || 0}
          </button>
          <button className="flex items-center gap-1 text-xs">
            <RiChat1Line /> {originalPost?.commentsCount || 0}
          </button>
          <button className="flex items-center gap-1 text-xs text-emerald-400">
            <RiShareForwardLine /> Shared
          </button>
        </div>
      </div>
    </motion.div>
  );
}