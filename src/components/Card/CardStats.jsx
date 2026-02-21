import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import defaultImage from "../../assets/images/defaultImage.jpg";
export default function CardStats({post}) {
    const { likesCount, sharesCount, commentsCount } = post || {};
  return (
    <>
    <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <AiOutlineLike size={12} />
            </span>
            <span className="font-semibold">{likesCount || 0} likes</span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <BiRepost size={14} />
              {sharesCount || 0} shares
            </span>

            <span>{commentsCount || 0} comments</span>

            <button className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
              View details
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
