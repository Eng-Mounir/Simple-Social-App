import React from 'react'
import { AiOutlineLike, AiOutlineMessage, AiOutlineShareAlt } from "react-icons/ai";
export default function CardActions({ post, onOpen }) {
  const { likesCount, sharesCount, commentsCount } = post || {};
  return (
    <>
          <div className="grid grid-cols-3 gap-1 p-1">
        <button className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <AiOutlineLike size={18} />
          Like
          <span className="ml-1 text-xs text-slate-500">{likesCount || 0}</span>
        </button>

        <button onClick={onOpen} className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <AiOutlineMessage size={18} />
          Comment
          <span className="ml-1 text-xs text-slate-500">{commentsCount || 0}</span>
        </button>

        <button className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          <AiOutlineShareAlt size={18} />
          Share
        </button>
      </div>
    </>
  )
}
