import React from 'react';
import { motion } from "framer-motion";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import PostDetails from '../PostDetails/PostDetails';

export default function CardStats({ post, showDetails = true, isOpen, onOpen, onOpenChange }) {
  const { likesCount, sharesCount, commentsCount } = post || {};
  const [liked, setLiked] = React.useState(false);

  return (
    <>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Likes */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs -mr-1 z-10">
                <AiOutlineLike />
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-xs">
                ❤️
              </div>
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {likesCount || 0}
            </span>
          </div>

          {/* Comments & Shares */}
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="hover:underline cursor-pointer">
              {commentsCount || 0} comments
            </span>
            <span className="hover:underline cursor-pointer">
              {sharesCount || 0} shares
            </span>
            
            {showDetails && (
              <button
                onClick={onOpen}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View details
              </button>
            )}
          </div>
        </div>
      </div>

      <PostDetails isOpen={isOpen} onOpenChange={onOpenChange} postId={post?._id} />
    </>
  );
}